fetch('https://raw.githubusercontent.com/Truc75/avisgueguerre-extension/master/popup/content_scripts/avisgueguerre.json')
.then(function(response) {
  return response.json();
}).then(function(reviews) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currentTab = tabs[0];
    console.log(currentTab)
    var buttonsSelector = document.querySelectorAll('button');

    // We are not in a classic webpage
    if (!currentTab.url || currentTab.url.indexOf('/') < 0) {
      disabledAllButtons(buttonsSelector);
      return;
    }

    var idTest = currentTab.url.match(/\-(.*?)\./)[1].split('-')[currentTab.url.match(/\-(.*?)\./)[1].split('-').length - 1];

    if (!reviews[idTest]) {
      disabledAllButtons(buttonsSelector);
      return;
    }

    for (var i = 0; i < buttonsSelector.length; i++) {
      var button = buttonsSelector[i];
      if (Object.keys(reviews[idTest].reviews).indexOf(button.dataset.reviewType) < 0) {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    }

    bindEvents(reviews, tabs);
  });
});


function disabledAllButtons (selector) {
  for (var i = 0; i < selector.length; i++) {
    var button = selector[i];
    button.disabled = true;
  }
}


function bindEvents(reviews, tabs) {
  var currentTab = tabs[0];

  document.addEventListener("click", function(e) {
    if (!e.target.classList.contains("review-item")) {
      return;
    }

    if (document.querySelector(".active")) {
      document.querySelector(".active").classList.remove("active");
    }

    e.target.classList.add("active");

    var reviewType = e.originalTarget.dataset.reviewType;

    chrome.tabs.executeScript(null, {
      file: "./content_scripts/gueguerrify.js"
    });

    var idTest = currentTab.url.match(/\-(.*?)\./)[1].split('-')[currentTab.url.match(/\-(.*?)\./)[1].split('-').length - 1];

    var review = reviews[idTest].reviews[reviewType] ;
    chrome.tabs.sendMessage(tabs[0].id, {type: reviewType, review: review});
  });
}


