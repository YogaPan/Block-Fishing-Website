const blocklist = require('../blocklist.json');

function isBlocked(url) {
  for (let i = 0; i < blocklist.length; i++) {
    const pattern = new RegExp(blocklist[i]);
    if (pattern.test(url)) {
      return true;
    }
  }

  return false;
}

function isPermitted(tab) {
  if (permitted.indexOf(tab.id) !== -1)
    return true;
  else
    return false;
}

function block(tab) {
  chrome.tabs.update(tab.id, {
    url: '/stop.html?to=' + encodeURIComponent(tab.url),
  });
}

function foo(tab) {
  if (isBlocked(tab.url)) {
    if (isPermitted(tab) === false)
      block(tab);
  }
}

// When new tab open.
chrome.tabs.onCreated.addListener((tab) => {
  foo(tab);
});

// When load new url.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  foo(tab);
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  const index = permitted.indexOf(tabId);

  if (index !== -1) {
    permitted.splice(index, 1);
  }
});

// Save permitted tabs id.
const permitted = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (permitted.indexOf(sender.tab.id) === -1)
    permitted.push(sender.tab.id);

  sendResponse({ message: "ok" });
});

function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}
