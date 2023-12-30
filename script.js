document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("a");
  links.forEach(function (link) {
    link.addEventListener("mouseover", function () {
      this.style.color = "red";
    });
    link.addEventListener("mouseout", function () {
      this.style.color = "";
    });
  });
  const readbtn = document.getElementById("read-btn");
  readbtn.addEventListener("mouseover", function () {
    readbtn.style.backgroundColor = "#fff";
    readbtn.style.color = "red";
  });
  readbtn.addEventListener("mouseout", function () {
    readbtn.style.backgroundColor = "";
    readbtn.style.color = "";
  });

  var scroll = document.querySelectorAll("#link");

  scroll.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      var targetClassName = this.getAttribute("href").substring(1);
      var targetElement = document.querySelector("." + targetClassName);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

function downloadResume() {
  var resumeUrl =
    "https://drive.google.com/file/d/1qwLhTEkGP-H-WgsVaHWQf42ZgCg0_E4w/view";
  var downloadLink = document.createElement("a");
  downloadLink.download = "your_resume.pdf";
  downloadLink.href = resumeUrl;
  downloadLink.click();
}

function submitForm() {
  // Get form data
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Create a JSON object with the form data
  var formData = {
    name: name,
    email: email,
    message: message,
  };

  sendDataToGoogleSheets(formData);
}

function sendDataToGoogleSheets(formData) {
  var spreadsheetId = "1hbCKySWnDCGsYQn-ZX3h5zd21_Sf3GT8EhWalj9POLc";

  var apiKey = "AIzaSyC8-BzmVQVTLua7MyKJZV6vRnLDEjhiqz4";

  var sheetName = "Sheet1";

  var apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

  var payload = {
    values: [[formData.name, formData.gmail]],
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data sent to Google Sheets:", data);
    })
    .catch((error) => {
      console.error("Error sending data to Google Sheets:", error);
    });

    resetForm();
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}