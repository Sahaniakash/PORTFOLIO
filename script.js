// Element toggle function
const elementToggleFunc = (elem) => {
  elem.classList.toggle("active")
}

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]")
const sidebarBtn = document.querySelector("[data-sidebar-btn]")
const sidebarInfoMore = document.querySelector(".sidebar-info_more")

// Sidebar toggle functionality
sidebarBtn.addEventListener("click", function () {
  // Toggle active class on the button
  elementToggleFunc(this)

  // Toggle active class on the info section
  sidebarInfoMore.classList.toggle("active")

  // Change button text based on state
  const btnText = this.querySelector("span")
  sidebarInfoMore.classList.contains("active")
})

// Tab functionality
const navigationLinks = document.querySelectorAll("[data-nav-link]")
const pages = document.querySelectorAll("[data-page]")

// Add click event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    // Remove active class from all nav links
    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.remove("active")
    }

    // Add active class to clicked nav link
    this.classList.add("active")

    // Get the data-page value of clicked nav link
    const currentPage = this.innerHTML.toLowerCase()

    // Show the corresponding page
    for (let k = 0; k < pages.length; k++) {
      if (pages[k].dataset.page === currentPage) {
        pages[k].classList.add("active")
      } else {
        pages[k].classList.remove("active")
      }
    }
  })
}

// Portfolio filter functionality
const filterItems = document.querySelectorAll("[data-filter-btn]")
const filterSelect = document.querySelector("[data-select]")
const selectItems = document.querySelectorAll("[data-select-item]")
const selectValue = document.querySelector("[data-selecct-value]")
const filterList = document.querySelector(".select-list")
const projectItems = document.querySelectorAll("[data-filter-item]")

// Filter items click event
for (let i = 0; i < filterItems.length; i++) {
  filterItems[i].addEventListener("click", function () {
    // Remove active class from all filter items
    for (let j = 0; j < filterItems.length; j++) {
      filterItems[j].classList.remove("active")
    }

    // Add active class to clicked filter item
    this.classList.add("active")

    // Get the filter value
    const filterValue = this.textContent.toLowerCase()

    // Filter projects
    filterProjects(filterValue)
  })
}

// Select dropdown toggle
filterSelect.addEventListener("click", () => {
  elementToggleFunc(filterList)
})

// Select items click event
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    // Update select value
    const filterValue = this.textContent.toLowerCase()
    selectValue.textContent = this.textContent
    elementToggleFunc(filterList)

    // Filter projects
    filterProjects(filterValue)
  })
}

// Filter projects function
function filterProjects(filterValue) {
  for (let i = 0; i < projectItems.length; i++) {
    if (filterValue === "all") {
      projectItems[i].classList.add("active")
    } else if (projectItems[i].dataset.category === filterValue) {
      projectItems[i].classList.add("active")
    } else {
      projectItems[i].classList.remove("active")
    }
  }
}

// Form validation
const form = document.querySelector("[data-form]")
const formInputs = document.querySelectorAll("[data-form-input]")
const formBtn = document.querySelector("[data-form-btn]")

// Add input event to all form inputs
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", () => {
    // Check if all inputs are valid
    let isValid = true
    for (let j = 0; j < formInputs.length; j++) {
      if (!formInputs[j].value.trim()) {
        isValid = false
        break
      }
    }

    // Enable/disable form button
    if (isValid) {
      formBtn.removeAttribute("disabled")
    } else {
      formBtn.setAttribute("disabled", "")
    }
  })
}

// Add submit event to form
form.addEventListener("submit", function (e) {
  e.preventDefault()
  // Here you would typically send the form data to a server
  // For now, just reset the form
  this.reset()
  formBtn.setAttribute("disabled", "")
  alert("Your message has been sent successfully!")
})

// Dark/Light mode toggle
// First, let's add the toggle button to the HTML
document.body.insertAdjacentHTML(
  "beforeend",
  `
  <button class="theme-toggle" id="theme-toggle" title="Toggle dark/light mode">
    <ion-icon name="moon-outline" id="theme-icon"></ion-icon>
  </button>
`,
)

// Get the toggle button and icon
const themeToggle = document.getElementById("theme-toggle")
const themeIcon = document.getElementById("theme-icon")

// Check for saved theme preference or use system preference
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
const savedTheme = localStorage.getItem("theme")

// Apply the saved theme or system preference
if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
  document.body.classList.add("dark")
  themeIcon.setAttribute("name", "sunny-outline")
} else {
  document.body.classList.remove("dark")
  themeIcon.setAttribute("name", "moon-outline")
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark")
    themeIcon.setAttribute("name", "moon-outline")
    localStorage.setItem("theme", "light")
  } else {
    document.body.classList.add("dark")
    themeIcon.setAttribute("name", "sunny-outline")
    localStorage.setItem("theme", "dark")
  }

  // Add animation to the toggle button
  themeToggle.classList.add("pulse")
  setTimeout(() => {
    themeToggle.classList.remove("pulse")
  }, 500)
})

// Add animation classes to elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".service-item, .timeline-item, .project-item.active, .blog-post-item")

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const screenPosition = window.innerHeight / 1.2

    if (elementPosition < screenPosition) {
      element.classList.add("fade-in")
    }
  })
}

// Run animation on scroll
window.addEventListener("scroll", animateOnScroll)
// Run once on page load
window.addEventListener("load", animateOnScroll)

