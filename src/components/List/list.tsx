import {makeStyles, Typography } from "@material-ui/core";
import Card from "../../components/Card/card";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 50,
  },
}));

interface props {
  url: string;
  titulo: string;
  descripcion: string;
  verMenu?: any;
  precio?: number;
}

interface CardListProps{
  lista: any[];
  verMenu?: any;
}

const CardList: React.FC<CardListProps> = ({lista, verMenu}) => {
  const classes = useStyles();

  return (
    <>
      {lista?.length ? lista?.map((rest) => (
            <Card 
              verMenu={verMenu}
              key={rest.id}
              url={rest.url}
              titulo={rest.titulo}
              descripcion={rest.descripcion}
              precio={rest.precio}
            />
      )): <Typography className={classes.root} variant="h5">No se encontraron resultados</Typography>}
    </>
  );
}

export default CardList;