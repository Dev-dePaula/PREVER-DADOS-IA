const products = [

    {
        id: 1,
        name: "Apple AirPods Pro 2",
        category: "Eletrônicos",
        store: "Amazon",
        oldPrice: 2399.90,
        price: 1699.90,
        score: 94,
        icon: "fa-headphones"
    },

    {
        id: 2,
        name: "SSD Kingston NV2 1TB",
        category: "Informática",
        store: "KaBuM!",
        oldPrice: 499.90,
        price: 289.90,
        score: 97,
        icon: "fa-hard-drive"
    },

    {
        id: 3,
        name: "Smart TV Samsung 55\"",
        category: "Eletrônicos",
        store: "Mercado Livre",
        oldPrice: 3499.90,
        price: 2599.90,
        score: 89,
        icon: "fa-tv"
    },

    {
        id: 4,
        name: "Echo Dot 5ª geração",
        category: "Eletrônicos",
        store: "Amazon",
        oldPrice: 599.90,
        price: 349.90,
        score: 96,
        icon: "fa-microphone"
    },

    {
        id: 5,
        name: "Monitor LG UltraGear 27\"",
        category: "Informática",
        store: "Magalu",
        oldPrice: 1899.90,
        price: 1299.90,
        score: 91,
        icon: "fa-desktop"
    },

    {
        id: 6,
        name: "Air Fryer Philips Walita",
        category: "Casa",
        store: "Mercado Livre",
        oldPrice: 899.90,
        price: 549.90,
        score: 88,
        icon: "fa-blender"
    }

];


let selectedProduct = null;

let published = 63;


/* ================================
   FORMAT MONEY
================================ */

