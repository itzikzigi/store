const allProductsUrl = "http://localhost:8000/api/products";

const reqData = async (url) => await fetch(url);

const sendData = async (url, method) => await fetch(url, { method: method });

const getData = async (reqData) => {
  let res = await reqData;
  let js = await res.json();
  return js;
};

module.export = { reqData, sendData, getData };
