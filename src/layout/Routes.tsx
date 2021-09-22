import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoggedInRoute from "../components/LoggedInRoute/LoggedInRoute";
import NotFoundPage from "../components/NotFound/NotFoundPage";
import { ClientRoutes } from "../config/enums";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import RegisterPage from "../pages/RegisterPage";
import Notices from "../pages/Notices";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ClientRoutes.LOGIN}>
          <Login />
        </Route>

        <Route exact path={ClientRoutes.LOGOUT}>
          <Logout />
        </Route>

        <Route exact path={ClientRoutes.NOTICES}>
          <Notices />
        </Route>

        <Route exact path={ClientRoutes.REGISTER}>
          <RegisterPage />
        </Route>
      
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
