import Types from "app/action_types/report";

import {
  getDataForReports as getDataForReportsCall,
  downloadCSVReport as downloadCSVReportCall,
  getTabData as getTabDataCall,
} from "app/api/api_calls";


export function fetchReportData (tabConfig, changedCheckBox) {
  return {
    type: Types.GETREPORT,
    callAPI: () => getDataForReportsCall(tabConfig)
  }
}

export function downloadCSVReport(selectedSpecies) {
  //process selectedSpecies, get an array with objects as needed
  let sp = selectedSpecies.checkBoxes.map(spc=>{return {name: spc.name, selected: spc.checked, id: spc.id}});
  return {
    type: Types.GETCSVREPORT,
    callAPI: () => downloadCSVReportCall(sp)
  }
}

export function getAllTabsAndCheckBoxes() {
  return {
    type: Types.GETTABDATA,
    callAPI: () => getTabDataCall()
  }
}

export function updateCheckboxInfo(tabConfig, subcategory) {
  return {
    type: Types.UPDATECHECKBOXINFO,
    payLoad: {tabConfig: tabConfig, subcategory: subcategory}
  }
}
