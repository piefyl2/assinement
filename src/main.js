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

function injectHTML(file, div){
    fetch(file, {cache: "no-store"})
    .then((response) => response.text())
    .then((text) => {
        div.innerHTML = text
      }
    )
}

console.log('V4')

const baseURL = 'https://raw.githubusercontent.com/piefyl2/assinement/dev/src/'
injectCss(baseURL+'inject.css')

let productDetail = document.getElementsByClassName('product-details-info')[0]
let recommendation = document.createElement("div");
injectHTML(baseURL+'inject.html', recommendation)

productDetail.parentNode.insertBefore(recommendation, productDetail.nextSibling);