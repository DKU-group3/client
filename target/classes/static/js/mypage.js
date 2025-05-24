document.addEventListener("DOMContentLoaded", function () {
    // Sidebar toggle
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleBtn");
    const container = document.querySelector(".container");
  
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      container.style.marginLeft = sidebar.classList.contains("collapsed") ? "60px" : "200px";
    });
  
    // Profile edit form toggle
    const editBtn = document.querySelector(".edit-toggle-btn");
    const profileForm = document.querySelector(".profile-form");
  
    if (editBtn && profileForm) {
      editBtn.addEventListener("click", () => {
        profileForm.classList.toggle("hidden");
      });
  
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        profileForm.classList.add("hidden");
      });
    }
  });
  