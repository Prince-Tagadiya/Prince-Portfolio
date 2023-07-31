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
//       CV Downlaod Button
// ===============================
const button = document.querySelector(".button");

      button.addEventListener("click", (e) => {
        e.preventDefault;
        button.classList.add("animate");
        setTimeout(() => {
          button.classList.remove("animate");
        }, 50000);
      });
                            
