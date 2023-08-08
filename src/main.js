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
    ).then(()=>  {
        updateProducts(0)}
    )
}

// Update carousel display
function updateProducts(direction){
    currentDisplay = (currentDisplay+direction)%products.length
    while(currentDisplay<0){
        currentDisplay += (products.length)
    }


    for (let i = 0; i < 3; i++) {
        currentUpdate = (currentDisplay + i) % products.length
        let product = document.getElementById('product-recommended-'+i)
        product.querySelector('img').src=products[currentUpdate].img
        product.querySelector('#title').textContent=products[currentUpdate].title
        product.querySelector('#price').textContent=products[currentUpdate].price
    }
}

class Product {
    constructor(img, title, price) {
        this.img = img;
        this.title = title;
        this.price = price;
    }
}

const baseURL = 'https://raw.githubusercontent.com/piefyl2/assinement/dev/src/'

// Add default CSS
injectCss(baseURL+'inject.css')

// Add carroussel
let productDetail = document.getElementsByClassName('product-details-info')[0]
let recommendation = document.createElement("div")
injectHTML(baseURL+'inject.html', recommendation)
productDetail.parentNode.insertBefore(recommendation, productDetail.nextSibling)

// add action on keyboards
document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowLeft"){
        updateProducts(1)
    } else if (event.key == "ArrowRight"){
        updateProducts(-1)
    }
 });



let currentDisplay = 0

// Init model
let products = [
new Product('https://demostore.x-cart.com/images/product/clo_1.jpg','Product 1', '1.00 €'),
new Product('https://demostore.x-cart.com/images/product/clo_3.jpg','Product 2', '2.00 €'),
new Product('https://demostore.x-cart.com/images/product/clo_4.jpg','Product 3', '3.00 €'),
new Product('https://demostore.x-cart.com/images/product/clo_5.jpg','Product 4', '4.00 €'),
new Product('https://demostore.x-cart.com/images/product/clo_6.jpg','Product 5', '5.00 €'),
new Product('https://demostore.x-cart.com/images/product/clo_9.jpg','Product 6', '6.00 €')
]