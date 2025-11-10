import React, { useState } from "react";
import search from "../assets/icons/search.svg";
import filterIcon from "../assets/icons/filter.svg";
import chevron from "../assets/icons/chevron-down.svg";
import close from "../assets/icons/x.svg";
import { displayData, getDb, test } from "../helper/util";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleUp,
  faChevronDown,
  faChevronUp,
  faClose,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

function Search({ setGadget, setLoading, setFound, gadgets }) {
  const [raw, setRawData] = useState([]);
  const [state, setSate] = useState("search");
  const [keyword, SetKeyWord] = useState("");
  const [category, setCategory] = useState([]);
  const [cat, setCat] = useState([]);
  const [brand, setBrand] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter1, setFilter1] = useState([]);
  const [items, setItem] = useState([
    { id: 1, value: "Apple" },
    { id: 2, value: "Banana" },
    { id: 3, value: "Orange" },
    { id: 4, value: "Mango" },
  ]);

  const [data, setData] = useState([]);
  // const [visible, setVisible] = useState(false);

  const handleActive = (e) => {
    const body = document.querySelector("body");
    const elem = e.target.closest(".filter");

    const trigger = document.querySelector(".trigger");
    const search = document.querySelector(".search-box");

    /*
    if (elem.classList.contains("active")) {
      console.log(elem);

      return;
      search.classList.add("active");
      elem.classList.remove("active");
      console.log("close this and open search");

      return;
    }

    if (trigger.classList.contains("trigger")) {
      elem.classList.add("active");

      search.classList.remove("active");

      return;
    }

    content.classList.add("active");
    */

    const content = document.querySelector(".content");

    if (e.target.parentElement.matches(".trigger")) {
      const filter = document.querySelector(".filter");

      // console.log(content);

      !content.classList.contains("active") &&
      !filter.classList.contains("active")
        ? setSate("filter")
        : setSate("search");
    }

    const button = e.target;
    const img = e.target;

    button.parentElement.matches("button") && img.classList.contains(".close")
      ? setSate("search")
      : content.classList.remove("active");

    //if () {}

    return;
    console.log(e.target.parentElement.nextElementSibling);

    const dropdown = document.querySelector(".dropdown");

    if (dropdown) {
      const content = e.target.parentElement.nextElementSibling;

      content.classList.toggle("active");
    }
  };

  const handleClick = (e) => {
    const content = document.querySelector(".content");

    if (state == "filter" && !content.classList.contains("active")) {
      content.classList.add("active");
    } else {
      content.classList.remove("active");
    }

    return;

    const img = document.querySelector(".search img");

    console.log(img);

    return;
    const body = document.querySelector("body");

    if (img.matches("img").classList.contains(".close")) {
      setSate("search");
      content.classList.remove("active");
    }
  };

  const getData = async (value) => {
    const data = await fetch("/PENANSESCALZOZO.json");
    const res = await data.json();

    setData(res);
    const filter = res.filter((g) => g.name.toLowerCase().includes(value));

    console.log(filter);

    setGadget(filter);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    display();
  }, []);

  let sort = [];
  let displaySort = [];
  let sortData = [];

  const originalData = () => {
    console.log(getData);

    //setGadget();
  };

  const listsOfGadget = async () => {
    let data = await fetch("/PENANSESCALZOZO.json");
    let res = await data.json();

    return await res;
  };

  let cleanProduct = [];

  const handleCheck = async (e) => {
    const selected = e.target.id;
    let originalList = (await listsOfGadget()) || [];

    const filter = originalList.filter((gadget) => {
      return gadget.category === selected || gadget.brand === selected;
    });

    filter.forEach((gadget) => {
      const id = gadget.id;

      // if (cleanProduct) {}

      const checkDuplication = cleanProduct.find((sort) => sort.id === id);

      if (checkDuplication) {
        console.log("Caategory Already wxisr  ");

        return;
      }

      // if () {}

      cleanProduct.push(gadget);
    });

    console.log(cleanProduct);

    // console.log(filter);

    //setGadget([]);

    return;
    sort.push(e.target.id);

    if (!e.target.checked) {
      sort = sort.filter((c) => c != text);
    }

    // const displaySort = data.res

    let gadgets = await fetch("/PENANSESCALZOZO.json");
    let res = await gadgets.json();

    const f = res.filter(
      (e) => sort.includes(e.category) || sort.includes(e.brand)
    );
    // const b = res.filter((b) => sort.includes(b.brand));

    let isExist = false;

    /*
    f.forEach((gadget) => {
      let exist = sortData.find((data) =>
        data.category.includes(gadget.category)
      );

      if (exist) {
        console.log("alredy exist");
        isExist = true;
        return;
      }

      isExist = false;

      // console.log(sortData.find((data) => data.category == gadget.category));
    });

    b.forEach((gadget) => {
      console.log(gadget);

      let exist = sortData.find((data) => data.brand.includes(gadget.brand));

      if (exist) {
        console.log("alredy exist");
        isExist = true;
        return;
      }

      isExist = false;
      // console.log(sortData.find((data) => data.category == gadget.brand));
    });
    */

    if (isExist) return;

    sortData.push(...f);
    sortData.push(...b);
  };

  const handleSortClick = async () => {
    const content = document.querySelector(".content");
    document
      .querySelectorAll('input[type="checkbox"]')
      .forEach((input) => (input.checked = false));

    setSate("search");
    content.classList.remove("active");

    /*
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
    */

    const searchBar = document.querySelector('input[type="search"]');
    setLoading(true);

    searchBar.value = "";
    setFound(true);
    await setGadget(cleanProduct);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const display = async () => {
    const data = await fetch("/PENANSESCALZOZO.json");
    const res = await data.json();

    let cat = [];
    let brand = [];

    res.forEach((gad) => {
      /*
      if (!category.name.includes(gad.category)) {
        setCategory((prev) => ({
          ...prev,
          name: [...prev.name, gad.category],
        }));
      }

      if (!category.brand.includes(gad.brand)) {
        console.log(gad.brand);
        setCategory((prev) => ({
          ...prev,
          brand: [...prev.brand, gad.brand],
        }));
      }
      */

      if (cat.includes(gad.category)) {
        return;
      }

      cat.push(gad.category);
    });

    res.forEach((gad) => {
      if (brand.includes(gad.brand)) return;
      brand.push(gad.brand);
    });

    // console.log(brand);

    // console.log(cat);

    setCat(cat);
    setBrand(brand);

    setData(res);
  };

  const delay = (res, time) => {
    setTimeout(() => {
      setLoading(res);
    }, time);
  };

  const displayCategory = async () => {
    let get = await getDb();
    setRawData(get);

    const getme = "sihisis";

    // const caterg = Object.values();
  };

  let rawCategory = [];

  useEffect(() => {
    let cats = [];

    raw.forEach((gadget) => {
      if (cats.includes(gadget.category)) {
        return;
      }

      cats.push(gadget.category);
    });

    setCategory(cats);
    rawCategory = cats;
  }, [raw]);

  const [rawCat, setRawCat] = useState([]);

  useEffect(() => {
    const renderElem = async () => {
      const categorySet = await getDb();
      const getCategory = [...new Set(categorySet.map((cat) => cat.category))];

      setForDropDown(getCategory);
    };

    renderElem();
    displayData(setRawData);
  }, []);

  const [selectCatnew, setForSelected] = useState([]);

  useEffect(() => {
    return;
    console.log(rawCat);

    console.log();

    const select = document.getElementById("dropdown");
    select.innerHTML = `<option value="">Select an item</option>`;

    rawCat.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.value;

      select.appendChild(option);
    });
  }, [rawCat]);

  useEffect(() => {}, [selectCatnew]);

  const handleSearch = async (e) => {
    const key = e.target.value.trim().toLowerCase();

    if (key.length == 0) {
      console.log("display all kay empty");

      setFound(true);

      // getData(raw);

      setGadget(raw);

      return;
    }

    if (key.length < 3) {
      console.log("Enter at least 4 character");
      return;
    }

    let findProduct = raw.filter(
      (gadget) =>
        gadget.name.trim().toLowerCase().includes(key) ||
        gadget.brand.trim().toLowerCase().includes(key) ||
        gadget.category.trim().toLowerCase().includes(key)
    );

    console.log(findProduct.length);

    if (findProduct.length == 0) {
      console.log("no product");
      setFound(false);
      return;
    }

    // name,brand,category,model,specs

    if (findProduct) {
      setFound(true);

      setLoading(true);
      setGadget(findProduct);

      delay(false, 1000);
    }
  };

  const searchFilter = (e) => {
    console.log(e.target.value.toLowerCase());
    const value = e.target.value.toLowerCase();

    const filter = filter1.filter((item) =>
      item.value.toLowerCase().includes(value)
    );

    setFilter1(filter);

    if (e.target.value.length == 0) {
      setFilter1(items);
    }

    console.log(filter);
  };

  const [remain, setRemain] = useState([]);
  const [exist, setExist] = useState([]);
  const [forDropDown, setForDropDown] = useState([]);

  const searchFilterDrop = async (e) => {
    e.stopPropagation();
    const remain = forDropDown;

    const input = e.target.value.toLowerCase();
    let searchResult = [];

    if (input.length >= 2) {
      const filter = forDropDown.filter((item) =>
        item.toLowerCase().includes(e.target.value.toLowerCase())
      );

      searchResult = filter;
    } else {
      let originalCat = await getDb();

      const cat = originalCat.map((item) => item.category);

      const removeDuplicate = [
        ...new Set(originalCat.map((item) => item.category)),
      ];

      const isExist = removeDuplicate.filter(
        (cat) => !recentSearch.includes(cat)
      );

      setForDropDown(isExist);

      console.log(isExist);

      return;
      if (e.target.value.length <= 0) {
        const categorySet = await getDb();
        const getCategory = [
          ...new Set(categorySet.map((cat) => cat.category)),
        ];

        searchResult = getCategory;
        return;
      }

      searchResult = forDropDown;
    }

    setForDropDown(searchResult);
    console.log(forDropDown);

    //    setRawCat(filter);

    return;
    if (e.target.value.length == 0) {
      displayCategory();

      console.log(exist);

      console.log(category);
    }
  };

  useEffect(() => {
    // console.log(category);
    // console.log(exist);
    const filter = category;
  }, [category]);

  const [recentSearch, setRecentSearch] = useState([]);
  const [dropdownOpen, setDropDown] = useState(false);
  const [search, setSearch] = useState([]);

  const handleSelect = async (e) => {
    e.stopPropagation();
    const value = e.target.textContent;

    if (recentSearch.includes(value)) return;

    const keys = [value, ...recentSearch];

    setRecentSearch(keys);

    const rawItems = await getDb();
    const filterItems = rawItems.filter((item) => keys.includes(item.category));
    const remove = forDropDown.filter((cat) => cat !== value);

    console.log("raw item: ", rawItems);
    console.log("result", filterItems);
    console.log("not selected", remove);

    setForDropDown(remove);
    setSearch(filterItems);
    setGadget(filterItems);
    return;

    const selected = document.querySelector(".selected");

    const newElem = document.createElement("li");

    //newElem.textContent = value;
    //selected.appendChild(newElem);

    const categorySet = await getDb();
    const getCategory = [...new Set(categorySet.map((cat) => cat.category))];

    const result = rawCat.filter((cat) => cat !== value);

    const selectedCat = getCategory.filter((cat) => !result.includes(cat));
    setRawCat(result);
    setForSelected(selectedCat);

    console.log(result);
    console.log(selectedCat);

    return;
    setExist((prev) => [...prev, value]);

    setCategory((prev) => {
      const result = prev.filter((item) => item !== value);

      setRemain(category);
      return result;
    });
  };

  useEffect(() => {
    console.log("recent Search: ", recentSearch);
  }, [recentSearch]);

  useEffect(() => {
    const elem = document.querySelector(".dropdown-box");

    if (dropdownOpen) {
      elem.classList.add("open");
    } else {
      elem.classList.remove("open");
    }
  }, [dropdownOpen]);

  const handleDrop = (e) => {
    const elem = e.target.closest(".dropdown-box");
    const box = e.target.closest("li");
    const cats = e.target.closest(".cats");

    if (
      e.target.matches("input") ||
      e.target.matches(".cats") ||
      e.target.matches("ul") ||
      cats
    )
      return;
    if (box && dropdownOpen) {
      console.log("duhudhd");
      elem.classList.add("open");
      setDropDown(true);
    }

    console.log(e.target.matches(".cats"));

    //const box = e.target.closest("li");

    if (box) return;

    setDropDown(true);

    elem.classList.toggle("open");
  };

  const filterSearch = (e) => {
    if (search.length <= 0) {
      return;
    }

    console.log(search);

    setGadget(search);
    setDropDown(false);
  };

  const removeSearch = async (e) => {
    e.stopPropagation();
    const elem = e.target.closest("button");

    const body = document.querySelector("body");

    const item = elem.getAttribute("data-item");

    console.log(item);

    const remove = [...forDropDown, item];

    setForDropDown(remove);
    let raw = await getDb();

    if (recentSearch.includes(item)) {
      console.log("remove", item);

      const result = recentSearch.filter((cat) => cat !== item);

      setRecentSearch(result);

      console.log(result);

      const storeSearchItem = raw.filter((gadget) =>
        result.includes(gadget.category)
      );

      setSearch(storeSearchItem);
      setGadget(storeSearchItem);
      if (storeSearchItem.length <= 0) {
        setGadget(raw);
      }
    }

    console.log(recentSearch.length);

    console.log(item);
  };

  return (
    <div className="search filter">
      <div className="search-box">
        <input
          type="search"
          placeholder="Search Category, Brand, Gadget"
          onChange={handleSearch}
        />
        <FontAwesomeIcon icon={faSearch} />
      </div>

      <div className="flex-dropdown">
        <div className={`dropdown-box`} onClick={(e) => handleDrop(e)}>
          <h4>Filter by Category</h4>

          <div className="hide-elem">
            <div className="cats">
              <div className="search-drop">
                <input
                  type="text"
                  placeholder="Enter a gadget"
                  onChange={(e) => searchFilterDrop(e)}
                />
              </div>
              <ul className="selected">
                {recentSearch.map((item, i) => (
                  <li key={i}>
                    <div>{item}</div>
                    <button onClick={(e) => removeSearch(e)} data-item={item}>
                      <FontAwesomeIcon icon={faClose} />
                    </button>
                  </li>
                ))}
              </ul>

              <h4>Categories</h4>
              <ul className="dropdown">
                {forDropDown.map((list, i) => (
                  <li key={i} onClick={(e) => handleSelect(e)}>
                    {list}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <FontAwesomeIcon icon={!dropdownOpen ? faChevronUp : faChevronDown} />
        </div>
        <button className="trigger" onClick={() => filterSearch()}>
          filter
        </button>
      </div>

      {/* <div className={state == "filter" ? "filter active" : "filter"}>
        <button className="trigger" onClick={(e) => handleActive(e)}>
          <img
            className={state == "filter" ? "close" : "filter"}
            src={state == "filter" ? close : filterIcon}
            alt=""
          />
        </button>

        <div className="dropdown" onClick={(e) => handleClick(e)}>
          <h3>Filter Gadget</h3>
          <img src={chevron} alt="" />
        </div>
      </div>

      <div className="content">
        <div className="box">
          <h3>Category</h3>

          <ul className="hide">
            {cat.map((name, i) => (
              <li key={name}>
                <div>
                  <input onChange={handleCheck} type="checkbox" id={name} />
                </div>
                <label htmlFor={name}>{name}</label>
              </li>
            ))}
          </ul>
        </div>

        <div className="box">
          <h3>Brand</h3>
          <ul>
            {brand.map((brand, i) => (
              <li key={brand}>
                <div>
                  <input onChange={handleCheck} type="checkbox" id={brand} />
                </div>
                <label htmlFor={brand}>{brand}</label>
              </li>
            ))}
          </ul>
        </div>
        <div className="btn-wrapper">
          <button onClick={handleSortClick}>Filter</button>
        </div>
      </div> */}
    </div>
  );
}

export default Search;
