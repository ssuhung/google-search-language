function getLanguageOn() {
  return new Promise((resolve, reject) => {
      chrome.storage.local.get("languages", function(result) {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(result.languages);
          }
      });
  });
}

function createHandler(lang){
  return function () {
    const language_to_code = {
      "af": "lang_af",
      "ar": "lang_ar",
      "hy": "lang_hy",
      "be": "lang_be",
      "bg": "lang_bg",
      "ca": "lang_ca",
      "zh-CN": "lang_zh-CN",
      "zh-TW": "lang_zh-TW",
      "hr": "lang_hr",
      "cs": "lang_cs",
      "da": "lang_da",
      "nl": "lang_nl",
      "en": "lang_en",
      "eo": "lang_eo",
      "et": "lang_et",
      "tl": "lang_tl",
      "fi": "lang_fi",
      "fr": "lang_fr",
      "de": "lang_de",
      "el": "lang_el",
      "iw": "lang_iw",
      "hi": "lang_hi",
      "hu": "lang_hu",
      "is": "lang_is",
      "id": "lang_id",
      "it": "lang_it",
      "ja": "lang_ja",
      "ko": "lang_ko",
      "lv": "lang_lv",
      "lt": "lang_lt",
      "no": "lang_no",
      "fa": "lang_fa",
      "pl": "lang_pl",
      "pt": "lang_pt",
      "ro": "lang_ro",
      "ru": "lang_ru",
      "sr": "lang_sr",
      "sk": "lang_sk",
      "sl": "lang_sl",
      "es": "lang_es",
      "sw": "lang_sw",
      "sv": "lang_sv",
      "th": "lang_th",
      "tr": "lang_tr",
      "uk": "lang_uk",
      "vi": "lang_vi"
    };
    let currentUrl = window.location.href;
    let code = language_to_code[lang];
    let newUrl = currentUrl + `&lr=${code}`;
    
    window.location.href = newUrl;
  }
}

// Wait until the DOM is fully loaded
// document.addEventListener("DOMContentLoaded", function() {
async function loadCheckboxState() {
  let language_dict = await getLanguageOn();
  
  if (language_dict) {
    for (const [lang, lang_name] of Object.entries(language_dict)) {
      let link = document.createElement("a");
      link.innerHTML = lang_name;
      link.addEventListener("click", createHandler(lang));
      
      link.style.color = "#9e9e9e";
      link.style.display = "inline-block";
      link.style.position = "relative";
      link.style.paddingTop = "0";
      link.style.paddingBottom = "0";
      link.style.paddingRight = "12px";
      link.style.paddingLeft = "12px";
      link.style.marginLeft = "12px";
      link.style.lineHeight = "22px";
      link.style.cursor = "pointer";
      link.onmouseover = function() {link.style.color = "#ddd";}
      link.onmouseleave = function() {link.style.color = "#9e9e9e";}
      
      let xpath = "//*[@id='hdtbMenus']/div";
      let result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
      let element = result.singleNodeValue;
      
      element.appendChild(link);
    }
  }
}

loadCheckboxState();
//   });
