// @ts-ignore
import dynamicInjectedUrl from "./dynamic-injected?script&module";
console.log(dynamicInjectedUrl)
const dynamicScript = {
  id: "dynamic-injected",
  js: [dynamicInjectedUrl],
  matches: ["<all_urls>"],
  world: "MAIN",
} satisfies chrome.scripting.RegisteredContentScript;

(async () => {
  const scripts = await chrome.scripting.getRegisteredContentScripts({
    ids: [dynamicScript.id],
  });

  if (scripts.length) {
    await chrome.scripting.updateContentScripts([dynamicScript]);
  } else {
    await chrome.scripting.registerContentScripts([dynamicScript]);
  }
})();


// on errors log in the background
