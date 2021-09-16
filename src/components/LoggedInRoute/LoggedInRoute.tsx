import React from "react";
import { Redirect, Route } from "react-router";
import { ClientRoutes } from "../../config/enums";

interface LoggedInRouteProps {
  path: string;
  exact?: boolean;
}

const LoggedInRoute: React.FC<LoggedInRouteProps> = ({
  path,
  exact = false,
  children,
}) => {
  const isLoggedIn = !!localStorage.getItem("PedidosNow.JWT");

  if (!isLoggedIn) {
    return <Redirect to={ClientRoutes.LOGIN} />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
};

export default LoggedInRoute;
