document.addEventListener("DOMContentLoaded", function () {
  let dropdownTimeout;

  window.testt = function () {
    const dropdownContent = document.querySelector(
      ".acc-settings__pic-dropdown-content"
    );
    const dropdownButton = document.querySelector(
      ".acc-settings__pic-upload-btn"
    );

    if (dropdownContent && dropdownButton) {
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }

      dropdownContent.addEventListener("mouseleave", () => {
        dropdownTimeout = setTimeout(() => {
          dropdownContent.style.display = "none";
        }, 500);
      });

      dropdownContent.addEventListener("mouseenter", () => {
        clearTimeout(dropdownTimeout);
      });

      dropdownButton.addEventListener("mouseenter", () => {
        clearTimeout(dropdownTimeout);
      });
    }
  };

  function deleteProfilePhoto() {
    const profilePhotoCircle = document.querySelector(
      ".acc-settings__pic-circle"
    );

    if (profilePhotoCircle) {
      profilePhotoCircle.style.backgroundImage =
        "url('assets/blankProfile.png')";
      profilePhotoCircle.style.backgroundSize = "cover";
      profilePhotoCircle.style.backgroundPosition = "center";

      alert("Profile photo deleted successfully!");
    }
  }

  fetch(
    "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const countrySelect = document.getElementById("country");
      const altcountrySelect = document.getElementById("alt-country");

      if (countrySelect && altcountrySelect) {
        data.forEach((country) => {
          const option = document.createElement("option");
          option.value = country.dial_code;
          option.textContent = `${country.name} (${country.dial_code})`;
          countrySelect.appendChild(option);
          altcountrySelect.appendChild(option.cloneNode(true));
        });
      }
    })
    .catch((error) => console.error("Error fetching country codes:", error));

  const camOpenButton = document.getElementById("cam-open");
  const videoElement = document.getElementById("videoElement");
  const captureButton = document.getElementById("capture");
  const closeButton = document.getElementById("close");
  let mediaStream;

  if (camOpenButton && videoElement && captureButton && closeButton) {
    camOpenButton.addEventListener("click", function () {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          mediaStream = stream;

          if (videoElement.style.display === "block") {
            videoElement.style.display = "none";
            mediaStream.getTracks().forEach((track) => track.stop());
          } else {
            videoElement.style.display = "block";
            videoElement.srcObject = stream;
          }

          captureButton.style.display =
            captureButton.style.display === "block" ? "none" : "block";
          closeButton.style.display =
            closeButton.style.display === "block" ? "none" : "block";
        })
        .catch(function (error) {
          console.error("Error accessing the camera: ", error);
        });
    });

    captureButton.addEventListener("click", function () {
      console.log("Image captured");
    });

    closeButton.addEventListener("click", function () {
      videoElement.style.display = "none";
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    });
  }

  const altEmailInput = document.getElementById("alt-email");
  if (altEmailInput) {
    altEmailInput.addEventListener("input", function () {
      validateEmailInput(this);
    });

    altEmailInput.addEventListener("blur", function () {
      validateEmailInput(this);
    });
  }

  function validateEmailInput(input) {
    if (input.value.trim() !== "" && !validateEmail(input.value)) {
      input.setCustomValidity("Please enter a valid email address");
      input.reportValidity();
    } else {
      input.setCustomValidity("");
    }
  }

  function updateInformation() {
    const first_name = document.getElementById("first-name")?.value.trim();
    const last_name = document.getElementById("last-name")?.value.trim();
    const main_email = document.getElementById("main-email")?.value.trim();
    const alt_email = document.getElementById("alt-email")?.value.trim();
    const country_code_main = document.getElementById("country")?.value;
    const country_code_alt = document.getElementById("alt-country")?.value;
    const main_phone_number = document.getElementById("phone")?.value.trim();
    const alt_phone_number = document.getElementById("alt-phone")?.value.trim();
    const gender = document.querySelector(
      'input[name="gender"]:checked'
    )?.value;
    const birthday = document.getElementById("birthday")?.value;
    const home_address = document.getElementById("home-address")?.value.trim();
    const work_address = document.getElementById("work-address")?.value.trim();

    const requiredFields = {
      "First Name": first_name,
      "Last Name": last_name,
      "Main Email": main_email,
      Country: country_code_main,
      "Phone Number": main_phone_number,
      Birthdate: birthday,
      "Home Address": home_address,
    };
    for (const [label, value] of Object.entries(requiredFields)) {
      if (!value) {
        alert(`${label} is required.`);
        return;
      }
    }

    if (!validateEmail(main_email)) {
      alert("Please enter a valid Main Email.");
      return;
    }
    if (alt_email && !validateEmail(alt_email)) {
      alert("Please enter a valid Alternative Email.");
      return;
    }
    if (!validatePhone(main_phone_number)) {
      alert("Please enter a valid Phone Number.");
      return;
    }
    if (alt_phone_number && !validatePhone(alt_phone_number)) {
      alert("Please enter a valid Alternative Phone Number.");
      return;
    }
    if (!gender) {
      alert("Please select a Gender (Male or Female).");
      return;
    }

    document
      .querySelectorAll("input, select")
      .forEach((el) => (el.disabled = true));
    document.getElementById("editInformation").disabled = false;
    document.getElementById("updateInformation").disabled = true;
    document.getElementById("uploadProfilePic").disabled = true;
    document.getElementById("deleteProfilePic").disabled = true;

    const data = {
      first_name,
      last_name,
      main_email,
      verify_main_email: true,
      alt_email,
      verify_alt_email: true,
      country_code_main,
      main_phone_number,
      verify_main_phone: true,
      country_code_alt,
      alt_phone_number,
      verify_alt_phone: true,
      gender,
      birthday,
      home_address,
      work_address,
      status_information: "active",
    };

    fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server response:", data);
        alert(data.message || "Submission successful!");
      })
      .catch((err) => {
        console.error("Submission error:", err);
        alert("Submission failed. Check console.");
      });
  }

  const savedData = localStorage.getItem("formData");

  if (savedData) {
    const formData = JSON.parse(savedData);

    if (document.getElementById("first-name"))
      document.getElementById("first-name").value = formData.first_name || "";
    if (document.getElementById("last-name"))
      document.getElementById("last-name").value = formData.last_name || "";
    if (document.getElementById("main-email"))
      document.getElementById("main-email").value = formData.main_email || "";
    if (document.getElementById("alt-email"))
      document.getElementById("alt-email").value = formData.alt_email || "";
    if (document.getElementById("country"))
      document.getElementById("country").value = formData.country_code || "";
    if (document.getElementById("alt-country"))
      document.getElementById("alt-country").value =
        formData.alt_country_code || "";
    if (document.getElementById("phone"))
      document.getElementById("phone").value = formData.phone || "";
    if (document.getElementById("alt-phone"))
      document.getElementById("alt-phone").value = formData.alt_phone || "";
    if (document.getElementById("male"))
      document.getElementById("male").checked = formData.male_gender || false;
    if (document.getElementById("female"))
      document.getElementById("female").checked =
        formData.female_gender || false;
    if (document.getElementById("birthday"))
      document.getElementById("birthday").value = formData.birthdate || "";
    if (document.getElementById("home-address"))
      document.getElementById("home-address").value =
        formData.home_address || "";
    if (document.getElementById("work-address"))
      document.getElementById("work-address").value =
        formData.work_address || "";
  }

  const editInfo = document.getElementById("editInformation");
  if (editInfo) {
    editInfo.addEventListener("click", function () {
      const inputs = document.querySelectorAll("input");
      const selects = document.querySelectorAll("select");
      const updateInfo = document.getElementById("updateInformation");
      const upProfilePic = document.getElementById("uploadProfilePic");
      const delProfilePic = document.getElementById("deleteProfilePic");

      inputs.forEach((input) => {
        input.disabled = !input.disabled;
      });
      selects.forEach((select) => {
        select.disabled = !select.disabled;
      });

      editInfo.disabled = true;
      if (updateInfo) updateInfo.disabled = false;
      if (upProfilePic) upProfilePic.disabled = false;
      if (delProfilePic) delProfilePic.disabled = false;
    });
  }

  const updateInfoBtn = document.getElementById("updateInformation");
  if (updateInfoBtn) {
    updateInfoBtn.addEventListener("click", updateInformation);
  }

  const deleteProfilePicBtn = document.getElementById("deleteProfilePic");
  if (deleteProfilePicBtn) {
    deleteProfilePicBtn.addEventListener("click", deleteProfilePhoto);
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  }
});
