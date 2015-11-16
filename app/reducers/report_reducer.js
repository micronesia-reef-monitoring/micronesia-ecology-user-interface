import matchesAction from "./utils/matches_action";
import * as ih       from "./utils/immutable_helpers";
import Types         from "app/action_types/report";
const initialState = ih.immutable({
  reportData: null,
  fetchingReportData: null,
  siteData: null,
  fetchingSiteData: null
});

export default function reportReducer (state = initialState, action) {
  if (matchesAction(action, Types.GETREPORT.request)) {
    state = ih.set(state, "fetchingReportData", true);
  }

  if (matchesAction(action, Types.GETREPORT.done)) {
    let dataSrc = action.apiResponse;
    dataSrc = dataSrc.sort(function(a, b) {
      if(a.reef_type.localeCompare(b.reef_type)==0){
          return (a.site_id.localeCompare(b.site_id));
      } else {
          return a.reef_type.localeCompare(b.reef_type)
      }
    });

    state = ih.set(state, "fetchingReportData", false);
    state = ih.set(state, "reportData", dataSrc);
  }

  if (matchesAction(action, Types.GETREPORT.fail)) {
    alert("fail");
  }
  //CSV FILES
  if (matchesAction(action, Types.GETCSVREPORT.request)) {
  }

  if (matchesAction(action, Types.GETCSVREPORT.done)) {
    /*generate csv file, it's waiting for an object with a structure and a name, which uses to download the file*/
    let fileStructure = action.apiResponse;
    const contentType = "text/csv";
    const csvFile = new Blob([fileStructure.fileContents], {type: contentType});
    let element = document.createElement("a");
    element.download =fileStructure.fileName;
    element.href = window.URL.createObjectURL(csvFile);
    element.dataset.downloadurl = [contentType, element.download, element.href].join(":");
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  if (matchesAction(action, Types.GETCSVREPORT.fail)) {
    alert("fail");
  }

  if (matchesAction(action, Types.GETTABDATA.request)) {
    state = ih.set(state, "fetchingSiteData", true);
  }

  if (matchesAction(action, Types.UPDATECHECKBOXINFO)) {
    const subcategory = action.payLoad.subcategory;
    const tabConfig = action.payLoad.tabConfig;
    let siteData = state.siteData.asMutable();
    siteData[tabConfig.tabName] = tabConfig.checkBoxes.map(stateSubcategory=>{return (stateSubcategory.id === subcategory.id)?subcategory:stateSubcategory});
    state = ih.set(state, "siteData", siteData);
  }

  if (matchesAction(action, Types.GETTABDATA.done)) {
    let dataSrc = action.apiResponse;
    let test = Object.values(dataSrc);
    for (let i=0; i < test.length;i++){
        for (let j=0; j < test[i].length;j++){
          test[i][j].checked=true;
        }
    }
    state = ih.set(state, "fetchingSiteData", false);
    state = ih.set(state, "siteData", dataSrc);
  }

  return state;
}
