const baseURL = 'https://raw.githubusercontent.com/piefyl2/assinement/dev/src/'

// integrate css avoiding CORB
function injectCss(file){
    fetch(file, {cache: "no-store"})
    .then((response) => response.text())
    .then((text) => {
      const style = document.createElement('style');
      style.textContent = text;
      document.head.append(style);
      eval(style)
      }
    )
}
// integrate html avoiding CORB
function injectHTML(file, div){
    fetch(file, {cache: "no-store"})
    .then((response) => response.text())
    .then((text) => {
        div.innerHTML = text
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


    for (let i = 0; i < 3; i++) {
        currentUpdate = (currentDisplay + i) % products.length
        let product = document.getElementById('product-recommended-'+i)
        if (products[currentUpdate].url !== undefined){
            product.href = products[currentUpdate].url
        }
        product.querySelector('img').src=products[currentUpdate].img
        product.querySelector('#title').textContent=products[currentUpdate].title
        product.querySelector('#price').textContent=products[currentUpdate].price
    }
    console.info('Product dislay updated')
}

function next(){
    updateProducts(1)
}

function previous(){
    updateProducts(-1)
}

console.info('Script loaded')
// Add default CSS
injectCss(baseURL+'inject.css')
console.info('CSS injected')

// Add carroussel
let productDetail = document.getElementsByClassName('product-details-info')[0]
let recommendation = document.createElement("div")
injectHTML(baseURL+'inject.html', recommendation)
productDetail.parentNode.insertBefore(recommendation, productDetail.nextSibling)
console.info('Recommendation injected')

 // Position of the current poduct displayed
 let currentDisplay = 0
 let products = []

// Init model then update product list and add actions end display
fetch('https://fakestoreapi.com/products?limit=6')
            .then(res=>res.json())
            .then(json=> {
                console.info('Product data loaded')
                for (let index = 0; index < json.length; index++) {
                    let fakeproduct = json[index]
                    // Data does not provide url, so we will keep the ones we hardcoded.
                    products[index]=new Product(undefined,fakeproduct.image,fakeproduct.title, fakeproduct.price + ' €')
                }

                waitForElm('#product-recommended-0').then((elm) => {
                    updateProducts(0)

                    document.getElementById('arrow-right').onclick = previous
                    document.getElementById('arrow-left').onclick = next

                    // add actions
                    document.addEventListener("keydown", function(event) {
                        if (event.key == "ArrowLeft"){
                            next()
                        } else if (event.key == "ArrowRight"){
                            previous()
                        }
                    });
                    document.getElementsByClassName('product-recommendation')[0].display='block'
                });
                 
        })
        

