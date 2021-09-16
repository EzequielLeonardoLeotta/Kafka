import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "../AddressForm/AddressForm";
import { Grid } from "@material-ui/core";
import Pedido from "../Pedido/Pedido";
import { PedidoItems } from "../../models/models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  })
);

function getSteps() {
  return ["Dirección de entrega", "Forma de pago", "¡Ultimo paso!"];
}

function getStepContent(stepIndex: number) {
  switch (stepIndex) {
    case 0:
      return <AddressForm />;
    case 1:
      return "Formulario pago";
    case 2:
      return "Verificacion";
    default:
      return "Unknown stepIndex";
  }
}

const Wizard: React.FC = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [pedido] = useState<PedidoItems>(
    localStorage.getItem("PedidosNow.Pedido")
      ? JSON.parse(localStorage.getItem("PedidosNow.Pedido")!)
      : { items: [], restaurante: "" }
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid container style={{ marginTop: "1rem" }}>
      <Grid item xs={12} lg={6}>
        <div
          className={classes.root}
          style={{ width: "80%", marginLeft: "1rem" }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed
                </Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                <div style={{ marginBottom: "10rem" }}>
                  <Button variant="contained" color="secondary" disabled={activeStep === 0} onClick={handleBack}>
                    Volver
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    style={{ float: "right" }}
                  >
                    {activeStep === steps.length - 1
                      ? "Finalizar"
                      : "Siguiente"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Pedido pedido={pedido} />
      </Grid>
    </Grid>
  );
};

export default Wizard;
