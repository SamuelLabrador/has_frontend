import React, { Component } from 'react';
import {RadialChart, DiscreteColorLegend, Hint} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';
import VehiclesVsFreeway from './graphs.js';

class AnalyticsGraph extends Component{

  constructor(props){
    super(props);
    this.state = {
      routeVehicle : [],
      value : false,
      series : [],
      cctvs: [],
      vehiclesPerCCTV: [],
      activeRoute : 0,
      cctvPerRoute : {}
    };
    this.getrouteCount()
  }

  gettotalCCTVsPerRoute(){
    var url = '/api/graph';
    fetch(url)
    .then(res => res.json())
    .then(
        (result) => {
          var res = {}

          for(var route in result){
            res[route] = result[route].length;
          }

          this.setState({
            cctvPerRoute : res,
          });
        },
        (error) => {
            console.log("ERROR FETCHING CCTV per Route API");
      });
  }

  getrouteCount(){
    var url = '/api/routeVehicleCount';
    fetch(url)
    .then(res => res.json())
    .then(
        (result) => {
          this.setState({
            routeVehicle : result,
          });
        },
        (error) => {
            console.log("ERROR FETCHING COUNT API");
    });
  }

  getCCTV(){
    var url = "/api/cctv?format=json&county=Riverside,San+Bernardino";
    fetch(url)
    .then(res => res.json())
    .then(
    (result) => {
    	var list = [];
    	for(var i = 0; i < result.length; i++){
      		var cctv = result[i];
      		if(cctv.image_url !== "Not Reported"){
            list.push(cctv.id);
      		}
      	}
      	this.setState({
	        cctvs: list,
	        error: false
	    });
    },
    (error) => {
        this.setState({
        	cctvs: [],
          error: true
        })
    });
  }

