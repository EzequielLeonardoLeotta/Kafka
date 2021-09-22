import {
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ClientRoutes } from "../config/enums";
import { UsersService } from "../fetch/UsersService";


const Logout: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    const logout = async () => {
      try {
        await UsersService.signOutUser();
        setLogoutSuccess(true);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    logout();
  });

  return (
      <Container
        component="main"
        maxWidth="xs"
        style={{ padding: "1rem 0 10rem 0", textAlign: "center" }}
      >
        {logoutSuccess && (
          <>
            <Typography>Tu sesión se cerró correctamente</Typography>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: "1rem" }}
              onClick={() => history.push(ClientRoutes.LOGIN)}
            >
              Ir a la pantalla principal
            </Button>
          </>
        )}
        {isLoading && (
          <div style={{ display: "block" }}>
            <Typography>Cerrando sesión...</Typography>
            <CircularProgress />
          </div>
        )}
        {error && <Typography>Hubo un error: {error}</Typography>}
      </Container>
  );
};
export default Logout;
