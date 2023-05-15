var encEmail = "cmVnaXN0cmllcnVuZ0BzdHJlaWsuamV0enQ=";
const mailAnchor = document.getElementById("obfuscate-mail");
mailAnchor.setAttribute("href", "mailto:".concat(atob(encEmail)));