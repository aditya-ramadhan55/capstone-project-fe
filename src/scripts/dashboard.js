async function fetchData() {
    const dashboardContainer = document.getElementById("dashboard-container");
    const predictionResult = JSON.parse(localStorage.getItem('predictionResult')); // Retrieve and parse the prediction result

    // Clear the container
    dashboardContainer.innerHTML = ""; 

    // Check if predictionResult exists
    if (predictionResult) {
        // Create a table to display the prediction result
        const table = document.createElement("table");
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Schedule</th>
                    <th>Juice</th>
                    <th>Protein Intake</th>
                    <th>Vegetables</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Monday</td>
                    <td>${predictionResult.monday_schedule}</td>
                    <td>${predictionResult.juice}</td>
                    <td>${predictionResult.protein_intake}</td>
                    <td>${predictionResult.vegetables}</td>
                </tr>
                <tr>
                    <td>Tuesday</td>
                    <td>${predictionResult.tuesday_schedule}</td>
                    <td>${predictionResult.juice}</td>
                    <td>${predictionResult.protein_intake}</td>
                    <td>${predictionResult.vegetables}</td>
                </tr>
                <tr>
                    <td>Wednesday</td>
                    <td>${predictionResult.wednesday_schedule}</td>
                    <td>${predictionResult.juice}</td>
                    <td>${predictionResult.protein_intake}</td>
                    <td>${predictionResult.vegetables}</td>
                </tr>
                <tr>
                    <td>Thursday</td>
                    <td>${predictionResult.thursday_schedule}</td>
                    <td>${predictionResult.juice}</td>
                    <td>${predictionResult.protein_intake}</td>
                    <td>${predictionResult.vegetables}</td>
                </tr>
                <tr>
                    <td>Friday</td>
                    <td>${predictionResult.friday_schedule}</td>
                    <td>${predictionResult.juice}</td>
                    <td>${predictionResult.protein_intake}</td>
                    <td>${predictionResult.vegetables}</td>
                </tr>
                <tr>
                    <td>Saturday</td>
                    <td>${predictionResult.saturday_schedule}</td>
                    <td>${predictionResult.juice}</td>
                    <td>${predictionResult.protein_intake}</td>
                    <td>${predictionResult.vegetables}</td>
                </tr>
                <tr>
                    <td>Sunday</td>
                    <td>${predictionResult.sunday_schedule}</td>
                    <td>${predictionResult.juice}</td>
                    <td>${predictionResult.protein_intake}</td>
                    <td>${predictionResult.vegetables}</td>
                </tr>
            </tbody>
        `;
        dashboardContainer.appendChild(table); // Append the table to the dashboard container
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

