import React, { Component } from 'react';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, RadialChart, DiscreteColorLegend, Hint} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';
import {curveCatmullRom} from 'd3-shape';

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
    var url = 'http://highwayanalytics.us/api/graph';
    fetch(url)
    .then(res => res.json())
    .then(
        (result) => {
          console.log(result)
          var res = {}

          for(var route in result){
            res[route] = result[route].length;
          }

          console.log(res)

          this.setState({
            cctvPerRoute : res,
          });
        },
        (error) => {
            console.log("ERROR FETCHING CCTV per Route API");
    });
  }

  getrouteCount(){
    var url = 'http://highwayanalytics.us/api/routeVehicleCount';
    fetch(url)
    .then(res => res.json())
    .then(
        (result) => {
          console.log(result)
          this.setState({
            routeVehicle : result,
          });
        },
        (error) => {
            console.log("ERROR FETCHING COUNT API");
    });
  }

  getrouteCount_2(){
    var url = 'http://highwayanalytics.us/api/vehiclesPerHour';
    fetch(url)
    .then(res => res.json())
    .then(
        (result) => {
          var routes = []

          for(var route in result){
            routes.push({
              title : route,
              //disabled : true,
              data : result[route]
            })
          }

          this.setState({
            series : routes,
          });
        },
        (error) => {
            console.log("ERROR FETCHING VEHICLE PER HOUR API");
    });
  }

  getCCTV(){
    var url = "http://highwayanalytics.us/api/cctv?format=json&county=Riverside,San+Bernardino";
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
        //console.log(error);
        this.setState({
        	cctvs: [],
          error: true
        })
    });
  }

  getVehiclesPerCCTV(){
    var url = "http://highwayanalytics.us/api/vehiclesPerCCTV"

    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        //console.log(result)
        this.setState({
          vehiclesPerCCTV : result,
        });
      }, (error) => {
          console.log("ERROR FETCHING VEHICLE PER CCTV API");
    });
  }

  componentDidMount() {
    //this.getCCTV();
    this.gettotalCCTVsPerRoute();
    this.getrouteCount_2();
    this.getVehiclesPerCCTV();
    setInterval(async () => {
      //this.getrouteCount_2();
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
      <div style={{ height: '15%', width: '85%', padding: '20px' }} >
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
      <div style={{ marginLeft : '40px', marginTop : '40px'}}>
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

  _updateButtonClicked0(){
    var count = 0;
    this.setState({
      activeRoute : count
    })
  }
  _updateButtonClicked1(){
    var count = 1;
    this.setState({
      activeRoute : count
    })
  }
  _updateButtonClicked2(){
    var count = 2;
    this.setState({
      activeRoute : count
    })
  }
  _updateButtonClicked3(){
    var count = 3;
    this.setState({
      activeRoute : count
    })
  }
  _updateButtonClicked4(){
    var count = 4;
    this.setState({
      activeRoute : count
    })
  }
  _updateButtonClicked5(){
    var count = 5;
    this.setState({
      activeRoute : count
    })
  }
  _updateButtonClicked6(){
    var count = 6;
    this.setState({
      activeRoute : count
    })
  }
  _updateButtonClicked7(){
    var count = 7;
    this.setState({
      activeRoute : count
    })
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
      <div  style={{"background-color":"#232931"}}>
        <div className="container">
          <div className="row" style={{"background-color":"#393e46","height":"450px"}}>
            <div className="col-1">
              <div style={{"margin-top":"30px","margin-bottom":"5px"}}>
                  <button className="click-me btn btn-info" style={{"width":"80px"}} onClick={() => {this._updateButtonClicked0()}}>
                    I-215
                  </button>
              </div>
              <div style={{"margin-top":"5px","margin-bottom":"5px"}}>
                  <button className="click-me btn btn-info active" style={{"width":"80px"}} onClick={() => {this._updateButtonClicked1()}}>
                    I-10
                  </button>
              </div>
              <div style={{"margin-top":"5px","margin-bottom":"5px"}}>
                  <button className="click-me btn btn-info active" style={{"width":"80px"}} onClick={() => {this._updateButtonClicked2()}}>
                    I-210
                  </button>
              </div>
              <div style={{"margin-top":"5px","margin-bottom":"5px"}}>
                  <button className="click-me btn btn-info active" style={{"width":"80px"}} onClick={() => {this._updateButtonClicked3()}}>
                    I-15
                  </button>
              </div>
              <div style={{"margin-top":"5px","margin-bottom":"5px"}}>
                  <button className="click-me btn btn-info active" style={{"width":"80px"}} onClick={() => {this._updateButtonClicked4()}}>
                    SR-138
                  </button>
              </div>
              <div style={{"margin-top":"5px","margin-bottom":"5px"}}>
                  <button className="click-me btn btn-info active" style={{"width":"80px"}} onClick={() => {this._updateButtonClicked5()}}>
                    SR-18
                  </button>
              </div>
              <div style={{"margin-top":"5px","margin-bottom":"5px"}}>
                  <button className="click-me btn btn-info acitve" style={{"width":"80px"}} onClick={() => {this._updateButtonClicked6()}}>
                    SR-91
                  </button>
              </div>
              <div style={{"margin-top":"5px","margin-bottom":"5px"}}>
                  <button className="click-me btn btn-info active" style={{"width":"80px"}} onClick={() => {this._updateButtonClicked7()}}>
                    SR-60
                  </button>
              </div>
            </div>
            <div className="col-7" style={{"width":"100%"}}>
              <section>
                <div className="section=header">
                  <h3
                    className="section-title"
                    style={{"color":"white"}}
                  >
                    { this.state.series && this.state.series.length ? series[activeRoute].title : "Route Name" }
                  </h3>
                </div>
              </section>
              <XYPlot width={650} height={350} style={{"background-color":"white"}}>
                <HorizontalGridLines style={{stroke: '#B7E9ED'}} />
                <VerticalGridLines style={{stroke: '#B7E9ED'}} />
                <XAxis
                  title="Hours"
                  style={{
                    line: {stroke: '#ADDDE1'},
                    ticks: {stroke: '#ADDDE1'},
                    text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                  }}
                />
                <YAxis title="Vehicles" />
                <LineSeries
                  className="series"
                  data = {data}
                  curve={curveCatmullRom.alpha(0.5)}
                />
              </XYPlot>
            </div>
            <div className="col-4" style={{"width":"700px"}}>
              {top5}
            </div>
          </div>
          <div style={{"margin-top":"10px","margin-bottom":"10px"}}>
          </div>
          <div className="row" style={{"background-color":"#393e46"}}>
            <div className="col-sm">
              {vehiclesPerCCTV}
            </div>
            <div className="col-sm" style={{ marginLeft : '60px', marginTop : '40px'}}>
              <h2 style={{color:"white"}}> Vehicle Distribution </h2>
              <RadialChart
                colorType='literal'
                getAngle={d => d.count}
                data = {radialData}
                width = {300}
                height = {300}
                padAngle={0.04}
                innerRadius={100}
                radius={140}
                onValueMouseOver={v => this.setState({value: v})}
                onSeriesMouseOut={v => this.setState({value: false})}
              >
                {value !== false && <Hint value={value} />}
              </RadialChart>
            </div>
            <div className="col-sm">
            <h2 style={{color:"#eeeeee",marginTop:'40px', marginLeft:'20px'}}> Color Legend </h2>
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
