$(document).ready(function() {

  'use strict';

  // ========================================================================= //
  //  //Loading
  // ========================================================================= //

  /*$.get("/My Portfolio/loader.html", function(data){
    $("#loading").replaceWith(data);
  });*/
 
  /*(window).on('load', function(){
    setTimeout(removeLoader, 1000); //wait for page load PLUS two seconds.
  });
  function removeLoader(){
      $( ".loading" ).fadeOut(500, function() {
        // fadeOut complete. Remove the loading div
        $( ".loading" ).remove(); //makes page more lightweight 
    });   
  }*/

  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });




  // ========================================================================= //
  //  //SMOOTH SCROLL
  // ========================================================================= //

  $(document).on("scroll", onScroll);

  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    $(document).off("scroll");

    $('a').each(function() {
      $(this).removeClass('active');
      if ($(window).width() < 768) {
        $('.nav-menu').slideUp();
      }
    });

    $(this).addClass('active');

    var target = this.hash,
        menu = target;

    target = $(target);
    $('html, body').stop().animate({
      'scrollTop': target.offset().top - 80
    }, 500, 'swing', function() {
      window.location.hash = target.selector;
      $(document).on("scroll", onScroll);
    });
  });


  function onScroll(event) {
    if ($('.home').length) {
      var scrollPos = $(document).scrollTop();
      $('nav ul li a').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
      });
    }
  }

  // ========================================================================= //
  //  //NAVBAR SHOW - HIDE
  // ========================================================================= //


  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > 200 ) {
      $("#main-nav, #main-nav-subpage").slideDown(700);
      $("#main-nav-subpage").removeClass('subpage-nav');
    } else {
      $("#main-nav").slideUp(700);
      $("#main-nav-subpage").hide();
      $("#main-nav-subpage").addClass('subpage-nav');
    }
  });

  // ========================================================================= //
  //  // RESPONSIVE MENU
  // ========================================================================= //

  $('.responsive').on('click', function(e) {
    $('.nav-menu').slideToggle();
  });

  // ========================================================================= //
  //  Typed Js
  // ========================================================================= //

  var typed = $(".typed");

  $(function() {
    typed.typed({
      strings: ["Dinuka Ekanayake  ", "a Software Developer...", "a Web Developer...", "a Mobile App Developer...", "a UI/UX Designer...", "a Graphic Designer...", "a Photographer..."],
      typeSpeed: 100,
      loop: true,
    });
  });


  // ========================================================================= //
  //  Owl Carousel Services
  // ========================================================================= //


  $('.services-carousel').owlCarousel({
      autoplay: true,
      loop: true,
      margin: 20,
      dots: true,
      nav: false,
      responsiveClass: true,
      responsive: { 0: { items: 1 }, 768: { items: 2 }, 900: { items: 4 } }
    });

  // ========================================================================= //
  //  magnificPopup
  // ========================================================================= //

  var magnifPopup = function() {
    $('.popup-img').magnificPopup({
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-with-zoom',
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  };


  // Call the functions
  magnifPopup();



// ========================================================================= //
//  Portfolio isotope and filter (Updated)
// ========================================================================= //
$(window).on('load', function(){
  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows',
    animationOptions: {
      duration: 750,
      easing: 'swing'
    }
  });

  $('#portfolio-flters li').on('click', function() {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    var filterValue = $(this).attr('data-filter');
    portfolioIsotope.isotope({ 
      filter: filterValue,
      animationOptions: {
        duration: 750,
        easing: 'swing'
      }
    });
  });

  // Portfolio lightbox with updated magnific popup
  $('.portfolio-lightbox').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1]
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300
    }
  });

  // Add scroll animations
  $(window).on('scroll', function() {
    $('.portfolio-item').each(function() {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).addClass('animate__animated animate__fadeInUp');
      }
    });
  });

  // Trigger initial animation check
  $(window).trigger('scroll');
});

// Additional portfolio animations and interactions
$(document).ready(function() {
  // Smooth hover effects for portfolio items
  $('.portfolio-wrap').on('mouseenter', function() {
    $(this).find('.portfolio-overlay').css('opacity', '1');
    $(this).find('img').css('transform', 'scale(1.1)');
    $(this).find('.portfolio-info').css('transform', 'translateY(0)');
  });

  $('.portfolio-wrap').on('mouseleave', function() {
    $(this).find('.portfolio-overlay').css('opacity', '0');
    $(this).find('img').css('transform', 'scale(1)');
    $(this).find('.portfolio-info').css('transform', 'translateY(20px)');
  });

  // Add loading animation for portfolio items
  $('.portfolio-item').each(function(index) {
    $(this).css('animation-delay', (index * 0.1) + 's');
  });
});

