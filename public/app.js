let file = null;
let selectedEmployeeId = null; // Tracks the currently selected employee

// DOM References
const fileInput = document.getElementById("file-upload");
const uploadButton = document.getElementById("upload-button");
const employeeForm = document.getElementById("employee-form");
const rootDiv = document.getElementById("root");
const imageContainer = document.getElementById("imageContainer"); // This is your image uploader container

// Handle File Selection
fileInput.addEventListener("change", (event) => {
  file = event.target.files[0];
});

// Fetch and Render Employees
const getEmployees = async () => {
  try {
    const res = await fetch("http://localhost:4000/employees/api/all");
    const data = await res.json();
    renderEmployees(data);
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

// Render Employees in the UI with Clickable Cards
const renderEmployees = (employees) => {
  const html = employees.map((employee) => {
    return `
      <div class="employee-card" data-id="${employee.id}" style="cursor: pointer; border: 1px solid #ddd; padding: 20px; margin: 10px;">
        <h2>${employee.name}</h2>
        <h3>${employee.status}</h3>
        <!-- Empty image element that will hold the uploaded image -->
        <div class="employee-image-container">
          <img class="employee-image" style="display:none; max-width: 100px; margin-top: 10px;" />
        </div>
      </div>`;
  });
  rootDiv.innerHTML = html.join("");

  // Add click event listeners to highlight and select employees
  const employeeCards = document.querySelectorAll(".employee-card");
  employeeCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Clear previous selection
      employeeCards.forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");

      // Store the selected employee ID
      selectedEmployeeId = card.getAttribute("data-id");
    });
  });
};

// Handle File Upload
uploadButton.addEventListener("click", async () => {
  if (!selectedEmployeeId) {
    alert("Please select an employee by clicking their name and status card!");
    return;
  }

  if (!file) {
    alert("Please select a file!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("user_id", selectedEmployeeId);

  try {
    const response = await axios.post("http://localhost:4000/upload-single", formData);

    if (response.status === 201) {
      alert("File uploaded successfully!");

      // Hide the image uploader after the upload
      fileInput.value = ""; // Reset file input
      imageContainer.style.display = "none"; // Hide the uploader
      
      // Find the employee card that was selected
      const selectedCard = document.querySelector(`[data-id="${selectedEmployeeId}"]`);
      const imgElement = selectedCard.querySelector(".employee-image");

      // Update the image in the employee card
      const reader = new FileReader();
      reader.onload = function (e) {
        imgElement.src = e.target.result;
        imgElement.style.display = "block"; // Show the image
      };
      reader.readAsDataURL(file); // Read the uploaded file as a data URL
    }
  } catch (error) {
    console.error("Upload error:", error.response ? error.response.data : error.message);
  }
});

// Handle Employee Form Submission
employeeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const status = e.target.status.value;

  try {
    await fetch("http://localhost:4000/employees", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, status }),
    });
    e.target.reset();
    getEmployees(); // Refresh employee list
  } catch (error) {
    console.error("Error adding employee:", error);
  }
});

// Initial Data Fetch
getEmployees();
