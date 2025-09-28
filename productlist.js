console.log("Sitet er loaded");
const product_list_container = document.querySelector(".product_list_container");
getData("https://kea-alt-del.dk/t7/api/products");

function getData(url) {
  fetch(url).then((res) => res.json().then((data) => showProducts(data)));
}

function showProducts(products) {
  console.log("Products: ", products);
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
            <p>${product.discount !== null ? `Prev. DKK ${product.price},-` : `DKK ${product.price},-`}</p>
            <div class= ${product.discount !== null ? "discount" : ""}>
                <p>
                ${product.discount !== null ? `Now DKK ${(product.price - product.price * (product.discount / 100)).toFixed(2)},-` : ""}
                </p>
                <p>${product.discount !== null ? `${product.discount}%` : ""}</p>
            </div>
            <a href="/product.html">Read More</a>
        </article>
    
    
    `;
  });
}
