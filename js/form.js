import { CallChatGPT } from "./chat.js";

const form = document.getElementById("form");

const presentsBtn = document.getElementById("presents-button");

const numPres = document.getElementById("numPres");

async function suggestPresents() {
    presentsBtn.disabled = true;

    if (!form.checkValidity()) {
        alert("Please fill out all required* fields.");
        presentsBtn.disabled = false;
        return;
    }

    const choices = (await CallChatGPT()).join(" OR ")
    console.log(choices)

    localStorage.setItem("choices", choices);
    localStorage.setItem("numPres", numPres.value);

    window.location.href = "results.html";

    presentsBtn.disabled = false;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    suggestPresents();
});