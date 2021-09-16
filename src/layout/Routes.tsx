import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoggedInRoute from "../components/LoggedInRoute/LoggedInRoute";
import NotFoundPage from "../components/NotFound/NotFoundPage";
import { ClientRoutes } from "../config/enums";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import RestaurantMenuPage from "../pages/RestaurantMenuPage";
import RestaurantsPage from "../pages/RestaurantsPage";
import WizardPage from "../pages/WizardPage";
import Notices from "../pages/Notices";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/*Public routes not requiring Login*/}

        <Route exact path={ClientRoutes.LOGIN}>
          <Login />
        </Route>

        <Route exact path={ClientRoutes.LOGOUT}>
          <Logout />
        </Route>

        <Route exact path={ClientRoutes.NOTICES}>
          <Notices />
        </Route>

        <Route exact path={ClientRoutes.RESTAURANTS}>
          <RestaurantsPage />
        </Route>

        <Route exact path={ClientRoutes.REGISTER}>
          <RegisterPage />
        </Route>

        <Route exact path={ClientRoutes.RESTAURANT_MENU}>
          <RestaurantMenuPage />
        </Route>

        {/* LoggedInRoute requiring route, otherwise Redirects to Login */}
        <LoggedInRoute exact path={ClientRoutes.PROFILE}>
          <ProfilePage />
        </LoggedInRoute>

        
        <Route exact path={ClientRoutes.WIZARD}>
          <WizardPage />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
