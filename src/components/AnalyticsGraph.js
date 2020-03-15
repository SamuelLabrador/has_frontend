import React, { Component } from 'react';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, RadialChart, DiscreteColorLegend, Hint} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';
import {curveCatmullRom} from 'd3-shape';

class AnalyticsGraph extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      routeVehicleCount : [],
      value : false
    };
    this.getrouteCount()
  }

  getrouteCount(){
    var url = 'http://highwayanalytics.us/api/routeVehicleCount';
    //var url2 = 'http://localhost:8000/api/routeVehicleCount';
    fetch(url)
    .then(res => res.json())
    .then(
        (result) => {
          console.log(result)
          this.setState({
            routeVehicleCount : result,
          });
        },
        (error) => {
            console.log("ERROR FETCHING COUNT API");
    }); 
  }


  componentDidMount() {
    setInterval(async () => {
      this.getrouteCount()
      //this.getCount()
		}, 900000);
  }

  renderTable(){
    var orderedrouteVehicle = this.state.routeVehicleCount;
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
            <td>1</td>
            <td>{route[0]}</td>
            <td>{count[0]}</td>
          </tbody>
          <tbody>
            <td>2</td>
            <td>{route[1]}</td>
            <td>{count[1]}</td>
          </tbody>
          <tbody>
            <td>3</td>
            <td>{route[2]}</td>
            <td>{count[2]}</td>
          </tbody>
          <tbody>
            <td>4</td>
            <td>{route[3]}</td>
            <td>{count[3]}</td>
          </tbody>
          <tbody>
            <td>5</td>
            <td>{route[4]}</td>
            <td>{count[4]}</td>
          </tbody>
        </table>
      </div>
    );
  }

	render(){
    const {value} = this.state;

    var top5 = this.renderTable();

    var routeVehicle = this.state.routeVehicleCount;
    //var data = [];
    
    // for(var i = 23; i >= 0; i--){
    //   data.push({ x: i, y : routeVehicle["I-15"] - 100*i})
    // }

    var data = [
      { x : 0, y : routeVehicle["I-15"] - 80},
      { x : 1, y : routeVehicle["I-15"] - 40},
      { x : 2, y : routeVehicle["I-15"] - 70},
      { x : 3, y : routeVehicle["I-15"]- 30},
      { x : 4, y : routeVehicle["I-15"] - 50},
      { x : 5, y : routeVehicle["I-15"] - 22},
      { x : 6, y : routeVehicle["I-15"] - 15},
      { x : 7, y : routeVehicle["I-15"] - 60},
      { x : 8, y : routeVehicle["I-15"] - 234},
      { x : 9, y : routeVehicle["I-15"] - 310},
      { x : 10, y : routeVehicle["I-15"] - 159},
      { x : 11, y : routeVehicle["I-15"] - 400},
      { x : 12, y : routeVehicle["I-15"] - 310},
      { x : 13, y : routeVehicle["I-15"] - 445},
      { x : 14, y : routeVehicle["I-15"] - 320},
      { x : 15, y : routeVehicle["I-15"] - 399},
      { x : 16, y : routeVehicle["I-15"] - 467},
      { x : 17, y : routeVehicle["I-15"]- 431},
      { x : 18, y : routeVehicle["I-15"] -212},
      { x : 19, y : routeVehicle["I-15"] - 193},
      { x : 20, y : routeVehicle["I-15"]- 99},
      { x : 21, y : routeVehicle["I-15"]- 142},
      { x : 22, y : routeVehicle["I-15"]- 210},
      { x : 23, y : routeVehicle["I-15"] - 321},
      { x : 24, y : routeVehicle["I-15"] - 219},

    ];

    console.log(data)

    var vehicles = 0
    var radialData = []

    for(var route in routeVehicle){
      vehicles += routeVehicle[route];
    }

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
        // angle : ( (routeVehicle[routes]/vehicles) * 360 ),
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
              className="first-series"
              data = {data}
              curve={curveCatmullRom.alpha(0.5)}
            />
          </XYPlot>
          <button className="click-me" onClick={this._updateButtonClicked}>
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