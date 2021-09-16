import {
  CircularProgress,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { Producto } from "../../models/models";
import { useParams } from "react-router";
import FetchService from "../../functions/fetch/FetchService";
import CardList from "../List/list";


const RestaurantMenu: React.FC = () => {
  const params:any = useParams();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      setIsLoadingMenu(true);
      const response = await FetchService.fetchRestaurantByTitulo(
        params.titulo as string
      );
      setProductos(response.menu)
      setIsLoadingMenu(false);
    };
    fetchProductos();
  }, [params.titulo]);

  return (
    <Grid container style={{ padding: "1rem 0 10rem 0" }}>
      <Grid item xs={3}></Grid>
      <Grid item style={{ textAlign: "center" }} xs={6}>
        <TextField
          style={{ width: "60%" }}
          id="outlined-basic"
          label="Buscar productos..."
          variant="outlined"
        />
        {isLoadingMenu ? (
          <CircularProgress />
        ) : (
          <CardList lista={productos}/>
        )}
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default RestaurantMenu;
