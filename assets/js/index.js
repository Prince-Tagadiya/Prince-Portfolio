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

//auto-close menu bar after clicking
// const btn = document.querySelector('.btn')
// btn.addEventListener('click',()=>{
//     btn.classList.add('active')
//     setTimeout(() => {
//         btn.classList.remove('active')
//     }, 13000);
// })

// ===============================
//           Scrollspy
// ===============================
let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.sticky header nav ul li a');

window.onscroll = () => {
    section.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links =>{
                links.classList.remove('active1');
                document.querySelector('.sticky header nav ul li a[href*=' + id + ']').classList.add('active1');
            });
        };
    });
}


const button = document.querySelector(".button");

      button.addEventListener("click", (e) => {
        e.preventDefault;
        button.classList.add("animate");
        setTimeout(() => {
          button.classList.remove("animate");
        }, 600);
      });
                            
