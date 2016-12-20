console.log('block fishing website extension run background.');

// AJAX get block list.
function getResponse(url) {
  return new Promise((resolve, reject) => {
    const httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        resolve(this.responseText);
      } else {
        reject('error!');
      }
    }

    httpRequest.open('GET', '/block-list.json')
    httpRequest.send()
  });
}

// test.
getResponse('/block-list.json').then((blockList) => {
  console.log(blockList);
});

function stop(tab) {
  console.log(`block ${tab.url}!`);

  const originUrl = tab.url;

  if (tab.url === 'https://www.facebook.com/') {
    chrome.tabs.update(tab.id, {
      url: '/stop.html',
    });
  }
}

// When new tab open.
chrome.tabs.onCreated.addListener((tab) => {
  stop(tab);
});

// When load new url.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  stop(tab);
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
