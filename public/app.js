let file = null;
let fileData = null;

const fileInput = document.getElementById("file-upload");
const uploadButton = document.getElementById("upload-button");
const inputFields = document.getElementById("input-fields");
const fileDataContainer = document.getElementById("file-data");
const fileLink = document.getElementById("file-link");

fileInput.addEventListener("change", (event) => {
  file = event.target.files[0];
});

const uploadFile = async () => {
  if (!file) {
    alert("Please select a file first!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("/upload-single", formData);
    fileData = response.data;

    // Update UI with file data
    if (fileData && fileData[0]) {
      fileLink.href = fileData[0].location;
      fileLink.textContent = fileData[0].originalname;
      fileDataContainer.classList.remove("hidden");
      inputFields.classList.add("hidden");
    }
  } catch (error) {
    console.error("Upload error:", error.response ? error.response.data.msg : error.message);
  }
};

console.log("Hello client");

const getemployees = async () => {
  try {
    const res = await fetch("http://localhost:3001/employees/api/all");
    const data = await res.json();
    render(data);
  } catch (error) {
    console.log(error);
  }
};
getemployees();

const render = (arr) => {
  const html = arr.map((item) => {
    return `<div style="display:inline-block; 
                        border: 1px solid; 
                        margin:20px; 
                        padding:20px;"
            >
         <h2>${item.name}</h2>
         <h3>${item.status}</h3>
        </div>`;
  });
  document.getElementById("root").innerHTML = html.join("");
};

function formsubmit(e) {
  e.preventDefault();
  const name = e.target.name.value;
  const status = e.target.status.value;
  console.log(name, status);
  fetch("http://localhost:3001/employees", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name, status }),
  })
    .then((res) => {
      console.log(res);
      if(res.status === 201){
        getemployees()
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

uploadButton.addEventListener("click", uploadFile);
