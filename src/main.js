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

class Product {
    constructor(img, title, price) {
        this.img = img;
        this.title = title;
        this.price = price;
    }
}

console.log('V4')

const baseURL = 'https://raw.githubusercontent.com/piefyl2/assinement/dev/src/'

// Add default CSS
injectCss(baseURL+'inject.css')

// Add carroussel
let productDetail = document.getElementsByClassName('product-details-info')[0]
let recommendation = document.createElement("div")
injectHTML(baseURL+'inject.html', recommendation)
productDetail.parentNode.insertBefore(recommendation, productDetail.nextSibling)

let currentDisplay = 0

// Init model
let products = []
for (let product = 0; product < 6; product++) {
    products[product] = new Product('https://demostore.x-cart.com/images/product/clo_'+product+'.jpg','Product '+product, product+'.00 €')
}

// First update
function updateProducts(products, firstDisplay){
    for (let i = 0; i < 3; i++) {
        currentUpdate = firstDisplay + i
        let product = document.getElementById('product-recommended-'+id)
        product.getElementsByTagName('img')[0].src=products[currentUpdate].title
        product.getElementById('title').src=products[currentUpdate].price
    }
}

updateProducts(products, currentDisplay)