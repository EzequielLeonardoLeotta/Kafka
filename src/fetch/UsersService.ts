import app, { firestore as db } from "../config";
import { User } from "../models/User";

const users = db.collection("users");

export class UsersService {
  static async fetchUserByEmail(email: string) {
    const query = await users.where("email", "==", email).get();

    if (!query.empty) {
      return query.docs[0];
    }
    return undefined;
  }

  static async emailAlreadyExists(email: string) {
    const result = await UsersService.fetchUserByEmail(email);
    return result !== undefined;
  }

  static async postUserToCollection(user: User) {
    await users.doc(user.nombreUsuario).set(user);
  }

  static async signOutUser() {
    await app.auth().signOut();
    localStorage.removeItem("FaceUNLa.JWT");
    localStorage.removeItem("FaceUNLa.UserName");
    localStorage.removeItem("FaceUNLa.Nombre");
    localStorage.removeItem("FaceUNLa.Apellido");
    localStorage.removeItem("FaceUNLa.UserId");
  }
}
