import { firestore as db } from "../../config";
import { Producto, Restaurante } from "../../models/models";

class FetchService {
  public static async fetchRestaurantsByLocalidad(
    localidad: string
  ): Promise<Restaurante[]> {
    const querySnapshot = await db
      .collection("restaurants")
      .where("localidad", "==", localidad)
      .get();
    let docs: any[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists) docs.push(doc.data() as Restaurante);
    });
    return docs;
  }

  public static async fetchRestaurantByTitulo(
    titulo: string
  ): Promise<Restaurante> {
    const querySnapshot = await db
      .collection("restaurants")
      .where("titulo","==",titulo)
      .get();
    let docs: any[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists) docs.push(doc.data() as Restaurante);
    });
    let restaurante: Restaurante = docs.pop();
    return restaurante;
  }

  public static async fetchMenuByRestaurantId(
    id: string
  ): Promise<Producto[]> {
    const subCollection: string = "restaurants/" + id + "/menu"
    const querySnapshot = await db
      .collection(subCollection)
      .get();
    let docs: any[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists) docs.push(doc.data() as Producto);
    });
    return docs;
  }
}

export default FetchService;
