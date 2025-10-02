console.log("product site loaded ... ");

const id = new URLSearchParams(window.location.search).get("id");
const productUrl = "https://kea-alt-del.dk/t7/api/products/" + id;
const product_container = document.querySelector(".product_container");

console.log("Product: ", productUrl);

function getData() {
  fetch(productUrl).then((res) => res.json().then((data) => show(data)));
}

function show(data) {
  console.log("Shows data er: ", data);

  product_container.innerHTML = `
  <div class = "${data.soldout === 1 ? "sold_out" : ""}">
 <img class="product_img" src="https://kea-alt-del.dk/t7/images/webp/640/${id}.webp" alt="Grøn taske">
 <p>${data.soldout === 1 ? "Sold out" : ""}</p>
 </div>

        <div>
            <section>
                <h2>Product Information</h2>
                <dl>
                <div>
                    <dt>Model name</dt>
                    <dd>${data.productdisplayname}</dd>
                 </div>
                  <div>
                    <dt>Gender</dt>
                    <dd>${data.gender}</dd>
                 </div>
                  <div>
                    <dt>Inventory number</dt>
                    <dd>${data.id}</dd>
                 </div>
                  <div>
                    <dt>Brand</dt>
                    <dd>${data.brandname}</dd>
                     </div>
                </dl>
        

                    <p class = "price ${data.discount ? "price_discount" : ""}" > DKK ${data.price},-</p>

                    <div class = "${data.discount ? "discount_product" : ""}">
                        <p>${data.discount ? `DKK ${(data.price - data.price * (data.discount / 100)).toFixed(2)},-` : ""}</p>
                        <p>${data.discount ? `${data.discount}%` : ""}</p>
                    </div>

                        
            </section>

            <section>
                <h3>${data.productdisplayname}</h3>
                <p>
                    <span> ${data.articletype} </span> | <span> ${data.brandname} </span>
                </p>
                <form>
                    <label for="size">Choose a size:</label>
                    <select name="size" id="size">
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="xl">XL</option>
                    </select>
                    <button>Add to basket</button>
                </form>

            </section>
        </div>
   `;
}

getData();