  getVehiclesPerCCTV(){
    var url = "/api/vehiclesPerCCTV"

    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          vehiclesPerCCTV : result,
        });
      }, (error) => {
        console.log("ERROR FETCHING VEHICLE PER CCTV API");
    });
  }

  componentDidMount() {
    this.gettotalCCTVsPerRoute();
    this.getVehiclesPerCCTV();
    setInterval(async () => {
      this.getrouteCount();
      this.getVehiclesPerCCTV();
    }, 900000);
  }

  renderTable(){
    var orderedrouteVehicle = this.state.routeVehicle;
    var cctvPerRoute = this.state.cctvPerRoute;
    var sortable = [];
    var route = []
    var count = []

    for (var vehicle in orderedrouteVehicle) {
      if(vehicle !== "SR-138" && vehicle !== "SR-18"){
        sortable.push([vehicle, parseInt(orderedrouteVehicle[vehicle]/cctvPerRoute[vehicle],10) ]);
      }
    }

    sortable.sort(function(a, b){
      return a[1] - b[1];
    });

    sortable.reverse();

    sortable.forEach(function(item, index, array) {
      route.push(item[0]);
      count.push(item[1]);
    })

    return(
      <div style={{marginTop : '40px'}} >
        <h2 style={{color: "white"}}> Top 5 Congested Freeways </h2>
        <table className="table table-bordered table-hover" id="myTable">
          <thead>
              <tr>
                  <th style={{"color":"white"}}>Ranking</th>
                  <th style={{"color":"white"}}>Highway Name</th>
                  <th style={{"color":"white"}}>Vehicles</th>
              </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{"color":"white"}}>1</td>
              <td style={{"color":"white"}}>{route[0]}</td>
              <td style={{"color":"white"}}>{count[0]}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style={{"color":"white"}}>2</td>
              <td style={{"color":"white"}}>{route[1]}</td>
              <td style={{"color":"white"}}>{count[1]}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style={{"color":"white"}}>3</td>
              <td style={{"color":"white"}}>{route[2]}</td>
              <td style={{"color":"white"}}>{count[2]}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style={{"color":"white"}}>4</td>
              <td style={{"color":"white"}}>{route[3]}</td>
              <td style={{"color":"white"}}>{count[3]}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style={{"color":"white"}}>5</td>
              <td style={{"color":"white"}}>{route[4]}</td>
              <td style={{"color":"white"}}>{count[4]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderTable2(){
    var vehiclesPerCCTV = this.state.vehiclesPerCCTV;
    var sortable = [];
    var cctvId = []
    var count = []

    for (var vehicle in vehiclesPerCCTV) {
        sortable.push([vehicle, vehiclesPerCCTV[vehicle]]);
    }

    sortable.sort(function(a, b){
      return a[1] - b[1];
    });

    sortable.reverse();

    sortable.forEach(function(item) {
      cctvId.push(item[0]);
      count.push(item[1]);
    })

    return(
      <div style={{marginTop : '40px'}}>
            <h2 style={{color:"white"}}> Top 5 Congested CCTVs </h2>
            <table className="table table-bordered table-hover" id="myTable">
              <thead>
                  <tr>
                      <th style={{"color":"white"}}>Ranking</th>
                      <th style={{"color":"white"}}>CCTV ID</th>
                      <th style={{"color":"white"}}>Vehicles</th>
                  </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{"color":"white"}}>1</td>
                  <td style={{"color":"white"}}>{cctvId[0]}</td>
                  <td style={{"color":"white"}}>{count[0]}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td style={{"color":"white"}}>2</td>
                  <td style={{"color":"white"}}>{cctvId[1]}</td>
                  <td style={{"color":"white"}}>{count[1]}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td style={{"color":"white"}}>3</td>
                  <td style={{"color":"white"}}>{cctvId[2]}</td>
                  <td style={{"color":"white"}}>{count[2]}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td style={{"color":"white"}}>4</td>
                  <td style={{"color":"white"}}>{cctvId[3]}</td>
                  <td style={{"color":"white"}}>{count[3]}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td style={{"color":"white"}}>5</td>
                  <td style={{"color":"white"}}>{cctvId[4]}</td>
                  <td style={{"color":"white"}}>{count[4]}</td>
                </tr>
              </tbody>
            </table>
          </div>
    );
  }

	render(){
    const {value} = this.state;
    var top5 = this.renderTable();

    var series = this.state.series;
    var activeRoute = this.state.activeRoute;

    var vehiclesPerCCTV = this.renderTable2();


    var routeVehicle = this.state.routeVehicle;
    var data = []

    var i;
    for(i = 0; i < 24; i++ ){
      if (this.state.series && this.state.series.length){
        data.push({ x : i, y : series[activeRoute].data[i] })
      }
    }

    var radialData = []
    const items = []
    const color = [
      '#19CDD7',
      '#DDB27C',
      '#88572C',
      '#FF991F',
      '#F15C17',
      '#223F9A',
      '#DA70BF',
      '#125C77',
      '#4DC19C',
      '#776E57',
      '#12939A',
      '#17B8BE',
      '#F6D18A',
      '#B7885E',
      '#FFCB99',
      '#F89570',
      '#829AE3',
      '#E79FD5',
      '#1E96BE',
      '#89DAC1',
      '#B3AD9E'
    ];
    var col = 0;

    for(var routes in routeVehicle){
      radialData.push({
        count : routeVehicle[routes],
        label : routes,
        color : color[col]
      })

      items.push({
        'title' : routes,
      })

      col += 2;
    }

    return(
      <div  style={{"backgroundColor":"#232931"}}>
        
        <VehiclesVsFreeway data={data}/>
        
        <div className="container">
          
          <div className="row" style={{"backgroundColor":"#393e46"}}>
            <div className="col-xs-6 col-sm-6 col-lg-6" style={{"width":"700px"}}>
              {top5}
            </div>
            <div className="col-xs-6 col-sm-6 col-lg-6">
              {vehiclesPerCCTV}
            </div>
          </div>

          <div style={{"marginTop":"10px","marginBottom":"10px"}}>
          </div>

          <div className="row" style={{"backgroundColor":"#393e46"}}>
            <div className="col-xs-6 col-sm-6 col-lg-6">
              <h2 style={{color:"white", marginTop:'40px'}}> Vehicle Distribution </h2>
              <div style={{"margin":"auto"}}>
                <RadialChart
                  colorType='literal'
                  getAngle={d => d.count}
                  data = {radialData}
                  width = {300}
                  height = {300}
                  padAngle={0.04}
                  innerRadius={100}
                  radius={140}
                >
                  {value !== false && <Hint value={value} />}
                </RadialChart>
              </div>
            </div>
            <div className="col-xs-6 col-sm-6 col-lg-6">
              <h2 style={{color:"#eeeeee",marginTop:'40px'}}> Color Legend </h2>
                <div className="card" style={{margin:'20px'}}>
                  <DiscreteColorLegend
                    height={300}
                    width={200}
                    items={items}
                    colors={color}
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
    );
	}
}

export default AnalyticsGraph;
