import React from "react";
import { Route } from "react-router-dom";
import RestaurantMenu from "../components/RestaurantMenu/RestaurantMenu";
import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const RestaurantMenuPage: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.RESTAURANT_MENU}>
      <Layout>
        <RestaurantMenu />
      </Layout>
    </Route>
  );
};

export default RestaurantMenuPage;
