import React, {Component} from "react";
import _                  from "lodash";
import {connect}          from "react-redux";
import ReportPanel        from "app/views/reports/report_panel";

export default class ReportContainer extends Component {

  render () {
    if (this.props.fetchingReportData){
      return <div>Loading report data...</div>;
    } else {
      return (
        <div>
            <ReportPanel/>
        </div>
      )
    }
  }
}
