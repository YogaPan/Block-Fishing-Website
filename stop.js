function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

document.getElementById('back').addEventListener('click', () => {
  window.history.go(-2);
});

document.getElementById('continue').addEventListener('click', () => {
  getCurrentTabId((id) => {
    chrome.runtime.sendMessage({}, (response) => {
      if (response.message = 'ok')
        window.location.href = getParameterByName('to');
    });
  });
});

document.getElementById('continueNoAds').addEventListener('click', () => {
  window.location.href = getParameterByName('to');
});

function getCurrentTabId(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var id = tab.id;

    console.assert(typeof id == 'number', 'tab.url should be a number');

    callback(id);
  });
}