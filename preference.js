function loadCheckboxState() {
    let isChecked;
    chrome.storage.local.get('language_on', function(result){
        isChecked = result.language_on;
        document.getElementById("japaneseCheckbox").checked = isChecked;
    });
}

function saveCheckboxState() {
    let checkbox = document.getElementById("japaneseCheckbox");
    chrome.storage.local.set({"language_on": checkbox.checked});
}

document.getElementById("japaneseCheckbox").addEventListener("change", saveCheckboxState);
window.onload = loadCheckboxState;
