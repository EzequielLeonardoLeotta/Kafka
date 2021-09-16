import {
  Button,
  Card,
  CardContent,
  Divider,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import React from "react";
import { PedidoItems } from "../../models/models";

interface PedidoProps {
  pedido?: PedidoItems;
  renderEditButton?: boolean;
  isRestaurantView?: boolean;
}

const Pedido: React.FC<PedidoProps> = ({
  pedido,
  renderEditButton = false,
  isRestaurantView = true,
}) => {
  const calcularSubtotal = () => {
    let subTotal = 0;
    if (pedido) {
      pedido.items.forEach((item) => {
        subTotal += item.cantidad * item.producto.precio;
      });
    }
    return subTotal;
  };

  return (
    <Card style={{ width: "70%" }}>
      <CardContent>
        {pedido && pedido.items.length ? (
          <>
            <Typography style={{ textAlign: "center" }} gutterBottom>
              Mi pedido a: {pedido.restaurante}
            </Typography>
            <Divider />
            {pedido.items.map((item) => (
              <div style={{ margin: "0.5rem" }}>
                <Typography>
                  {isRestaurantView && (
                    <Tooltip title="Eliminar">
                      <Button
                        color="secondary"
                        variant="text"
                        style={{ margin: 0 }}
                        size="small"
                      >
                        X
                      </Button>
                    </Tooltip>
                  )}
                  {item.cantidad} x {item.producto.titulo}
                  <div style={{ float: "right" }}>
                    ${item.cantidad * item.producto.precio}
                  </div>
                </Typography>
              </div>
            ))}
            <Typography style={{ marginTop: "1rem" }}>
              Subtotal:
              <div style={{ float: "right" }}>${calcularSubtotal()}</div>
            </Typography>
            <Divider />
            {isRestaurantView && (
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <Button variant="contained" color="secondary">
                  Terminar Pedido
                </Button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <SearchOutlined style={{ fontSize: "5rem" }} />
            <Typography>Tu pedido está vacío</Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Pedido;
