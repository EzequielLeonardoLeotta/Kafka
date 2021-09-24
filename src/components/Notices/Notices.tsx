import {
  Button,
  Card,
  Grid,
  Input,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { Post } from "../../models/models";
import useStyles from "../../styles/styles";
import { storage, firestore } from "../../config";
import ItemCard from "../Card/card";
import { firestore as db } from "../../config";
import UserCard from "../Card/userCard";
import { User } from "../../models/User";

const Notices: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    consultarNoticias()
    getUsers()
  },[]);

  const agregarPost = async () => {
    try {
      if (file && titulo && texto) {
        const storageRef = storage.ref();
        //@ts-ignore
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        //Save file on database
        await fileRef.getDownloadURL().then((url: string) => {
          // const collection = firestore.collection("posts");
          const postAux: Post = {
            titulo: titulo,
            imagen: url,
            texto: texto,
            nombreUsuario: localStorage.getItem("FaceUNLa.UserName")
          };

          // setPost(postAux);
          // collection.doc().set({
          //   titulo: titulo,
          //   imagen: url,
          //   texto: texto,
          // });

          // Mandar a Kafka
          console.log(postAux);
          savePost(postAux);
        });
      }
    } catch (error) {
      console.log("Error al subir el archivo");
    } finally {
      // setPost(undefined)
    }
  };

  const savePost = (post: Post) => {
    fetch("http://localhost:9000/post", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
      alert("Post publicado exitosamente");
    });
  };

  const consultarNoticias = () => {
    fetch("http://localhost:9000/post", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  };

  const onFileChange = (e: any) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onload = () => reader.readyState === 2 && setFile(file);
      reader.readAsDataURL(e.target.files[0]);
    } else setFile(null);
  };

  const getUsers = () => {
    setUsers([])

    firestore
      .collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          //@ts-ignore
            setUsers((user) => [
              ...user,
              {
                apellido: data.apellido,
                nombre: data.nombre,
                email: data.email,
                nombreUsuario: data.nombreUsuario,
              },
            ])
        })
      })
  }

  const renderUserCard = (user: any, i: number) => {
    let lista: Array<Object>=[]; 
    if(user.nombreUsuario!==localStorage.getItem("FaceUNLa.UserName")){
      lista.push(
        <UserCard
          key={i}
          email={user.email}
          nombre={user.nombre}
          apellido={user.apellido}
          nombreUsuario={user.nombreUsuario}
        />
      )
    }
    return lista
  }

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
        <br />

        {posts?.length ? (
          posts?.map((post: Post, i: number) => (
            <ItemCard
              // key={i}
              imagen={post.imagen}
              titulo={post.titulo}
              texto={post.texto}
            />
          ))
        ) : (
          <Typography className={classes.root} variant="h5">
            No se encontraron resultados
          </Typography>
        )}
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
          {/* <TextField
            className={classes.root}
            // id="outlined-basic"
            label="Ingrese nombre"
            variant="outlined"
            onChange={(e) => {}}
          /> */}
        </form>
        <br/>
        {users?.length ? (
          users?.map((user: any, i: number) => (
            renderUserCard(user, i)  
          ))
        ) : (
          <Typography className={classes.root} variant="h5">
            No se encontraron resultados
          </Typography>
        )} 
      </Grid>
    </Grid>
  );
};

export default Notices;
