import { Box, Container, Grid, Typography } from "@material-ui/core";
import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer>
      <Box bgcolor="#E63939" color="white">
        <Container>
          <Grid container spacing={5}>
            <Grid item xs={6} sm={3}>
              <Box>Quienes somos</Box>
              <Box>Terminos y Condiciones</Box>
              <Box>Privacidad</Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box>Top comidas</Box>
              <Box>Top restaurantes</Box>
              <Box>Top vendedores</Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box>Registra tu negocio</Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box>Acuerdos corporativos</Box>
            </Grid>
          </Grid>
        </Container>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12}>
            <Typography
              variant="subtitle1"
              color="initial"
              style={{
                paddingTop: "0.9rem",
                fontWeight: 400,
                fontSize: "0.9rem",
              }}
            >
              Copyright © 2021{" "}
              <a 
                style={{color:'white'}}
                target="_blank"
                rel="noreferrer"
                href="https://github.com/Mapach3/pedidos-now"
              >
                Pedidos Now
              </a>
              . All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};

export default Footer;
