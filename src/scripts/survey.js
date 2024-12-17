const BASE_URL = 'https://obesicheck-api-714486790107.asia-southeast2.run.app';
const token = localStorage.getItem('token');

document.getElementById('surveyForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent page reload

    // Get values from the form inputs
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;

    const userDetails = {
        gender: gender,
        age: parseInt(age),
        weight: parseFloat(weight),
        height: parseFloat(height)
    };

    try {
        // Send POST request to the addUser Details endpoint
        const response = await fetch(`${BASE_URL}/prediksi/addUserDetails`, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        });

        const data = await response.json();

        if (response.ok) {
            alert("User  details submitted successfully!");
            // Optionally redirect or clear the form
            window.location.href = 'prediction.html'; // Redirect to dashboard or another page
        } else {
            alert("Failed to submit user details: " + data.message);
        }
    } catch (error) {
        console.error('Error submitting user details:', error);
        alert('An error occurred while submitting user details. Please try again.');
    }
});