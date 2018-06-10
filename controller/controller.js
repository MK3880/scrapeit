//using this as a starting point because I still have no clue how most of this works and my tutor bailed on me so ¯\_(ツ)_/¯
//PS: this isn't a straight copy from the activity, there are changes below that I hope were moving it in the right direction.
var cheerio = require("cheerio");
var request = require("request");

// First, tell the console what server2.js is doing
console.log("\n******************************************\n" +
            "Grabbing every article headline and link\n" +
            "from the NHL website:" +
            "\n******************************************\n");

// Making a request for `nhl.com`'s homepage
request("https://www.nhl.com/", function(error, response, html) {

  // Load the body of the HTML into cheerio
  var $ = cheerio.load(html);

  // Empty array to save our scraped data
  var titlesArray = [];

  // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
  $("h4.headline-link").each(function(i, element) {

    var result = {};

    // Save the text of the h4-tag as "title"
    result.title = $(element).text();

    // Find the h4 tag's parent a-tag, and save it's href value as "link"
    result.link = $(element).parent().attr("href");

    if(result.title !== "" && result.link !== "") {
      if(titlesArray.indexOf(result.title) == -1) {
        titlesArray.push(result.title);

        //add article if not there
        Article.count({ title: result.title}, function (err,test){ 
        if (test == 0){
          var entry = new Article (result);
          //save to mongodb
          entry.save(function(err, doc) {
            if (err) {
              console.log(err);
            } else {
              console.log(doc);
            }
          });
        }
      });
    }

    else{
      console.log('Article already exists.')
    }
      }
      else {
        console.log('not save to DB, missing data')
      }
    });
    res.redirect('/');
  });

    // Make an object with data we scraped for this h4 and push it to the results array
  // results.push({
    //  title: title,
      //link: link
    //});
   
 // });

  // After looping through each h4.headline-link, log the results
  //console.log(results)
