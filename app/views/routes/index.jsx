import React                           from "react";
import {Router, Route, Link, Redirect} from "react-router";

import ApplicationContainer            from "app/views/containers/application_container";
import SecuredContentContainer         from "app/views/containers/secured_content_container";
import LayoutContainer                 from "app/views/containers/layout_container";
import LoginContainer                  from "app/views/containers/login_container";
import LogoutContainer                 from "app/views/containers/logout_container";
import ReportContainer                 from "app/views/containers/report_container";
import HomeContainer                   from "app/views/containers/home_container";


export default function renderRoutes(store, history) {
  return (
    <Router history={history}>
      <Redirect from="/" to="/reports" />
      <Route path="/" component={ApplicationContainer}>
        <Route component={SecuredContentContainer} >
          <Route component={LayoutContainer} >
            <Route path="reports" component={ReportContainer} />
            <Route path="logout" component={LogoutContainer} />
          </Route>
        </Route>
        <Route path="login" component={LoginContainer} />
      </Route>
    </Router>
  );
};
