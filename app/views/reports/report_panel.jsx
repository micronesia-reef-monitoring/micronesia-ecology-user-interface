import React, {Component} from "react";
import _                  from "lodash";
import TabbedArea         from "./tab";
import TabPane            from "./tab";
import Highcharts         from "react-highcharts/dist/bundle/highcharts";
import classNames         from "./styles";
import BioGraph           from "./biograph";
import {getAllTabsAndCheckBoxes}  from "app/action_creators/report_action_creator.js";
import {connect}          from "react-redux";
import {fetchReportData}  from "app/action_creators/report_action_creator.js";
import {updateCheckboxInfo}  from "app/action_creators/report_action_creator.js";
import {Checkbox}       from "material-ui";
import {downloadCSVReport}  from "app/action_creators/report_action_creator.js";

const select = (state) => ({
  fetchingSiteData: state.reports.fetchingSiteData,
  siteData: state.reports.siteData
});



@connect(select)
export default class ReportPanel extends Component {

  _getTabPaneFor(tabName,checkBoxes){
    let checkBoxesAsTags = _.map(checkBoxes, checkBoxData=>{
      return (
        <div className={classNames.checkBoxCont} key={checkBoxData.id}>
        <Checkbox key={checkBoxData.id} onChange={this.updateGraph.bind(this, checkBoxData)}
          name="checkboxName1"
          value="checkboxValue1"
          label={checkBoxData.name}
          defaultChecked={checkBoxData.checked}
          onCheck={this.updateGraph.bind(this, checkBoxData.asMutable(),{tabName: tabName, checkBoxes: checkBoxes})}
          />
        </div>
        )
      });
    const checkBoxCalc = checkBoxes.map(checkBox=>{return {name: checkBox.name, id: checkBox.id, checked: checkBox.checked}});
    return(
      <TabPane display={tabName} key={tabName}>
        <div className={classNames.subregionPanel}>
          <div className={classNames.checkBoxPanel}>
            {checkBoxesAsTags}
          </div>
          <div className={classNames.buttonPanel}>
            <button className={classNames.reportPanelButton} onClick={this._generateReportClick.bind(this,{tabName: tabName, checkBoxes: checkBoxCalc})} type="button">Download CSV</button>
          </div>
        </div>
        <BioGraph environment="Benthic" apiparam = {{tabName: tabName, checkBoxes: checkBoxCalc}}/>
      </TabPane>
    );
  }

  _generateReportClick(selectedSpecies){
    const {dispatch} = this.props;
    dispatch(downloadCSVReport(selectedSpecies));
  }

  _computeTabs(configObject){
    if (!configObject) return [];
    const tabNames = Object.keys(configObject);
    let result = [];
    result = tabNames.map(tabName=>{
      return this._getTabPaneFor(tabName,configObject[tabName]);
    })
    return result;
  }

  _updateSpecies(species) {
     this.setState({selectedSpecies: species});
  }

  componentWillMount(){
    const {dispatch} = this.props;
    dispatch(getAllTabsAndCheckBoxes());
  }

  updateGraph(subcategory,tabConfig){
    const {dispatch} = this.props;
    subcategory.checked=!subcategory.checked;
    dispatch(updateCheckboxInfo(tabConfig, subcategory));
  }


  render () {
    if (this.props.fetchingSiteData===true) {
      return <div>Loading data...</div>
    }
    let tabs = this._computeTabs(this.props.siteData);
    return (
      <div className={classNames.reportPanel}>
        <TabbedArea>
          {tabs}
        </TabbedArea>
      </div>
    );
  }
}
