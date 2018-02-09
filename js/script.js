/*
* Author:      Marco Kuiper (http://www.marcofolio.net/)
*/

// Speed of the quotation marks to show
var quoteSpeed = 500;

// Speed of the quote container to expand
var quoteContainerSpeed = 1000;

// Time the quote will be visible
var showQuoteSpeed = 5000;

// Time the screen will be empty
var cleanScreenSpeed = 500;

// Width of the quote box
// Would be cool to automatically grow to the containing text size in the future.
var quoteBoxWidth = "300px";

// The quotes we'll show
var quotes = [ {
		"quote" : "Java is to JavaScript,<br />what Car is to Carpet.",
		"author" : "- Chris Heilmann"
	}, {
		"quote" : "Computers are good at following instructions, but not at<br />reading your mind.",
		"author" : "- Donald Knuth"
	}, {
		"quote" : "Copy and paste<br />is a design error.",
		"author" : "- David Parnas"
	}, {
		"quote" : "If you make everything bold,<br />nothing is bold.",
		"author" : "- Art Webb"
	}, {
		"quote" : "No army can stop an idea whose time has come.",
		"author" : "- Victor Hugo"
	}, {
		"quote" : "First, solve the problem. Then, write the code.",
		"author" : "- John Johnson"
	}
];

// The quote index to start with
var currentQuoteIndex = 4;

// Document ready
$(document).ready(function()
{	
	// Webkit seems to have different ways of cerning the quotation marks
	// This little hack makes sure it's in the correct position
	if($.browser.webkit) {
		$(".quotemark").css({ "margin-top" : "-22px" });
		$(".rightquote").css({ "margin-top" : "-24px" });
	}	
	
	startAnimation();
});
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

/* Starts the animation */
var startAnimation = function() {
	setTimeout(function() {
		showLeftQuote();
	}, quoteSpeed);	
}

/* Shows left quote */
var showLeftQuote = function() {
	$(".leftquote").show();
	
	setTimeout(function() {
		showRightQuote();
	}, quoteSpeed);
};

/* Shows right quote */
var showRightQuote = function() {
	$(".rightquote").show();
	
	setTimeout(function() {
		showQuoteContainer();
	}, quoteSpeed);
};

/* Shows the quote container */
var showQuoteContainer = function() {
	// Small fix for the right quotation mark
	$(".rightquote").css({ "margin-left" : "-10px" });
	
	$("<p />")
		.html(quotes[currentQuoteIndex].quote)
		.css({ "display" : "none"})
		.appendTo($(".quote"));
		
	$("<p />")
		.addClass("author")
		.html(quotes[currentQuoteIndex].author)
		.css({ "display" : "none"})
		.appendTo($(".quote"));

	$(".quote")
		.show()
		.animate({ width : quoteBoxWidth }, quoteContainerSpeed, function() {
			showQuote();
		});
}

/* Shows the current quote */
var showQuote = function() {
	$(".quote").children().fadeIn();
		
	setTimeout(function() {
		clearQuote();
	}, showQuoteSpeed);
}

/* Clear the current quote */
var clearQuote = function() {
	// Determine the curren quote index
	if(currentQuoteIndex == quotes.length - 1) {
		currentQuoteIndex = 0;
	}
	else {
		currentQuoteIndex++;
	}
	
	// Fade out the quotation marks
	$(".quotemark").fadeOut();

	// Fade out the current quote and reset the data	
	$(".quote").fadeOut(function() {
		$(".rightquote").css({ "margin-left" : "0px" });
		
		$(".quote")
			.empty()
			.css({ width : "0px" });
		
		setTimeout(function() {
			startAnimation();
		}, cleanScreenSpeed);
	});

}
