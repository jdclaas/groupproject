$(document).ready(function () {

    // News API Variables
    var apikey = "5a3ba875603a48dc9469e6852a05d8be"
    var articleNum = 5;
    var search = 2020;
    var candidate;
    var candidateId;
    var queryURL;
    var candidateQueryURL;
    var alert = "Please only use letters and numbers in the Search Field";


    // VoteSmart API Variables
    var candidateImg;
    var firstName;
    var lastName;
    var gender;
    var dob;
    var placeOfBirth;
    var party;
    var office;
    var officeName;
    var votesSmartKey = "a8c2fd7495b5d4f49f009034402bffb1";
    var VSQueryURLD;
    var bio;
    var educationArray;



  

    // Candidates Menu Variables
    var candidateObj = [{
            name: "Donald Trump",
            id: "15723"
        },
        {
            name: "Michael Bennet",
            id: "110942"
        },
        {
            name: "Joe Biden",
            id: "53279"
        },
        {
            name: "Bill de Blasio",
            id: "80257"
        },
        {
            name: "Cory Booker",
            id: "76151"
        },
        {
            name: "Steve Bullock",
            id: "110899"
        },
        {
            name: "Pete Buttigieg",
            id: "127151"
        },
        {
            name: "Julian Catro",
            id: "115371"
        },
        {
            name: "John Delaney",
            id: "135143"
        },
        {
            name: "Tulsi Gabbard",
            id: "129306"
        },
        {
            name: "Kirsten Gillibrand",
            id: "65147"
        },
        {
            name: "Kamala Harris",
            id: "120012"
        },
        {
            name: "John Hickenlooper",
            id: "71547"
        },
        {
            name: "Jay Inslee",
            id: "27125"
        },
        {
            name: "Amy Klobuchar",
            id: "65092"
        },
        {
            name: "Wayne Messam",
            id: "130228"
        },
        {
            name: "Seth Moulton",
            id: "146299"
        },
        {
            name: "Beto O’Rourke",
            id: "78533"
        },
        {
            name: "Tim Ryan",
            id: "45638"
        },
        {
            name: "Bernie Sanders",
            id: "27110"
        },
        {
            name: "Eric Swalwell",
            id: "129529"
        },
        {
            name: "Elizabeth Warren",
            id: "141272"
        },
        {
            name: "Bill Weld",
            id: "21733"
        },
        {
            name: "Marianne Williamson",
            id: "146092"
        },
        {
            name: "Andrew Yang",
            id: "186040"
        }
    ]

    console.log(candidateObj)
    console.log(candidateObj[2].name)
    console.log(candidateObj[2].id)

    // On click of search button - push search term into candidate variable
    $('#search-button').on("click", function () {
        $("#alert").empty();
        event.preventDefault();
        console.log("Submit Clicked");
        search = $('#search-bar').val();
        console.log(checkField(search))
        console.log("Search Query: " + search)
        queryURL = "https://newsapi.org/v2/everything?q=" + search + "&apiKey=" + apikey +
            "&language=en&sources=fox-news,cnn";
        console.log(queryURL)

        requestNews(queryURL)

        // for (var j = 0; j < search.length; j++) {
        //     code = search.charCodeAt(j);
        //     if (!(code > 47 && code < 58) && // numeric (0-9)
        //         !(code > 64 && code < 91) && // upper alpha (A-Z)
        //         !(code > 96 && code < 123)) { // lower alpha (a-z)
        //       $("#alert").append("Please only use letters and numbers in the search field.");
        //       return false
        //     }
        //   }
        //   return true
       
    });
    
        
            

    function createBio(event) {
        $(".name").empty();
        $(".gender").empty();
        $(".dob").empty();
        $(".placeOfBirth").empty();
        $(".party").empty();
        $(".office").empty();
        $(".education").empty();

        $(".name").append(firstName + " " + lastName);
        $(".gender").append(gender);
        $(".dob").append(dob);
        $(".placeOfBirth").append(placeOfBirth);
        $(".party").append(party);
        $(".office").append(office + " " + officeName);
        $(".pol-img").attr('src', candidateImg);
        for ( var i = 0; i < educationArray.length; i++) {

            var space = $('<br>');
            $(".education").append(educationArray[i].degree + " " + educationArray[i].school + " " + educationArray[i].span)
            $('.education').append(space)
        }

    }

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
                var formattedDate= moment(published).format("MMM D YYYY h:mm A");
                var pubDate = $('<p class="date">').text(formattedDate);

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
            candidateDiv.attr("class", "col-md-3 col-4 col-lg-3 candidate")
            candidateDiv.attr({
            "data-toggle": "modal",
            "data-target": "#exampleModal",
            "data-whatever": "@getbootstrap"
        });

            candidateId = candidateObj[x].id
            candidateDiv.attr("id", candidateId);
            var candidatePhoto = $('<img>');
            var candidatePhotoURL = "https://static.votesmart.org/canphoto/" + candidateId + ".jpg"
            candidatePhoto.attr("src", candidatePhotoURL);
            var candidateNameText = candidateObj[x].name
            var br = $('<br>');

            var candidateName = $('<button>');
            candidateName.attr({
                type: "button",
                class: "btn",
    
            });
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
        candidateId = "";
        candidateId = $(this).attr("id");
        candidate = $(this).attr("name");
        console.log("Candidate: " + candidate + candidateId)
        candidateQueryURL = "https://newsapi.org/v2/everything?q=" + candidate + "&apiKey=" + apikey +
            "&language=en&sources=fox-news,cnn";
        console.log(candidateQueryURL)
        // Create the return object
        VSQueryURLD = "http://api.votesmart.org/CandidateBio.getDetailedBio?key=" + votesSmartKey + "&candidateId=" + candidateId + "&o=JSON";

        // wikipedia Variables
        var wikiURL = "https://en.wikipedia.org/api/rest_v1/page/summary/";
    
        wikiURL += candidate;

        console.log(wikiURL)

        $.ajax( {
            url: wikiURL,
        //   dataType: 'jsonp',
            method: "GET"
        }).then(function(response){
            $(document).text(JSON.stringify(response));

            console.log(response.extract)

            bio = response.extract
            $(".bio").append(bio + " " + "(source: wikipedia.org)")

        });

        $.ajax({
            url: VSQueryURLD,
            method: "GET"
        }).then(function (response) {
            // var json = xmlToJson(response);


            // console.log(json)

            lastName = response.bio.candidate.lastName;
            firstName = response.bio.candidate.firstName;
            gender = response.bio.candidate.gender;
            dob = response.bio.candidate.birthDate;
            placeOfBirth = response.bio.candidate.birthPlace;
            party = response.bio.election.parties;
            candidateImg = response.bio.candidate.photo;
            educationArray = response.bio.candidate.education.institution;


            if (response.bio.office) {
                officeName = response.bio.office.title
                office = response.bio.office.stateId
            } else {
                officeName = "n/a"
                office = ""
            };

            $(document).ready(createBio);


            console.log("XML :" + VSQueryURLD);
            requestNews(candidateQueryURL)

        });

        // Modified version from here: http://davidwalsh.name/convert-xml-json
        // function xmlToJson(xml) {

        //     // Create the return object
        //     var obj = {};

        //     if (xml.nodeType == 1) { // element
        //         // do attributes
        //         if (xml.attributes.length > 0) {
        //             obj["@attributes"] = {};
        //             for (var j = 0; j < xml.attributes.length; j++) {
        //                 var attribute = xml.attributes.item(j);
        //                 obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        //             }
        //         }
        //     } else if (xml.nodeType == 3) { // text
        //         obj = xml.nodeValue;
        //     }

        //     // do children
        //     // If just one text node inside
        //     if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
        //         obj = xml.childNodes[0].nodeValue;
        //     } else if (xml.hasChildNodes()) {
        //         for (var i = 0; i < xml.childNodes.length; i++) {
        //             var item = xml.childNodes.item(i);
        //             var nodeName = item.nodeName;
        //             if (typeof (obj[nodeName]) == "undefined") {
        //                 obj[nodeName] = xmlToJson(item);
        //             } else {
        //                 if (typeof (obj[nodeName].push) == "undefined") {
        //                     var old = obj[nodeName];
        //                     obj[nodeName] = [];
        //                     obj[nodeName].push(old);
        //                 }
        //                 obj[nodeName].push(xmlToJson(item));
        //             }
        //         }
        //     }
        //     return obj;
        // };

        // not sure where to put this to hide the card
        // $(".can-menu").addClass(["card-hidden"]);


    });


    makeCandidate();

    queryURL = "https://newsapi.org/v2/everything?q=" + search + "&apiKey=" + apikey +
        "&language=en&sources=fox-news,cnn";
    console.log(queryURL)

    requestNews(queryURL)


})