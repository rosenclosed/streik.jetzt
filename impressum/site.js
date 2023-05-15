var encEmail = "aW1wcmVzc3VtQHN0cmVpay5qZXR6dA==";
const mailAnchor = document.getElementById("obfuscate-mail");
mailAnchor.setAttribute("href", "mailto:".concat(atob(encEmail)));