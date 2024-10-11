const number = document.getElementById("number");
let roolTriger = true

function g(s) {
    return document.getElementById(s);
}

async function SetData() {
    Load(true);
    const apiURL = "https://script.google.com/macros/s/AKfycbz5G5Hf-_SwtswYbs34MoB83Ik9w8QgNGBjtnbRxu0FblkNGpqrWcIcS3YC9Alb6GGS/exec"
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
    g("number").innerText = data;
    Load(false);
}

SetData();

function chenge() {
    window.location.href = "./result.html"
}

function Load(on) {
    if (on) {
        g("loading").style.display = "break";
    } else {
        roolTriger = false;
        $(g("loading")).animate({
            opacity: 0
        }, 500, function () {
            g("loading").style.display = "none"
        });
    }
}