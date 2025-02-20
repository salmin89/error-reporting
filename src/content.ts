// @ts-ignore
import injectedUrl from "./injected?script&module";
// @ts-ignore
import syntaxError from "./syntaxError.js?script&module";

const script = document.createElement("script");
script.type = "module";
script.src = chrome.runtime.getURL(injectedUrl);
document.body.appendChild(script);


const syntaxErrorScript = document.createElement("script");
syntaxErrorScript.type = "module";
syntaxErrorScript.src = chrome.runtime.getURL(syntaxError);
document.body.appendChild(syntaxErrorScript);



window.onerror = function (message, source, lineno, colno, error) {
  console.error("Error in content.ts", {
    message,
    source,
    lineno,
    colno,
    error,
  });
};