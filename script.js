// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    const popupOverlay = document.getElementById('popupOverlay');
    const popupTitle = document.getElementById('popupTitle');
    const popupMessage = document.getElementById('popupMessage');
    const popupCloseBtn = document.getElementById('popupCloseBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent page reload
            
            // Show loading spinner
            loadingSpinner.style.display = 'block';
            
            // Collect form data
            const formData = new FormData(this);
            
            try {
                // Send data to Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                // Hide loading spinner
                loadingSpinner.style.display = 'none';
                
                if (response.ok && result.success) {
                    // Success - show success popup
                    showPopup(
                        'Success!',
                        'Your message has been sent successfully! I will contact you soon.',
                        'success'
                    );
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    // Error - show error popup
                    showPopup(
                        'Error!',
                        'Failed to send message. Please try again or contact me directly.',
                        'error'
                    );
                }
                
            } catch (error) {
                // Hide loading spinner
                loadingSpinner.style.display = 'none';
                
                // Network error - show error popup
                showPopup(
                    'Network Error!',
                    'Unable to send message. Please check your internet connection.',
                    'error'
                );
                console.error('Form submission error:', error);
            }
        });
    }
    
    // Popup functions
    function showPopup(title, message, type) {
        const popupIcon = document.getElementById('popupIcon');
        
        // Set icon based on type
        if (type === 'success') {
            popupIcon.className = 'popup-icon fas fa-check-circle';
        } else {
            popupIcon.className = 'popup-icon fas fa-exclamation-circle';
        }
        
        popupTitle.textContent = title;
        popupMessage.textContent = message;
        popupOverlay.style.display = 'flex';
        
        // Prevent scrolling when popup is open
        document.body.style.overflow = 'hidden';
    }
    
    // Close popup when close button is clicked
    if (popupCloseBtn) {
        popupCloseBtn.addEventListener('click', function() {
            popupOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close popup when clicking outside the content
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                popupOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.style.display === 'flex') {
            popupOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});