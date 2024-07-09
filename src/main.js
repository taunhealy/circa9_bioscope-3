/* eslint-disable no-unused-vars */
console.log('JavaScript file is being read.')
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import './styles.css'
import './page_directors'
import Vimeo from '@vimeo/player'
import gsap from 'gsap'

// Initialize event listeners when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
  const lenis = new Lenis({
    // Valeur entre 0 et 1
    // Valeur par défaut : 0,1
    // Plus la valeur est faible, plus le scroll sera fluide
    lerp: 0.07,
    // Valeur par défaut : 1
    // Plus la valeur est haute, plus le défilement sera rapide
    wheelMultiplier: 1,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
})

// Select the modal container
const modal = document.querySelector('.modal_container')

function setImagePositions() {
  const mainSlides = document.querySelectorAll('.main-slide')
  const mainCarousel = document.querySelector('.main-carousel')
  const parallaxPercentage = 100 // Adjust this value as needed

  mainSlides.forEach((targetElement) => {
    const elementOffset =
      targetElement.offsetLeft +
      targetElement.offsetWidth -
      mainCarousel.offsetLeft
    const parentWidth = mainCarousel.offsetWidth + targetElement.offsetWidth
    let myProgress = elementOffset / parentWidth
    let slideProgress = parallaxPercentage * myProgress

    if (slideProgress > parallaxPercentage) {
      slideProgress = parallaxPercentage
    } else if (slideProgress < 0) {
      slideProgress = 0
    }

    const imageElement = targetElement.querySelector('.image')
    if (imageElement) {
      imageElement.style.transform = `translateX(-${slideProgress}%)`
    }
  })
}

setImagePositions()

// Menu open & close
document.addEventListener('DOMContentLoaded', function () {
  let isOpen = false

  // Select the menu button and menu component
  const ham = document.querySelector('.nav_menu-link')
  const menu = document.querySelector('.menu_component_2')

  // Function to toggle menu
  function toggleMenu() {
    if (isOpen) {
      // If menu is open, hide the menu
      menu.style.display = 'none'
      isOpen = false
      // Store menu state in localStorage
      localStorage.setItem('menuState', 'closed')
    } else {
      // If menu is closed, show and fade in the menu
      menu.style.display = 'block' // Ensure menu is visible before fading in
      gsap.to(menu, {
        opacity: 1,
        duration: 0.3,
        onComplete: () => {
          isOpen = true

          // Store menu state in localStorage
          localStorage.setItem('menuState', 'open')
        },
      })
    }
  }

  // Check localStorage for stored menu state on page load
  const storedMenuState = localStorage.getItem('menuState')

  // Initialize menu based on stored state or default to closed
  if (storedMenuState === 'open') {
    // Open the menu
    isOpen = true
    menu.style.display = 'block' // Ensure menu is visible
  } else {
    // Close the menu
    isOpen = false
    menu.style.display = 'none'
  }

  // Add event listener to toggle the menu on menu button click
  if (ham && menu) {
    ham.addEventListener('click', () => {
      toggleMenu()
    })

    menu.addEventListener('mouseleave', () => {
      if (isOpen) {
        toggleMenu()
      }
    })

    const menuLinks = document.querySelectorAll('.menu_link_2')
    // Add event listeners to menu links
    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (isOpen) {
          toggleMenu()
        }
      })
    })
  }

  // Change menu text styles
  const menuTextElements = document.querySelectorAll('.menu_link-text_2')

  // Loop through each menu text element
  menuTextElements.forEach((element) => {})
})

