import React, { Component } from 'react';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';

class AnalyticsGraph extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      routeVehicleCount : []
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
    var top5 = this.renderTable();

    var routeVehicle = this.state.routeVehicleCount;

    var data = [];
    
    for(var i = 0; i < 25; i++){
      data.push({ x: i, y : routeVehicle["I-15"] - 100*i})
    }

    console.log(data)

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
              //data={[{x: 1, y: 3}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 4, y: 12}]}
              data = {data}
              style={{
                strokeLinejoin: 'round',
                strokeWidth: 4
              }}
            />
          </XYPlot>
        </div>
      </div>
    );
	}
}

export default AnalyticsGraph;