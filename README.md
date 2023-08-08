# assinement

Usage:

'''
eval(`<script src="" type="text/javascript"`>)
fetch("https://raw.githubusercontent.com/piefyl2/assinement/dev/src/main.js")
  .then((response) => response.text())
  .then((text) => eval(text))
  .then(() => {
    /* Now you can use the script */
  })

let scriptUrl = "https://raw.githubusercontent.com/piefyl2/assinement/dev/src/main.js"

const script = document.createElement("script")
script.type = "text/javascript"
script.src = scriptUrl
document.head.appendChild(script)

eval(script)

run()
'''