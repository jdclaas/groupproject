
// News API Variables
var apikey = "b0ea2322bfc0471a987b7f4ecef6a106"
var articleNum = 5;
var election = 2020;
var candidate;
var queryURL;
var candidateQueryURL;

// // On click of search button - push search term into election variable
// $('#search-button').on("click", function () {
//   event.preventDefault();
//   console.log("Submit Clicked")
//   election = $('#search-bar').val();
//   console.log("election: " + election)
//   queryURL = "https://newsapi.org/v2/everything?q=" + election + "&apiKey=" + apikey +
//     "&language=en&sources=fox-news,cnn";
//   console.log(queryURL)

//   dropboxrequest(queryURL)
// });


// function for adding dropbox links
function requestNews(url) {
  $.ajax({
    url: url,
    method: "GET"
  }).then(function (response) {
    $('#news-articles').empty()

    // Loop to bring back articles

    for (i = 0; i < articleNum; i++) {


      //  - number of articles requested - default is 5 (articleNum)	
      console.log(response.articles[i])
      var mainImg = response.articles[i].urlToImage; //img
      var title = response.articles[i].title; //atitle
      var description = response.articles[i].description; //blurb
      var published = response.articles[i].publishedAt; //time
      var articleURL = response.articles[i].url; //aurl

      var articleDiv = $('<div class="news-roll row">');


      var articleImg = $('<img class="news-img">');
      var imgData = $('<div class="img-area col-4">');
      articleImg.attr("src", mainImg);
      var url = $('<a>');
      url.attr("href", articleURL);
      url.append(articleImg);



      var newsData = $('<div class="news-area col-8">');
      var headline = $('<h3>').text(title);
      var link = $('<a>');
      link.attr("href", articleURL);
      link.append(headline);
      var snippet = $('<p id="snippet">').text(description);
      var pubDate = $('<p class="date">').text(published);

      imgData.append(url);

      newsData.append(link);
      newsData.append(pubDate);
      newsData.append(snippet);


      articleDiv.append(imgData);
      articleDiv.append(newsData);

      $('#news-articles').append(articleDiv);

    }

  });

}

// Modified version from here: http://davidwalsh.name/convert-xml-json
function xmlToJson(xml) {

// Create the return object
var obj = {};

if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
    obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
            var attribute = xml.attributes.item(j);
            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
    }
} else if (xml.nodeType == 3) { // text
    obj = xml.nodeValue;
}

// do children
// If just one text node inside
if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
    obj = xml.childNodes[0].nodeValue;
}
else if (xml.hasChildNodes()) {
    for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
            obj[nodeName] = xmlToJson(item);
        } else {
            if (typeof(obj[nodeName].push) == "undefined") {
                var old = obj[nodeName];
                obj[nodeName] = [];
                obj[nodeName].push(old);
            }
            obj[nodeName].push(xmlToJson(item));
        }
    }
}
return obj;
};

var candidateImg;
var firstName;
var lastName;
var gender;
var dob;
var placeOfBirth;
var party;
var office;
var votesSmartKey = "a8c2fd7495b5d4f49f009034402bffb1";
var VSQueryURL;

// Create the return object
VSQueryURL = "http://api.votesmart.org/CandidateBio.getBio?key="+votesSmartKey+"&candidateId=120012";
console.log("XML :" + VSQueryURL);

// Modified version from here: http://davidwalsh.name/convert-xml-json
function xmlToJson(xml) {

// Create the return object
var obj = {};

if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
    obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
            var attribute = xml.attributes.item(j);
            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
    }
} else if (xml.nodeType == 3) { // text
    obj = xml.nodeValue;
}

// do children
// If just one text node inside
if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
    obj = xml.childNodes[0].nodeValue;
}
else if (xml.hasChildNodes()) {
    for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
            obj[nodeName] = xmlToJson(item);
        } else {
            if (typeof(obj[nodeName].push) == "undefined") {
                var old = obj[nodeName];
                obj[nodeName] = [];
                obj[nodeName].push(old);
            }
            obj[nodeName].push(xmlToJson(item));
        }
    }
}
return obj;
};

// xmlToJson();
// console.log("Object: " + obj);

 $.ajax({
        url: VSQueryURL,
        method: "GET"
      }).then(function(response) {
            var json = xmlToJson(response);


            console.log(json)
            
           lastName = json.bio.candidate.lastName
           firstName = json.bio.candidate.firstName
           gender = json.bio.candidate.gender
           dob = json.bio.candidate.birthDate
           placeOfBirth = json.bio.candidate.birthPlace
           party = json.bio.office.parties
           candidateImg = json.bio.candidate.photo
           office = json.bio.office.stateId


           
        function createBio(event) {
        $(".card-hidden").removeClass(["card-hidden"]);

        $(".name").append(firstName + " " + lastName);
        $(".gender").append(gender);
        $(".dob").append(dob);
        $(".placeOfBirth").append(placeOfBirth);
        $(".party").append(party);
        $(".office").append(office);
        $(".card-img-top").attr('src', candidateImg);


};

$(document).ready(createBio);



});


queryURL = "https://newsapi.org/v2/everything?q=" + election + "&apiKey=" + apikey +
  "&language=en&sources=fox-news,cnn";
console.log(queryURL)
candidate = (firstName + " " + lastName);
console.log(candidate)
candidateQueryURL = "https://newsapi.org/v2/everything?q=" + candidate + "&apiKey=" + apikey +
  "&language=en&sources=fox-news,cnn";
console.log(candidateQueryURL)

requestNews(queryURL)
requestNews(candidateQueryURL)