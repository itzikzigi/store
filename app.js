const allProductsUrl = "https://store-project-0q4y.onrender.com/api/products";

const reqData = async (url) => await fetch(url);

const sendData = async (url, method) => await fetch(url, { method: method });

const getData = async (reqData) => {
  let res = await reqData;
  let js = await res.json();
  return js;
};

const createElement = (
  type = "div",
  className = null,
  id = null,
  text = ""
) => {
  let element = document.createElement(type);
  element.classList = className;
  element.id = id;
  element.innerText = text;
  return element;
};

const HOME_PAGE = document.getElementById("home");

const main = createElement("div", "main");
HOME_PAGE.appendChild(main);

const createCardBottomButtons = (card) => {
  const cardBottomButtonsCont = createElement(
    "div",
    "cardBottom",
    "cardBottomCont"
  );
  card.appendChild(cardBottomButtonsCont);

  const deleteButton = createElement(
    "button",
    "small material-icons del",
    card.id,
    "delete"
  );
  cardBottomButtonsCont.appendChild(deleteButton);

  const editButton = createElement(
    "button",
    "small material-icons edit",
    null,
    "edit"
  );
  cardBottomButtonsCont.appendChild(editButton);

  return cardBottomButtonsCont;
};

const createCardMiddleButtons = (card, obj) => {
  const middleButtonsCont = createElement("div", "middleCardButtons", obj.id);
  card.appendChild(middleButtonsCont);

  const add1Button = createElement("button", "add1-button", obj.id, "+1");
  middleButtonsCont.appendChild(add1Button);

  const quantityTag = createElement(
    "span",
    "quantity-tag",
    obj.id,
    obj.quantity
  );
  middleButtonsCont.appendChild(quantityTag);

  const reduce1Button = createElement("button", "reduce1-button", obj.id, "-1");
  middleButtonsCont.appendChild(reduce1Button);
  changeQuantity(middleButtonsCont, quantityTag);
  return middleButtonsCont;
};

const createCardTitle = (card, text) => {
  const title = createElement("span", "card-title", null, text);
  card.appendChild(title);
  return title;
};

const createImageDiv = (card, image, alt) => {
  const imageBackDiv = createElement("div", "img-back");
  card.appendChild(imageBackDiv);
  const imgElement = createElement("img");
  imgElement.src = image;
  imgElement.alt = alt;
  imgElement.className = "card-image";
  imageBackDiv.appendChild(imgElement);
  return imageBackDiv;
};

const createCard = (tab, obj) => {
  const cardDiv = createElement("div", obj.category, obj.id);
  cardDiv.className = `${obj.category} product-card dblock`;
  tab.appendChild(cardDiv);
  createImageDiv(cardDiv, obj.image, obj.title);
  createCardTitle(cardDiv, obj.title);
  createCardMiddleButtons(cardDiv, obj);
  createCardBottomButtons(cardDiv);
  return cardDiv;
};

const createCardsContainer = (main) => {
  const back = createElement("div", "main-back");
  main.appendChild(back);

  const mainTitle = createElement("h1", null, "main-title", "Products");
  back.appendChild(mainTitle);

  const cardsContainer = createElement("div", "cards", "cards-cont");
  back.appendChild(cardsContainer);

  return cardsContainer;
};

const createNavbar = (main) => {
  const navBar = createElement("nav", "navBar");
  main.appendChild(navBar);

  const navButtonsDiv = createElement("div", "navButtons", "navButtonsDiv");
  navBar.appendChild(navButtonsDiv);

  const allProductsButton = createElement(
    "button",
    "filter-buttons",
    "all-products",
    "All Products"
  );
  navButtonsDiv.appendChild(allProductsButton);

  const menFilterButton = createElement(
    "button",
    "filter-buttons",
    "men's clothing",
    "men's clothing"
  );
  navButtonsDiv.appendChild(menFilterButton);

  const womenFilterButton = createElement(
    "button",
    "filter-buttons",
    "women's clothing",
    "women's clothing"
  );
  navButtonsDiv.appendChild(womenFilterButton);

  const jeweleryFilterButton = createElement(
    "button",
    "filter-buttons",
    "jewelery",
    "jewelery"
  );
  navButtonsDiv.appendChild(jeweleryFilterButton);

  const electronicFilterButton = createElement(
    "button",
    "filter-buttons",
    "electronics",
    "Electronics"
  );
  navButtonsDiv.appendChild(electronicFilterButton);

  const searchDiv = createElement("div", "search", "search-div");
  navBar.appendChild(searchDiv);

  const searchInput = createElement("input", "search", "searchInput");
  searchInput.placeholder = "search";
  searchDiv.appendChild(searchInput);

  const searchButton = createElement(
    "button",
    "small material-icons search ",
    "searchButton",
    "search"
  );
  searchDiv.appendChild(searchButton);
  return navBar;
};

const homePageLoad = async (main) => {
  createNavbar(main);
  const cardsDiv = createCardsContainer(main);
  request = await reqData(allProductsUrl);
  data = await getData(request);
  if (Array.isArray(data) === true) {
    data.forEach((obj) => createCard(cardsDiv, obj));
  } else createCard(cardsDiv, data);
  return cardsDiv;
};

homePageLoad(main);
const cards = document.getElementById("cards-cont");

const filterEvent = () => {
  addEventListener("click", (e) => {
    if (e.target.className.includes("filter-buttons"))
      return filterFn(e.target);
  });
};

const filterFn = (button) => {
  let temp = cards.children;
  if (button.id !== "all-products") {
    for (el of temp) {
      if (
        el.className.includes(button.id) &&
        el.className.includes("dnone") &&
        !el.className.includes("dblock")
      ) {
        el.className = el.className.replace("dnone", "dblock");
      }

      if (
        !el.className.includes(button.id) &&
        !el.className.includes("dnone")
      ) {
        el.className = el.className.replace("dblock", "dnone");
      }
    }
  }
  if (button.id == "all-products") {
    for (el of temp) {
      if (el.className.includes("dnone") && !el.className.includes("dblock")) {
        el.className = el.className.replace("dnone", "dblock");
      }
    }
  }
};
filterEvent();

const searchEvent = () => {
  addEventListener("click", (e) => {
    if (e.target.id === "searchButton") {
      return searchFunc();
    }
  });
};
const searchFunc = () => {
  const inputEL = document.getElementById("searchInput");
  for (el of cards.children) {
    el.className = el.className.replace("dnone", "dblock");
    if (!el.innerText.toLowerCase().includes(inputEL.value)) {
      el.classList = el.className.replace("dblock", "dnone");
    }
  }
};
searchEvent();

const deleteEvent = () => {
  addEventListener("click", async (e) => {
    if (e.target.className.includes("del")) {
      console.log("delete");
      let s = await sendData(
        `${allProductsUrl}/${e.target.id}/delete`,
        "DELETE"
      );
      cards.removeChild(document.getElementById(e.target.id));
    }
  });
};
deleteEvent();

const changeQuantity = (button, quantity) => {
  button.addEventListener("click", (e) => {
    if (e.target.className.includes("add1-button")) {
      quantity.innerText++;
      return sendData(`${allProductsUrl}/${e.target.id}/+`, "PUT");
    }

    if (e.target.className.includes("reduce1-button")) {
      if (quantity.innerText >= 1) quantity.innerText--;
      return sendData(`${allProductsUrl}/${e.target.id}/-`, "PUT");
    }
  });
};
changeQuantity();
