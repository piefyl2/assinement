const baseURL = 'https://raw.githubusercontent.com/piefyl2/assinement/flickity/src/'

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
    fetch(file, {cache: "no-store"})
    .then((response) => response.text())
    .then((text) => {
        document.querySelector(after)
                .insertAdjacentHTML("afterend",text);
      }
    )
}

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

class Product {
    constructor(url, img, title, price) {
        this.url = url;
        this.img = img;
        this.title = title;
        this.price = price;
    }
}


// Update products displayed on the caroussel
function updateProducts(direction){
    currentDisplay = (currentDisplay+direction)%products.length
    while(currentDisplay<0){
        currentDisplay += (products.length)
    }


    let productsElements = document.getElementsByClassName('product-recommended')
    for (let i = 0; i < productsElements.length; i++) {
        currentUpdate = (currentDisplay + i) % products.length
        let product = productsElements[i]
        product.href = products[currentUpdate].url
        product.querySelector('img').src=products[currentUpdate].img
        product.querySelector('#title').textContent=products[currentUpdate].title
        product.querySelector('#price').textContent=products[currentUpdate].price
    }
    console.info('Product dislay updated')
}

console.info('Script loaded')

let flkty

document.addEventListener("keydown", function(event) {
    if (flkty !== undefined) {
    if (event.key == "ArrowLeft"){
        flkty.previous()
    } else if (event.key == "ArrowRight"){
        flkty.next()
    }
    }
});

console.info('Inject framework')
injectCss('https://unpkg.com/flickity@2.3.0/dist/flickity.min.css')
    .then(() =>injectJs('https://unpkg.com/flickity@2.3.0/dist/flickity.pkgd.min.js'))
    .then(() => waitForElm('.carrousel'))
    .then((elm) => {
        waitForElm('.product-recommended-title').then((elm) => {
            flkty = new Flickity( document.querySelector('.carrousel'), {
                // options
                wrapAround: true,
                accessibility: false
            });
        })
    })
    

// Add default CSS
injectCss(baseURL+'inject.css')
console.info('CSS injected')

// Add carroussel
let productDetail = document.getElementsByClassName('product-details-info')[0]
let recommendation = document.createElement("div")
injectHTML(baseURL+'inject.html', '.product-details-info')
console.info('HTML injected')

 let products = []

// Init model then update product list and add actions end display
console.info('Fetch product info')
fetch('https://fakestoreapi.com/products?limit=6')
            .then(res=>res.json())
            .then(json=> {
                console.info('Product data fetched')
                for (let index = 0; index < json.length; index++) {
                    let fakeproduct = json[index]
                    products[index]=new Product('https://demostore.x-cart.com/',fakeproduct.image,fakeproduct.title, fakeproduct.price + ' €')
                }

                console.info('Wait Product update with data loaded')
                waitForElm('.product-recommended-title').then((elm) => {
                    console.info('Product update with data loaded')
                    updateProducts(0)
                });
        })

