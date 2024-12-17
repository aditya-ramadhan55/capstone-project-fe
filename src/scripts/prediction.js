const BASE_URL = 'https://obesicheck-api-714486790107.asia-southeast2.run.app';

const ENDPOINT = {
  predict: `${BASE_URL}/prediksi/predict1`,
};

const token = localStorage.getItem('token');

document.getElementById('predictionForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent page reload
    // Show loading indicator
    document.getElementById('loading').style.display = 'block';

    // Get values from the form inputs
    const familyHistory = document.querySelector('input[name="family_history_with_overweight"]:checked').value;
    const highCalorieFood = document.querySelector('input[name="FAVC"]:checked').value;
    const vegetableConsumption = document.querySelector('input[name="FCVC"]:checked').value;
    const mainMeals = document.querySelector('input[name="NCP"]:checked').value;
    const snacking = document.querySelector('input[name="CAEC"]:checked').value;
    const smoking = document.querySelector('input[name="SMOKE"]:checked').value;
    const waterIntake = document.querySelector('input[name="CH2O"]:checked').value;
    const healthIssues = document.querySelector('input[name="SCC"]:checked').value;
    const physicalActivity = document.querySelector('input[name="FAF"]:checked').value;
    const screenTime = document.querySelector('input[name="TUE"]:checked').value;
    const alcoholConsumption = document.querySelector('input[name="CALC"]:checked').value;
    const transportation = document.querySelector('input[name="MTRANS"]:checked').value;

    const predictionData = {
        family_history_with_overweight: familyHistory,
        FAVC: highCalorieFood,
        FCVC: vegetableConsumption,
        NCP: mainMeals,
        CAEC: snacking,
        SMOKE: smoking,
        CH2O: waterIntake,
        SCC: healthIssues,
        FAF: physicalActivity,
        TUE: screenTime,
        CALC: alcoholConsumption,
        MTRANS: transportation
    };

    console.log(predictionData); // Log the prediction data object

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
                'Authorization': token, // Include the token here
            },
            body: JSON.stringify(predictionData), // Your request body
        });

        // Parse the JSON response
        const data = await response.json();
        // Hide loading indicator
        document.getElementById('loading').style.display = 'none';

        if (response.ok) {
            // Prediction successful, display result
            alert("Prediction successful! Result: " + data.message);
            window.location.href = 'prediction2.html';
        } else {
            // Prediction failed, display error message
            alert("Prediction failed: " + data.message);
        }
    } catch (error) {
        // Error occurred, display error message
        alert("Prediction failed: " + error.message);
    }
});