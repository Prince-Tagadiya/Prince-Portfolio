const mobile_nav = document.querySelector(".mobile-navbar-btn");
const nav_header = document.querySelector(".header");

const toggleNavbar = () => {
    nav_header.classList.toggle("active");
}

mobile_nav.addEventListener("click", () => toggleNavbar());



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