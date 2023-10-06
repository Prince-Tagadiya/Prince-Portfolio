// ===============================
//        Load-More
// ===============================
const loadmore = document.querySelector('.load-more');

let currentItems = 2;
loadmore.addEventListener('click', (e) => {
  const elementList = [...document.querySelectorAll('.post li')];
  e.target.classList.add('show-loader');

  for (let i = currentItems; i < currentItems + 2; i++) {
    setTimeout(function () {
      if (elementList[i]) {
        elementList[i].style.display = 'block';

        // Trigger AOS initialization for the newly loaded item
        AOS.refreshHard(); // This forces AOS to reinitialize and apply animations to all elements, including the new ones
      }

      // Hide the loader and "Load More" button after fully loading all content
      if (i === elementList.length - 1) {
        e.target.style.display = 'none'; // Hide the "Load More" button
      }

      e.target.classList.remove('show-loader');
    }, 3000); // Delay for simulating loading
  }
  currentItems += 2;
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
// Define the calcScrollValue function
function calcScrollValue() {
  const scrollProgress = document.getElementById("progress");
  const pos = document.documentElement.scrollTop;
  const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollValue = Math.round((pos * 100) / calcHeight);

  // Show/hide scroll-to-top button
  scrollProgress.style.display = pos > 100 ? "flex" : "none";

  // Check if we're at the bottom of the page
  const isAtBottom = pos >= calcHeight;

  // Update the bottom value of #progress based on whether we're at the bottom
  scrollProgress.style.bottom = isAtBottom ? "90px" : "20px";

  // Update progress bar gradient
  scrollProgress.style.background = `conic-gradient(#03cc65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
}

// Add an event listener to detect when the page is loaded or refreshed
window.addEventListener('load', function () {
  // Scroll to the top of the page
  document.documentElement.scrollTop = 0;
  
  // Call the calcScrollValue function to update the scroll progress
  calcScrollValue();
});

// Add an event listener to handle scroll events
window.addEventListener('scroll', calcScrollValue);

// ===============================
//              Intro
// ===============================
const splash = document.querySelector('.splash');

// Function to hide the splash screen and enable scrolling
function hideSplashScreen() {
  splash.classList.add('display-none');
  // Remove the overflow-y style from the HTML element to enable scrolling
  document.documentElement.style.overflowY = 'auto';
}

// Function to hide splash screen when any key is pressed
function skipIntroOnKeyPress(event) {
  hideSplashScreen();
  // Remove the event listener after the splash screen is hidden
  document.removeEventListener('keydown', skipIntroOnKeyPress);
}

// Function to hide splash screen when user clicks anywhere
function skipIntroOnClick(event) {
  hideSplashScreen();
  // Remove the event listener after the splash screen is hidden
  document.removeEventListener('click', skipIntroOnClick);
}

document.addEventListener('DOMContentLoaded', (e) => {
  // Apply the overflow-y: hidden style to the HTML element to disable vertical scrolling
  document.documentElement.style.overflowY = 'hidden';

  // Hide splash screen after a delay
  setTimeout(hideSplashScreen, 6000);

  // Add a keydown event listener to skip on any key press
  document.addEventListener('keydown', skipIntroOnKeyPress);

  // Add a click event listener to skip on any click
  document.addEventListener('click', skipIntroOnClick);
});


// confetti

const confettiContainer = document.querySelector('.confetti-container');

let hideTimeout;

// Function to hide the confetti container
function hideConfettiContainer() {
  confettiContainer.style.display = 'none';
}

// Function to reset the hide timeout
function resetHideTimeout() {
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    hideConfettiContainer();
  }, 2000); // 2 seconds delay
}

// Add event listeners for key press and mouse click anywhere on the page
document.addEventListener('keydown', () => {
  resetHideTimeout();
});

document.addEventListener('click', () => {
  resetHideTimeout();
});

// Add a timeout to hide the confetti container after 8 seconds
hideTimeout = setTimeout(() => {
  hideConfettiContainer();
}, 8000);


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

// ===============================
//           Skills
// ===============================
// Function to animate skill bars
function animateSkills() {
  const skillBars = document.querySelectorAll('.skill-bar .skill-per');

  skillBars.forEach(skillBar => {
    const percentage = skillBar.getAttribute('percentage');
    skillBar.style.width = percentage + '%';
  });
}

// Function to reset skill bars to 0%
function resetSkills() {
  const skillBars = document.querySelectorAll('.skill-bar .skill-per');
  skillBars.forEach(skillBar => {
    skillBar.style.width = '0%';
  });
}

// Intersection Observer to trigger animation
const skillsSection = document.querySelector('#skills');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkills();
    } else {
      resetSkills();
    }
  });
});

observer.observe(skillsSection);

// ===============================
//    Disable Right Click
// ===============================
document.addEventListener('contextmenu', (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') ||
    ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  )
    return false;
};


// ===============================
//          Title Flash 
// ===============================
function flashTitleNotification() {
  var originalTitle = document.title;
  var isFlash = false;

  function changeTitle() {
    document.title = isFlash ? "Prince Portfolio" : originalTitle;
    isFlash = !isFlash;
  }

  setInterval(changeTitle, 3000);
}

window.onload = flashTitleNotification;




