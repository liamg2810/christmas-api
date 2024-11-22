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


    const choices = await CallChatGPT()
    var suggestions = choices.map(async (choice) => await SearchForPresent(choice));

    var suggestionList = document.getElementById("suggestion-list");
    suggestionList.innerHTML = "";

    console.log(suggestions)

    for (var h = 0; h < suggestions.length; h++) {
        var suggestion = await suggestions[h];
        for (var i = 0; i < suggestion.length && i < 5; i++) {
            console.log(suggestion)
    
            var li = document.createElement("li");
            li.className = "suggestion";
    
            var info = document.createElement("div");
            info.className = "info";
    
            var img = document.createElement("img");
            img.src = suggestion[i].thumbnail;
            img.alt = suggestion[i].title;
    
            var title = document.createElement("h3");
            title.textContent = suggestion[i].title;
    
            var price = document.createElement("span");
            price.textContent = suggestion[i].price;
    
            var link = document.createElement("a");
            link.href = suggestion[i].link;
            link.textContent = "Buy now";
            link.className = "buy-now";
            link.target = "_blank";
    
            li.appendChild(img);
            info.appendChild(title);
            info.appendChild(price);
            info.appendChild(link);
            li.appendChild(info);
    
            suggestionList.appendChild(li);
        }
    }

    document.getElementById("suggestions").style.display = "block";
    presentsBtn.disabled = false;
}