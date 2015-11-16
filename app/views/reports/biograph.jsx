import React, {Component} from "react";
import _                  from "lodash";
import {connect}          from "react-redux";
import TabbedArea         from "./tab";
import TabPane            from "./tab";
import Highcharts         from "react-highcharts/dist/bundle/highcharts";
import classNames         from "./styles";
import {downloadCSVReport}  from "app/action_creators/report_action_creator.js";
import {fetchReportData}  from "app/action_creators/report_action_creator.js";

var unique = function(value, index, self) {
  return self.indexOf(value) === index;
}

/** computeLocations generate an object
{"location - type": {name: location, type: type},"location2 - type": {name: location2, type: type}}
location - type are unique and contains only one object representing location
*/
function computeLocations(dataSrc) {
  if (dataSrc==null) return new Array();
  var labels = dataSrc.map(data=>{return data.site_id+' - '+data.reef_type }).filter(unique);
  var result = {};
  var locations = dataSrc.map(data=>{return {name: data.site_id, type:data.reef_type} });
  for (var i = 0; i < labels.length; i++) {
    result[labels[i]]=locations.filter(l=>((l.name+' - '+l.type) == labels[i]))[0];
  }
  return result;
}

/** get unique species names from datasource
*/
function computeSpecies(dataSrc) {
  if (dataSrc==null) return [];
  const species = dataSrc.map(data=>{return data.category_name})
  return species.filter(unique).map(a=>{return {species:a}});
}

/** get unique reef types from datasource
*/
function computeReefTypes(dataSrc) {
  if (dataSrc==null) return [];
  const reef_types = dataSrc.map(data=>{return data.reef_type});
  return reef_types.filter(unique).map(a=>{return {reef:a}});
}

function computeCountForReefTypes(reefTypes, places) {
  let result = {}
  for (var i=0;i<reefTypes.length;i++){
    result[reefTypes[i].reef]=0;
  }
  for (var i=0;i<places.length;i++){
    result[places[i].type]++;
  }
  return result;
}

/**creates some sort of data matrix based on datasource for feeding bar graph. If some data is missing fill it with zeros*/
function homogenizeDataSet(dataForSpecies, locations, species, dataSrc){
  let homogenizedData = [];
  let places = Object.values(locations);
  for (var i = 0; i < places.length; i++) {
    //this might be refactorized in a helper
    let dataForLocation = dataSrc.filter(d=>d.site_id==places[i].name && d.category_name == dataForSpecies[0].category_name);
    if (dataForLocation.length==0) {
      dataForLocation=[];
      dataForLocation.push({
          "site_id": places[i].name,
          "category_name": dataForSpecies[0].category_name,
          "category_code": dataForSpecies[0].FCA,
          "avg_value":  0,
          "reef_type": places[i].type
        });
    }
    //always will have data in there
    homogenizedData.push(  {
        "site_id": dataForLocation[0].name,
        "category_name": dataForLocation[0].category_name,
        "category_code": dataForLocation[0].FCA,
        "avg_value":  dataForLocation[0].avg_value,
        "reef_type": dataForLocation[0].reef_type
      })
  }
  return homogenizedData;
}

function computeDataForSpeciesAndPlaces(locations,species,dataSrc){
  let response = []
  const places = Object.values(locations);
  for (var i = 0; i < species.length; i++) {
    let dataForSpecies = dataSrc.filter(rec=>{return rec.category_name==species[i].species});
    dataForSpecies = (homogenizeDataSet(dataForSpecies,locations,species,dataSrc));
    response.push({name: species[i].species, data: _.map(dataForSpecies, data=>{return data.avg_value})});
  }
  return response;
}

function generatePlotLines(reefTypes){
  let plotlines = [];
  let ac = -1;
  for(var propt in reefTypes){
    ac+=reefTypes[propt];
    plotlines.push({
       color: 'green',
       dashStyle: 'longdashdot',
       value: ac+0.5,
       width: 2
     });
  }
  plotlines.pop();//remove last plotline
  return plotlines;
}

const select = (state) => ({
  fetchingReportData: state.reports.fetchingReportData,
  reportData: state.reports.reportData
});




@connect(select)
export default class BioGraph extends Component {

  componentWillMount(){
    const {dispatch} = this.props;
    dispatch(fetchReportData(this.props.apiparam));
  }

  _updateSpecies(species) {
     this.setState({selectedSpecies: species});
  }

  render () {
    if (this.props.fetchingReportData) {
      return <div>Loading data...</div>
    }
    this.selectedSpecies= computeSpecies(this.props.reportData).map(s=>{return {name:s.species, active: true}})
    let species = this.selectedSpecies;
    let dataSrc = this.props.reportData;
    let locations = computeLocations(dataSrc); //get all posible locations
    let series = computeDataForSpeciesAndPlaces(locations, computeSpecies(dataSrc), dataSrc);
    let plotlines = generatePlotLines(computeCountForReefTypes(computeReefTypes(dataSrc), Object.values(locations)));

    let component = this;
    const config ={
        chart: {
            renderTo: 'container',
            type: 'column'
        },
        title: {
            text: 'Average Values'
        },
        xAxis: {
            categories: Object.keys(locations),
            title: {
             text: 'Locations'
           },
           plotLines: plotlines
        },
        yAxis: {
            title: {
             text: 'Average values'
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: 'white'
                },
                events: {
                    legendItemClick: function () {
                        let selected = species.filter(e=>e.name==arguments[0].target.name)[0];
                        const index = species.indexOf(selected);
                        selected = (selected.name==arguments[0].target.name)?selected.merge({"active": !selected.active}):selected;
                        species = species.slice(0,index).concat([selected]).concat(species.slice(index+1));
                        component.selectedSpecies = species;
                    }
                }
            }
        },
        series: series
    };

    return (
      <div>
        <Highcharts className={classNames.chart} config = {config}></Highcharts>
        <button className={classNames.reportPanelButton} type="button" onClick={this._generateReportClick.bind(this,this.selectedSpecies)}>Download</button>
      </div>
    );
  }

  _generateReportClick(selectedSpecies){
    const {dispatch} = this.props;
    dispatch(downloadCSVReport(selectedSpecies,this.props.apiparam));
  }

}
