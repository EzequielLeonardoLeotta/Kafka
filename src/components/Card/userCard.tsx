import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Button, Grid } from "@material-ui/core";
import { Post } from "../../models/models";
import { firestore } from "../../config";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: 20,
    padding: 15,
    cursor: "pointer",
    justifyContent: "center",
  },
  media: {
    borderRadius: "10%",
    border: "0.5px solid",
    width: "8rem",
    height: "8rem",
  },
  contend: {
    width: "100%",
    height: "auto",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function UserCard({
  apellido,
  nombre,
  email,
  nombreUsuario,
}: any) {
  const classes = useStyles();
  const [seguido, setSeguido] = useState(false);

  const seguirUsuario = async () => {
    setSeguido(true);
    let usuariosSeguidos: Array<string> = []
    
    await firestore
    .collection("users")
    .where("nombreUsuario", "==", localStorage.getItem("FaceUNLa.UserName"))
    .get()
    .then((querySnapshot) => {
      usuariosSeguidos = querySnapshot.docs[0].data().seguidos
      usuariosSeguidos.push(nombreUsuario)
    });

    await firestore
    .collection("users")
    //@ts-ignore
    .doc(localStorage.getItem("FaceUNLa.UserName"))
    .update({
      seguidos: usuariosSeguidos 
    })
    
  };

  return (
    <Card variant="outlined">
      <Grid container direction="row" alignItems="center">
        <Grid container justifyContent="center">
          <CardContent className={classes.contend}>
            <Typography style={{ fontWeight: "bold" }}>
              Usuario: {nombreUsuario}
            </Typography>
            <Typography>Email: {email}</Typography>
            <Typography>Nombre: {nombre}</Typography>
            <Typography>Apellido: {apellido}</Typography>
          </CardContent>
        </Grid>
        <Button 
          onClick={seguirUsuario} 
          disabled={seguido} 
          variant="contained"
          color="secondary"
        >
          Seguir
        </Button>
      </Grid>
    </Card>
  );
}
