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

function replaceUrlParam(url, paramValue) {
  if (paramValue == null) {
    paramValue = "";
  }
  var pattern = new RegExp("\\b(lr=).*?(&|#|$)");
  if (url.search(pattern) >= 0) {
    return url.replace(pattern, "$1" + paramValue + "$2");
  }
  url = url.replace(/[?#]$/, "");
  return (
    url + (url.indexOf("?") > 0 ? "&" : "?") + "lr" + "=" + paramValue
  );
}

function getLanguageOn() {
  return new Promise((resolve, reject) => {
      chrome.storage.sync.get("languages", function(result) {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(result.languages);
          }
      });
  });
}

async function loadCheckboxState() {
  let language_dict = await getLanguageOn();
  let currentUrl = window.location.href;

  const original = [...document.querySelectorAll('[jsname="xl07Ob"]')]
  .at(-1)
  ?.querySelector(':nth-child(5)');

  if (language_dict) {
    for (const [lang, lang_name] of Object.entries(language_dict)) {
      const clone = original.cloneNode(true);

      clone.firstChild.firstChild.text = lang_name;
      clone.firstChild.firstChild.href = replaceUrlParam(currentUrl, language_to_code[lang]);

      original.parentNode.insertBefore(clone, original.nextSibling);

    }
  }
}

function waitForMenuAndInsertButtons() {
  const xpath = "//*[@jsname='xl07Ob'][2]";
  const observer = new MutationObserver(() => {
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const element = result.singleNodeValue;
    if (element) {
      observer.disconnect();
      loadCheckboxState();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

waitForMenuAndInsertButtons();
