import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
export class Storage {
  async uploadFile(file, folder, fileName) {
    try {
      const storage = getStorage();
      const fileRef = ref(storage, `${folder}/${fileName}`);
      return await uploadBytes(fileRef, file);
    } catch (error) {
      throw error;
    }
  }
  async getURLFile(pathFile) {
    try {
      const storage = getStorage();
      const fileRef = ref(storage, pathFile);
      return await getDownloadURL(fileRef);
    } catch (error) {
      throw error;
    }
  }
}
