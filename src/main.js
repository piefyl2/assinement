function run(){
    let productDetail = document.getElementsByClassName('product-details-info')[0]
    let newNode = document.createElement("div");
    newNode.innerHTML = "It's a Javascript book";
    newNode.className="product-recommendation"
    productDetail.parentNode.insertBefore(newNode, productDetail.nextSibling);
}

console.log('1')

const baseURL = 'https://raw.githubusercontent.com/piefyl2/assinement/dev/src/'
// integrate css
document.getElementsByTagName('head')[0].insertAdjacentHTML(
    'beforeend',
    '<link rel="stylesheet" href="'+baseURL+'inject.css" />');
run()