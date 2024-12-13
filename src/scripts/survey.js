document.getElementById('surveyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const age = document.getElementById('age').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
  
    const formData = new FormData();
    formData.append('age', age);
    formData.append('height', height);
    formData.append('weight', weight);
  
    try {
      const result = await API.predict(formData);
      alert(`Prediction successful! Result: ${result.message}`);
    } catch (error) {
      alert(`Prediction failed: ${error.message}`);
    }
  });
  