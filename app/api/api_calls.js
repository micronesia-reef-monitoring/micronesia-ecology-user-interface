
import _ from "lodash";
import Api from "./api"
import {getCookieToken} from "app/api/auth_token";
const LOGIN_URL = "login/"
const ABSOLUTE_PATH = "http://www.micronesiareefmonitoring.com/login"
const LOGIN_NEXT_URL = "";
const YOUR_API_URL = "/"
const YOUR_CSV_API_URL = "http://localhost:5000/getcsv"

const ApiCalls = {
  authenticate ({email, password}) {
    let token = getCookieToken();
    return Api.post({
      path: LOGIN_URL,
      body: {username: email, password: password, next: LOGIN_NEXT_URL, csrfmiddlewaretoken: token},
      contentType: "application/x-www-form-urlencoded",
      ignoreAuthFailure: true,
      csrf: token,
      parse: function(res) {
        if (res.body.errorMessage) {
          this.fail({errorMessage: res.body.errorMessage});
        }
        if (res.body.token && res.body.user) {
          this.done(res.body);
        }
      }
    });
  },

  getDataForReports (argument) {
    let token = getCookieToken();
    return Api.get({
      absolutePath: YOUR_API_URL,//here i can use the argument as a complement to api url, or as an argument to your api, or switch cases and pick the desired url. To see how to post content, take a look to login
      ignoreAuthFailure: true,
      parse: function(res) {
        const dataSrc = (argument.tabName=="benthic")?require("app/views/reports/graphs.json"):require("app/views/reports/graphs2.json"); //PAY ATTENTION HERE, HERE IS THE RESPONSE THAT YOU'VE BEEN WAITING!
        if (res.body.errorMessage) {
          this.fail({errorMessage: res.body.errorMessage});
        }
        this.done(dataSrc);
      }
    });
  },

  downloadCSVReport (species, argument) {
    let result = "";
    species.forEach((element, index) => {
      Object.keys(element).forEach(key => {
    	   result += "species[" + index + "][" + key + "]=" + element[key];
         result += "&";
       });
    });
    result = result.slice(0,-1);
    return Api.post({
      absolutePath: YOUR_CSV_API_URL,//here i can do the same that in getDataForReports
      body: result,
      contentType: "application/x-www-form-urlencoded",
      ignoreAuthFailure: true,
      parse: function(res) {
        if (res.body.errorMessage) {
          this.fail({errorMessage: res.body.errorMessage});
        }
        this.done(res.body);
      }
    })
  },

  getTabData () {
    return Api.get({
      path: LOGIN_URL,
      parse: function(res) {
        const dataSrc = require("app/views/reports/subregions.json"); //PAY ATTENTION HERE, HERE IS THE RESPONSE THAT YOU'VE BEEN WAITING!
        this.done(dataSrc);
      }
    })
  },

  initCsrf () {
    return Api.get({
      path: LOGIN_URL
    })
  }

}


export default ApiCalls;
