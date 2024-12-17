async function fetchData() {
    const dashboardContainer = document.getElementById("dashboard-container");
    const predictionResult = JSON.parse(localStorage.getItem('predictionResult')); // Retrieve and parse the prediction result

    // Clear the container
    dashboardContainer.innerHTML = ""; 

    // Check if predictionResult exists
    if (predictionResult) {
        // Add a message about the table usage
        const message = document.createElement("p");
        message.textContent = "Tabel berikut digunakan selama 1 minggu. Setelah 1 minggu, silakan perbarui detail pengguna Anda di halaman User Details yang dapat diakses melalui menu.";
        message.style.fontWeight = "bold"; // Make the message bold
        message.style.marginBottom = "20px"; // Add some space below the message
 
        // Append the message to the dashboard container
        dashboardContainer.appendChild(message);

        // Create a table for Diet Recommendations
        const dietTable = document.createElement("table");
        dietTable.style.marginBottom = "20px"; // Add space below the diet table
        dietTable.innerHTML = `
            <thead>
                <tr>
                    <th>Diet Recommendations</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Juice</td>
                    <td>${predictionResult.juice}</td>
                </tr>
                <tr>
                    <td>Protein Intake</td>
                    <td>${predictionResult.protein_intake}</td>
                </tr>
                <tr>
                    <td>Vegetables</td>
                    <td>${predictionResult.vegetables}</td>
                </tr>
            </tbody>
        `;
        
        // Create a table for Activity Recommendations
        const activityTable = document.createElement("table");
        activityTable.style.marginBottom = "20px"; // Add space below the activity table
        activityTable.innerHTML = `
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Schedule</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Monday</td>
                    <td>${predictionResult.monday_schedule}</td>
                </tr>
                <tr>
                    <td>Tuesday</td>
                    <td>${predictionResult.tuesday_schedule}</td>
                </tr>
                <tr>
                    <td>Wednesday</td>
                    <td>${predictionResult.wednesday_schedule}</td>
                </tr>
                <tr>
                    <td>Thursday</td>
                    <td>${predictionResult.thursday_schedule}</td>
                </tr>
                <tr>
                    <td>Friday</td>
                    <td>${predictionResult.friday_schedule}</td>
                </tr>
                <tr>
                    <td>Saturday</td>
                    <td>${predictionResult.saturday_schedule}</td>
                </tr>
                <tr>
                    <td>Sunday</td>
                    <td>${predictionResult.sunday_schedule}</td>
                </tr>
            </tbody>
        `;

        // Append both tables to the dashboard container
        dashboardContainer.appendChild(activityTable); // Append the activity table
        dashboardContainer.appendChild(dietTable); // Append the diet table

        // Add a feedback message at the bottom
        const feedbackMessage = document.createElement("p");
        feedbackMessage.textContent = "Silahkan berikan feedback Anda di halaman feedback yang dapat diakses melalui menu untuk meningkatkan proyek ini.";
        feedbackMessage.style.marginTop = "20px"; // Add some space above the feedback message
        feedbackMessage.style.fontWeight = "bold"; // Make the feedback message bold
 
        // Append the feedback message to the dashboard container
        dashboardContainer.appendChild(feedbackMessage);
    } else {
        dashboardContainer.innerHTML = `<p>No prediction result available.</p>`;
    }
}

// Call fetchData when the page loads
window.addEventListener("DOMContentLoaded", fetchData);

// Function to toggle the sidebar
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("show");
}

// Close the sidebar if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.menu-button')) {
      var sidebar = document.getElementById("sidebar");
      if (sidebar.classList.contains('show')) {
          sidebar.classList.remove('show');
      }
  }
}

// Logout functionality
document.getElementById('logoutButton').addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default anchor behavior
  localStorage.removeItem('token');
  localStorage.removeItem('id_user');
  window.location.href = 'index.html'; // Redirect to login page
});

