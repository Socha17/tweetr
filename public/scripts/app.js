/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 function calcTime(tweetDate) {

   let today = +new Date();
   let timeSincePost = today - tweetDate.created_at;

   let mins = (timeSincePost / (1000*60));
   let hours = (timeSincePost / (1000*60*60));
   let days = (timeSincePost / (1000*60*60*24));
   let weeks = (timeSincePost / (1000*60*60*24*7));

   if (mins < 60) {
     return tweetDate.created_at = Math.round(mins) + " Minutes ago"
   }
   if (hours < 24) {
     return tweetDate.created_at = Math.round(hours) + " Hours ago"
   }
   if (days < 6) {
     return tweetDate.created_at = Math.round(days) + " Days ago"
   }
   if (weeks > 52) {
     return tweetDate.created_at = Math.round(weeks) + " Weeks ago"
   }

 }

function createTweetElement(tweet) {
  calcTime(tweet)

  return `
     <article class="tweet">
      <header>
        <img src="${tweet.user.avatars.regular}" class="profilePic" alt="">  <h3>${escape(tweet.user.name)}</h3> <span>${escape(tweet.user.handle)}</span>
      </header>
      <div class="mainTweet">
        <span>${escape(tweet.content.text)}</span>
      </div>
      <footer>
        <span>${escape(tweet.created_at)}</span><div class="tweetIcons"><i class=" icons fa fa-flag" aria-hidden="true"></i><i class="icons fa fa-retweet" aria-hidden="true"></i><i class="icons fa fa-heart" aria-hidden="true"></i></div>
      </footer>
    </article>
    `;
}

function renderTweets(tweets) {
  // THIS IS MY DUMB BAD CODE
  // tweets.forEach(function(tweet) {
  //   let tweet = createTweetElement(tweet);
  //   $('#feed').append(tweet);
  // });

  // THIS IS GOOD CODE
  let tweetsHtml = tweets.map(createTweetElement)
    tweetsHtml.reverse()
  $('#feed').prepend(tweetsHtml)
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function() {


  // $.getJSON('/tweets', function (data) {
  //   console.log(data);
  //   renderTweets(data);
  // });

 $('.new-tweet').css('display', 'none')

 $('#composeBtn').on('click', function(){
   $('.new-tweet').slideToggle('slow');
   $('.new-tweet').css('display', 'block')
   $('#tweetText').focus();


 })


 function loadTweets() {
   $.ajax({
     url: '/tweets',
     method: 'GET',
     dataType: 'json',
     success: function (data) {
      //  console.log('success', data);
       renderTweets(data);
     }
   });
 }

    loadTweets()


    function getNewTweets() {
      $.ajax({
        url: '/tweets',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          console.log(data);
          console.log(data.length);
          let last = data.length -1
          console.log(data[last]);
          renderTweets([data[last]]);
        }
      });
    }


  let textBox = $('#tweetText').val("")
  let $button = $('#submitTweet');
  let clickCounter = 0

  $button.on('click', function (event) {

    let counterNum =  parseInt($(".counter").text())

    if (counterNum <= -1) {
      event.preventDefault();
      if (clickCounter == 0) {
        $("<div class='new-tweet popup'><p style ='text-align: center;'>Tweet is too Long!</p></div>").appendTo(".new-tweet").delay(3400).slideUp();
        clickCounter = 1;
        setTimeout( function() {console.log("timeout"); clickCounter = 0; $(".popup").remove(); }, 5000);

      }

    } else if (textBox.val() === null || textBox.val() === "") {
      event.preventDefault();
      if (clickCounter == 0) {
        $("<div class='new-tweet popup'><p style ='text-align: center;'>No Text was entered!</p></div>").appendTo(".new-tweet").delay(3400).slideUp();
        clickCounter = 1;
        setTimeout( function() { clickCounter = 0; $(".popup").remove(); }, 5000);
      }
    } else {
      clickCounter = 0;
      event.preventDefault();
      // ajax call
      // remember to have proper url and include data for what your sending to the server
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $('#tweetText').serialize(),
        success: function () {
          console.log('success');
          $('#tweetText').val("")
          $(".counter").text('140')
          getNewTweets()
        }
      });
    } // <<< end of if statement
  });

});

// THIS IS WHAT .MAP DOES
// class Array {
//   function map(callback) {
//     let newArray = []
//
//     for (var i = 0; i < this.length; i++) {
//       let item = this[i]
//       let result = callback(item, i, this)
//       newArray.push(result)
//     }
//
//     return newArray
//   }
//
//  THIS IS WHAT FOREACH DOES
//   function forEach(callback) {
//     for (var i = 0; i < this.length; i++) {
//       let item = this[i]
//       callback(item, i, this)
//     }
//
//     return this
//   }
