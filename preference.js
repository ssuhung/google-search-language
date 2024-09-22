function loadCheckboxState() {
    let isChecked;
    chrome.storage.local.get('jp', function(result){
        isChecked = result.jp;
        document.getElementsByClassName("option")[0].checked = isChecked;
    });
}

function saveCheckboxState() {
    let checkbox = document.getElementsByClassName("option")[0];
    chrome.storage.local.set({"jp": checkbox.checked});
}

document.getElementsByClassName("option")[0].addEventListener("change", saveCheckboxState);
window.onload = loadCheckboxState;
