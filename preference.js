function loadCheckboxState() {
    let isChecked;
    chrome.storage.local.get('jp', function(result){
        isChecked = result.jp;
        document.getElementById("japaneseCheckbox").checked = isChecked;
    });
}

function saveCheckboxState() {
    let checkbox = document.getElementById("japaneseCheckbox");
    chrome.storage.local.set({"jp": checkbox.checked});
}

document.getElementById("japaneseCheckbox").addEventListener("change", saveCheckboxState);
window.onload = loadCheckboxState;
