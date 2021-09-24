import {
  Button,
  CircularProgress,
  Container,
  Link,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../../config";
import { ClientRoutes } from "../../config/enums";
import { UsersService } from "../../fetch/UsersService";

const Register: React.FC = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [seguidos, setSeguidos] = useState([]);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = useHistory();

  const createTopics = (nombreUsuario: string) => {
    fetch("http://localhost:9000/createTopic", {
      method: "POST",
      body: JSON.stringify({nombreUsuario: nombreUsuario}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);

      await auth.createUserWithEmailAndPassword(email, contraseña);

      const seguidos: Array<string> = []

      await UsersService.postUserToCollection({
        nombreUsuario,
        nombre,
        apellido,
        email,
        seguidos,
      });
      
      // createTopics(nombreUsuario)

      const currentUser = auth.currentUser;
      localStorage.setItem(
        "FaceUNLa.JWT",
        (await currentUser?.getIdToken()) || ""
      );
      localStorage.setItem("FaceUNLa.UserName", nombreUsuario);
      localStorage.setItem("FaceUNLa.Nombre", nombre);
      localStorage.setItem("FaceUNLa.Apellido", apellido);
      localStorage.setItem("FaceUNLa.UserId", auth.currentUser?.uid || "");

      setOpen(true);
      setTimeout(() => {
        history.push(ClientRoutes.NOTICES);
      }, 3000);
    } catch (error: any) {
      alert("Error: " + error.code + ": " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm" style={{ padding: "1rem" }}>
      <Typography
        variant="h6"
        style={{
          textAlign: "center",
          paddingBottom: "1rem",
        }}
      >
        ¡Registrate para ser parte de esta red social!
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={(event) => setNombre(event.target.value)}
          id="nombre"
          label="Nombre"
          variant="outlined"
          required
          style={{ width: "100%", paddingBottom: "1rem" }}
        />
        <TextField
          onChange={(event) => setApellido(event.target.value)}
          id="apellido"
          label="Apellido"
          variant="outlined"
          required
          style={{ width: "100%", paddingBottom: "1rem" }}
        />
        <TextField
          onChange={(event) => setNombreUsuario(event.target.value)}
          id="nombreUsuarui"
          label="Nombre de Usuario"
          variant="outlined"
          required
          style={{ width: "100%", paddingBottom: "1rem" }}
        />
        <TextField
          onChange={(event) => setEmail(event.target.value)}
          label="Email"
          type="email"
          variant="outlined"
          required
          style={{ width: "100%", paddingBottom: "1rem" }}
        />
        <TextField
          onChange={(event) => setContraseña(event.target.value)}
          label="Contraseña"
          type="password"
          variant="outlined"
          required
          style={{ width: "100%", paddingBottom: "1rem" }}
        />
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Button
            disabled={isSubmitting}
            variant="contained"
            color="secondary"
            type="submit"
            style={{ width: "40%" }}
          >
            Enviar
            {isSubmitting && (
              <CircularProgress
                size="1.2rem"
                style={{ marginLeft: "1.1rem" }}
              />
            )}
          </Button>
        </div>
        <Typography style={{ textAlign: "center", paddingTop: "15px" }}>
          Ya tenes una cuenta? <Link href={ClientRoutes.LOGIN}>Ingresar</Link>
        </Typography>
      </form>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert color="success" severity="success" variant="filled">
          ¡Te registraste correctamente!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
