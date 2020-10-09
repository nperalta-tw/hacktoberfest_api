const chuckNorrisInterval = window.setInterval(getChuckNorrisJoke, 10000)
const giphyApiKey = 'z4TPqSnJc87Ur4Lqc1N10pxk9cZfLKqg'
const giphyBaseURL = "https://api.giphy.com/v1/gifs/"

$('#pills-tab a').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$(document).ready(function() {
	let giphy = {
		baseURL: giphyBaseURL,
		apiKey: giphyApiKey,
		tag: "halloween",
		type: "random",
		rating: "pg-13"
	};
	const $gif_wrap = $("#gif-wrap");
	let giphyURL = encodeURI(
		giphy.baseURL +
			giphy.type +
			"?api_key=" +
			giphy.apiKey +
			"&tag=" +
			giphy.tag +
			"&rating=" +
			giphy.rating
  );
  console.log(giphyURL);
	var newGif = () => $.getJSON(giphyURL, json => renderGif(json.data));
	var renderGif = _giphy => {
		$gif_wrap.css({
			"background-image": 'url("' + _giphy.image_original_url + '")'
		});
	};
	newGif();
	const newGifButton = $('#new-gif');
  newGifButton.click(newGif)
  
  var allLinks = document.getElementsByTagName('h5')
  let words = document.getElementById('latest-word');

  var recognition = new webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.start();

  recognition.onresult = function(event){
    let resultsLength = event.results.length -1 ;
    let ArrayLength = event.results[resultsLength].length -1;
    let saidWord = event.results[resultsLength][ArrayLength].transcript;
    
    for (i=0; i<allLinks.length; i++) {
      let dataWord = allLinks[i].dataset.word;
      if (saidWord.indexOf(dataWord) != -1) {
        for(let link of allLinks) {
          link.style.display = 'none'
        };
        allLinks[i].setAttribute('data-before', saidWord);
        allLinks[i].setAttribute('data-after', saidWord);
        allLinks[i].style.display = 'block';
      }
    }
    words.innerHTML = saidWord;
  }

  recognition.onerror = function(event){
    console.log('error?');
    console.log(event);
  }

  activateWinterSolider();
});

function activateWinterSolider(){
  let giphy = {
    baseURL: giphyBaseURL,
    apiKey: giphyApiKey,
  };
  let $winterSoldierGif = $("#winterSoldierGif");
  let giphyURL = encodeURI(
    giphy.baseURL + 'Q3exUcgPZw01QX3fIW' + "?api_key=" + giphy.apiKey
  );
  console.log('soldier url ' + giphyURL);
  var newGif = () => $.getJSON(giphyURL, json => renderGif(json.data));
  var renderGif = _giphy => {
    $winterSoldierGif.css({
      "background-image": 'url("' + _giphy.images.original.url + '")'
    });
  };
  newGif();
}

function getChuckNorrisJoke() {
  const url = "https://api.chucknorris.io/jokes/random";
  axios.get(url)
    .then((res) => {
      let joke = res.data.value
      console.log(res.data.value);
      $('#joke').replaceWith('<div id="joke"><h1 class="chuck-norris">' + joke + '</h1></div>')
    })
    .catch((error) => {
      console.log(error);
    });
}

getChuckNorrisJoke();
