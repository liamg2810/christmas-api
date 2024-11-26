import { CallChatGPT } from "./chat.js";
import { SearchForPresent } from "./search.js";

const form = document.getElementById("form");

const presentsBtn = document.getElementById("presents-button");

presentsBtn.addEventListener("click", suggestPresents);

async function suggestPresents() {
    presentsBtn.disabled = true;

    if (!form.checkValidity()) {
        alert("Please fill out all fields.");
        return;
    }


    const choices = (await CallChatGPT()).join(" OR ")
    console.log(choices)
    
}