let session;

fetch("https://192.168.0.14:5000/api/base/listAllActiveRooms", { method: "POST" })
  .then(res => {
    return res.json();
  })
    .then(res => {
        var json = JSON.stringify(res);
        var arr = JSON.parse(json);
        var listItems = arr.reduce((result, item) => {
            result += `<li><a href="https://localhost:5002/participant.html">${item.roomName}</a></a></li>`;
            return result;
        }, '');
        resultElement = document.getElementById('slideContainer');
        resultElement.innerHTML = listItems;

  })
    .catch(handleCallback);

function handleCallback(error) {
    if (error) {
        console.log("error: " + error.message);
    } else {
        console.log("callback success");
    }
}



