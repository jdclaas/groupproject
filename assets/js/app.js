$(document).ready(function() {

    // News API Variables
   var apikey = "b0ea2322bfc0471a987b7f4ecef6a106"
   var articleNum = 5;
   var election = 2020;
   var candidate;
   var candidateId;
   var queryURL;
   var candidateQueryURL;

    // VoteSmart API Variables
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

    // Candidates Menu Variables
   var candidateObj = [{
       name: "Donald Trump",
       id: "15723"},
       {
       name: "Michael Bennet",
       id: "110942"},
       {
       name: "Joe Biden",
       id: "53279"},
       {
       name: "Bill de Blasio",
       id: "80257"},
       {
       name: "Cory Booker",
       id: "76151"},
       {
       name: "Steve Bullock",
       id: "110899"},
       {
       name: "Pete Buttigieg",
       id: "127151"},
       {
       name: "Julian Catro",
       id: "115371"},
       {
       name: "John Delaney",
       id: "135143"},
       {
       name: "Tulsi Gabbard",
       id: "129306"},
       {
       name: "Kirsten Gillibrand",
       id: "65147"},
       {
       name: "Kamala Harris",
       id: "120012"},
       {
       name: "John Hickenlooper",
       id: "71547"},
       {
       name: "Jay Inslee",
       id: "27125"},
       {
       name: "Amy Klobuchar",
       id: "65092"},
       {
       name: "Wayne Messam",
       id: "130228"},
       {
       name: "Seth Moulton",
       id: "146299"},
       {
       name: "Beto O’Rourke",
       id: "78533"},
       {
       name: "Tim Ryan",
       id: "45638"},
       {
       name: "Bernie Sanders",
       id: "27110"},
       {
       name: "Eric Swalwell",
       id: "129529"},
       {
       name: "Elizabeth Warren",
       id: "141272"},
       {
       name: "Bill Weld",
       id: "21733"},
       {
       name: "Marianne Williamson",
       id: "146092"},
       {
       name: "Andrew Yang",
       id: "186040"}]

        console.log(candidateObj)
       console.log(candidateObj[2].name)
       console.log(candidateObj[2].id)

    // On click of search button - push search term into candidate variable
    $('#search-button').on("click", function () {
        event.preventDefault();
        console.log("Submit Clicked")
        candidate = $('#search-bar').val();
        console.log("Candidate: " + candidate)
        queryURL = "https://newsapi.org/v2/everything?q=" + candidate + "&apiKey=" + apikey +
          "&language=en&sources=fox-news,cnn";
        console.log(queryURL)
  
        requestNews(queryURL)
    });

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

    };

    // Make Candidate Menu
   function makeCandidate() {
   // $("body").on("click", function () {
       for (var x = 0; x < candidateObj.length; x++) {
           console.log(candidateObj[x].name, candidateObj[x].id);
           var candidateDiv = $('<div>');
           candidateDiv.attr("class", "col-md-3 candidate")
           candidateId = candidateObj[x].id
           candidateDiv.attr("id", candidateId);
           var candidatePhoto = $('<img>');
           var candidatePhotoURL = "https://static.votesmart.org/canphoto/" + candidateId + ".jpg"
           candidatePhoto.attr("src", candidatePhotoURL);
           var candidateNameText = candidateObj[x].name
           var br = $('<br>');
           var candidateName = $('<span>');
           candidateName.text(candidateNameText);
           candidateDiv.attr("name", candidateNameText)
           console.log(candidatePhotoURL, candidateNameText)

            candidateDiv.append(candidatePhoto);
           candidateDiv.append(br);
           candidateDiv.append(candidateName);

            $("#menu").append(candidateDiv);
       }
   };


    // On click of search button - push search term into election variable
   $('body').on("click", ".candidate", function () {
       console.log("Candidate Clicked")
       candidateId = $(this).attr("id");
       candidate = $(this).attr("name");
       console.log("Candidate: " + candidate + candidateId)
       candidateQueryURL = "https://newsapi.org/v2/everything?q=" + candidate + "&apiKey=" + apikey +
       "&language=en&sources=fox-news,cnn";
       console.log(candidateQueryURL)
       // Create the return object
   VSQueryURL = "http://api.votesmart.org/CandidateBio.getBio?key="+votesSmartKey+"&candidateId=" + candidateId;


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


        console.log("XML :" + VSQueryURL);
        requestNews(candidateQueryURL)

    });

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

    // not sure where to put this to hide the card
    // $(".can-menu").addClass(["card-hidden"]);


    });


    makeCandidate();

    queryURL = "https://newsapi.org/v2/everything?q=" + election + "&apiKey=" + apikey +
    "&language=en&sources=fox-news,cnn";
    console.log(queryURL)

    requestNews(queryURL)


})
