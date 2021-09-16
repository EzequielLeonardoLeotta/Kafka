import {
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Locations, LocationsEnumLabels } from "../../enums/Locations";

const AddressForm: React.FC = () => {
  const [alias, setAlias] = useState("");
  const [calle, setCalle] = useState("");
  const [numeroPuerta, setNumeroPuerta] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [ciudad, setCiudad] = useState(Locations.LOMAS_DE_ZAMORA);
  const [barrio, setBarrio] = useState(Locations.LOMAS_DE_ZAMORA);
  const [telefono, setTelefono] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log({
      alias,
      calle,
      numeroPuerta,
      contraseña,
      ciudad,
      barrio,
      telefono,
    });
    try {
      setIsSubmitting(true);

      //emitir evento para cambiar de step en el wizard
    } catch (error: any) {
      alert("Error: " + error.code + ": " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      style={{
        marginBottom: "1rem",
        justifyContent: "flex-start",
      }}
    >
      <Typography
        variant="h6"
        style={{
          textAlign: "center",
          paddingBottom: "1rem",
        }}
      >
        Agregar direccion
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={(event) => setAlias(event.target.value)}
          id="alias"
          label="alias"
          variant="outlined"
          style={{ width: "100%", paddingBottom: "1rem" }}
        />
        <TextField
          onChange={(event) => setCalle(event.target.value)}
          id="calle"
          label="Calle"
          variant="outlined"
          required
          style={{ width: "100%", paddingBottom: "1rem" }}
        />
        <TextField
          onChange={(event) => setNumeroPuerta(event.target.value)}
          label="Numero de puerta"
          type="numeroPuerta"
          variant="outlined"
          required
          style={{ width: "100%", paddingBottom: "1rem" }}
        />

        <Select
          label="Ciudad"
          onChange={(event: React.ChangeEvent<any>) =>
            setCiudad(event.target.value)
          }
          required
          variant="outlined"
          style={{ width: "100%" }}
          labelId="userType"
          value={ciudad}
          defaultValue={ciudad}
        >
          {Object.values(Locations).map((item) => (
            <MenuItem key={item} value={Locations[item]}>
              {LocationsEnumLabels[item]}
            </MenuItem>
          ))}
        </Select>

        <TextField
          onChange={(event: React.ChangeEvent<any>) =>
            setTelefono(event.target.value)
          }
          label="Telefono"
          type="telefono"
          variant="outlined"
          required
          style={{ width: "100%", paddingBottom: "1rem", marginTop: "1rem" }}
        />
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Button
            disabled={isSubmitting}
            variant="contained"
            color="secondary"
            type="submit"
            style={{ width: "40%" }}
          >
            Agregar direccion
            {isSubmitting && (
              <CircularProgress
                size="1.2rem"
                style={{ marginLeft: "1.1rem" }}
              />
            )}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default AddressForm;
