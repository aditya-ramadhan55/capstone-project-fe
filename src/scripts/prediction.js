const BASE_URL = 'https://obesicheck-api-714486790107.asia-southeast2.run.app';

const ENDPOINT = {
  predict: `${BASE_URL}/prediksi/predict1`,
};

const token = localStorage.getItem('token');
console.log('Token:', token); // Log the token

document.getElementById('surveyForm').addEventListener('submit', async function(event) {

    event.preventDefault();

    // Get values from the form inputs
    let formData = new FormData(this);
    let entries = {};
    for (let [name, value] of formData.entries()) {
        entries[name] = value;
    }

    console.log(entries); // Log the entries object

    if (!token) {
        alert('Token tidak ditemukan. Silakan login terlebih dahulu.'); // Token not found
        return; // Exit the function
    }

    try {
      // Send POST request to the predict endpoint
      const response = await fetch(ENDPOINT.predict, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token here
        },
        body: JSON.stringify(entries), // Your request body
    });

      // Parse the JSON response
      const data = await response.json();

      if (response.ok) {
        // Prediction successful, display result
        alert("Prediction successful! Result: " + data.message);
      } else {
        // Prediction failed, display error message
        alert("Prediction failed: " + data.message);
      }
    } catch (error) {
      // Error occurred, display error message
      alert("Prediction failed: " + error.message);
    }
});