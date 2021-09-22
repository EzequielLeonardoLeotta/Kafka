import { Button, Grid, Input, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { Post } from "../../models/models";
import FetchService from "../../functions/fetch/FetchService";
import CardList from "../List/list";
import useStyles from "../../styles/styles";
import { storage, firestore } from "../../config";

const Notices: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post>();
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");

  // useEffect(() => {
  //   const fetchProductos = async () => {
  //     setIsLoadingMenu(true);
  //     const response = await FetchService.fetchRestaurantByTitulo(
  //       params.titulo as string
  //     );
  //     setProductos(response.menu)
  //     setIsLoadingMenu(false);
  //   };
  //   fetchProductos();
  // }, [params.titulo]);

  const agregarPost = async () => {
    try {
      if (file && titulo && texto) {
        const storageRef = storage.ref();
        //@ts-ignore
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        //Save file on database
        await fileRef.getDownloadURL().then((url: string) => {
          const collection = firestore.collection("posts");
          const postAux: Post = {
            titulo: titulo,
            imagen: url,
            texto: texto,
          };
          setPost(postAux);
          collection.doc().set({
            titulo: titulo,
            imagen: url,
            texto: texto,
          });
        });
        // Mandar a Kafka
        savePost()
      }
    } catch (error) {
      console.log("Error al subir el archivo");
    }
  };

  const savePost = () => {
    fetch("http://localhost:9000/post", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => console.log(response))
  }

  const consultarNoticias = () => {
    fetch("http://localhost:9000/post", { method: "GET" })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const onFileChange = (e: any) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onload = () => reader.readyState === 2 && setFile(file);
      reader.readAsDataURL(e.target.files[0]);
    } else setFile(null);
  };

  return (
    <Grid container>
      <Grid item xs={8} className={classes.grid}>
        <Typography variant="h2">Noticias</Typography>
        <br />
        <Button
          variant="contained"
          onClick={() => consultarNoticias()}
          color="secondary"
        >
          Consultar noticias
        </Button>
      </Grid>

      <Grid item xs={4} className={classes.grid}>
        {/* Agregar post, buscar personas */}
        <Typography variant="h2">Agregar post</Typography>
        <form noValidate autoComplete="off">
          <br />
          <TextField
            className={classes.root}
            // id="outlined-basic"
            label="Ingrese título"
            variant="outlined"
            onChange={(e) => setTitulo(e.target.value)}
          />
          <br />
          <Input
            className={classes.root}
            type="file"
            onChange={(e) => onFileChange(e)}
            inputProps={{
              accept: ".png, .jpg, .bmp",
            }}
          />
          <br />
          <TextField
            className={classes.root}
            // id="outlined-basic"
            label="Ingrese texto"
            variant="outlined"
            onChange={(e) => setTexto(e.target.value)}
          />
          <br />
          <Button
            variant="contained"
            onClick={() => agregarPost()}
            color="secondary"
          >
            Subir post
          </Button>
          <br />
          <br />
        </form>
        <Typography variant="h2">Buscar personas</Typography>
        <form noValidate autoComplete="off">
          <br />
          <TextField
            className={classes.root}
            // id="outlined-basic"
            label="Ingrese nombre"
            variant="outlined"
            onChange={(e) => setTitulo(e.target.value)}
          />
        </form>
      </Grid>
    </Grid>
  );
};

export default Notices;
