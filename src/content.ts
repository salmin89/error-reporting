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




const referenceError = document.querySelector("#referenceError")!;
const typeError = document.querySelector("#typeError")!;
const rangeError = document.querySelector("#rangeError")!;
const uriError = document.querySelector("#uriError")!;
const networkError = document.querySelector("#networkError")!;
const customError = document.querySelector("#customError")!;

referenceError.addEventListener("click", function referenceError() {
  // @ts-ignore
  console.log(undefinedVariable); // Variable doesn't exist
  // @ts-ignore
  nonExistentFunction(); // Function hasn't been declared
});

typeError.addEventListener("click", function typeError() {
  const num = 42;
  // @ts-ignore
  num.toUpperCase(); // Can't call string methods on numbers
  // @ts-ignore
  null.toString(); // Can't call methods on null
});

rangeError.addEventListener("click", function rangeError() {
  const arr = new Array(-1); // Can't create array with negative length
  (123).toFixed(101); // toFixed() only accepts 0-100
});

uriError.addEventListener("click", function uriError() {
  decodeURIComponent("%"); // Invalid URI encoding
});

networkError.addEventListener("click", function networkError() {
  fetch("nonexistent-url.com").catch((error) =>
    console.log("Network error:", error)
  );
});

customError.addEventListener("click", function customError() {
  class ValidationError extends Error {
    // @ts-ignore
    constructor(message) {
      super(message);
      this.name = "ValidationError";
    }
  }

  throw new ValidationError("Custom error message");
});

// METHOD #1
window.onerror = function (message, source, lineno, colno, error) {
  console.log("Error in content.ts #1", {
    message,
    source,
    lineno,
    colno,
    error,
  });
};

// METHOD #2
window.addEventListener(
  "error",
  (error: ErrorEvent) => {
    console.log("Error in content.ts #2", error);
  },
  true
);