function money(value) {

    return value.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* ================================
   DISCOUNT
================================ */

function discount(oldPrice, price) {

    return Math.round(
        ((oldPrice - price) / oldPrice) * 100
    );

}


/* ================================
   RENDER PRODUCTS
================================ */

function renderProducts() {

    const table =
        document.getElementById("productsTable");

    const store =
        document.getElementById("storeFilter").value;

    const category =
        document.getElementById("categoryFilter").value;


    let filtered = products.filter(product => {

        const storeMatch =
            store === "all" ||
            product.store === store;

        const categoryMatch =
            category === "all" ||
            product.category === category;

        return storeMatch && categoryMatch;

    });


    table.innerHTML = "";


    filtered.forEach(product => {

        const disc =
            discount(
                product.oldPrice,
                product.price
            );


        const hot =
            disc >= 25 &&
            product.score >= 85;


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="product-name">

                    <div class="product-image">

                        <i class="fa-solid ${product.icon}"></i>

                    </div>

                    <div>

                        <strong>
                            ${product.name}
                        </strong>

                        <small>
                            ${product.category}
                        </small>

                    </div>

                </div>

            </td>


            <td>
                ${product.store}
            </td>


            <td>

                <span class="old-price">

                    ${money(product.oldPrice)}

                </span>

            </td>


            <td>

                <span class="current-price">

                    ${money(product.price)}

                </span>

            </td>


            <td>

                <span class="discount">

                    -${disc}%

                </span>

            </td>


            <td>

                <span class="score">

                    ${product.score}

                </span>

            </td>


            <td>

                <span class="badge ${hot ? "badge-hot" : "badge-monitor"}">

                    ${hot ? "🔥 OFERTA" : "MONITORANDO"}

                </span>

            </td>


            <td>

                <button
                    class="action-button"
                    onclick="openTelegram(${product.id})"
                    title="Publicar no Telegram"
                >

                    <i class="fa-brands fa-telegram"></i>

                </button>

            </td>

        `;


        table.appendChild(row);

    });

}


/* ================================
   PROMOTIONS
================================ */

function renderPromotions() {

    const grid =
        document.getElementById("promotionsGrid");

    grid.innerHTML = "";


    products

        .filter(product => {

            return discount(
                product.oldPrice,
                product.price
            ) >= 25;

        })

        .forEach(product => {

            const disc =
                discount(
                    product.oldPrice,
                    product.price
                );


            grid.innerHTML += `

                <div class="promotion">

                    <div class="discount-big">

                        -${disc}%

                    </div>

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.store}
                    </p>

                    <p>
                        De ${money(product.oldPrice)}
                        por
                        <strong>
                            ${money(product.price)}
                        </strong>
                    </p>

                </div>

            `;

        });

}


/* ================================
   ACTIVITY
================================ */

function renderActivity() {

    const list =
        document.getElementById("activityList");


    list.innerHTML = `

        <div class="activity">

            <div class="activity-icon">

                <i class="fa-solid fa-tag"></i>

            </div>

            <div>

                <strong>
                    Nova promoção detectada
                </strong>

                <small>
                    AirPods Pro 2 • há 2 minutos
                </small>

            </div>

        </div>


        <div class="activity">

            <div class="activity-icon">

                <i class="fa-brands fa-telegram"></i>

            </div>

            <div>

                <strong>
                    Oferta publicada no Telegram
                </strong>

                <small>
                    SSD Kingston NV2 • há 7 minutos
                </small>

            </div>

        </div>


        <div class="activity">

            <div class="activity-icon">

                <i class="fa-solid fa-arrow-down"></i>

            </div>

            <div>

                <strong>
                    Preço reduzido
                </strong>

                <small>
                    Smart TV Samsung • há 11 minutos
                </small>

            </div>

        </div>

    `;

}


/* ================================
   TELEGRAM MODAL
================================ */

function openTelegram(id = null) {

    if (id) {

        selectedProduct =
            products.find(
                product => product.id === id
            );

    } else {

        selectedProduct = products[0];

    }


    const disc =
        discount(
            selectedProduct.oldPrice,
            selectedProduct.price
        );


    const preview =
        document.getElementById(
            "telegramPreview"
        );


    preview.innerHTML = `

        🔥 <strong>OFERTA IMPERDÍVEL!</strong>

        <br><br>

        🛍️ <strong>
            ${selectedProduct.name}
        </strong>

        <br><br>

        ❌ De:
        <s>
            ${money(selectedProduct.oldPrice)}
        </s>

        <br>

        💰 Por:
        <strong>
            ${money(selectedProduct.price)}
        </strong>

        <br>

        🔥 <strong>
            ${disc}% OFF
        </strong>

        <br><br>

        👉 Confira a oferta:

        <br>

        🔗 https://seulinkdeafiliado.com/oferta

        <br><br>

        ⚡ Aproveite enquanto durar o estoque!

    `;


    document
        .getElementById("telegramModal")
        .classList.add("show");

}


function closeTelegram() {

    document
        .getElementById("telegramModal")
        .classList.remove("show");

}


/* ================================
   PUBLISH
================================ */

function publishTelegram() {

    published++;

    document
        .getElementById("totalPublished")
        .textContent = published;


    closeTelegram();


    showToast(
        "Oferta publicada no Telegram com sucesso!"
    );


    addActivity(
        "Oferta publicada automaticamente",
        selectedProduct.name
    );

}


/* ================================
   ACTIVITY ADD
================================ */

function addActivity(title, subtitle) {

    const list =
        document.getElementById("activityList");


    const item =
        document.createElement("div");


    item.className = "activity";


    item.innerHTML = `

        <div class="activity-icon">

            <i class="fa-brands fa-telegram"></i>

        </div>

        <div>

            <strong>
                ${title}
            </strong>

            <small>
                ${subtitle} • agora
            </small>

        </div>

    `;


    list.prepend(item);

}


/* ================================
   TOAST
================================ */

function showToast(message) {

    const toast =
        document.createElement("div");


    toast.style.position = "fixed";
    toast.style.right = "25px";
    toast.style.bottom = "25px";
    toast.style.background = "#101828";
    toast.style.color = "white";
    toast.style.padding = "13px 18px";
    toast.style.borderRadius = "8px";
    toast.style.fontSize = "12px";
    toast.style.zIndex = "100";


    toast.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        ${message}
    `;


    document.body.appendChild(toast);


    setTimeout(() => {

        toast.remove();

    }, 3500);

}


/* ================================
   NAVIGATION
================================ */

document
    .querySelectorAll("nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                event.preventDefault();


                document
                    .querySelectorAll("nav a")
                    .forEach(item =>
                        item.classList.remove("active")
                    );


                this.classList.add("active");


                document
                    .querySelectorAll(".page")
                    .forEach(page =>
                        page.classList.remove("active-page")
                    );


                const page =
                    document.getElementById(
                        this.dataset.page
                    );


                page.classList.add("active-page");


                document
                    .getElementById("pageTitle")
                    .textContent =
                    this.textContent.trim();

            }
        );

    });


/* ================================
   FILTERS
================================ */

document
    .getElementById("storeFilter")
    .addEventListener(
        "change",
        renderProducts
    );


document
    .getElementById("categoryFilter")
    .addEventListener(
        "change",
        renderProducts
    );


/* ================================
   ADD PRODUCT
================================ */

function addProduct() {

    showToast(
        "Módulo de cadastro de produtos aberto."
    );

}


/* ================================
   SIMULATE LIVE MONITOR
================================ */

setInterval(() => {

    const random =
        products[
            Math.floor(
                Math.random() * products.length
            )
        ];


    if (Math.random() > .6) {

        random.price =
            random.price -
            Math.floor(Math.random() * 20);


        renderProducts();

        renderPromotions();

        document
            .getElementById("totalPromotions")
            .textContent =
            87 +
            Math.floor(Math.random() * 10);

    }

}, 5000);


/* ================================
   INITIALIZE
================================ */

renderProducts();

renderPromotions();

renderActivity();