let dropdownTimeout;

function toggleDropdownProfilePhoto() {
    const dropdownContent = document.querySelector('.acc-settings__pic-dropdown-content');

    if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
    } else {
        dropdownContent.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dropdownContent = document.querySelector('.acc-settings__pic-dropdown-content');
    const dropdownButton = document.querySelector('.acc-settings__pic-upload-btn');

    dropdownContent.addEventListener('mouseleave', () => {
        dropdownTimeout = setTimeout(() => {
            dropdownContent.style.display = 'none';
        }, 500);
    });

    dropdownContent.addEventListener('mouseenter', () => {
        clearTimeout(dropdownTimeout);
    });
    dropdownButton.addEventListener('mouseleave', () => {
        dropdownTimeout = setTimeout(() => {
            dropdownContent.style.display = 'none';
        }, 500);
    });

    dropdownButton.addEventListener('mouseenter', () => {
        clearTimeout(dropdownTimeout);
    });
});
function deleteProfilePhoto() {
    const profilePhotoCircle = document.querySelector('.acc-settings__pic-circle');

    profilePhotoCircle.style.backgroundImage = "url('assets/blankProfile.png')";
    profilePhotoCircle.style.backgroundSize = "cover";
    profilePhotoCircle.style.backgroundPosition = "center";

    alert('Profile photo deleted successfully!');
}
fetch("https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json")
    .then(response => response.json())
    .then(data => {
        const countrySelect = document.getElementById('country');
        const altcountrySelect = document.getElementById('alt-country');

        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.dial_code;
            option.textContent = `${country.name} (${country.dial_code})`;
            countrySelect.appendChild(option);
            altcountrySelect.appendChild(option.cloneNode(true));
        });
    })
    .catch(error => console.error('Error fetching country codes:', error));

document.addEventListener('DOMContentLoaded', function () {
    const camOpenButton = document.getElementById('cam-open');
    const videoElement = document.getElementById('videoElement');
    const captureButton = document.getElementById('capture');
    const closeButton = document.getElementById('close');
    let mediaStream;

    camOpenButton.addEventListener('click', function () {

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {

                mediaStream = stream;

                if (videoElement.style.display === 'block') {
                    videoElement.style.display = 'none';

                    mediaStream.getTracks().forEach(track => track.stop());
                } else {
                    videoElement.style.display = 'block';
                    videoElement.srcObject = stream;
                }

                if (captureButton.style.display === 'block') {
                    captureButton.style.display = 'none';
                } else {
                    captureButton.style.display = 'block';
                }

                if (closeButton.style.display === 'block') {
                    closeButton.style.display = 'none';
                } else {
                    closeButton.style.display = 'block';
                }
            })
            .catch(function (error) {
                console.error('Error accessing the camera: ', error);
            });
    });

    captureButton.addEventListener('click', function () {
        console.log('Image captured');
    });

    closeButton.addEventListener('click', function () {
        videoElement.style.display = 'none';
        mediaStream.getTracks().forEach(track => track.stop());
    });
});


function updateInformation() {
    const first_name = document.getElementById('first-name').value.trim();
    const last_name = document.getElementById('last-name').value.trim();
    const main_email = document.getElementById('main-email').value.trim();
    const alt_email = document.getElementById('alt-email').value.trim();
    const country_code = document.getElementById('country').value;
    const alt_country_code = document.getElementById('alt-country').value;
    const phone = document.getElementById('phone').value.trim();
    const alt_phone = document.getElementById('alt-phone').value.trim();
    const male_gender = document.getElementById('male').checked;
    const female_gender = document.getElementById('female').checked;
    const birthdate = document.getElementById('birthday').value;
    const home_address = document.getElementById('home-address').value.trim();
    const work_address = document.getElementById('work-address').value.trim();

    const requiredFields = {
        'First Name': first_name,
        'Last Name': last_name,
        'Main Email': main_email,
        'Country': country_code,
        'Phone Number': phone,
        'Birthdate': birthdate,
        'Home Address': home_address
    };

    for (const [label, value] of Object.entries(requiredFields)) {
        if (!value) {
            alert(`${label} is required.`);
            return;
        }
    }

    if (!validateEmail(main_email)) {
        alert('Please enter a valid Main Email.');
        return;
    }
    if (alt_email && !validateEmail(alt_email)) {
        alert('Please enter a valid Alternative Email.');
        return;
    }
    if (!validatePhone(phone)) {
        alert('Please enter a valid Phone Number.');
        return;
    }
    if (alt_phone && !validatePhone(alt_phone)) {
        alert('Please enter a valid Alternative Phone Number.');
        return;
    }
    if (!male_gender && !female_gender) {
        alert('Please select a Gender.');
        return;
    }

    inputs.forEach(input => {
        input.disabled = true;
    });

    selects.forEach(select => {
        select.disabled = true;
    });

    editInfo.disabled = false;
    updateInfo.disabled = true;
    upProfilePic.disabled = true;
    delProfilePic.disabled = true;

    const formData = {
        first_name,
        last_name,
        main_email,
        alt_email,
        country_code,
        alt_country_code,
        phone,
        alt_phone,
        male_gender,
        female_gender,
        birthdate,
        home_address,
        work_address
    };

    localStorage.setItem('formData', JSON.stringify(formData));
    alert('Information Saved!');
}

document.addEventListener('DOMContentLoaded', function () {
    const savedData = localStorage.getItem('formData');

    if (savedData) {
        const formData = JSON.parse(savedData);

        document.getElementById('first-name').value = formData.first_name || '';
        document.getElementById('last-name').value = formData.last_name || '';
        document.getElementById('main-email').value = formData.main_email || '';
        document.getElementById('alt-email').value = formData.alt_email || '';
        document.getElementById('country').value = formData.country_code || '';
        document.getElementById('alt-country').value = formData.alt_country_code || '';
        document.getElementById('phone').value = formData.phone || '';
        document.getElementById('alt-phone').value = formData.alt_phone || '';
        document.getElementById('male').value = formData.male_gender || '';
        document.getElementById('female').value = formData.female_gender || '';
        document.getElementById('birthday').value = formData.birthdate || '';
        document.getElementById('home-address').value = formData.home_address || '';
        document.getElementById('work-address').value = formData.work_address || '';
    }
});

const editInfo = document.getElementById('editInformation');
const inputs = document.querySelectorAll('input');
const selects = document.querySelectorAll('select');
const updateInfo = document.getElementById('updateInformation');
const upProfilePic = document.getElementById('uploadProfilePic');
const delProfilePic = document.getElementById('deleteProfilePic');

editInfo.addEventListener('click', function () {

    inputs.forEach(input => {
        input.disabled = !input.disabled;
    });
    selects.forEach(select => {
        select.disabled = !select.disabled;
    });

    editInfo.disabled = true;
    updateInfo.disabled = false;
    upProfilePic.disabled = false;
    delProfilePic.disabled = false;
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone);
}
localStorage.clear();


// const express = require('express')
// const app = express()
// const port = 3000
// const bordyParser = require('body-parser')
// const db = require('./connection') // Import the database connection
// const response = require('./response') // Import the response module

// app.use(bordyParser.json()) // Middleware to parse JSON bodies
// app.get('/', (req, res) => {
//     res.json("Hello World!").end()
// }
// )
// app.post('/post', (req, res) => {
//     res.send('POST request to the homepage')
// })
// app.put('/', (req, res) => {})
// app.delete('/', (req, res) => {})
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
