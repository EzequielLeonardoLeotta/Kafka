import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "5px"
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#E63939",
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    backgroundColor: "#F9F6F4",
    minHeight: "98.2vh",
  },

  homeContainer: {
    height: "87.5vh",
    backgroundImage:
      "url(https://images.deliveryhero.io/image/pedidosya/home-backgrounds/home-background-ar.jpg?quality=100&width=1345)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },

  homeSearch: {
    margin: "auto",
    width: "45%",
    paddingTop: "20rem",
  },

  loginButton: {
    marginLeft: "auto",
    fontSize: 20,
  },

  footer: {
    textAlign: "center",
    position: "fixed",
    right: 0,
    bottom: 0,
    left: 0,
  },

  grid: {
    textAlign: "center",
    padding: "1rem"
  },

}));

export default useStyles;
