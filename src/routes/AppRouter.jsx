import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import SoulsWon from "./SoulsWon";
import Testimonies from "./Testimonies";
import HomeCell from "./HomeCell";
import Members from "./Members";
import Profile from "./Profile";
import FoundationClass from "./FoundationClass";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import AddSoul from "./AddSoul";

function AppRouter(props) {
  return (
    <BrowserRouter>
      {!props.user ? (
        <div>
          <Switch>
            <Route path="/" exact={true}>
              <LogIn {...props} />
            </Route>
            <Route path="/signUp">
              <SignUp {...props} />
            </Route>
          </Switch>
        </div>
      ) : (
        <div>
          <Switch>
            <Route path="/" exact={true}>
              <Home {...props} />
            </Route>
            <Route path="/soulsWon">
              <SoulsWon {...props} />
            </Route>
            <Route path="/testimonies">
              <Testimonies {...props} />
            </Route>
            <Route path="/homeCell">
              <HomeCell {...props} />
            </Route>
            <Route path="/members">
              <Members {...props} />
            </Route>
            <Route path="/profile">
              <Profile {...props} />
            </Route>
            <Route path="/foundationClass">
              <FoundationClass {...props} />
            </Route>
            <Route path="/addSoul">
              <AddSoul {...props} />
            </Route>
          </Switch>
        </div>
      )}
    </BrowserRouter>
  );
}

export default AppRouter;
