$(document).ready(function(){




  let currentNum = 0;
  $('#tweetText').on('keyup', function(){

    const counter = $(this).parent().children('.counter');
    let tweetLength = $(this).val();

    currentNum = tweetLength.length - 140;

    if (tweetLength.length > 140) {
      $(counter).html(-Math.abs(currentNum));
      $(counter).css('color', 'red')
    } else {
      $(counter).html(Math.abs(currentNum));
      $(counter).css('color', 'black')
    }

    // var $button = $('#submitTweet');
    // console.log(currentNum);
    //
    // if (currentNum >= 1) {
    //   alert("test")
    //   $button.preventDefault;
    // }

  });



});
