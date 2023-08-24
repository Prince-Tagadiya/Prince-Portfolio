
// ===============================
//        Welcome Message 
// ===============================
document.addEventListener("DOMContentLoaded", function() {
  // Get the elements
  const welcomeMessage = document.getElementById("welcome-message");
  const closeButton = document.getElementById("close-welcome");

  // Close button event listener
  closeButton.addEventListener("click", function() {
    // Hide welcome message and allow scrolling
    welcomeMessage.style.display = "none";
    document.documentElement.classList.remove("freeze-scroll");
  });

  // Display welcome message immediately
  function showWelcomeMessage() {
    welcomeMessage.style.display = "block";
    // Freeze scrolling while message is shown
    document.documentElement.classList.add("freeze-scroll");
  }

  showWelcomeMessage();
});

// ===============================
//        Animated Tech Stack 
// ===============================
const logoItems = document.querySelectorAll('.logos ul li');

// Hover animation for tech stack logos
logoItems.forEach((item, index) => {
  item.addEventListener('mouseenter', () => {
    logoItems.forEach((li, i) => {
      const translateYValue = (i === index) ? '-15px' : (i === index - 1 || i === index + 1) ? '-5px' : '0';
      li.style.transform = `translateY(${translateYValue})`;
    });
  });

  // Reset animation on mouse leave
  item.addEventListener('mouseleave', () => {
    logoItems.forEach(li => {
      li.style.transform = 'translateY(0)';
    });
  });
});

// ===============================
//         Back To Top
// ===============================
function calcScrollValue() {
  const scrollProgress = document.getElementById("progress");
  const pos = document.documentElement.scrollTop;
  const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollValue = Math.round((pos * 100) / calcHeight);

  // Show/hide scroll-to-top button
  scrollProgress.style.display = (pos > 100) ? "grid" : "none";
  
  // Scroll to top on button click
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  
  // Update progress bar gradient
  scrollProgress.style.background = `conic-gradient(#03cc65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
}

window.addEventListener('scroll', calcScrollValue);
window.addEventListener('load', calcScrollValue);

// ===============================
//              Intro
// ===============================
const splash = document.querySelector('.splash');

document.addEventListener('DOMContentLoaded', (e) => {
  // Hide splash screen after a delay
  setTimeout(() => {
    splash.classList.add('display-none');
  }, 6000);
});

// ===============================
//         Responsive Header
// ===============================
const mobileNav = document.querySelector(".mobile-navbar-btn");
const navHeader = document.querySelector(".header");
const navbarLinks = document.querySelectorAll(".navbar-link");

// Toggle mobile navigation menu
function toggleNavbar() {
  navHeader.classList.toggle("active");
}

// Close the mobile navigation menu on link click
function closeNavbar() {
  navHeader.classList.remove("active");
}

mobileNav.addEventListener("click", toggleNavbar);

navbarLinks.forEach((link) => {
  link.addEventListener("click", closeNavbar);
});

// ===============================
//           Scrollspy
// ===============================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.sticky header nav ul li a');
const contactLink = navLinks[navLinks.length - 1];

// Set active link in navigation based on scrolling
function setActiveLink(link) {
  navLinks.forEach((navLink) => {
    navLink.classList.remove('active1');
  });
  link.classList.add('active1');
}

// Handle scroll event to activate appropriate link
function handleScroll() {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const lastSection = sections[sections.length - 1];
  const lastSectionOffset = lastSection.offsetTop;
  const lastSectionHeight = lastSection.offsetHeight;

  // Activate contact link when scrolling reaches last section
  if (scrollPosition + windowHeight >= lastSectionOffset + lastSectionHeight) {
    setActiveLink(contactLink);
    return;
  }

  sections.forEach((section) => {
    const offset = section.offsetTop - 150;
    const height = section.offsetHeight;

    if (scrollPosition >= offset && scrollPosition < offset + height) {
      const id = section.getAttribute('id');
      const correspondingLink = document.querySelector(`.sticky header nav ul li a[href="#${id}"]`);
      if (correspondingLink) {
        setActiveLink(correspondingLink);
      }
    }
  });
}

window.addEventListener('scroll', handleScroll);

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      // Smooth scroll to target section
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth',
      });
    }
  });
});

// ===============================
//           Dark Mode
// ===============================
const toggleDarkModeButton = document.getElementById('toggleDarkMode');
const body = document.body;

// Toggle dark mode on button click
toggleDarkModeButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const darkModeEnabled = body.classList.contains('dark-mode');
  updateDarkModePreference(darkModeEnabled);
});

// Update dark mode preference in local storage and UI
function updateDarkModePreference(enabled) {
  if (enabled) {
    body.classList.add('dark-mode');
    toggleDarkModeButton.classList.remove('fa-sun');
    toggleDarkModeButton.classList.add('fa-moon');
  } else {
    body.classList.remove('dark-mode');
    toggleDarkModeButton.classList.remove('fa-moon');
    toggleDarkModeButton.classList.add('fa-sun');
  }
  localStorage.setItem('darkModeEnabled', enabled ? 'true' : 'false');
}

// Check device's color scheme and update dark mode accordingly
function updateDeviceColorScheme() {
  const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDarkModePreferred) {
    updateDarkModePreference(true);
  } else {
    updateDarkModePreference(false);
  }
}

window.addEventListener('DOMContentLoaded', updateDeviceColorScheme);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateDeviceColorScheme);


 

$(document).ready(function() {
  $(`.skill-per`).each(function() {
    var $this = $(this);
    var percentage = $this.attr('percentage');
    $this.css("width", percentage + "%");
    $({
      animatedValue: 0
    }).animate({
      animatedValue: percentage
    }, {
      duration: 1300,
      step: function() {
        $this.attr("percentage", Math.floor(this.animatedValue));
      }
    });
  });
});