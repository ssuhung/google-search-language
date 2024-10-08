function loadCheckboxState() {
    let option_list = document.getElementsByClassName("option");

    for (let i = 0; i < option_list.length; i++) {
        const element = option_list[i];
        chrome.storage.sync.get("languages", function(result){
            if (result.languages) {
                let dict = result.languages;
                if (element.id in dict) element.checked = true;
            }
            else {
                chrome.storage.sync.set({"languages": {}});
            }
        });
    }
}

function saveCheckboxState(event) {
    let ele = event.target;
    let id = ele.id;

    chrome.storage.sync.get("languages", function(result){
        let dict = result.languages;
        if (ele.checked) dict[id] = ele.name;
        else  delete dict[id];

        chrome.storage.sync.set({"languages": dict});
    });
}


let option_list = document.getElementsByClassName("option");
for (let i = 0; i < option_list.length; i++) {
    let option = option_list[i];
    option.addEventListener("change", saveCheckboxState);
}
window.onload = loadCheckboxState;
