async function fetchData() {
    const dashboardContainer = document.getElementById("dashboard-container");
  
    try {
        const querySnapshot = await db.collection("default").get();
        dashboardContainer.innerHTML = ""; // Clear the container
  
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Create HTML elements to display data
            const dataItem = document.createElement("div");
            dataItem.className = "data-item";
            dataItem.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.description}</p>
            `;
            dashboardContainer.appendChild(dataItem);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        dashboardContainer.innerHTML = `<p>Failed to fetch data. Please try again later.</p>`;
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

