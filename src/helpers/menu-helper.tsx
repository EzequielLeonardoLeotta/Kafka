export const getMenu = () => {
  const notLoggedMenu = [
    {
      text: "Login",
      url: "/login",
    },
    {
      text: "Registrarse",
      url: "/register",
    },
  ];

  const loggedInMenu = [
    {
      text: "Perfil",
      url: "/profile",
    },
  ];

  if (typeof window !== "undefined") {
    const userTypeAux = localStorage.getItem("PedidosNow.UserType");

    return userTypeAux
      ? userTypeAux === "CLIENTE"
        ? loggedInMenu
        : notLoggedMenu
      : notLoggedMenu;
  }

  return notLoggedMenu;
};
