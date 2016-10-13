var testContainer = document.getElementById('story-page');
var originalTest = testContainer.innerHTML;

function gueguerrify(request, sender, sendResponse) {
  // There is an hash in the current url
  // For an unknown reason, extension fails on this url
  if (window.location.href.split('#')[1]) {
    window.location = window.location.href.split('#')[0];
  }

  removeUselessDiv(request.sponsor);
  replaceState(request.type, request.review);
  chrome.runtime.onMessage.removeListener(gueguerrify);
}

/**
 * Removes useless divs for Guéguerre's review
 * @return null
 */
function removeUselessDiv(sponsor) {
  var review_content_container = document.getElementById('articleId');
  if (!review_content_container) { return; }
  setLogoCQPG();
  setBasedDavid(sponsor);
  review_content_container.parentNode.removeChild(review_content_container);

  var conclusion_container = document.getElementsByClassName('story-conclusion')[0];
  conclusion_container.parentNode.removeChild(conclusion_container);
}

function setLogoCQPG () {
  var imgReview = document.querySelector('.thumbnail.header').outerHTML;
  var logoCQPG = "<img style='position: absolute; z-index: 9999; left: 17px; top: 8px;' src='https://raw.githubusercontent.com/Truc75/avisgueguerre-extension/master/popup/images/logo-cqepg.png' />";
  var newImgReview = "<div style='position: relative;'>" + logoCQPG + imgReview + '</div>';

  document.querySelector('.thumbnail.header').outerHTML = newImgReview;
}

function setBasedDavid (sponsor) {
  var david = "<img style='position: absolute; z-index: 9999; right: 0px; bottom: -12px;' width='250' src='" + sponsor + "' />";
  
  document.querySelector('#news .loadmore').outerHTML = david;
  // document.querySelector('#news .loadmore').parentNode.insertBefore(david, document.querySelector('#news .loadmore').nextSibling);
}


/**
 * @param  {String}
 * @param  {Object}
 * @return null
 */
function replaceState(type, review) {
  var gameName = document.querySelector('h1').textContent.split('Test de').filter(String)[0] || "GK Branlos";

  templating({
    gameName: gameName,
    author: getAuthor(type),
    content: review
  });
}

/**
 * @param  {String}
 * @return {String}
 */
function getAuthor (type) {
  switch (type) {
    case 'nsex':
      return "Un Nsex (Pas Paradave)";
    break;
    case 'pctrons':
      return "Un PCtron";
    break;
    case 'mougeons':
      return "Un Mougeon";
    break;
    case 'bouzeux':
      return "Un Bouzeux";
    break;
  }
}

function templating (datas) {
  document.querySelector('.titleh1').innerHTML = "Ce qu'en pense guéguerre : " + datas.gameName.trim();
  document.querySelector('.summary').innerHTML = '<p>' + datas.content.description + '</p>';
  document.querySelector('.byline').innerHTML = '<p class="byline"><strong>Test complet</strong>, par <strong><span itemprop="reviewer">' + datas.author + '</span></strong></p>';
  document.querySelector('.meta').innerHTML = 'Tags : <a href="/plateforme/playstation-4-160101.html">Guéguerre</a>, <a href="/jeux/jeux-video.html?genre=aventure">Bon goût</a>, <a href="/jeux/jeux-video.html?genre=aventure">Avis pertinent</a>';
  document.querySelector('.mentions').innerHTML = 'Ce <strong>test de ' + datas.gameName.trim() +'</strong> a été réalisé à partir d\'une version du commerce (Indépendance 5/5).';
}

chrome.runtime.onMessage.addListener(gueguerrify);