import { SearchForPresent } from "./search.js";

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

async function LoadResults() {
    const choices = localStorage.getItem("choices");
    const numPres = localStorage.getItem("numPres");
    
    if (!choices || !numPres) {
        localStorage.clear();
        window.location.href = "index.html";
        return;
    }
    
    var suggestions =  await SearchForPresent(choices);

    var suggestionList = document.getElementById("suggestion-list");
    suggestionList.innerHTML = "";

    for (var i = 0; i < suggestions.length && i < numPres; i++) {
        var li = document.createElement("li");
        li.className = "suggestion";

        var info = document.createElement("div");
        info.className = "info";

        var img = document.createElement("img");
        img.src = suggestions[i].thumbnail;
        img.alt = suggestions[i].title;

        var title = document.createElement("h3");
        title.textContent = suggestions[i].title;

        var price = document.createElement("span");
        price.textContent = suggestions[i].price;

        var targetUrl = document.createElement("span");
        targetUrl.textContent = suggestions[i].seller;
        targetUrl.className = "target-url";

        var link = document.createElement("a");
        link.href = suggestions[i].link;
        link.textContent = "Buy now";
        link.className = "buy-now";
        link.target = "_blank";

        li.appendChild(img);
        info.appendChild(title);
        info.appendChild(price);
        info.appendChild(targetUrl);
        info.appendChild(link);
        li.appendChild(info);

        suggestionList.appendChild(li);
    }

    document.getElementById("suggestions").style.display = "block";
    presentsBtn.disabled = false;


}

function GoHome() {
    localStorage.clear();
    window.location.href = "index.html";
}

document.getElementById("back-btn").addEventListener("click", GoHome);

LoadResults()