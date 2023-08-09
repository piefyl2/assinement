const baseURL = 'https://raw.githubusercontent.com/piefyl2/assinement/master-flickity/src/'

// ******** UTILITARY FUNCTIONS **************
// integrate css avoiding CORB
function injectText(file, type){
    return fetch(file, {cache: "no-store"})
    .then((response) => response.text())
    .then((text) => {
      const style = document.createElement(type)
      style.textContent = text
      document.head.append(style)
      eval(style)
      }
    )
}
// integrate css avoiding CORB
function injectCss(file){
    return injectText(file,'style')
}
// integrate js avoiding CORB
function injectJs(file){
    return injectText(file,'script')
}
// integrate html avoiding CORB
function injectHTML(file, after){
    return fetch(file, {cache: "no-store"})
    .then((response) => response.text())
    .then((text) => {
        document.querySelector(after)
                .insertAdjacentHTML("afterend",text);
      }
    )
}

// Function to wait for an element to added in the tree.
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

// ******** MODEL **************
// Product Model.
class Product {
    constructor(url, img, title, price) {
        this.url = url;
        this.img = img;
        this.title = title;
        this.price = price;
    }
}

// ******** CARROUSEL MANAGEMENT **************

// Update products displayed on the carroussel
function updateProducts(){
    let productsElements = document.getElementsByClassName('product-recommended')
    for (let i = 0; i < productsElements.length; i++) {
        let product = productsElements[i]
        if (products[i].url !== undefined)
            product.href = products[i].url
        product.querySelector('img').src=products[i].img
        product.querySelector('#title').textContent=products[i].title
        product.querySelector('#price').textContent=products[i].price
    }
    console.info('Product dislay updated')
}

console.info('Script loaded')

// ******** INSTANTIATION **************
// Carrousel
let flkty

// Product model list
let products = []


// Bypass the library event manager as they only switch with keyboard when the element is on focus
document.addEventListener("keydown", function(event) {
    if (flkty !== undefined) {
    if (event.key == "ArrowLeft"){
        flkty.previous()
    } else if (event.key == "ArrowRight"){
        flkty.next()
    }
    }
});

// Add default CSS
injectCss(baseURL+'inject.css')
console.info('CSS injected')

// Add carroussel template
let productDetail = document.getElementsByClassName('product-details-info')[0]
let recommendation = document.createElement("div")
injectHTML(baseURL+'inject.html', '.product-details-info')
console.info('HTML injected')

console.info('Inject framework')
// Inject library then instantiates it
injectCss('https://unpkg.com/flickity@2.3.0/dist/flickity.min.css')
    .then(() =>injectJs('https://unpkg.com/flickity@2.3.0/dist/flickity.pkgd.min.js'))
    .then(() => waitForElm('.carrousel'))
    .then((elm) => {
        // Make sure that the carousel template has been integrated in the tree
        waitForElm('.product-recommended-title').then((elm) => {
            flkty = new Flickity( document.querySelector('.carrousel'), {
                // options
                wrapAround: true,
                accessibility: false
            });
        })
    })

// Init model with external data then update product list and add actions end display
console.info('Fetch product info')
fetch('https://fakestoreapi.com/products?limit=6', {cache: "no-store"})
            .then(res=>res.json())
            .then(json=> {
                console.info('Product data fetched')
                for (let index = 0; index < json.length; index++) {
                    let fakeproduct = json[index]
                    products[index]=new Product(undefined,fakeproduct.image,fakeproduct.title, fakeproduct.price + ' €')
                }

                console.info('Wait Product update with data loaded')
                waitForElm('.product-recommended-title').then((elm) => {
                    console.info('Product update with data loaded')
                    updateProducts(0)
                });
        })

