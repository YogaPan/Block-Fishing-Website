console.log('block fishing website extension run background.');

// AJAX get block list.
function fetch(url) {
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
fetch('/block-list.json').then((blockList) => {
  console.log(blockList);
});

// TODO
function inBlockList(blockList, url) {
  for (let i = 0; i < blockList.length; i++) {
    if (url === blockList[i]) {
      return true
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
  if (inBlockList(tab)) {
    block();
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
