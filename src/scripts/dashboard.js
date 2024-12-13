async function fetchData() {
    const dashboardContainer = document.getElementById("dashboard-container");
  
    try {
      const querySnapshot = await db.collection("default").get();
      dashboardContainer.innerHTML = ""; // Bersihkan kontainer
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Membuat elemen HTML untuk menampilkan data
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
  
  // Panggil fungsi fetchData saat halaman dimuat
  window.addEventListener("DOMContentLoaded", fetchData);
  