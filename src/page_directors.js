import gsap from 'gsap'

document.addEventListener('DOMContentLoaded', function () {
  const directorButtons = document.querySelectorAll('[data-button-director]')
  const workItems = document.querySelectorAll('[data-work-director]')

  // Function to fade in work items
  function fadeInWorkItems() {
    gsap.fromTo(
      '[data-work-director]',
      { opacity: 0, autoAlpha: 0.5 },
      {
        opacity: 1,
        autoAlpha: 1,
        duration: 1,
      }
    )
  }

  // Select all director bios
  const directorBios = document.querySelectorAll('.director_bio')

  // Hide all director bios initially
  directorBios.forEach((bio) => {
    bio.style.display = 'none'
  })

  // Function to filter and fade in work items
  function filterAndFadeInWorkItems(director) {
    // Fade in filtered work items
    fadeInWorkItems()

    // Filter work items
    workItems.forEach((item) => {
      // eslint-disable-next-line prettier/prettier
      if (
        director === 'all' ||
        item.getAttribute('data-work-director') === director
      ) {
        item.style.display = ''
      } else {
        item.style.display = 'none'
      }
    })

    // Filter and fade in director bios corresponding to the selected director
    directorBios.forEach((bio) => {
      const aboutDirector = bio.getAttribute('data-work-director')
      if (aboutDirector === director) {
        gsap.to(bio, { opacity: 1, duration: 1.5, ease: 'power3.out' })
        bio.style.display = '' // Reset display property
      } else {
        gsap.to(bio, { opacity: 0, duration: 1.5, ease: 'power3.out' })
        bio.style.display = 'none'
      }
    })
  }

  // Add event listeners to director buttons
  directorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      const director = button.getAttribute('data-button-director')

      // Filter and fade in work items and director bios
      filterAndFadeInWorkItems(director)

      // Change the background color of the clicked button to pink
      directorButtons.forEach((btn) => {
        if (btn === button) {
          btn.style.transition =
            'background-color 0.52s ease, opacity 0.5s ease'
          btn.style.backgroundColor = '#ff0066' // Change to pink color
          btn.style.color = 'black'
        } else {
          btn.style.transition = 'background-color 0.7s ease, opacity 0.5s ease'
          btn.style.backgroundColor = '' // Reset other buttons' background color
          btn.style.color = ''
        }
      })
    })
  })
})
