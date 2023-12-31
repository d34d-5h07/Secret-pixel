document.getElementById("defaultOpen").click();
document.getElementById("encodeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  fetch("/encode", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "encoded_image.png";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    })
    .catch((error) => console.error("Error:", error));
});

document.getElementById("decodeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  fetch("/decode", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.status === 200) {
        return response.text();
      } else {
        throw new Error("Decoding failed");
      }
    })
    .then((decodedMessage) => {
      console.log(decodedMessage);
      const resultDiv = document.getElementById("result");
      resultDiv.textContent = decodedMessage;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function openType(evt, cityName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
