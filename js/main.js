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
  //  // NAVBAR
  // ========================================================================= //
     
  let lastScrollTop = 0;
  let navbar, navbarToggle, navbarMenu, navbarOverlay;
  let isInitialized = false;

  // Initialize when DOM is ready or immediately if already loaded
  function initializeNavbar() {
      if (isInitialized) return;
      
      // Check if navbar exists
      navbar = $('#main-nav');
      if (!navbar.length) {
          // If navbar not found, try again after a short delay
          setTimeout(initializeNavbar, 50);
          return;
      }

      navbarToggle = $('#navbar-toggle');
      navbarMenu = $('#navbar-menu');
      navbarOverlay = $('#navbar-overlay');
      
      isInitialized = true;
      setupNavbarEvents();
      
      // Remove loading state and initialize
      setTimeout(() => {
          if (navbar.length) {
              navbar.removeClass('loading');
              initNavbar();
          }
      }, 200);
  }

  function setupNavbarEvents() {
      // Navbar scroll behavior
      $(window).off('scroll.navbar').on('scroll.navbar', function() {
          if (!navbar.length) return;
          
          const scrollTop = $(this).scrollTop();
          
          // Add scrolled class for styling
          if (scrollTop > 50) {
              navbar.addClass('scrolled');
          } else {
              navbar.removeClass('scrolled');
          }

          // Hide/show navbar on scroll
          if (scrollTop > 200) {
              if (scrollTop > lastScrollTop && !navbarMenu.hasClass('active')) {
                  navbar.addClass('hidden');
              } else {
                  navbar.removeClass('hidden');
              }
          }
          
          lastScrollTop = scrollTop;
          updateActiveNavLink();
      });

      // Mobile menu toggle
      navbarToggle.off('click.navbar').on('click.navbar', function(e) {
          e.preventDefault();
          e.stopPropagation();
          toggleMobileMenu();
      });

      // Close menu when clicking overlay
      navbarOverlay.off('click.navbar').on('click.navbar', function() {
          closeMobileMenu();
      });

      // Close menu when clicking outside
      $(document).off('click.navbar').on('click.navbar', function(e) {
          if (!$(e.target).closest('.navbar-menu, .navbar-toggle').length) {
              closeMobileMenu();
          }
      });

      // Enhanced smooth scroll with active link management
      $(document).off('click.navbar', '.nav-link.smoothScroll, .brand-link.smoothScroll')
                .on('click.navbar', '.nav-link.smoothScroll, .brand-link.smoothScroll', function(e) {
          e.preventDefault();
          
          const target = $(this).attr('href');
          const targetElement = $(target);
          
          if (targetElement.length) {
              // Update active state for nav links only
              if ($(this).hasClass('nav-link')) {
                  updateActiveLink($(this));
              }
              
              // Close mobile menu if open
              closeMobileMenu();
              
              // Smooth scroll with fallback easing
              $('html, body').animate({
                  scrollTop: targetElement.offset().top - 80
              }, {
                  duration: 800,
                  easing: 'swing', // Changed to 'swing' for better compatibility
                  complete: function() {
                      // Update URL hash
                      if (history.pushState) {
                          history.pushState(null, null, target);
                      }
                  }
              });
          }
      });

      // Keyboard navigation
      $(document).off('keydown.navbar').on('keydown.navbar', function(e) {
          if (e.key === 'Escape') {
              closeMobileMenu();
          }
      });

      // Handle resize
      $(window).off('resize.navbar').on('resize.navbar', function() {
          if ($(window).width() > 768) {
              closeMobileMenu();
          }
      });

      // Brand logo click animation
      $(document).off('click.navbar', '.brand-link').on('click.navbar', '.brand-link', function() {
          $(this).addClass('clicked');
          setTimeout(() => {
              $(this).removeClass('clicked');
          }, 300);
      });

      // Setup intersection observer after a delay
      setTimeout(setupIntersectionObserver, 300);
  }

  function toggleMobileMenu() {
      if (!navbarToggle.length || !navbarMenu.length || !navbarOverlay.length) return;
      
      navbarToggle.toggleClass('active');
      navbarMenu.toggleClass('active');
      navbarOverlay.toggleClass('active');
      
      if (navbarMenu.hasClass('active')) {
          navbarOverlay.show();
          $('body').addClass('menu-open');
      } else {
          setTimeout(() => {
              navbarOverlay.hide();
          }, 300);
          $('body').removeClass('menu-open');
      }
  }

  function closeMobileMenu() {
      if (!navbarToggle.length || !navbarMenu.length || !navbarOverlay.length) return;
      
      navbarToggle.removeClass('active');
      navbarMenu.removeClass('active');
      navbarOverlay.removeClass('active');
      setTimeout(() => {
          navbarOverlay.hide();
      }, 300);
      $('body').removeClass('menu-open');
  }

  function updateActiveNavLink() {
      const scrollPos = $(window).scrollTop() + 150;
      
      $('.nav-link.smoothScroll').each(function() {
          const currLink = $(this);
          const refElement = $(currLink.attr("href"));
          
          if (refElement.length) {
              const refTop = refElement.offset().top;
              const refBottom = refTop + refElement.outerHeight();
              
              if (scrollPos >= refTop && scrollPos < refBottom) {
                  updateActiveLink(currLink);
              }
          }
      });
  }

  function updateActiveLink(activeLink) {
      $('.nav-link').removeClass('active');
      activeLink.addClass('active');
  }

  function initNavbar() {
      if (!navbar.length) return;
      
      const currentHash = window.location.hash || '#header';
      const currentLink = $(`.nav-link[href="${currentHash}"]`);
      if (currentLink.length) {
          updateActiveLink(currentLink);
      } else {
          updateActiveLink($('.nav-link[href="#header"]'));
      }

      if ($(window).scrollTop() > 50) {
          navbar.addClass('scrolled');
      }
  }

  function setupIntersectionObserver() {
      // Intersection Observer for better performance
      if ('IntersectionObserver' in window) {
          const observerOptions = {
              rootMargin: '-20% 0px -60% 0px'
          };

          const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      const id = entry.target.getAttribute('id');
                      const correspondingLink = $(`.nav-link[href="#${id}"]`);
                      if (correspondingLink.length) {
                          updateActiveLink(correspondingLink);
                      }
                  }
              });
          }, observerOptions);

          $('section[id]').each(function() {
              observer.observe(this);
          });
      }
  }

  // Initialize based on document state
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeNavbar);
  } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
      // DOM is already ready
      setTimeout(initializeNavbar, 10);
  }

  // Also try to initialize when jQuery is ready (fallback)
  if (typeof $ !== 'undefined') {
      $(function() {
          setTimeout(initializeNavbar, 50);
      });
  }

  // Window load fallback
  window.addEventListener('load', function() {
      setTimeout(initializeNavbar, 100);
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

let skillsAnimated = false;
let skillsInitialized = false;

// Custom easing function for smoother animations
function addCustomEasing() {
  if (typeof $.easing !== 'undefined') {
    $.easing.easeInOutQuart = function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
      return -c/2 * ((t-=2)*t*t*t - 2) + b;
    };
  }
}

function initializeSkillsSection() {
  if (skillsInitialized) return;
  
  // Check if skills section exists
  const skillsSection = $('#skills');
  if (!skillsSection.length) {
    // Retry if section not found
    setTimeout(initializeSkillsSection, 100);
    return;
  }

  skillsInitialized = true;
  setupSkillsEvents();
  addCustomEasing();
}

function setupSkillsEvents() {
  // Skill icon hover effects
  $(document).off('mouseenter.skills mouseleave.skills', '.skill-icon')
              .on('mouseenter.skills', '.skill-icon', function() {
                $(this).addClass('animate__animated animate__pulse');
              })
              .on('mouseleave.skills', '.skill-icon', function() {
                $(this).removeClass('animate__animated animate__pulse');
              });

  // CV download button effects
  $(document).off('mouseenter.skills mouseleave.skills', '.cv-download-btn')
              .on('mouseenter.skills', '.cv-download-btn', function() {
                $(this).addClass('animate__animated animate__heartBeat');
              })
              .on('mouseleave.skills', '.cv-download-btn', function() {
                $(this).removeClass('animate__animated animate__heartBeat');
              });

  // Setup scroll listener
  $(window).off('scroll.skills').on('scroll.skills', checkSkillsInView);
  
  // Setup intersection observer
  setupSkillsIntersectionObserver();
  
  // Trigger check on initialization
  setTimeout(checkSkillsInView, 500);
}

function animateSkills() {
  if (skillsAnimated) return;
  
  $('.skill-progress').each(function(index) {
    const $this = $(this);
    const width = $this.data('width');
    
    if (width) {
      setTimeout(function() {
        // Use CSS animation for better performance
        $this.css({
          'width': width,
          'transition': 'width 1.5s ease-in-out'
        });
        
        // Add shimmer effect
        setTimeout(function() {
          $this.addClass('skill-shimmer');
          setTimeout(function() {
            $this.removeClass('skill-shimmer');
          }, 1000);
        }, index * 100);
        
      }, index * 150);
    }
  });
  
  skillsAnimated = true;
  animateSkillsCategories();
  animateSkillIcons();
}

function animateSkillsCategories() {
  $('.skills-category').each(function(index) {
    const $this = $(this);
    setTimeout(function() {
      $this.addClass('animate__animated animate__fadeInUp');
    }, index * 200);
  });
}

function animateSkillIcons() {
  $('.skill-icon').each(function(index) {
    const $this = $(this);
    setTimeout(function() {
      $this.addClass('animate__animated animate__bounceIn');
    }, index * 100);
  });
}

function checkSkillsInView() {
  const skillsSection = $('#skills');
  if (!skillsSection.length) return;

  const skillsOffset = skillsSection.offset().top;
  const windowHeight = $(window).height();
  const scrollTop = $(window).scrollTop();

  if (scrollTop > skillsOffset - windowHeight + 300) {
    animateSkills();
  }
}

function setupSkillsIntersectionObserver() {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkills();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    });

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }
  }
}

