import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Grid } from "@material-ui/core";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';

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

interface props {
  titulo: string;
  texto: string;
  imagen: string;
}

export default function ItemCard({texto, titulo, imagen}: props) {
  const classes = useStyles();
  const [liked, setLiked] = useState(false);
  
  return (
    <Card variant="outlined">
      <Grid container direction="row" alignItems="center">
        <Grid container item xs={4} justify="flex-start">
          <img className={classes.media} src={imagen} alt="No hay foto"/>
        </Grid>

        <Grid container item xs={5}>
          <CardContent className={classes.contend}>
            <Typography style={{fontWeight: 'bold'}}>{titulo}</Typography>
            <Typography>{texto}</Typography>
          </CardContent>
        </Grid>

        <Grid container item xs={1}>
          <div onClick={() => {
              setLiked(!liked)
            }}>
            {liked ? <ThumbUpAltRoundedIcon/> : <ThumbUpAltOutlinedIcon/>}
          </div>
        </Grid>

      </Grid>
    </Card>
  );
}
