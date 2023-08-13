const logoItems = document.querySelectorAll('.logos ul li');

logoItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        logoItems.forEach((li, i) => {
            if (i === index) {
                li.style.transform = 'translateY(-15px)';
            } else if (i === index - 1 || i === index + 1) {
                li.style.transform = 'translateY(-5px)';
            } else {
                li.style.transform = 'translateY(0)';
            }
        });
    });

    item.addEventListener('mouseleave', () => {
        logoItems.forEach(li => {
            li.style.transform = 'translateY(0)';
        });
    });
});

// ===============================
//         Back To Top
// ===============================
let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let progressValue = document.getElementById("progress-value");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProgress.style.display = "grid";
  }else {
    scrollProgress.style.display = "none";
  }
  
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  scrollProgress.style.background = `conic-gradient(#03cc65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;
// ===============================
//              Intro
// ===============================
const splash = document.querySelector('.splash');

document.addEventListener('DOMContentLoaded' , (e)=>{
  setTimeout(()=>{
    splash.classList.add('display-none');
  }, 2000);
})


// ===============================
//         Responsive Header
// ===============================

const mobile_nav = document.querySelector(".mobile-navbar-btn");
const nav_header = document.querySelector(".header");
const navbarLinks = document.querySelectorAll(".navbar-link");

const toggleNavbar = () => {
  nav_header.classList.toggle("active");
};

const closeNavbar = () => {
  nav_header.classList.remove("active");
};

mobile_nav.addEventListener("click", toggleNavbar);

// Close the navbar when a link is clicked
navbarLinks.forEach((link) => {
  link.addEventListener("click", closeNavbar);
});


// ===============================
//           Scrollspy
// ===============================
//normal scroll spy
// let section = document.querySelectorAll('section');
// let navLinks = document.querySelectorAll('.sticky header nav ul li a');

// window.onscroll = () => {
//     section.forEach(sec =>{
//         let top = window.scrollY;
//         let offset = sec.offsetTop - 150;
//         let height = sec.offsetHeight;
//         let id = sec.getAttribute('id');

//         if(top >= offset && top < offset + height){
//             navLinks.forEach(links =>{
//                 links.classList.remove('active1');
//                 document.querySelector('.sticky header nav ul li a[href*=' + id + ']').classList.add('active1');
//             });
//         };
//     });
// }

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.sticky header nav ul li a');
let contactLink = navLinks[navLinks.length - 1];

// Function to add or remove the 'active1' class from navigation links
function setActiveLink(link) {
    navLinks.forEach((navLink) => {
        navLink.classList.remove('active1');
    });
    link.classList.add('active1');
}

// Function to handle scroll event and activate the appropriate link
function handleScroll() {
    let scrollPosition = window.scrollY;
    let windowHeight = window.innerHeight;

    let lastSection = sections[sections.length - 1];
    let lastSectionOffset = lastSection.offsetTop;
    let lastSectionHeight = lastSection.offsetHeight;

    // Activate the contact link when the user scrolls to the last section
    if (scrollPosition + windowHeight >= lastSectionOffset + lastSectionHeight) {
        setActiveLink(contactLink);
        return;
    }

    sections.forEach((section) => {
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;

        if (scrollPosition >= offset && scrollPosition < offset + height) {
            let id = section.getAttribute('id');
            let correspondingLink = document.querySelector(`.sticky header nav ul li a[href="#${id}"]`);
            if (correspondingLink) {
                setActiveLink(correspondingLink);
            }
        }
    });
} 

// Add scroll event listener to the window
window.addEventListener('scroll', handleScroll);

// Add click event listeners to navigation links for smooth scrolling
navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        let target = document.querySelector(link.getAttribute('href'));
        if (target) {
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

toggleDarkModeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const darkModeEnabled = body.classList.contains('dark-mode');
    updateDarkModePreference(darkModeEnabled);
});

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

// Check if dark mode was enabled before
const darkModeEnabled = JSON.parse(localStorage.getItem('darkModeEnabled'));
updateDarkModePreference(darkModeEnabled);

// Function to detect and update device color scheme
function updateDeviceColorScheme() {
    const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkModePreferred) {
        updateDarkModePreference(true);
    } else {
        updateDarkModePreference(false);
    }
}

// Check device color scheme when the page loads and when it changes
window.addEventListener('DOMContentLoaded', updateDeviceColorScheme);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateDeviceColorScheme);



