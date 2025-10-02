console.log("Sitet er loaded");
const product_list_container = document.querySelector(".product_list_container");
const category_h2 = document.querySelector(".category_h2");
const category = new URLSearchParams(window.location.search).get("category");
const url = `https://kea-alt-del.dk/t7/api/products?limit=100&category=${category}`;
let allData;

function getData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allData = data;
      showProducts(allData);
    });
}

getData(url);

//////////////
////Filter////
//////////////

document.querySelectorAll(".buttons button").forEach((btn) => {
  btn.addEventListener("click", filterKlik);
});

function filterKlik(evt) {
  document.querySelectorAll(".buttons button").forEach((btn) => {
    btn.classList.remove("active");
  });
  evt.currentTarget.classList.add("active");
  showFiltered(evt.currentTarget.dataset.season);
  console.log(evt.currentTarget.dataset.season);
}

function showFiltered(filter) {
  console.log("hej", filter);
  if (filter === "All") {
    showProducts(allData);
  } else {
    const filterSeasonArr = allData.filter((product) => product.season === filter);
    showProducts(filterSeasonArr);
    console.log("Mit filter Array", filterSeasonArr);
  }
  console.log("ShowFiltered", filter);
  console.log(allData.filter((product) => product.season === filter));
}

//////////////
////Sorted////
//////////////

document.querySelectorAll(".sortButtons button").forEach((knap) => {
  knap.addEventListener("click", sortButtonKlik);
});
let sortDir;
function sortButtonKlik(evt) {
  document.querySelectorAll(".sortButtons button").forEach((knap) => {
    knap.style.background = "rgb(240, 236, 236)";
  });
  evt.currentTarget.style.background = "#7a958f";
  sortDir = evt.currentTarget.dataset.direction;
  showProducts(allData);
}

function showProducts(products) {
  product_list_container.innerHTML = "";
  console.log("sortDir", sortDir);
  if (sortDir) {
    products.sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      }
    });
    if (sortDir === "desc") {
      products.reverse();
    }
  }

  console.log("Products: ", products);
  category_h2.innerHTML = `
   <h2 class="productlist_h2">${category}</h2>
  `;

  products.forEach((product) => {
    console.log(product.productdisplayname);
    product_list_container.innerHTML += `
            <article class="cards">
            <div class = "${product.soldout === 1 ? "sold_out" : ""}">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Grøn taske">
            <p>${product.soldout === 1 ? "Sold out" : ""}</p>
            </div>
            <h3>${product.productdisplayname}</h3>
            <p class="product_cat">
                <span> ${product.articletype} </span> | <span> ${product.brandname} </span>
            </p>
            <p>${product.discount ? `Prev. DKK ${product.price},-` : `DKK ${product.price},-`}</p>
            <div class= ${product.discount ? "discount" : ""}>
                <p>
                ${product.discount ? `Now DKK ${(product.price - product.price * (product.discount / 100)).toFixed(2)},-` : ""}
                </p>
                <p>${product.discount ? `${product.discount}%` : ""}</p>
            </div>
            <a href="/product.html?id=${product.id}">Read More</a>
        </article>
    
    
    `;
  });
}
