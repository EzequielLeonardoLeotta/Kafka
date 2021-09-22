import { storage, firestore } from '../../config'

export const saveFile = async (file: any, titulo: string, texto: string) => {
  //Save file on storage
  const storageRef = storage.ref()
  const fileRef = storageRef.child(file.name)
  await fileRef.put(file)
  //Save file on database
  await fileRef.getDownloadURL().then((url: string) => {
    const collection = firestore.collection('posts')
    collection.doc().set({
      titulo: titulo,
      imagen: url,
      texto: texto,
    })
  })
}

