import {
  AppBar,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router";
import Footer from "../components/Footer/Footer";
import { getMenu } from "../helpers/menu-helper";
import useStyles from "../styles/styles";
import { Link } from "react-router-dom";
import { ClientRoutes } from "../config/enums";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const isMenuOpen = Boolean(anchorEl);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {getMenu().map((item) => (
        <MenuItem key={item.text} onClick={() => history.push(`${item.url}`)}>
          {item.text}
        </MenuItem>
      ))}
      {localStorage.getItem("PedidosNow.JWT") && (
        <MenuItem
          key="Cerrar Sesión"
          onClick={() => history.push(ClientRoutes.LOGOUT)}
        >
          Cerrar Sesión
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          { history.location.pathname!==ClientRoutes.LOGIN &&
          <ArrowBackIcon 
            onClick={()=> history.goBack()}
            style={{ marginRight: "1rem", cursor:"pointer"}}
          />
          }

          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="h5" noWrap>
              PedidosNow
            </Typography>
          </Link>
          <div className={classes.loginButton}>
            {`${localStorage.getItem("PedidosNow.Nombre") || ""} ${
              localStorage.getItem("PedidosNow.Apellido") || ""
            }`}
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
        <div className={classes.footer}>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Layout;
