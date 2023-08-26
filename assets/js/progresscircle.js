function makesvg(percentage, strokeColor, backgroundColor) {
  var abs_percentage = Math.abs(percentage).toString();
  var percentage_str = percentage.toString();
  var classes = "";

  var svg = '<svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">'
      + '<circle class="circle-chart__background" cx="16.9" cy="16.9" r="15.9" style="stroke: ' + backgroundColor + ';" />'
      + '<circle class="circle-chart__circle ' + classes + '"'
      + 'stroke-dasharray="' + abs_percentage + ',100" cx="16.9" cy="16.9" r="15.9"'
      + 'style="stroke: ' + strokeColor + ';" />'
      + '<g class="circle-chart__info">'
      + '   <text class="circle-chart__percent" x="50%" y="50%" dominant-baseline="central" text-anchor="middle">' + percentage_str + '%</text>'
      + ' </g></svg>';

  return svg;
}

function updateCircleChartColors(isDarkMode) {
  $('.circlechart').each(function() {
    var percentage = $(this).data("percentage");
    var strokeColor = $(this).data("color");
    var sectionId = $(this).closest('section').attr('id');
    var backgroundColor;

    if (isDarkMode) {
      if (sectionId === 'Programming') {
        backgroundColor = "#1F1F1F";
      } else if (sectionId === 'Software') {
        backgroundColor = "#2A2A2A";
      }
    } else {
      if (sectionId === 'Programming') {
        backgroundColor = "#fff";
      } else if (sectionId === 'Software') {
        backgroundColor = "#F0F0F0";
      }
    }

    $(this).html(makesvg(percentage, strokeColor, backgroundColor));
  });
}
// dark mode
const toggleDarkModeButton = document.getElementById('toggleDarkMode');
const body = document.body;

// Toggle dark mode on button click
toggleDarkModeButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const darkModeEnabled = body.classList.contains('dark-mode');
  updateDarkModePreference(darkModeEnabled);
  updateCircleChartColors(darkModeEnabled);
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
    updateCircleChartColors(true);
  } else {
    updateDarkModePreference(false);
    updateCircleChartColors(false);
  }
}

window.addEventListener('DOMContentLoaded', updateDeviceColorScheme);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateDeviceColorScheme);

// scroll spy 
function updateActiveNavItem() {
  const sections = document.querySelectorAll('section'); // Select all sections

  sections.forEach(section => {
    const navItem = document.querySelector(`.navbar-link[href="#${section.id}"]`);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === section) {
          if (entry.isIntersecting) {
            navItem.classList.add('active');
          } else {
            navItem.classList.remove('active');
          }
        }
      });
    }, { threshold: 0.5 });

    observer.observe(section);
  });
}

// Call the function when the page loads and whenever the user scrolls
document.addEventListener('DOMContentLoaded', updateActiveNavItem);
window.addEventListener('scroll', updateActiveNavItem);


