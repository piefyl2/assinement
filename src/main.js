// integrate css avoiding CORB
function addCss(file){
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

function createArrow(){
    let arrow = document.createElement("div");
    arrow.className="arrow"
    arrow.innerHTML = '<div class="center">'+arrow+'</div>'
}

function createProduct(name){
    let product = document.createElement("div");
    product.className="product-recommended"
    product.innerHTML = '<div class="center">'+name+'</div>'
}

function createCarrousel(nbProductToDisplay){
    let carrousel = document.createElement("div");
    carrousel.className="carrousel"

    carrousel.parentNode.append(createArrow('&lt;'));
    for (let product = 0; product < nbProductToDisplay; product++) {
        carrousel.parentNode.append(createproduct('Product '+product));
    }
    carrousel.parentNode.append(createArrow('&gt;'));
}

function createRecommendation(){
    let newNode = document.createElement("div");
    newNode.innerHTML = "<div class='product-recommendation-title'>You may also like:</div>";
    newNode.className="product-recommendation"

    let carrousel = document.createElement("div");
    newNode.append(createCarrousel(3));
    
}

console.log('V3')

const baseURL = 'https://raw.githubusercontent.com/piefyl2/assinement/dev/src/'
addCss(baseURL+'inject.css')


let productDetail = document.getElementsByClassName('product-details-info')[0]
productDetail.parentNode.insertBefore(createRecommendation(), productDetail.nextSibling);