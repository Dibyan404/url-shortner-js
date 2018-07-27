// Include data for accessing Google APIs

const apiKey = 'AIzaSyCxhNsopuSURTgIsVbqopQ0BwY4BGj4KJ4';
const url = 'https://www.googleapis.com/urlshortener/v1/url';
const projection = 'FULL';

// Some page elements

const $inputField = $('#input');
const $shortenButton = $('#shorten');
const $expandButton = $('#expand');
const $responseField = $('#responseField');

// AJAX functions

function expandUrl() {
    const urlToExpand = url + '?key=' + apiKey + '&shortUrl=' + $inputField.val();
    /*const xhr = new XMLHttpRequest;
  xhr.responseType = 'json';
 xhr.onreadystatechange = function(){
   if(xhr.readyState === XMLHttpRequest.DONE){
     console.log(xhr.response);
     $responseField.append('<p>Your expanded url is: </p><p>'  + xhr.response.longUrl + '</p>');
   }
 }

 xhr.open('GET',urlToExpand);
  xhr.send(); */
    /*
  //Refactoring using Ajax
  $.ajax({
    url:urlToExpand,
    type:'GET',
    dataType:'json',
    success(response){
      $responseField.append('<p>Your expanded url is: </p><p>'+response.longUrl + '</p>');
    },
    error(jqXHR,status,errorThrown){
      console.log(jqXHR);
    }
  });
  */

    //Refactoring using get method call

    $.getJSON(urlToExpand,response =>{$responseField.append('<p>Your expanded url is: </p><p>' + response.longUrl + '</p>');});
}

function shortenUrl() {
    const urlWithKey = url + '?key=' + apiKey; //includes our apikey at the end of the URL
    const urlToShorten = $inputField.val();
    //this grabs what the user enters in to the input field

    /*
  const data = JSON.stringify({longUrl:urlToShorten}); //When we made the expand request, we sent the short URL that we wanted to expand at the end of the API endpoint URL. Because this a POST request, we need to send the long URL in the .send() method. We create an object with the longUrl property that has urlToShorten as its value and stringify it.
  const xhr = new XMLHttpRequest;
  xhr.responseType = 'json';
  xhr.onreadystatechange = function(){
    if(xhr.readyState === XMLHttpRequest.DONE){
      console.log(xhr.response);
      $responseField.append('<p>Your shortened url is: </p><p>'+xhr.response.id + '</p>');
    }
  }
  xhr.open('POST',urlWithKey);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.send(data) */
    /*
  //Refactoring ajax

  $.ajax({
    url: urlWithKey,
    type:'POST',
    data:JSON.stringify({longUrl:urlToShorten}),
    dataType:'json',
    contentType:'application/json',
    success(response){
      console.log(response);
      $responseField.append('<p>Your shortened url is: </p><p>' +response.id+ '</p>');
    },
    error(jqXHR,status,errorThrown){
      console.log(jqXHR);
    }

  });
  */

    //refactoring using post call method
    $.post({
        url: urlWithKey,
        data:JSON.stringify({longUrl:urlToShorten}),
        contentType:'application/json',
        success(response){
            console.log(response);
            $responseField.append('<p>Your shortened url is: </p><p>' +response.id+ '</p>');
        },
        error(jqXHR,status,errorThrown){
            console.log(jqXHR);
        }

    });
}

function expand() {
    $responseField.empty();
    expandUrl();
    return false;
}

function shorten() {
    $responseField.empty();
    shortenUrl();
    return false;
}

// Call functions on submit

$expandButton.click(expand);
$shortenButton.click(shorten);
