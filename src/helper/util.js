export let listOfGadget = [];
export let colors = [];

export let test = {
  id: "1",
  name: "iPhone 15 Pro",
  brand: "Apple",
  price: 999.99,
  originalPrice: 1099.99,
  rating: 4.8,
  reviews: 3421,
  category: "Smartphones",
  description:
    "The iPhone 15 Pro features a stunning titanium design, the powerful A17 Pro chip, and a customizable Action button. Experience pro-level photography with the advanced camera system and enjoy all-day battery life.",
  sku: "APL-IP15P-128",
  modelNumber: "MU773LL/A",
  releaseDate: "2023-09-22",
  warranty: "1 Year Limited Warranty",
  inStock: true,
  availableColors: [
    "Natural Titanium",
    "Blue Titanium",
    "White Titanium",
    "Black Titanium",
  ],
  colorImages: {
    "Natural Titanium":
      "https://images.unsplash.com/photo-1592286927505-ed0d3a7e9cc8?w=400&q=80",
    "Blue Titanium":
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80",
    "White Titanium":
      "https://images.unsplash.com/photo-1678652197950-57114d835f1d?w=400&q=80",
    "Black Titanium":
      "https://images.unsplash.com/photo-1696446702812-00ebbc1a1ca4?w=400&q=80",
  },
  specs: {
    Display: '6.1" Super Retina XDR',
    Chip: "A17 Pro",
    Storage: "128GB",
    Camera: "48MP Main, 12MP Ultra Wide",
  },
};

export const getData = async () => {
  const data = await fetch("../../PENANSESCALZOZO.json");

  const res = await data.json();

  listOfGadget = res;
};

export const getColors = () => {
  /*listOfGadget.availableColors.forEach((item) => {
    console.log(item);
  });
  */

  listOfGadget.forEach((gadget) => {
    console.log(gadget);
  });
};

export const handleToast = async (setToast, obj) => {
  const toastElem = document.querySelector(".t-wrapper");
  const toastContainer = toastElem.querySelector(".toast-container");

  setToast(obj);
  toastElem.classList.add("in");
  toastElem.style.opacity = 1;

  await new Promise((resolve, reject) => {
    setTimeout(resolve, 3000);
  });

  toastElem.classList.add("out");

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      toastElem.classList.remove("in");
      toastElem.classList.remove("out");
      setToast({ message: "", status: "" });

      resolve();
    }, 2000);
  });
};

export const getDataLocalStorage = (array) => {
  console.log(array);
};

export const getDate = (condition) => {
  const date = new Date();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[date.getMonth()];
  let weekDay = weekday[date.getDay()];
  let dayD = date.getDate();
  let year = date.getFullYear();

  switch (condition) {
    case "day":
      return weekDay;
    case "month":
      return month;
    case "dayD":
      return dayD;
    case "year":
      return year;
    case "full date":
      return `${month} ${dayD}, ${year}`;
    default:
      break;
  }
};

export const getCartSelected = () => {
  let data = JSON.parse(localStorage.getItem("cartSelected")) || [];

  return data.length;
};

export const getTotalCheckOut = () => {
  return JSON.parse(localStorage.getItem("overallPrice"));
};

getCartSelected();

export const getDb = async () => {
  try {
    const data = await fetch("/NEXUS/PENANSESCALZOZO.json");

    const res = await data.json();

    return res;
  } catch (error) {
    return "404";
  }
};

export const findGadget = async (e) => {
  e.stopPropagation();
  e.persist();
  let data = await getDb();

  //console.log("raw data: ");
  //console.log(data);

  const button = e.target.getAttribute("data-id");
  const svg = e.target.closest("button").getAttribute("data-id");

  const id = button || svg;

  const filter = data.find((card) => card.id === id);

  return filter;
};

export const saveCart = (array) => {
  localStorage.setItem("cartExplore", JSON.stringify(array));
  return array;
};

export const setNotificationCount = (arr) => {
  const number = arr.length;
  const isView = arr.filter((gadget) => gadget.isViewed !== true);

  console.log(isView);
  return isView.length;
};

export const handleCartExplore = async (e) => {
  e.stopPropagation();
  e.persist();
  let data = await getDb();

  //console.log("raw data: ");
  //console.log(data);

  const button = e.target.getAttribute("data-id");
  const svg = e.target.closest("button").getAttribute("data-id");

  const id = button || svg;

  const filter = data.find((card) => card.id === id);

  return filter;
};

export const waitLoading = async (callback, bool, sec = 2000) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      callback(bool);
      resolve();
    }, sec);
  });
};

//explore
export const displayData = async (setGadget) => {
  let data = await getDb();

  if (data === "404") return;

  setGadget(data);
};
