$('#navId a').click(e => {
    e.preventDefault();
    $(this).tab('show');
  });

var apikey = "b0ea2322bfc0471a987b7f4ecef6a106"
var articleNum = 5;
var don = "donald trump"
var bernie = "bernie sanders"
var kamala = "Kamala D. Harris"
var cory = "Cory Booker"

var candidate = 2020;
var queryURL;

// On click of search button - push search term into candidate variable
$('#search-button').on("click", function () {
  event.preventDefault();
  console.log("Submit Clicked")
  candidate = $('#search-bar').val();
  console.log("Candidate: " + candidate)
  queryURL = "https://newsapi.org/v2/everything?q=" + candidate + "&apiKey=" + apikey +
    "&language=en&sources=fox-news,cnn";
  console.log(queryURL)

  dropboxrequest(queryURL)
});


// function for adding dropbox links
function dropboxrequest(url) {
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











//  - number of articles requested - default is 5 (articleNum)	
/*    console.log(response.articles[i]) 	
        var articleDiv = $('<div class="news-roll row">');	
          console.log(articleDiv)	
        var headline = $('<h3>').text(response.articles[i].title);	
          console.log(response.articles[i].title);	
        var snippet = $('<span id="snippet">').text(response.articles[i].description);	
          console.log(response.articles[i].description)        	
        var articleImg = $('<img class="news-img">');	
            articleImg.attr("src", response.articles[i].urlToImage);	
          console.log(response.articles[i].urlToImage);	
        var pubDate = $('<span>').text(response.articles[i].publishedAt);	
          console.log(response.articles[i].publishedAt);	
        var url = $('<a>');	
            url.attr("href", response.articles[i].url);	
            url.append(headline);	
            url.append(articleImg);	
          console.log(response.articles[i].url);	
        articleDiv.append(url);	
        articleDiv.append(pubDate);	
        articleDiv.append(snippet);	
          console.log("Article Div: " + articleDiv)	
        $("#news-articles").append(articleDiv)	
    }*/



// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(response) {


//   // Loop to bring back articles

//   for (i = 0; i < articleNum; i++) {
//   //  - number of articles requested - default is 5 (articleNum)
//       console.log(response.response.docs[i]) 
//       var articleDiv = $('<div class="news-roll">');
//       console.log(articleDiv)
//       var headlineText = JSON.stringify(response.response.docs[i].headline.main);
//       headlineText = headlineText.slice(1, -1);
//       var headline = $('<h2>').text(headlineText);
//       console.log(headlineText);
//       var snippetText = response.response.docs[i].snippet;
//       var snippet = $('<p>').text(snippetText);
//       var breakBR = $('<br>')
//       console.log(snippetText)
//       var articleImgPath = JSON.stringify(response.response.docs[i].multimedia[0].url);
//       var articleImgURL = articleImgPath.slice(1, -1);
//       articleImgURL = ("https://www.nytimes.com/" + articleImgURL);
//       var articleImg = $('<img class="news-img">');
//   articleImg.attr("src", articleImgURL);
//   console.log(articleImgURL)
//   articleDiv.append(articleImg);
//   articleDiv.append(headline);
//   articleDiv.append(snippet);
//   articleDiv.append(breakBR);
//   console.log("Article Div: " + articleDiv)
//   $("#news-articles").append(articleDiv)
//   }

// });


// Grab text the user typed into the search input, add to the queryParams object
// candidate = $(".form-control")
//      .val()
//     .trim();

// On click listeners for Drop down
$("#donald").click(function () {
  console.log("Donald Trump")
  candidate = don
  queryURL = "https://newsapi.org/v2/everything?q=" + candidate + "&apiKey=" + apikey +
    "&language=en&sources=fox-news,cnn";
  console.log(queryURL)
  dropboxrequest(queryURL)




});
$("#bernie").click(function () {
  console.log("Bernie Sanders")
  queryURL = "https://newsapi.org/v2/everything?q=" + candidate + "&apiKey=" + apikey +
    "&language=en&sources=fox-news,cnn";
  console.log(queryURL)
  dropboxrequest(queryURL);
});
$("#kamala").click(function () {
  console.log("Kamala D. Harris")
  queryURL = "https://newsapi.org/v2/everything?q=" + candidate + "&apiKey=" + apikey +
    "&language=en&sources=fox-news,cnn";
  console.log(queryURL)
  dropboxrequest(queryURL);
});
$("#cory").click(function () {
  console.log("Cory")
  queryURL = "https://newsapi.org/v2/everything?q=" + candidate + "&apiKey=" + apikey +
    "&language=en&sources=fox-news,cnn";
  console.log(queryURL)
  dropboxrequest(queryURL);
});

queryURL = "https://newsapi.org/v2/everything?q=" + candidate + "&apiKey=" + apikey +
  "&language=en&sources=fox-news,cnn";
console.log(queryURL)

dropboxrequest(queryURL)