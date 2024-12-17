const BASE_URL = 'https://obesicheck-api-714486790107.asia-southeast2.run.app';
const token = localStorage.getItem('token');

document.getElementById('feedbackForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent page reload

    // Get values from the form inputs
    const rating = document.querySelector('input[name="rating"]:checked').value; // Get selected rating
    const description = document.getElementById('description').value;

    const feedbackData = {
        rating: parseInt(rating),
        description: description
    };

    try {
        // Send POST request to the feedback endpoint
        const response = await fetch(`${BASE_URL}/api/feedback`, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackData),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Feedback submitted successfully!");
            // Redirect to user account page
            window.location.href = 'user_account.html'; // Redirect to user account page
        } else {
            alert("Failed to submit feedback: " + data.message);
        }
    } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('An error occurred while submitting feedback. Please try again.');
    }
});