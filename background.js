console.log('block fishing website extension run background.');

chrome.tabs.onCreated.addListener((tab) => {
  console.log(`block ${tab.url}!`);

  const originUrl = tab.url;

  if (tab.url === 'https://www.facebook.com/') {
    chrome.tabs.update(tab.id, {
      url: '/stop.html',
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(`redirect from ${tab.url} to facebook!`);

  if (tab.url === 'https://www.facebook.com/') {
    chrome.tabs.update(tabId, {
      url: '/stop.html',
    });
  }
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
