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
        updateProducts(0)
        document.getElementById('arrow-right').onclick = previous
        document.getElementById('arrow-left').onclick = next
      }
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
        product.href = products[currentUpdate].url
        product.querySelector('img').src=products[currentUpdate].img
        product.querySelector('#title').textContent=products[currentUpdate].title
        product.querySelector('#price').textContent=products[currentUpdate].price
    }
}

function next(){
    updateProducts(1)
}

function previous(){
    updateProducts(-1)
}

class Product {
    constructor(url, img, title, price) {
        this.url = url;
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

// add actions
document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowLeft"){
        next()
    } else if (event.key == "ArrowRight"){
        previous()
    }
 });

let currentDisplay = 0

// Init model

fetch('https://fakestoreapi.com/products?limit=6')
            .then(res=>res.json())
            .then(json=> {
                for (let index = 0; index < json.length; index++) {
                    let fakeproduct = json[index]
                    products[index]=new Product('https://demostore.x-cart.com/',fakeproduct.image,fakeproduct.title, fakeproduct.price + ' €')
                }
                updateProducts(0)
        })

let products = [
new Product('https://demostore.x-cart.com/','https://demostore.x-cart.com/images/product/clo_1.jpg','Product 1', '1.00 €'),
new Product('https://demostore.x-cart.com/','https://demostore.x-cart.com/images/product/clo_3.jpg','Product 2', '2.00 €'),
new Product('https://demostore.x-cart.com/','https://demostore.x-cart.com/images/product/clo_4.jpg','Product 3', '3.00 €'),
new Product('https://demostore.x-cart.com/','https://demostore.x-cart.com/images/product/clo_5.jpg','Product 4', '4.00 €'),
new Product('https://demostore.x-cart.com/','https://demostore.x-cart.com/images/product/clo_6.jpg','Product 5', '5.00 €'),
new Product('https://demostore.x-cart.com/','https://demostore.x-cart.com/images/product/clo_9.jpg','Product 6', '6.00 €')
]