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
        console.log(el.className);
      }
    }
  }
};
filterEvent();
