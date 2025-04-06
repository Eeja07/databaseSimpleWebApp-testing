let dropdownTimeout; // Variable to store the timeout ID

// Function to toggle the dropdown visibility
function toggleDropdownProfilePhoto() {
    const dropdownContent = document.querySelector('.acc-settings__pic-dropdown-content');

    // Toggle visibility on click
    if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none'; // Hide the element
    } else {
        dropdownContent.style.display = 'block'; // Show the element
    }
}

// Add event listeners for dropdown behavior
document.addEventListener('DOMContentLoaded', () => {
    const dropdownContent = document.querySelector('.acc-settings__pic-dropdown-content');
    const dropdownButton = document.querySelector('.acc-settings__pic-upload-btn');

    // Add mouseleave listener to hide the dropdown after a delay
    dropdownContent.addEventListener('mouseleave', () => {
        dropdownTimeout = setTimeout(() => {
            dropdownContent.style.display = 'none'; // Hide the dropdown after 50ms
        }, 500); // 50ms delay
    });

    // Add mouseenter listener to cancel the timeout if the cursor re-enters
    dropdownContent.addEventListener('mouseenter', () => {
        clearTimeout(dropdownTimeout); // Cancel the timeout
    });
        // Add mouseleave listener to hide the dropdown after a delay
        dropdownButton.addEventListener('mouseleave', () => {
            dropdownTimeout = setTimeout(() => {
                dropdownContent.style.display = 'none'; // Hide the dropdown after 50ms
            }, 500); // 50ms delay
        });
    
        // Add mouseenter listener to cancel the timeout if the cursor re-enters
        dropdownButton.addEventListener('mouseenter', () => {
            clearTimeout(dropdownTimeout); // Cancel the timeout
        });
});
function deleteProfilePhoto() {
    const profilePhotoCircle = document.querySelector('.acc-settings__pic-circle');
    // Change the background first
    profilePhotoCircle.style.backgroundImage = "url('assets/blankProfile.png')"; // Replace with your default image path
    profilePhotoCircle.style.backgroundSize = "cover"; // Ensure the image covers the circle
    profilePhotoCircle.style.backgroundPosition = "center"; // Center the image
    // Show the alert after the background change
    alert('Profile photo deleted successfully!');
}
// Fetch the country code JSON from the URL
fetch("https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json")
    .then(response => response.json())
    .then(data => {
        // Get the select dropdown element
        const countrySelect = document.getElementById('country');
        const altcountrySelect = document.getElementById('alt-country');

        // Loop through the JSON data and create an option for each country
        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.dial_code; // Use the country code as the value
            option.textContent = `${country.name} (${country.dial_code})`; // Display country name and code
            countrySelect.appendChild(option);
            altcountrySelect.appendChild(option.cloneNode(true)); // Clone the option for the alternate dropdown
        });
    })
    .catch(error => console.error('Error fetching country codes:', error));