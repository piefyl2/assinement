# assinement

Usage:

```
let scriptUrl = "https://raw.githubusercontent.com/piefyl2/assinement/flickidity/src/main.js" 
fetch(scriptUrl, {cache: "no-store"})
  .then((response) => response.text())
  .then((text) => eval(text))
```