// Work Cards & Modal
document.addEventListener('DOMContentLoaded', function () {
  // Handle mouseover and mouseout events for image elements
  const workCards = document.querySelectorAll('.work_card')

  // Function to handle mouseover
  function handleMouseOver() {
    // Add mouseover logic
    this.style.transition = 'transform 0.2s, opacity 0.3s'
    this.style.transform = 'scale(1.010)'
    this.style.opacity = '1'

    const menuTextElements = document.querySelectorAll('.menu_link_2')
    menuTextElements.forEach((menuTextElement) => {
      menuTextElement.style.color = 'white'
    })

    const directorHeadingElements = document.querySelectorAll(
      '.director-name_heading'
    )
    directorHeadingElements.forEach((directorHeadingElement) => {
      // Ensure directorHeadingElement is checked for existence before using
      if (directorHeadingElement) {
        // Fade in #ff0066 color and then fade out to white for director-name_heading
        const pinkToWhiteForDirectorHeading = gsap.timeline()
        pinkToWhiteForDirectorHeading
          .to(directorHeadingElement, { duration: 0.3, color: '#ff0066' }) // Fade in pink color
          .to(directorHeadingElement, { duration: 0.5, color: 'white' }) // Fade out pink color to white
      }
    })

    const brandTextElement = this.querySelector('.work_brand')
    if (brandTextElement) {
      brandTextElement.style.color = '#ff0066'
      brandTextElement.style.transition =
        'opacity 0.3s ease-in-out, transform 0.2s ease-in-out' // Add transform transition
      brandTextElement.style.transform = 'scale(1.04)' // Scale up brand text
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
      brandText.style.opacity = '0.5'
      brandText.style.transition = 'opacity 0.3s ease-in-out'
      brandText.style.color = 'white'
      brandText.style.scale = '1'
    }
  }

  // Call handleMouseOver on the first work card to make it active on page load
  if (workCards.length > 0) {
    handleMouseOver.call(workCards[0])
  }

  // Add event listeners to work items to handle hover
  workCards.forEach((element) => {
    element.addEventListener('mouseover', handleMouseOver)
    element.addEventListener('mouseout', handleMouseOut)
    element.addEventListener('click', handleProjectItemClick)
  })

  // Query and loop through all project items
  const projectItems = document.querySelectorAll('.work_card')

  // Select the close button in the modal and add event listener
  const closeButton = document.querySelector('.modal_close_button')
  if (closeButton) {
    closeButton.addEventListener('click', closeModal)
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

  // Initialize variables for tracking current item index and project items array
  let currentItemIndex = 0
  const projectItemsArray = Array.from(projectItems)

  function updateModalContent(item) {
    // Select modal elements
    const modalBrand = document.querySelector('.modal_brand')
    const modalTitle = document.querySelector('.modal_title')
    const modalImage = document.querySelector('.modal_image')
    const modalDirectorHeading = document.querySelector(
      '.modal-director_heading'
    )
    const modalVideoContainer = document.getElementById('modalVideo')

    // Check if the clicked item is a main project item or a modal collection list item
    if (item.dataset.itemSlug) {
      // Update modal content with data from the main project item
      modalBrand.innerText = item.querySelector('.work_brand').innerText
      modalTitle.innerText = item.querySelector('.work_title').innerText
      modalImage.src = item
        .querySelector('.work_card_image-1')
        .getAttribute('src')
      modalDirectorHeading.innerText = item.querySelector(
        '.director-name_heading'
      ).innerText
    } else if (item.classList.contains('modal_collection-list_item')) {
      // Update modal content for modal collection list items
      modalBrand.innerText = item.querySelector(
        '.modal_collection-list_brand'
      ).innerText

      modalDirectorHeading.innerText = item.querySelector(
        '.modal_collection-list_director'
      ).innerText // Set director heading as needed for modal collection list items
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

    // Filter collection items by director name
    const directorName = modalDirectorHeading.innerText // Get director's name from the modal
    filterCollectionItemsByDirector(directorName) // Call function to filter collection items

    // Get the video URL from data attribute
    const videoLink = item.getAttribute('data-video-link')
    console.log('Video URL:', videoLink)

    // Show spinner while the Vimeo player is loading
    document.getElementById('spinner').style.display = 'block'

    // Dispose of previous player if it exists
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

  // Function to filter collection items by director name
  function filterCollectionItemsByDirector(directorName) {
    const collectionItems = document.querySelectorAll(
      '.modal_collection-list_item'
    )

    collectionItems.forEach((item) => {
      const itemDirectorName = item.getAttribute('Director-Name')
      if (itemDirectorName === directorName) {
        item.style.display = 'block' // Show the item
      } else {
        item.style.display = 'none' // Hide the item
      }
    })
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

  //project item click
  //project item click
  function handleProjectItemClick(event) {
    const clickedItem = event.currentTarget

    // Check if the clicked item is a modal collection list item
    if (clickedItem.classList.contains('modal_collection-list')) {
      // Handle click on modal collection list item differently
      // For example, you can update the modal content based on the clicked item
      updateModalContent(clickedItem)
    } else {
      // Handle click on main project item
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

  // Add event listeners to modal items
  let modalitems = document.querySelectorAll('.modal_collection-list_item')
  modalitems.forEach((element) => {
    element.addEventListener('mouseover', handleMouseOver)
    element.addEventListener('mouseout', handleMouseOut)
    element.addEventListener('click', handleProjectItemClick) // Added event listener for project item click
  })

  // Add event listeners to work items
  workCards.forEach((element) => {
    element.addEventListener('mouseover', handleMouseOver)
    element.addEventListener('mouseout', handleMouseOut)
    element.addEventListener('click', handleProjectItemClick) // Added event listener for project item click
  })

  // Add event listeners for Directors work items
  let directorWorkCards = document.querySelectorAll('work_card is-directors')
  directorWorkCards.forEach((item) => {
    item.addEventListener('click', handleProjectItemClick)
  })
})

// Menu
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

// Directors Names

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded event fired')

  const headingContainer = document.querySelector('.heading-container')
  console.log('Heading container:', headingContainer)

  if (headingContainer) {
    gsap.to('.heading-container', {
      xPercent: -50,
      ease: 'none',
      duration: 30,
      repeat: -1,
    })
    console.log('Animation applied to heading container')
  } else {
    console.log('Heading container not found')
  }
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

document.addEventListener('DOMContentLoaded', function () {
  // Get all heading elements with the classes 'heading' and 'heading-alt'
  var headingElements = document.querySelectorAll('.heading, .heading-alt')

  // Get the page title or any other indicator of the current page
  var pageTitle = document.title

  // Set the text of each heading element based on the current page
  headingElements.forEach(function (heading) {
    // Update the innerHTML of the heading element with the page title
    heading.innerHTML = pageTitle
  })

  // Now that the text has been changed, fade in the Heading Wrapper
  var headingWrapper = document.querySelector('.heading-wrapper')

  if (headingWrapper) {
    gsap.to(headingWrapper, {
      opacity: 1,
    })
  }
})

// Director image display on director button hover

document.addEventListener('DOMContentLoaded', function () {
  // Get all filter buttons
  var filterButtons = document.querySelectorAll('.filter-button')

  // Get all director images
  var directorImages = document.querySelectorAll('.director-image')

  // Loop through each filter button
  filterButtons.forEach(function (button, index) {
    // Add event listener for mouseover event
    button.addEventListener('mouseover', function () {
      // Display the corresponding director image
      directorImages[index].style.display = 'block'
    })

    // Add event listener for mouseout event
    button.addEventListener('mouseout', function () {
      // Hide the corresponding director image
      directorImages[index].style.display = 'none'
    })
  })
})

document.addEventListener('DOMContentLoaded', function () {
  var homeTextElements = document.querySelectorAll('.heading-5')

  homeTextElements.forEach(function (homeText) {
    homeText.addEventListener('mouseover', function () {
      gsap.to(homeText, {
        duration: 0.35,
        color: '#f06',
        scale: 1.1,
        marginBottom: '15px',
        marginTop: '0px',
        marginLeft: '18px', // Move text right by 30px on hover
        transformOrigin: 'left center', // Set transform origin to the left
        ease: 'power1.inOut',
      })
    })

    homeText.addEventListener('mouseout', function () {
      gsap.to(homeText, {
        duration: 0.3,
        color: 'white',
        scale: 1,
        marginBottom: '0px',
        marginTop: '0px',
        marginLeft: '0px',
        transformOrigin: 'left center', // Set transform origin to the left
        ease: 'power3.inOut',
      })
    })
  })
})

// Home Slider Content Animation
document.addEventListener('DOMContentLoaded', function () {
  const homeSliderItems = document.querySelectorAll('.home_slider_item')

  homeSliderItems.forEach((item) => {
    let heading = item.querySelector('.home_slider_item_heading')
    let image = item.querySelector('.home_slider_item_image')

    if (heading && image) {
      console.log('slider content here')
      heading.style.display = 'block'
      item.addEventListener('mouseover', function () {
        console.log('Mouse over event triggered')
        gsap.to(heading, {
          duration: 0.5,
          opacity: 0.85,
          scale: 1.03,
        })
        gsap.to(image, {
          duration: 0.1,
          scale: 1.09,
        })
      })

      // Add event listener for mouseout event to hide the heading when mouse leaves the item
      item.addEventListener('mouseout', function () {
        console.log('Mouse out event triggered')
        gsap.to(heading, {
          duration: 0.5,
          opacity: 0,
        })
        gsap.to(image, {
          duration: 0.5,
          scale: 1,
        })
      })
    } else {
      console.error(
        "Heading or image element not found in one of the '.home_slider_item' elements."
      )
    }
  })
})

// About Slider Animation
document.addEventListener('DOMContentLoaded', function () {
  const tricksSliderWrapper = document.querySelector('.tricks-slider')
  if (tricksSliderWrapper) {
    gsap.to(tricksSliderWrapper, {
      xPercent: -150,
      ease: 'none',
      duration: 45,
      repeat: -1,
    })
  }
})

//setupGridLayoutPattern()
document.addEventListener('DOMContentLoaded', function () {
  function setupGridLayoutPattern() {
    const workCards = Array.from(document.querySelectorAll('.work_card')) // Convert NodeList to array

    const layoutPattern = [
      { rows: 1, cols: 3 },
      { rows: 1, cols: 3 },
      { rows: 1, cols: 3 },
      { rows: 1, cols: 3 },
    ]

    // Generate an array of indices representing the order
    const indices = Array.from({ length: workCards.length }, (_, i) => i)

    // Iterate over each work card and apply the shuffled layout pattern
    workCards.forEach((card, index) => {
      const { rows, cols } =
        layoutPattern[indices[index] % layoutPattern.length]

      // Apply grid layout
      card.style.gridRow = `span ${rows}`
      card.style.gridColumn = `span ${cols}`
    })
  }

  // Call the function to set up the grid layout
  setupGridLayoutPattern()
})

// Home Slider X-move Animation
document.addEventListener('DOMContentLoaded', function () {
  const homeSliderWrapper = document.getElementById('home-slider-wrapper')
  if (homeSliderWrapper) {
    gsap.to(homeSliderWrapper, {
      xPercent: -150,
      ease: 'none',
      duration: 45,
      repeat: -1,
    })
  }
})

document.addEventListener('DOMContentLoaded', function () {})