// ========================================================================= //
//  About Section Animations
// ========================================================================= //

$(document).ready(function() {
  // About section scroll animations
  $(window).on('scroll', function() {
    var aboutOffset = $('#about').offset().top;
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();

    if (scrollTop > aboutOffset - windowHeight + 200) {
      $('.about-img').addClass('animate__animated animate__fadeInLeft');
      $('.about-content').addClass('animate__animated animate__fadeInRight');
      
      // Animate stats counter
      $('.stat-number').each(function() {
        var $this = $(this);
        var countTo = parseInt($this.text());
        if (!$this.hasClass('counted')) {
          $this.addClass('counted');
          $({ countNum: 0 }).animate({
            countNum: countTo
          }, {
            duration: 2000,
            easing: 'swing',
            step: function() {
              $this.text(Math.floor(this.countNum) + '+');
            },
            complete: function() {
              $this.text(countTo + '+');
            }
          });
        }
      });
    }
  });

  // About image hover effects
  $('.about-img').on('mouseenter', function() {
    $(this).find('img').css('transform', 'scale(1.05)');
  });

  $('.about-img').on('mouseleave', function() {
    $(this).find('img').css('transform', 'scale(1)');
  });
});

// ========================================================================= //
//  Skills Section Animations (Updated)
// ========================================================================= //

$(document).ready(function() {
  // Skills animation on scroll
  let skillsAnimated = false;
  
  function animateSkills() {
    if (skillsAnimated) return;
    
    $('.skill-progress').each(function(index) {
      var $this = $(this);
      var width = $this.data('width');
      
      setTimeout(function() {
        $this.css('width', width);
      }, index * 200);
    });
    
    skillsAnimated = true;
  }

  // Check if skills section is in viewport
  function checkSkillsInView() {
    var skillsOffset = $('#journal').offset().top;
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();

    if (scrollTop > skillsOffset - windowHeight + 300) {
      animateSkills();
      
      // Animate skills categories
      $('.skills-category').each(function(index) {
        var $this = $(this);
        setTimeout(function() {
          $this.addClass('animate__animated animate__fadeInUp');
        }, index * 200);
      });

      // Animate skill icons
      $('.skill-icon').each(function(index) {
        var $this = $(this);
        setTimeout(function() {
          $this.addClass('animate__animated animate__bounceIn');
        }, index * 100);
      });
    }
  }

  $(window).on('scroll', checkSkillsInView);
  
  // Trigger on page load
  setTimeout(checkSkillsInView, 500);

  // Skill icon hover effects
  $('.skill-icon').hover(
    function() {
      $(this).addClass('animate__animated animate__pulse');
    },
    function() {
      $(this).removeClass('animate__animated animate__pulse');
    }
  );

  // CV download button effects
  $('.cv-download-btn').hover(
    function() {
      $(this).addClass('animate__animated animate__heartBeat');
    },
    function() {
      $(this).removeClass('animate__animated animate__heartBeat');
    }
  );
});

// ========================================================================= //
//  Enhanced Skills Progress Animation
// ========================================================================= //

// Custom easing function for smoother animations
$.easing.easeInOutQuart = function (x, t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
  return -c/2 * ((t-=2)*t*t*t - 2) + b;
};

// Enhanced skill bar animation
function enhancedSkillAnimation() {
  $('.skill-progress').each(function() {
    var $this = $(this);
    var width = $this.data('width');
    var percentage = parseInt(width);
    
    // Add ripple effect
    $this.append('<div class="skill-ripple"></div>');
    
    // Animate with custom easing
    $this.animate({
      width: width
    }, {
      duration: 1500,
      easing: 'easeInOutQuart',
      progress: function(animation, progress) {
        // Add shimmer effect during animation
        if (progress > 0.5 && progress < 0.8) {
          $this.addClass('shimmer');
        } else {
          $this.removeClass('shimmer');
        }
      },
      complete: function() {
        // Add completion effect
        $this.addClass('completed');
        setTimeout(function() {
          $this.removeClass('completed');
        }, 500);
      }
    });
  });
}

// Intersection Observer for better performance
if ('IntersectionObserver' in window) {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        enhancedSkillAnimation();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  const skillsSection = document.querySelector('#journal');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }
}

});