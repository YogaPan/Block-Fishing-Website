const blocklist = require('../blocklist.json');

console.log('block fishing website extension run background.');

// TODO
function inBlockList(blocklist, url) {
  for (let i = 0; i < blocklist.length; i++) {
    const pattern = new RegExp(blocklist[i]);
    if (pattern.test(url)) {
      return true;
    }
  }

  return false;
}

function block(tab) {
  console.log(`block ${tab.url}!`);

  chrome.tabs.update(tab.id, {
    url: '/stop.html',
  });
}

function foo(tab) {
  if (inBlockList(blocklist, tab.url)) {
  console.log('foo');
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
