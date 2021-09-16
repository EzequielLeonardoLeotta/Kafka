import React from "react";
import { Route } from "react-router-dom";
import Restaurants from "../components/Restaurants/Restaurants";
import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const RestaurantsPage: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.RESTAURANTS}>
      <Layout>
        <Restaurants />
      </Layout>
    </Route>
  );
};

export default RestaurantsPage;
