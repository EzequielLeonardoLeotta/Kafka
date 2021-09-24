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
import { ClientRoutes } from "../../config/enums";
import { useHistory } from "react-router";

const Notices: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [users, setUsers] = useState([]);
  const [seguidos, setSeguidos] = useState([]);

  useEffect(() => {
    consultarNoticias()
    getUsers()
    getSeguidos()
  },[]);

  const history = useHistory();

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
    getSeguidos()
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

  const getSeguidos = async () => {
    setSeguidos([])
    
    await firestore
    .collection("users")
    .where("nombreUsuario", "==", localStorage.getItem("FaceUNLa.UserName"))
    .get()
    .then((querySnapshot) => {
      setSeguidos(querySnapshot.docs[0].data().seguidos) 
    });
  }

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
    //@ts-ignore
    if(user.nombreUsuario!==localStorage.getItem("FaceUNLa.UserName")&&!seguidos.includes(user.nombreUsuario)){
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

  const renderPostCard = (i: number, seguidos: Array<string>, post: Post) => {
    let lista: Array<Object>=[]; 
    //@ts-ignore
    if(seguidos.includes(post.nombreUsuario)){
      lista.push(
        <ItemCard
          // key={i}
          texto={post.texto}
          titulo={post.titulo}
          imagen={post.imagen}
        />
      )
    }
    return lista
  }

  const cerrarSesion = () => {
    localStorage.setItem("FaceUNLa.JWT", "");
    localStorage.setItem("FaceUNLa.UserName", "");
    localStorage.setItem("FaceUNLa.Nombre", "");
    localStorage.setItem("FaceUNLa.Apellido", "");
    localStorage.setItem("FaceUNLa.UserId", "");
    history.push(ClientRoutes.LOGIN);
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
            renderPostCard(i, seguidos, post)
          ))
        ) : (
          <Typography className={classes.root} variant="h5">
            No se encontraron resultados
          </Typography>
        )}
      </Grid>

      <Grid item xs={4} className={classes.grid}>
        <Typography>Bienvenido {localStorage.getItem("FaceUNLa.Nombre")}</Typography>
        <Button
            variant="contained"
            onClick={() => cerrarSesion()}
            color="secondary"
          >
            Cerrar sesión
          </Button>
        <br/>
        <br/>
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
        </form>
        <br/>
        <Typography variant="h2">Buscar personas</Typography>
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
