const registerForm = $("#registeringform");

const inputs = {
    fullName: $("#fullname"),
    orgName: $("#orgname"),
    postStreet: $("#poststreet"),
    postZip: $("#postzipcode"),
    postCity: $("#postcity"),
    postCountry: $("#postcountry"),
    contactEmail: $("#contactemail"),
    contactPhone: $("#contactphone"),
    contactFax: $("#contactfax"),
    chosenSubdomain: $("#chosensubdomain"),
    registerReason: $("#registeringreason"),
    configInfo: $("#configinfo"),
    // contactSecurelyTrue: $("#contactactviapgptrue"), // Commented out
    // contactSecurelyFalse: $("#contactactviapgpfalse"), // Commented out
    pgpPublicKey: $("#contactpgppublickey"), // Commented out
    submitButton: $("#submitbutton"),
};

const groups = {
    fullName: $("#fullnamegroup"),
    orgName: $("#orgnamegroup"),
    postStreet: $("#poststreetgroup"),
    postZip: $("#postzipcodegroup"),
    postCity: $("#postcitygroup"),
    postCountry: $("#postcountrygroup"),
    contactEmail: $("#contactemailgroup"),
    contactPhone: $("#contactphonegroup"),
    contactFax: $("#contactfaxgroup"),
    chosenSubdomain: $("#chosensubdomaingroup"),
    registerReason: $("#registeringreasongroup"),
    configInfo: $("#configinfogroup"),
    // contactSecurely: $("#contactviapgpgroup"), // Commented out
    pgpPublicKey: $("#contactpgppublickeygroup"), // Commented out
    submitButton: $("#formbuttongroup"),
};

const getValue = (element) => $(element).val();

// const isSecureContactTrue = () => inputs.contactSecurelyTrue.is(":checked") && !inputs.contactSecurelyFalse.is(":checked"); // Commented out

const getValues = () => {
    Object.keys(inputs).forEach(key => {
        inputs[key] = getValue(inputs[key]);
    });
    // inputs.contactSecurely = isSecureContactTrue(); // Commented out
};

const removeChars = (str) => str.replace(/[./\s-]/g, "").replace(/\+/g, "00");

const removePhoneChars = () => inputs.contactPhone = removeChars(inputs.contactPhone);

const removeFaxChars = () => inputs.contactFax = removeChars(inputs.contactFax);

const verifyInputs = () => {
    getValues();
    removePhoneChars();
    removeFaxChars();
    const requiredInputs = ["fullName", "orgName", "postStreet", "postZip", "postCity", "contactEmail", "contactPhone", "chosenSubdomain", "registerReason", "configInfo"];
    return requiredInputs.every(key => inputs[key]);
};

// Function to show loading overlay
const showLoadingOverlay = () => {
    $("body").append('<div id="loadingOverlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 9999; display: flex; justify-content: center; align-items: center;"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></div>');
};

// Function to hide loading overlay
const hideLoadingOverlay = () => {
    $("#loadingOverlay").remove();
};

// Attach click event to the submit button
inputs.submitButton.on("click", (e) => {
    e.preventDefault();

    // Show loading overlay
    showLoadingOverlay();

    if (verifyInputs()) {
        const formData = {
            fullName: inputs.fullName,
            orgName: inputs.orgName,
            street: inputs.postStreet,
            zipcode: inputs.postZip,
            city: inputs.postCity,
            country: inputs.postCountry,
            contactEmail: inputs.contactEmail,
            contactPhone: inputs.contactPhone,
            contactFax: inputs.contactFax || "undefined",
            subdomain: inputs.chosenSubdomain,
            reason: inputs.registerReason,
            configInfo: inputs.configInfo,
        };

        console.log("FORM SUBMITTED\n", formData);

        // Make AJAX request
        $.ajax({
            url: "/mail.php",
            method: "POST",
            data: formData,
            success: function(response) {
                console.log("Email sent successfully.");
                // Hide loading overlay on success
                hideLoadingOverlay();
                // Handle success response here
                $("#registeringform").replaceWith("<p>Form submitted successfully!</p>");
            },
            error: function(xhr, status, error) {
                console.log("Failed to send email.");
                // Hide loading overlay on error
                hideLoadingOverlay();
                // Handle error response here
                $("#registeringform").replaceWith("<p>Failed to submit form. Please try again later.</p>");
            }
        });
    } else {
        console.log("Form is not valid.");
        // Hide loading overlay if form is not valid
        hideLoadingOverlay();
    }
});