// Enhanced skill bar animation with jQuery fallback
function enhancedSkillAnimation() {
  if (skillsAnimated) return;
  
  $('.skill-progress').each(function(index) {
    const $this = $(this);
    const width = $this.data('width');
    const percentage = parseInt(width);
    
    if (!width) return;

    // Add ripple effect element
    if (!$this.find('.skill-ripple').length) {
      $this.append('<div class="skill-ripple"></div>');
    }
    
    setTimeout(function() {
      // Use jQuery animate if custom easing is available
      if (typeof $.easing !== 'undefined' && $.easing.easeInOutQuart) {
        $this.animate({
          width: width
        }, {
          duration: 1500,
          easing: 'easeInOutQuart',
          progress: function(animation, progress) {
            if (progress > 0.5 && progress < 0.8) {
              $this.addClass('skill-shimmer');
            } else {
              $this.removeClass('skill-shimmer');
            }
          },
          complete: function() {
            $this.addClass('skill-completed');
            setTimeout(function() {
              $this.removeClass('skill-completed skill-shimmer');
            }, 500);
          }
        });
      } else {
        // Fallback to CSS transition
        $this.css({
          'width': width,
          'transition': 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(function() {
          $this.addClass('skill-completed');
          setTimeout(function() {
            $this.removeClass('skill-completed');
          }, 500);
        }, 1500);
      }
    }, index * 150);
  });
  
  skillsAnimated = true;
  animateSkillsCategories();
  animateSkillIcons();
}

// Initialize based on document state
function initialize() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSkillsSection);
  } else {
    setTimeout(initializeSkillsSection, 10);
  }

  // jQuery fallback
  if (typeof $ !== 'undefined') {
    $(function() {
      setTimeout(initializeSkillsSection, 50);
    });
  }

  // Window load fallback
  window.addEventListener('load', function() {
    setTimeout(initializeSkillsSection, 100);
  });
}

// Start initialization
initialize();

});