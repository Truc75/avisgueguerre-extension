var testContainer = document.getElementById('story-page');
var originalTest = testContainer.innerHTML;

function gueguerrify(request, sender, sendResponse) {
  removeUselessDiv();

  replaceState(request.type, request.review);
  chrome.runtime.onMessage.removeListener(gueguerrify);
}

/**
 * Removes useless divs for Guéguerre's review
 * @return null
 */
function removeUselessDiv() {
  var elem = document.getElementById('articleId');
  if (!elem) { return; }
  elem.parentNode.removeChild(elem);

  var foo = document.getElementsByClassName('story-conclusion')[0];
  foo.parentNode.removeChild(foo);
}

/**
 * @param  {String}
 * @param  {Object}
 * @return null
 */
function replaceState(type, review) {
  var gameName = document.querySelector('h1').textContent.split('Test de').filter(String)[0] || "GK Branlos"

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
      return "Un Nsex (Pas Paradave)"
    break;
    case 'pctrons':
      return "Un PCtron"
    break;
    case 'mougeons':
      return "Un Mougeon"
    break;
    case 'bouzeux':
      return "Un Bouzeux"
    break;
  }
}

function templating (datas) {
  document.querySelector('.titleh1').innerHTML = "Ce que guéguerre pense de " + datas.gameName.trim();
  document.querySelector('.summary').innerHTML = '<p>' + datas.content.description  + '</p>';
  document.querySelector('.byline').innerHTML = '<p class="byline"><strong>Test complet</strong>, par <strong><span itemprop="reviewer">' + datas.author + '</span></strong> - <time datetime="2016-10-06 17:00:00" itemprop="dtreviewed">Jeudi 06/10/2016 à 17h 00</time></p>';
  document.querySelector('.meta').innerHTML = 'Tags : <a href="/plateforme/playstation-4-160101.html">Guéguerre</a>, <a href="/jeux/jeux-video.html?genre=aventure">Bon goût</a>, <a href="/jeux/jeux-video.html?genre=aventure">Avis pertinent</a>';
  document.querySelector('.mentions').innerHTML = 'Ce <strong>test de Uncharted 4 : A Thief\'s End</strong> a été réalisé à partir d\'une version du commerce (Indépendance 5/5).';
}

chrome.runtime.onMessage.addListener(gueguerrify);