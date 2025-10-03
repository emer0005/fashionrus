console.log("Sitet er loaded");
const category_list_container = document.querySelector(".category_list_container");

getData("https://kea-alt-del.dk/t7/api/categories");

function getData(url) {
  fetch(url).then((res) => res.json().then((data) => showProducts(data)));
}

function showProducts(categoires) {
  console.log("categoires: ", categoires);
  categoires.forEach((category) => {
    console.log(category.category);
    category_list_container.innerHTML += `
        <a href="productlist.html?category=${category.category}">${category.category}</a>

      
      `;
  });
}
