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

function run(){
    let productDetail = document.getElementsByClassName('product-details-info')[0]
    let newNode = document.createElement("div");
    newNode.innerHTML = "<div class='product-recommendation-title'></div>";
    newNode.className="product-recommendation"
    productDetail.parentNode.insertBefore(newNode, productDetail.nextSibling);
}

console.log('1')

const baseURL = 'https://raw.githubusercontent.com/piefyl2/assinement/dev/src/'
addCss(baseURL+'inject.css')
run()