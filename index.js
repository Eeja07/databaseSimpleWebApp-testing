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