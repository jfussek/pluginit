
// from the MDN tutorial:
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension
document.body.style.border = "5px solid red";

// how to make a change to a particular part of the page
// by finding an existing element and adding another one
const googleLogo = document.querySelectorAll('img[alt="Google"]')[0];
if (googleLogo) {
    const hello = document.createElement('div');
    hello.innerText = 'Hello World!';

    googleLogo.parentNode.appendChild(hello);
}

