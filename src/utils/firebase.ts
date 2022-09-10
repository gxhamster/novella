import { collection, Firestore, onSnapshot } from "firebase/firestore";

// This receives data from firebase and sets it to the related pinia store
export function firebaseSetupSync(
  db: Firestore,
  collection_path: string,
  pinia_store: any,
  pinia_store_set_func_name: string
) {
  const path = collection(db, collection_path);
  const unsubscribe = onSnapshot(path, (querySnapshot) => {
    function getDataFromFirebase() {
      return Promise.resolve().then(() => {
        const data: any[] = [];
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
      } else if (pinia_store.data_fetched && data.length === 0) {
        // If all docs in collection deleted edge case
        pinia_store[pinia_store_set_func_name](data);
        pinia_store["setDataFetched"](true);
      } else {
        pinia_store["setDataFetched"](false);
      }
    });
  });

  return unsubscribe;
}
