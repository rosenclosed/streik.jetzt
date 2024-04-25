const registerForm = $("#registeringform");

const fullNameInput = $("#fullname");
const orgNameInput = $("#orgname");
const postStreetInput = $("#poststreet");
const postZipInput = $("#postzipcode");
const postCityInput = $("#postcity");
const postCountryInput = $("#postcountry");
const contactEmailInput = $("#contactemail");
const contactPhoneInput = $("#contactphone");
const contactFaxInput = $("#contactfax");
const chosenSubdomainInput = $("#chosensubdomain");
const registerReasonInput = $("#registeringreason");
const configInfoInput = $("#configinfo");
const contactSecurelyTrue = $("#contactactviapgptrue");
const contactSecurelyFalse = $("#contactactviapgpfalse");
const pgpPublicKeyInput = $("#contactpgppublickey");
const submitButton = $("#submitbutton");

const fullNameInputGroup = $("#fullnamegroup");
const orgNameInputGroup = $("#orgnamegroup");
const postStreetInputGroup = $("#poststreetgroup");
const postZipInputGroup = $("#postzipcodegroup");
const postCityInputGroup = $("#postcitygroup");
const postCountryInputGroup = $("#postcountrygroup");
const contactEmailInputGroup = $("#contactemailgroup");
const contactPhoneInputGroup = $("#contactphonegroup");
const contactFaxInputGroup = $("#contactfaxgroup");
const chosenSubdomainInputGroup = $("#chosensubdomaingroup");
const registerReasonInputGroup = $("#registeringreasongroup");
const configInfoInputGroup = $("#configinfogroup");
const contactSecurelyInputGroup = $("#contactviapgpgroup");
const pgpPublicKeyInputGroup = $("#contactpgppublickeygroup");
const submitButtonGroup = $("#formbuttongroup");

const getValue = (element) => {
    let result = eval("$(" + element + ").val();");
    return result;
}

let fullName = getValue("fullNameInput");
let orgName = getValue("orgNameInput");
let postStreet = getValue("postStreetInput");
let postZip = getValue("postZipInput");
let postCity = getValue("postCityInput");
let postCountry = getValue("postCountryInput");
let contactEmail = getValue("contactEmailInput");
let contactPhone = getValue("contactPhoneInput");
let contactFax = getValue("contactFaxInput");
let chosenSubdomain = getValue("chosenSubdomainInput");
let registerReason = getValue("registerReasonInput");
let configInfo = getValue("configInfoInput");
let contactSecurely = false;
let pgpPublicKey = getValue("pgpPublicKeyInput");

let isFormValid = true;

const isSecureContactTrue = () => {
    if ($(contactSecurelyTrue).is(":checked") == true && $(contactSecurelyFalse).is(":checked") == false) {
        contactSecurely = true;
    } else {
        if ($(contactSecurelyTrue).is(":checked") == false && $(contactSecurelyFalse).is(":checked") == true) {
            contactSecurely = false;
        }
    }
};

const getValues = () => {
    fullName = getValue("fullNameInput");
    orgName = getValue("orgNameInput");
    postStreet = getValue("postStreetInput");
    postZip = getValue("postZipInput");
    postCity = getValue("postCityInput");
    postCountry = getValue("postCountryInput");
    contactEmail = getValue("contactEmailInput");
    contactPhone = getValue("contactPhoneInput");
    contactFax = getValue("contactFaxInput");
    chosenSubdomain = getValue("chosenSubdomainInput");
    registerReason = getValue("registerReasonInput");
    configInfo = getValue("configInfoInput");
    contactSecurely = isSecureContactTrue();
    pgpPublicKey = getValue("pgpPublicKeyInput");
}

const removePhoneChars = () => {
    let string = contactPhone;
    let clean = string.replace(/[/.\s-]/gi, "");
    let result = clean.replace(/[\+]/gi, "00");
    contactPhone = result;
}

const removeFaxChars = () => {
    let string = contactFax;
    let clean = string.replace(/[/.\s-]/gi, "");
    let result = clean.replace(/[\+]/gi, "00");
    contactFax = result;
}

const verifyInputs = () => {
    isFormValid = true;
    getValues();
    removePhoneChars();
    removeFaxChars();
    if (fullName == "" || orgName == "" || postStreet == "" || postZip == "" || postCity == "" || contactEmail == "" || contactPhone == "" || chosenSubdomain == "" || registerReason == "" || configInfo == "") {
        isFormValid = false;
    }
    console.log("FORM SUBMITTED\n\n"+fullName+"\n"+orgName+"\n"+postStreet+"\n"+postZip+"\n"+postCity+"\n"+postCountry+"\n"+contactEmail+"\n"+contactPhone+"\n"+contactFax+"\n"+chosenSubdomain+"\n"+registerReason+"\n"+configInfo+"\n"+contactSecurely+"\n"+pgpPublicKey+"\n");
};

$(submitButton).on("click", (e) => {
    e.preventDefault();
    verifyInputs();
    console.log(isFormValid);
    if (isFormValid) {
        var formData = {};
        formData.fullname = fullName;
        formData.organzationName = orgName;
        formData.street = postStreet;
        formData.zipcode = postZip;
        formData.city = postCity;
        formData.country = postCountry;
        formData.contactemail = contactEmail;
        formData.contactphone = contactPhone;
        if (contactFax != "") {
            formData.contactfax = contactFax;
        } else {
            formData.contactfax = "undefined";
        }
        formData.subdomain = chosenSubdomain;
        formData.reason = registerReason;
        formData.configinfo = configInfo;
    }
});

