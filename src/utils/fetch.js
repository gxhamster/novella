import { unref } from "vue";

export async function useFetch(url, local_store_key) {
  let response = {};
  let data = {};
  try {
    response = await fetch(unref(url));
    data = await response.json();
  } catch (error) {
    console.error(`👀 Cannot get data ${error}`);
    data = localStorage.getItem(local_store_key);
    if (data === "null") {
      console.error(`👎 Local data is empty`);
    } else {
      data = JSON.parse(data);
    }
  }
  return data;
}

export async function setFetchData(
  url,
  local_store_key,
  pinia_store,
  pinia_store_set_func_name
) {
  let loading = true;
  let failed = false;
  let data = await useFetch(url, local_store_key);
  if (data !== "null") {
    localStorage.setItem(local_store_key, JSON.stringify(data));
    pinia_store[pinia_store_set_func_name](data);
    pinia_store["setDataFetched"](true);
    loading = false;
  } else {
    pinia_store["setDataFetched"](false);
    failed = true;
  }
  return { loading, failed };
}
