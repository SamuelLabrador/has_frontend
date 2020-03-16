import React, { Component } from 'react';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, RadialChart, DiscreteColorLegend, Hint, Crosshair} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';
import {curveCatmullRom} from 'd3-shape';

class AnalyticsGraph extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      routeVehicle : [],
      value : false,
      series : [],
      activeRoute : 0
    };
    this.getrouteCount()
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

  componentDidMount() {
    this.getrouteCount_2()
    setInterval(async () => {
      //this.getrouteCount_2();
      this.getrouteCount();
    }, 900000);
  }

  renderTable(){
    var orderedrouteVehicle = this.state.routeVehicle;
    var sortable = [];
    var route = []
    var count = []

    for (var vehicle in orderedrouteVehicle) {
        sortable.push([vehicle, orderedrouteVehicle[vehicle]]);
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
        <table className="table table-bordered table-hover" id="myTable">
          <thead>
              <tr>
                  <th>Ranking</th>
                  <th>Highway Name</th>
                  <th>Vehicles</th>
              </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{route[0]}</td>
              <td>{count[0]}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>2</td>
              <td>{route[1]}</td>
              <td>{count[1]}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>3</td>
              <td>{route[2]}</td>
              <td>{count[2]}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>4</td>
              <td>{route[3]}</td>
              <td>{count[3]}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>5</td>
              <td>{route[4]}</td>
              <td>{count[4]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  _updateButtonClicked(){
    var count = this.state.activeRoute
    count += 1;

    if(count > 7){
      count = 0;
    }
   
    this.setState({
      activeRoute : count
    })
  }

	render(){
    const {value} = this.state;
    var top5 = this.renderTable();

    var series = this.state.series;
    var activeRoute = this.state.activeRoute;

    console.log(series)

    var routeVehicle = this.state.routeVehicle;
    var data = []
  
    var i;
    for(i = 0; i < 24; i++ ){
      if (this.state.series && this.state.series.length){
        data.push({ x : i, y : series[activeRoute].data[i] })
        console.log(series[activeRoute].title)
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
      <div className="row">
        <div className="col-4">
          {top5}
        </div>
        <div className="col-8">
          <XYPlot width={600} height={350}>
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
          <button className="click-me" onClick={() => {this._updateButtonClicked()}} style={{ marginLeft : '250px'}}>
            Route
          </button>
        </div>
        <div className="row">
          <div style={{ marginLeft : '40px'}}>
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
          <div style={{ marginLeft : '20px'}}>
            <DiscreteColorLegend 
              height={300} 
              width={200} 
              items={items} 
              colors={color}
            />
          </div>
        </div>
      </div>
    );
	}
}

export default AnalyticsGraph;