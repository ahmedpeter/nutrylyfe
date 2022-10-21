import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./auth/login";
import Branches from "./branches";
import Sidebar from "./builder/Sidebar";
import Buses from "./buses";
import Drivers from "./drivers";
import Officers from "./officers";
import Dashboard from "./dashboard";
import Configuration from "./config";
import BookTrip from "./frontdesk"
import PaymentReport from "./reports/payment"
import Manifest from "./frontdesk/manifest"

function Application() {
  return (
    <Router>
      <div>
        <Switch>
          <React.Fragment>
            <Route path="/app/Login" component={Login} />
            <div className="flex-container">
              <div className="sidenav">
                <Sidebar />
              </div>
              <div className="main__content">
                <Route path="/app/manage-drivers" component={Drivers} />
                <Route path="/app/manage-officers" component={Officers} />
                <Route path="/app/manage-buses" component={Buses} />
                <Route path="/app/manage-branches" component={Branches} />
                <Route path="/app/dashboard" component={Dashboard} />
                <Route path="/app/config" component={Configuration} />
                <Route path="/app/book-trip" component={BookTrip} />
                <Route path="/app/reports/payment" component={PaymentReport} />
                <Route path="/app/manifest" component={Manifest} />
              </div>
            </div>
          </React.Fragment>
        </Switch>
      </div>
    </Router>
  );
}

export default Application;
