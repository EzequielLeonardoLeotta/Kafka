import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: 20,
    padding: 15,
    cursor: "pointer",
    justifyContent: "center"
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

export default function UserCard({apellido, nombre, email, nombreUsuario}: any) {
  const classes = useStyles();

  return (
    <Card variant="outlined">
      <Grid container direction="row" alignItems="center">
        <Grid container justify="center" >
          <CardContent className={classes.contend}>
            <Typography style={{fontWeight: 'bold'}}>Usuario: {nombreUsuario}</Typography>
            <Typography>Email: {email}</Typography>
            <Typography>Nombre: {`${apellido} ${nombre}`}</Typography>
          </CardContent>
        </Grid>

      </Grid>
    </Card>
  );
}
