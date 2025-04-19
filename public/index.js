document.addEventListener("DOMContentLoaded", function () {
    // DOM Element References
    const elements = {
        // Profile picture elements
        profilePhotoCircle: document.querySelector(".acc-settings__pic-circle"),
        dropdownContent: document.querySelector(".acc-settings__pic-dropdown-content"),
        dropdownButton: document.querySelector(".acc-settings__pic-upload-btn"),

        // Camera elements
        camOpenButton: document.getElementById("camOpen"),
        videoElement: document.getElementById("videoElement"),
        camFolderButton: document.getElementById("camFolder"),
        captureButton: document.getElementById("captureCam"),
        closeButton: document.getElementById("closeCam"),
        fileInput: document.getElementById('fileInput'),
        canvas: document.getElementById("canvas"),
        squareCam: document.getElementById("squareCamera"),

        // Form elements
        countrySelect: document.getElementById("country"),
        altCountrySelect: document.getElementById("alt-country"),
        altEmailInput: document.getElementById("alt-email"),

        // Control buttons
        editInfoBtn: document.getElementById("editInformation"),
        updateInfoBtn: document.getElementById("updateInformation"),
        deleteProfilePicBtn: document.getElementById("deleteProfilePic"),
        uploadProfilePicBtn: document.getElementById("uploadProfilePic"),
        autoFillBtn: document.getElementById("autoFillBtn")
    };

    // State Management
    let state = {
        dropdownTimeout: null,
        mediaStream: null,
        formData: JSON.parse(localStorage.getItem("formData")) || {}
    };

    // Initialize Application
    function initialize() {
        loadCountryCodes();
        loadSavedFormData();
        setupEventListeners();
    }
    // API Functions
    function loadCountryCodes() {
        fetch("https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json")
            .then(response => response.json())
            .then(data => {
                if (elements.countrySelect && elements.altCountrySelect) {
                    data.forEach(country => {
                        const option = document.createElement("option");
                        option.value = country.dial_code;
                        option.textContent = `${country.name} (${country.dial_code})`;
                        elements.countrySelect.appendChild(option);
                        elements.altCountrySelect.appendChild(option.cloneNode(true));
                    });
                }
            })
            .catch(error => console.error("Error fetching country codes:", error));
    }

    function submitFormData(data) {
        fetch("http://localhost:3000/api/accounts/info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                console.log("Server response:", data);
                alert(data.message || "Submission successful!");
            })
            .catch(err => {
                console.error("Submission error:", err);
                alert("Submission failed. Check console.");
            });
    }

    // Form Functions
    function loadSavedFormData() {
        if (!state.formData) return;

        const formFields = {
            "first-name": "first_name",
            "last-name": "last_name",
            "main-email": "main_email",
            "alt-email": "alt_email",
            "country": "country_code",
            "alt-country": "alt_country_code",
            "phone": "phone",
            "alt-phone": "alt_phone",
            "birthday": "birthdate",
            "home-address": "home_address",
            "work-address": "work_address"
        };

        // Set values for text inputs and selects
        Object.entries(formFields).forEach(([elementId, dataKey]) => {
            const element = document.getElementById(elementId);
            if (element) {
                element.value = state.formData[dataKey] || "";
            }
        });

        // Set radio button values
        if (document.getElementById("male")) {
            document.getElementById("male").checked = state.formData.male_gender || false;
        }
        if (document.getElementById("female")) {
            document.getElementById("female").checked = state.formData.female_gender || false;
        }
    }

    function validateForm() {
        // Get form values
        const formValues = {
            first_name: document.getElementById("first-name")?.value.trim(),
            last_name: document.getElementById("last-name")?.value.trim(),
            main_email: document.getElementById("main-email")?.value.trim(),
            alt_email: document.getElementById("alt-email")?.value.trim(),
            country_code_main: document.getElementById("country")?.value,
            country_code_alt: document.getElementById("alt-country")?.value,
            main_phone_number: document.getElementById("phone")?.value.trim(),
            alt_phone_number: document.getElementById("alt-phone")?.value.trim(),
            gender: document.querySelector('input[name="gender"]:checked')?.value,
            birthday: document.getElementById("birthday")?.value,
            home_address: document.getElementById("home-address")?.value.trim(),
            work_address: document.getElementById("work-address")?.value.trim()
        };

        // Validate required fields
        const requiredFields = {
            "First Name": formValues.first_name,
            "Last Name": formValues.last_name,
            "Main Email": formValues.main_email,
            "Country": formValues.country_code_main,
            "Phone Number": formValues.main_phone_number,
            "Birthdate": formValues.birthday,
            "Home Address": formValues.home_address
        };

        for (const [label, value] of Object.entries(requiredFields)) {
            if (!value) {
                alert(`${label} is required.`);
                return null;
            }
        }

        // Validate email and phone formats
        if (!validateEmail(formValues.main_email)) {
            alert("Please enter a valid Main Email.");
            return null;
        }

        if (formValues.alt_email && !validateEmail(formValues.alt_email)) {
            alert("Please enter a valid Alternative Email.");
            return null;
        }

        if (!validatePhone(formValues.main_phone_number)) {
            alert("Please enter a valid Phone Number.");
            return null;
        }

        if (formValues.alt_phone_number && !validatePhone(formValues.alt_phone_number)) {
            alert("Please enter a valid Alternative Phone Number.");
            return null;
        }

        if (!formValues.gender) {
            alert("Please select a Gender (Male or Female).");
            return null;
        }

        return {
            first_name: formValues.first_name,
            last_name: formValues.last_name,
            main_email: formValues.main_email,
            verify_main_email: true,
            alt_email: formValues.alt_email,
            verify_alt_email: true,
            country_code_main: formValues.country_code_main,
            main_phone_number: formValues.main_phone_number,
            verify_main_phone: true,
            country_code_alt: formValues.country_code_alt,
            alt_phone_number: formValues.alt_phone_number,
            verify_alt_phone: true,
            gender: formValues.gender,
            birthday: formValues.birthday,
            home_address: formValues.home_address,
            work_address: formValues.work_address,
            status_information: "active"
        };
    }

    function updateInformation() {
        console.log("Update Information function called!");

        const validatedData = validateForm();
        if (!validatedData) return;

        // Disable form controls
        toggleFormControls(true);

        submitFormData(validatedData);
    }

    function toggleFormControls(disabled) {
        // Toggle all form inputs and selects
        document.querySelectorAll("input, select").forEach(el => el.disabled = disabled);

        // Set specific buttons state
        if (elements.editInfoBtn) elements.editInfoBtn.disabled = !disabled;
        if (elements.updateInfoBtn) elements.updateInfoBtn.disabled = disabled;
        if (elements.uploadProfilePicBtn) elements.uploadProfilePicBtn.disabled = disabled;
        if (elements.deleteProfilePicBtn) elements.deleteProfilePicBtn.disabled = disabled;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        const phoneRegex = /^[0-9]{10,15}$/;
        return phoneRegex.test(phone);
    }

    function validateEmailInput(input) {
        if (input.value.trim() !== "" && !validateEmail(input.value)) {
            input.setCustomValidity("Please enter a valid email address");
            input.reportValidity();
        } else {
            input.setCustomValidity("");
        }
    }

    // Profile Picture Functions
    function toggleProfileDropdown() {
        if (!elements.dropdownContent || !elements.dropdownButton) return;

        if (elements.dropdownContent.style.display === "block") {
            elements.dropdownContent.style.display = "none";
        } else {
            elements.dropdownContent.style.display = "block";
        }
    }

    function deleteProfilePhoto() {
        if (!elements.profilePhotoCircle) return;

        elements.profilePhotoCircle.style.backgroundImage = "url('assets/blankProfile.png')";
        elements.profilePhotoCircle.style.backgroundSize = "cover";
        elements.profilePhotoCircle.style.backgroundPosition = "center";

        alert("Profile photo deleted successfully!");
    }

    // Camera Functions
    function toggleCamera() {
        if (!elements.videoElement || !elements.captureButton || !elements.closeButton) return;

        if (elements.videoElement.style.display === "block") {
            closeCamera();
        } else {
            openCamera();
        }
    }

    function openCamera() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                state.mediaStream = stream;
                elements.videoElement.style.display = "block";
                elements.videoElement.srcObject = stream;
                elements.captureButton.style.display = "block";
                elements.closeButton.style.display = "block";
                elements.squareCam.style.display = "block";
                elements.editInfoBtn.style.display = "none";
                elements.updateInfoBtn.style.display = "none";
            })
            .catch(function (error) {
                console.error("Error accessing the camera: ", error);
            });
    }

    function closeCamera() {
        elements.videoElement.style.display = "none";
        elements.captureButton.style.display = "none";
        elements.closeButton.style.display = "none";
        elements.squareCam.style.display = "none";
        elements.editInfoBtn.style.display = "block";
        elements.updateInfoBtn.style.display = "block";

        if (state.mediaStream) {
            state.mediaStream.getTracks().forEach(track => track.stop());
        }
    }

    // Add autoFill function
    function autoFillForm() {
        // Sample data to fill the form with
        const sampleData = {
            "first-name": "John",
            "last-name": "Doe",
            "main-email": "john.doe@example.com",
            "alt-email": "john.alternate@example.com",
            "country": "+1", // USA code
            "alt-country": "+44", // UK code
            "phone": "1234567890",
            "alt-phone": "9876543210",
            "birthday": "2000-05-10",
            "home-address": "123 Main Street, Anytown, USA",
            "work-address": "456 Office Building, Business District, USA"
        };

        // Fill in the form fields
        Object.entries(sampleData).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.value = value;
            }
        });

        // Set the gender radio button
        const maleRadio = document.getElementById("male");
        if (maleRadio) {
            maleRadio.checked = true;
        }

        // Enable form editing to allow updates
        toggleFormControls(false);

        alert("Form filled with sample data! You can now edit and update.");
    }
    // Event Listener Setup
    function setupEventListeners() {
        // Profile picture dropdown events
        if (elements.dropdownContent) {
            elements.dropdownContent.addEventListener("mouseleave", () => {
                state.dropdownTimeout = setTimeout(() => {
                    elements.dropdownContent.style.display = "none";
                }, 500);
            });

            elements.dropdownContent.addEventListener("mouseenter", () => {
                clearTimeout(state.dropdownTimeout);
            });
        }

        if (elements.dropdownButton) {
            elements.dropdownButton.addEventListener("mouseenter", () => {
                clearTimeout(state.dropdownTimeout);
            });
        }
        // Get the canvas context AFTER we have the canvas element
        const ctx = canvas.getContext("2d");
        // Capture image and download
        if (elements.captureButton) {
            elements.captureButton.addEventListener("click", function () {
                // Ensure the video is ready
                if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
                    console.error("Video stream not available");
                    return;
                }

                // Set canvas dimensions to match the video
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;

                // Draw the current frame from the video onto the canvas
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

                // Create a data URL from the canvas (image format)
                const dataURL = canvas.toDataURL("image/png");

                // Create a temporary download link to save the image
                const link = document.createElement("a");
                link.href = dataURL;
                link.download = "captured-image.png"; // Default file name
                link.click(); // Trigger the download
            });
        }


        // Email validation events
        if (elements.altEmailInput) {
            elements.altEmailInput.addEventListener("input", function () {
                validateEmailInput(this);
            });

            elements.altEmailInput.addEventListener("blur", function () {
                validateEmailInput(this);
            });
        }

        // Camera events
        if (elements.camOpenButton) {
            elements.camOpenButton.addEventListener("click", toggleCamera);
        }

        if (elements.closeButton) {
            elements.closeButton.addEventListener("click", closeCamera);
        }

        // Form control events
        if (elements.editInfoBtn) {
            elements.editInfoBtn.addEventListener("click", () => toggleFormControls(false));
        }

        if (elements.updateInfoBtn) {
            elements.updateInfoBtn.addEventListener("click", updateInformation);
        }

        if (elements.deleteProfilePicBtn) {
            elements.deleteProfilePicBtn.addEventListener("click", deleteProfilePhoto);
        }
        // Add event listener for auto-fill button
        if (elements.autoFillBtn) {
            elements.autoFillBtn.addEventListener("click", autoFillForm);
        }
    }

    // Expose functions to window object if needed
    window.testt = toggleProfileDropdown;

    // Initialize the application
    initialize();
});