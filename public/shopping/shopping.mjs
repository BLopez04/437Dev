const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];

/*          <article>
                <img src="https://placehold.co/200x200" alt="Chips" />
                <div class="product-details">
                    <h3>Chips</h3>
                    <p>Delicious.</p>
                    <p class="price">$5</p>
                    <div>
                        <button class="buy-button">Add to cart</button>
                        <span class="num-in-cart">1 in cart</span></div>
                </div>
            </article>
*/

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.src = product.imageSrc;
    img.alt = product.name;
    article.append(img);

    const prod_det_div = document.createElement("div");
    prod_det_div.classList.add("product-details");

    const name = document.createElement("h3");
    name.textContent = product.name;
    prod_det_div.append(name);

    const desc = document.createElement("p");
    desc.textContent = product.description;
    prod_det_div.append(desc)

    const price = document.createElement("p");
    price.classList.add("price");
    price.textContent = `$${product.price}`;
    prod_det_div.append(price)

    const purch_div = document.createElement("div");

    const button = document.createElement("button");
    button.classList.add("buy-button");
    button.textContent = "Add to cart"
    button.addEventListener("click", () => {
        product.numInCart += 1;
        rerenderCart();
        rerenderAllProducts()
    })
    purch_div.append(button)

    if (product.numInCart > 0) {
        const inCart = document.createElement("span");
        inCart.classList.add("num-in-cart");
        inCart.textContent = `${product.numInCart} in cart`
        purch_div.append(inCart)
    }

    prod_det_div.append(purch_div);
    article.append(prod_det_div);

    return article;
}

/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
    /*
    1. remove all <article>s
    2. recreate them using the data in PRODUCTS
    3. modify the re-creation so it uses shouldProductBeVisible() (details are near the bottom of the lab directions)

    You can remove and recreate the heading element if it makes things easier.
     */
    const prod_list = document.querySelector(".product-list");
    prod_list.innerHTML = "";

    const results = document.createElement("h2");
    results.textContent = "Search results"
    prod_list.append(results)

    for (let product of PRODUCTS) {
        if (shouldProductBeVisible(product)) {
            prod_list.append(renderProductCard(product))
        }
    }
}


/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
    /*
    1. remove all card items
    2. recreate them and the remove buttons based off the data in PRODUCTS
     */
    const cart = document.querySelector(".cart-items");
    cart.innerHTML = "";

    for (let product of PRODUCTS) {
        if (product.numInCart > 0) {
            const item = document.createElement("p");
            item.textContent = `${product.name} x${product.numInCart}`;
            cart.append(item);

            const remove = document.createElement("button");
            remove.classList.add("remove-button")
            remove.textContent = "Remove"
            remove.setAttribute("aria-label", `Remove ${product.name} from cart`)
            remove.addEventListener("click", () => {
                product.numInCart -= 1;
                rerenderCart();
                rerenderAllProducts();
            })
            cart.append(remove);
        }
    }
}

const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");

/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
    let allow = true;
    if (minPriceInput.value) {
        allow = allow && (Number.parseFloat(minPriceInput.value) <= product.price);
    }
    if (maxPriceInput.value) {
        allow = allow && (Number.parseFloat(maxPriceInput.value) >= product.price);
    }
    return allow
}

minPriceInput.addEventListener("change", rerenderAllProducts);
maxPriceInput.addEventListener("change", rerenderAllProducts);

rerenderAllProducts();
rerenderCart();