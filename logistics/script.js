
const deliveryForm = document.getElementById("delivery-form");
const formMessage = document.getElementById("form-message");

deliveryForm.addEventListener("submit", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    // Get the customer's information
    const customerName = document
        .getElementById("customer-name").value.trim();

    const customerPhone = document
        .getElementById("customer-phone").value.trim();

    const pickupLocation = document
        .getElementById("pickup").value.trim();

    const deliveryLocation = document
        .getElementById("destination").value.trim();

    const packageType = document
        .getElementById("package").value;

    // Check that all fields contain information
    if (
        !customerName ||
        !customerPhone ||
        !pickupLocation ||
        !deliveryLocation ||
        !packageType
    ) {
        formMessage.textContent =
            "Please complete all the fields.";
        return;
    }

    // Display the delivery request summary
    formMessage.textContent =
        "Thank you, " + customerName + "!" +
        " Your demo delivery request has been prepared." +
        " Package: " + packageType +
        ". Pickup: " + pickupLocation +
        ". Destination: " + deliveryLocation +
        ". We would contact you at " + customerPhone +
        " to confirm the details in a real service.";

    // Clear the form after submission
    deliveryForm.reset();
});
