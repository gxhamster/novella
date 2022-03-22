import { collection, onSnapshot } from "firebase/firestore";

export function firebaseSetupSync(
  db,
  collection_path,
  pinia_store,
  pinia_store_set_func_name
) {
  const path = collection(db, collection_path);
  const unsubscribe = onSnapshot(path, (querySnapshot) => {
    function getDataFromFirebase() {
      return Promise.resolve().then(() => {
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;
      });
    }
    let data = [];
    getDataFromFirebase().then((arr) => {
      data = arr;
      if (data.length != 0) {
        pinia_store[pinia_store_set_func_name](data);
        pinia_store["setDataFetched"](true);
        console.log(collection_path);
      } else {
        pinia_store["setDataFetched"](false);
      }
    });
  });

  return unsubscribe;
}
