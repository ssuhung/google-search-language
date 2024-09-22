function getLanguageOn() {
  return new Promise((resolve, reject) => {
      chrome.storage.local.get('jp', function(result) {
          if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
          } else {
              resolve(result.jp);
          }
      });
  });
}

function handleButtonClick() {
    let currentUrl = window.location.href;
    let newUrl = currentUrl + "&lr=lang_ja";
  
    window.location.href = newUrl;
  }

// Wait until the DOM is fully loaded
// document.addEventListener("DOMContentLoaded", function() {
async function loadCheckboxState() {
  let isChecked = await getLanguageOn();
  
  if (isChecked){
    let link = document.createElement("a");
    link.addEventListener("click", handleButtonClick);
    link.innerHTML = "Japanese";
    
    link.style.color = "#9e9e9e";
    link.style.display = "inline-block";
    link.style.position = "relative";
    link.style.paddingTop = "0";
    link.style.paddingBottom = "0";
    link.style.paddingRight = "18px";
    link.style.paddingLeft = "12px";
    link.style.marginLeft = "12px";
    link.style.lineHeight = "22px";
    link.style.cursor = "pointer";
    
    let xpath = "//*[@id='hdtbMenus']/div";
    let result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let element = result.singleNodeValue;
    
    element.appendChild(link);
  }
}

loadCheckboxState();
//   });
