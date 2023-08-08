function run(){
    let productDetail = document.getElementsByClassName('product-details-info')[0]
    let newNode = document.createElement("div");
    newNode.innerHTML = "It's a Javascript book";
    newNode.className="product-recommendation"
    productDetail.parentNode.insertBefore(newNode, productDetail.nextSibling);
}

console.log('1')

const baseURL = 'https://raw.githubusercontent.com/piefyl2/assinement/dev/src/'
// integrate css avoiding CORB
fetch(baseURL+'inject.css', {cache: "no-store"})
  .then((response) => response.text())
  .then((text) => {
    const style = document.createElement('style');
    style.textContent = text;
    document.head.append(style);
    eval(style)
    }
  )


document.getElementsByTagName('head')[0].insertAdjacentHTML(
    'beforeend',
    '<link rel="stylesheet" href="'+ />');
run()