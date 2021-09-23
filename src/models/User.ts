export interface User {
  nombreUsuario: string;
  nombre: string;
  apellido: string;
  email: string;
  seguidos?: Array<string>
}
