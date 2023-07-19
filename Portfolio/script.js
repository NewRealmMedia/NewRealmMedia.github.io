document.addEventListener('DOMContentLoaded', function() {
  // Get all the path elements with class "cls-8", "cls-3", "cls-11", and "cls-12"
  const pathsCls8And3 = document.querySelectorAll('.cls-8, .cls-3');
  const pathsCls11And12 = document.querySelectorAll('.cls-11, .cls-12');
  const projectsElement = document.querySelector('.cls-8, .cls-3');


  // Function to handle the click event
  function handleClick() {
    console.log('Path clicked:', this.getAttribute('d'));
  }

  // Function to handle the mouseover event for cls-8 and cls-3
  function handleMouseOverCls8And3() {
    pathsCls8And3.forEach(path => {
      path.classList.add('glow'); // Add the 'glow' class to cls-8 and cls-3 paths
    });
  }

  // Function to handle the mouseout event for cls-8 and cls-3
  function handleMouseOutCls8And3() {
    pathsCls8And3.forEach(path => {
      path.classList.remove('glow'); // Remove the 'glow' class from cls-8 and cls-3 paths
    });
  }

  // Function to handle the mouseover event for cls-11 and cls-12
  function handleMouseOverCls11And12() {
    pathsCls11And12.forEach(path => {
      path.classList.add('glow'); // Add the 'glow' class to cls-11 and cls-12 paths
    });
  }

  // Function to handle the mouseout event for cls-11 and cls-12
  function handleMouseOutCls11And12() {
    pathsCls11And12.forEach(path => {
      path.classList.remove('glow'); // Remove the 'glow' class from cls-11 and cls-12 paths
    });
  }

  // Attach click, mouseover, and mouseout event listeners to cls-8 and cls-3 paths
  pathsCls8And3.forEach(path => {
    path.addEventListener('click', handleClick);
    path.addEventListener('mouseover', handleMouseOverCls8And3);
    path.addEventListener('mouseout', handleMouseOutCls8And3);
    path.style.cursor = 'pointer'; // Add cursor style to indicate it's clickable
  });

  // Attach click, mouseover, and mouseout event listeners to cls-11 and cls-12 paths
  pathsCls11And12.forEach(path => {
    path.addEventListener('click', handleClick);
    path.addEventListener('mouseover', handleMouseOverCls11And12);
    path.addEventListener('mouseout', handleMouseOutCls11And12);
    path.style.cursor = 'pointer'; // Add cursor style to indicate it's clickable
  });

  function handleClick() {
    // Scroll smoothly to the anchor point
    document.querySelector('#anchor-point').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  // Attach click event listener to the "Projects" element
  projectsElement.addEventListener('click', handleClick);
  projectsElement.style.cursor = 'pointer'; // Add cursor style to indicate it's clickable

    var iframe = document.getElementById('sketchfab-iframe');
    var isMobile = window.matchMedia("(max-width: 812px)").matches;

    if (isMobile) {
      iframe.width = '200';
      iframe.height = '200';
    }
    
    const slideshowContainer = document.querySelector('.slideshow-container');
    const slides = document.querySelectorAll('.slideshow-content');
    const prevArrow = document.querySelector('.arrow-prev');
    const nextArrow = document.querySelector('.arrow-next');
  
    let currentIndex = 0;
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? 1 : 0;
      });
    }
  
    function moveToSlide(index) {
      const slideWidth = slides[0].offsetWidth;
      slideshowContainer.style.transform = `translateX(-${slideWidth * index}px)`;
      currentIndex = index;
      showSlide(index);
    }
  
    function showNextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      moveToSlide(currentIndex);
    }
  
    function showPrevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      moveToSlide(currentIndex);
    }
  
    prevArrow.addEventListener('click', showPrevSlide);
    nextArrow.addEventListener('click', showNextSlide);
  
    // Automatically start the slideshow
    let interval = setInterval(showNextSlide, 5000); // Change the duration as needed
  
    // Pause the slideshow on hover
    slideshowContainer.addEventListener('mouseover', () => clearInterval(interval));
    slideshowContainer.addEventListener('mouseleave', () => interval = setInterval(showNextSlide, 20000)); // Change the duration as needed
  
    // Show the first slide initially
    showSlide(currentIndex);

    const fullscreenButton = document.querySelector('.fullscreen-button');
    const aeroAngles = document.querySelector('.AeroAngles');
  
    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        if (aeroAngles.requestFullscreen) {
          aeroAngles.requestFullscreen();
        } else if (aeroAngles.webkitRequestFullscreen) {
          aeroAngles.webkitRequestFullscreen();
        } else if (aeroAngles.msRequestFullscreen) {
          aeroAngles.msRequestFullscreen();
        }
        aeroAngles.classList.add('fullscreen'); // Add 'fullscreen' class
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        aeroAngles.classList.remove('fullscreen'); // Remove 'fullscreen' class
      }
    }
  
    fullscreenButton.addEventListener('click', toggleFullscreen);
    fullscreenButton.addEventListener('click', toggleFullscreen);

;( function( $ ) {

	$( '.swipebox' ).swipebox();

} )( jQuery );

  });




