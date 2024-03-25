console.log('JavaScript file is being read.')
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import './styles.css'

// Initialize event listeners when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Select the modal container
  const modal = document.querySelector('.modal_container')
  console.log(modal) // Check if modal is selected

  setupGridLayoutPattern()
  initEventListeners()

  // Declare isOpen variable outside of initEventListeners function
  let isOpen = false

  // Function to initialize event listeners
  function initEventListeners() {
    // Select the menu button and menu component
    const ham = document.querySelector('.nav_menu-link')
    const menu = document.querySelector('.menu_component_2')

    // Function to toggle menu
    function toggleMenu() {
      if (isOpen) {
        // If menu is open, fade out and hide the menu
        gsap.to(menu, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            menu.style.display = 'none'
            isOpen = false

            // Store menu state in localStorage
            localStorage.setItem('menuState', 'closed')
          },
        })
      } else {
        // If menu is closed, show and fade in the menu
        menu.style.display = 'block' // Ensure menu is visible before fading in
        gsap.to(menu, {
          opacity: 1,
          duration: 0.5,
          onComplete: () => {
            isOpen = true

            // Store menu state in localStorage
            localStorage.setItem('menuState', 'open')
          },
        })
      }
    }

    // Add event listener to toggle the menu on menu button click

    ham.addEventListener('click', toggleMenu)

    // Add event listeners to handle menu hover
    menu.addEventListener('mouseenter', () => {
      if (!isOpen) {
        toggleMenu()
      }
    })

    menu.addEventListener('mouseleave', () => {
      if (isOpen) {
        toggleMenu()
      }
    })

    // Check localStorage for stored menu state on page load
    document.addEventListener('DOMContentLoaded', function () {
      const storedMenuState = localStorage.getItem('menuState')

      // If menu state is stored, initialize menu based on stored state
      if (storedMenuState === 'open') {
        // Open the menu
        toggleMenu()
      }
    })

    //change menu text styles
    const menuTextElements = document.querySelectorAll('.menu_link-text_2')

    // Loop through each menu text element
    menuTextElements.forEach((element) => {
      // Change the font size of the text element
      element.style.fontSize = '32px' // Set the font size
      // Change the font family of the text element
      element.style.fontFamily = 'Inconsolata' // Set the font family
    })

    // Handle mouseover and mouseout events for image elements
    const workCards = document.querySelectorAll('.work_card')

    // Function to handle mouseover
    function handleMouseOver() {
      // Add mouseover logic
      this.style.transition = 'transform 0.2s, opacity 0.3s'
      this.style.transform = 'scale(1.010)'
      this.style.opacity = '1'

      const menuText = document.querySelectorAll('.menu_link_2')
      menuText.forEach((element) => {
        element.style.color = 'white'
      })

      const brandText = this.querySelector('.work_brand')
      if (brandText) {
        brandText.style.opacity = '1'
        brandText.style.color = 'white'
        brandText.style.transition =
          'opacity 0.3s ease-in-out, transform 0.2s ease-in-out' // Add transform transition
        brandText.style.transform = 'scale(1.04)' // Scale up brand text
      }

      const directorHeading = this.querySelector('.director-name_heading')
      if (directorHeading) {
        // Fade in #ff0066 color and then fade out to white for director-name_heading
        const pinkToWhiteForDirectorHeading = gsap.timeline()
        pinkToWhiteForDirectorHeading
          .to(directorHeading, { duration: 0.3, color: '#ff0066' }) // Fade in pink color
          .to(directorHeading, { duration: 0.5, color: 'white' }) // Fade out pink color to white

        // Set initial styles
        directorHeading.style.opacity = '1'
        directorHeading.style.display = 'block'
      }
    }

    // Function to handle mouseout
    function handleMouseOut() {
      // Add mouseout logic
      this.style.transition = 'transform 0.2s, opacity 0.2s'
      this.style.transform = 'scale(1)'
      this.style.opacity = '0.5' // Revert to 50% opacity

      const brandText = this.querySelector('.work_brand')
      if (brandText) {
        brandText.style.opacity = '0.5' // Revert to 50% opacity
        brandText.style.transition = 'opacity 0.3s ease-in-out'
        brandText.style.color = 'white'
        brandText.style.scale = '1'
      }
    }

    // Query and loop through all project items
    const projectItems = document.querySelectorAll('.work_card')

    // Select the close button in the modal and add event listener
    const closeButton = document.querySelector('.modal_close_button')
    if (closeButton) {
      closeButton.addEventListener('click', closeModal)
    }

    // Initialize variables for tracking current item index and project items array
    let currentItemIndex = 0
    const projectItemsArray = Array.from(projectItems)
    // Function to update modal content with data from a specific item
    function updateModalContent(item) {
      const modalBrand = document.querySelector('.modal_brand')
      const modalTitle = document.querySelector('.modal_title')
      const modalImage = document.querySelector('.modal_image')
      const modalVideoContainer = document.getElementById('modalVideo')
      const modalDirectorHeading = document.querySelector(
        '.modal-director_heading'
      )

      if (!modalBrand || !modalTitle || !modalImage || !modalVideoContainer) {
        console.error('Modal elements not found.')
        return
      }

      // Update modal content with data from the item
      modalBrand.innerText = item.querySelector('.work_brand').innerText
      modalTitle.innerText = item.querySelector('.work_title').innerText
      modalImage.src = item
        .querySelector('.work_card_image-1')
        .getAttribute('src')
      modalDirectorHeading.innerText = item.querySelector(
        '.director-name_heading'
      ).innerText

      // Get the video URL from data attribute or other source
      const videoLink = item.getAttribute('data-video-link')
      console.log('Video URL:', videoLink)

      // Show spinner while the Vimeo player is loading
      document.getElementById('spinner').style.display = 'block'

      // Dispose of previous player if exists
      if (window.player) {
        window.player
          .destroy()
          .then(() => {
            console.log('Previous player destroyed')
            initializePlayer(videoLink, modalVideoContainer)
          })
          .catch((error) => {
            console.error('Error destroying player:', error)
          })
      } else {
        initializePlayer(videoLink, modalVideoContainer)
      }
    }
    // Function to initialize Vimeo player
    function initializePlayer(videoLink, container) {
      try {
        // Show spinner before starting GSAP animations
        document.getElementById('spinner').style.display = 'block'

        // Fade in the spinner
        gsap.to('#spinner', {
          duration: 1,
          opacity: 1,
          ease: 'power3.out',
          onComplete: () => {
            gsap.to('.spinner', {
              rotation: 360,
              duration: 1,
              ease: 'linear',
              repeat: -1,
            }), // Create Vimeo player after spinner is visible
              (window.player = new Vimeo.Player(container, {
                url: videoLink,
                autoplay: false,
                muted: false,
                loop: true,
                preload: true,
                controls: {
                  play: true,
                  progress: true,
                },
                width: '640px', // Set player width to 100% of the container
                height: '360px', // Set player height to 100% of the container
              }))

            // Fade in the modal video when the Vimeo player has loaded
            window.player.on('loaded', () => {
              // Fade out the spinner gradually over 3 seconds
              gsap.to('#spinner', {
                delay: 1, // Delay the fade-out to synchronize with the video fade-in
                duration: 1,
                opacity: 0,
                ease: 'power4.out',
                onComplete: () => {
                  // Hide spinner after animation is complete
                  document.getElementById('spinner').style.display = 'none'
                },
              })
            })
          },
        })
      } catch (error) {
        console.error('Error initializing player:', error)
      }
    }
    // Function to handle click on project item
    function handleProjectItemClick(event) {
      const clickedItem = event.currentTarget
      const modal = document.querySelector('.modal_container')

      // Find the index of the clicked item in the projectItemsArray
      const index = projectItemsArray.indexOf(clickedItem)

      // Update the currentItemIndex
      currentItemIndex = index

      console.log('Modal element:', modal) // Debugging statement

      if (modal) {
        // Update modal content with data from the clicked item
        updateModalContent(clickedItem)
        // Show the modal with GSAP animation
        gsap.to(modal, {
          duration: 0.7,
          opacity: 1,
          display: 'block',
          ease: 'power3.out',
        })
      } else {
        console.error('Modal element not found') // Error message
      }
    }

    // Function to handle click on previous button
    function handlePreviousButtonClick() {
      if (currentItemIndex > 0) {
        const modalItem = document.querySelector('.modal-content') // Select the modal item
        const prevItem = projectItemsArray[currentItemIndex - 1] // Select the previous item

        // Fade out the current modal item and fade in the next item
        gsap.to(modalItem, {
          duration: 0.9,
          opacity: 0,
          ease: 'power2.inOut',
          onComplete: () => {
            updateModalContent(prevItem) // Update modal content with the previous item
            gsap.to(modalItem, {
              duration: 0.9,
              opacity: 1,
              ease: 'power2.inOut',
            })
          },
        })

        currentItemIndex-- // Move to the previous item

        // Update visibility of next button
        nextButton.style.opacity = 1
      }

      // Update visibility of previous button
      if (currentItemIndex === 0) {
        gsap.to(prevButton, { duration: 0.9, opacity: 0 }) // Hide previous button when at the beginning of the array
      } else {
        gsap.to(prevButton, { duration: 0.9, opacity: 1 }) // Show previous button when not at the beginning of the array
      }
    }

    // Function to handle click on next button
    function handleNextButtonClick() {
      if (currentItemIndex < projectItemsArray.length - 1) {
        const modalItem = document.querySelector('.modal-content') // Select the modal item
        const nextItem = projectItemsArray[currentItemIndex + 1] // Select the next item

        // Fade out the current modal item and fade in the next item
        gsap.to(modalItem, {
          duration: 0.9,
          opacity: 0,
          ease: 'power2.inOut',
          onComplete: () => {
            updateModalContent(nextItem) // Update modal content with the next item
            gsap.to(modalItem, {
              duration: 0.9,
              opacity: 1,
              ease: 'power2.inOut',
            })
          },
        })

        currentItemIndex++ // Move to the next item

        // Update visibility of previous button
        prevButton.style.opacity = 1
      }

      // Update visibility of next button
      if (currentItemIndex === projectItemsArray.length - 1) {
        gsap.to(nextButton, { duration: 0.9, opacity: 0 }) // Hide next button when at the end of the array
      } else {
        gsap.to(nextButton, { duration: 0.9, opacity: 1 }) // Show next button when not at the end of the array
      }
    }

    // Select the previous button and add event listener
    const prevButton = document.querySelector('.prev_button')
    if (prevButton) {
      prevButton.addEventListener('click', handlePreviousButtonClick)
    }

    // Select the next button and add event listener
    const nextButton = document.querySelector('.next_button')
    if (nextButton) {
      nextButton.addEventListener('click', handleNextButtonClick)
    } else {
      console.error('Next button not found.')
    }

    // Function to close the modal with GSAP animation
    function closeModal() {
      console.log('Close modal function called')
      const modal = document.querySelector('.modal_container')

      if (modal) {
        // Close the modal with GSAP animation
        gsap.to(modal, {
          duration: 0.5,
          opacity: 0,
          display: 'none',
          ease: 'power4.in',
        })
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM Content Loaded')

      const tlNav = gsap.timeline({ paused: true })
      tlNav.to('.prev_button, .next_button', { color: 'red', duration: 0.5 })

      const navigationButtons = document.querySelectorAll('.navigation_buttons')
      console.log('Number of navigation buttons:', navigationButtons.length) // Log number of navigation buttons

      navigationButtons.forEach((button) => {
        console.log('Adding event listeners for button:', button)
        button.addEventListener('mouseenter', () => {
          console.log('Mouse entered button:', button)
          tlNav.play()
        })
        button.addEventListener('mouseleave', () => {
          console.log('Mouse left button:', button)
          tlNav.reverse()
        })
      })
    })

    // CMS Filter

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
        if (
          director === 'all' ||
          item.getAttribute('data-work-director') === director
        ) {
          item.style.display = '' // Reset display property
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
            btn.style.transition =
              'background-color 0.7s ease, opacity 0.5s ease'
            btn.style.backgroundColor = '' // Reset other buttons' background color
            btn.style.color = ''
          }
        })
      })
    })

    // Add event listeners to work items
    workCards.forEach((element) => {
      element.addEventListener('mouseover', handleMouseOver)
      element.addEventListener('mouseout', handleMouseOut)
      element.addEventListener('click', handleProjectItemClick) // Added event listener for project item click
    })
  }
  // Select all work cards
  function setupGridLayoutPattern() {
    const workCards = Array.from(document.querySelectorAll('.work_card')) // Convert NodeList to array

    // Define the layout pattern
    const layoutPattern = [
      { rows: 1, cols: 1 }, // Card 1: Full width
      { rows: 1, cols: 2 }, // Card 2: Half width, spans 2 columns
      { rows: 1, cols: 3 }, // Card 3: Full width, spans 3 columns
      // Add more patterns as needed
    ]

    // Generate an array of indices representing the order
    const indices = Array.from({ length: workCards.length }, (_, i) => i)

    // Shuffle the indices array
    shuffleArray(indices)

    // Iterate over each work card and apply the shuffled layout pattern
    workCards.forEach((card, index) => {
      const { rows, cols } =
        layoutPattern[indices[index] % layoutPattern.length]

      // Apply grid layout
      card.style.gridRow = `span ${rows}`
      card.style.gridColumn = `span ${cols}`
    })
  }

  // Function to shuffle an array using Fisher-Yates algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]] // Swap elements
    }
  }
})

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.menu_link_2').forEach((element) => {
    // Select the text elements to split
    const text1 = element.querySelector("[hoverstagger='text']:first-child")
    const text2 = element.querySelector("[hoverstagger='text']:nth-child(2)")

    // Split the text using split-typew
    const splitText1 = new SplitType(text1, { split: 'chars' })
    const splitText2 = new SplitType(text2, { split: 'chars' })

    // Create timelines for animation
    const tl = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.5,
        ease: 'power2.out',
      },
    })

    // Define animations using SplitType elements
    tl.fromTo(
      splitText1.elements,
      { yPercent: 100 },
      { yPercent: 0, stagger: 0.05 } // Adjust stagger value as needed
    )
    tl.fromTo(
      splitText2.elements,
      { yPercent: 0 },
      { yPercent: -100, stagger: 0.05 }, // Adjust stagger value as needed
      0 // Delay the animation of text2 by 0 seconds
    )

    element.addEventListener('mouseenter', () => {
      // Fade in effect
      gsap.fromTo(
        element,
        { backgroundColor: 'rgba(255,0,102,0)' }, // start with transparent
        { backgroundColor: '#ff0066', duration: 0.2 } // end with a semi-transparent #ff0066
      )
      // Start stagger animation
      tl.restart()
    })

    element.addEventListener('mouseleave', () => {
      // Fade out effect
      gsap.to(element, { backgroundColor: 'rgba(255,0,102,0)', duration: 0.2 }) // fade back to transparent
    })
  })
})

document.addEventListener('DOMContentLoaded', function () {
  // Set initial position of card element
  gsap.to('.heading-wrapper', {
    xPercent: -50,
    ease: 'none',
    duration: 30,
    repeat: -1,
  })
})

document.addEventListener('DOMContentLoaded', function () {
  // Set initial position of card element
  gsap.to('.about-team-card', {
    xPercent: -50,
    ease: 'none',
    duration: 30,
    repeat: -1,
  })
})

document.addEventListener('DOMContentLoaded', function () {
  // Get all team card items
  var teamCardItems = document.querySelectorAll('.Team-Cards-Item')

  // Create a GSAP timeline
  var tl = gsap.timeline()

  // Loop through each team card item
  teamCardItems.forEach(function (item, index) {
    // Add animation to the timeline with staggered delay
    tl.to(item, {
      opacity: 0, // Fade out the item
      duration: 5.5, // Adjust the duration of the fade out
      ease: 'power2.inOut', // Adjust the easing function as needed
      delay: index * 1.5, // Stagger the delay for each item
    })
  })
})
