import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { MenuItem, Select, Typography } from "@material-ui/core";
import useStyles from "../../styles/styles";
import { Locations, LocationsEnumLabels } from "../../enums/Locations";
import { useHistory } from "react-router";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [search, setSearch] = useState("");

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<any>) => {
    setSearch(event.target.value);
  };

  const history = useHistory();

  const submitSearch = (e: any) => {
    e.preventDefault();
    history.push(`/restaurants/${search}`);
  };

  return (
    <div className={classes.homeContainer}>
      <div className={classes.homeSearch}>
        <Typography
          style={{ textAlign: "center", color: "white", font: "Helvetica" }}
          variant="h4"
        >
          ¡Volá antes de que llegue tu pedido!
        </Typography>
        <div style={{ display: "flex" }}>
          <Select
            variant="outlined"
            style={{ width: "100%", backgroundColor: "#FFF" }}
            value={search}
            onChange={handleChange}
          >
            {Object.values(Locations).map((item) => (
              <MenuItem key={item} value={Locations[item]}>
                {LocationsEnumLabels[item]}
              </MenuItem>
            ))}
          </Select>

          {/* <TextField style={{ width: '100%' }} onChange={(e) => setSearch(e.target.value)} id="outlined-basic" label="Escribi tu dirección" variant="outlined" /> */}
          <Button
            color="secondary"
            style={{
              marginLeft: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
            variant="contained"
            onClick={submitSearch}
          >
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
