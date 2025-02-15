$(document).ready(function () {
  const verticalSections = gsap.utils.toArray(
    ".verticalSwiper > .swiper-wrapper  > .swiper-slide"
  );
  const horizentalSections = gsap.utils.toArray(
    ".horizSwiper > .swiper-wrapper  > .swiper-slide"
  );

  let firstSlide;
  let lastSlide;

  var verticalSwiper = new Swiper(".verticalSwiper", {
    direction: "vertical",
    mousewheel: true,
    updateOnWindowResize: true,
    slidesPerView: 1.5,
    speed: 1000,
    slideToClickedSlide: true,
    breakpoints: {
      0: {
        spaceBetween: 20,
      },
      992: {
        initialSlide: 1,
        spaceBetween: 50,
        centeredSlides: true,
      },
    },
    on: {
      init: function () {
        if (window.innerWidth > 992) {
          setVerticalSlideStyles(this);
        }
      },
      slideChange: function (e) {
        if (window.innerWidth > 992) {
          setVerticalSlideStyles(this);
        }
      },
    },
  });

  var horizSwiper = new Swiper(".horizSwiper", {
    spaceBetween: 50,
    initialSlide: 1,
    // allowTouchMove: false,
    slidesPerView: 1.2,

    slideToClickedSlide: true,
    updateOnWindowResize: true,
    breakpoints: {
      0: {
        direction: "vertical",
      },
      992: {
        spaceBetween: 50,
        direction: "horizontal",
        centeredSlides: true,
      },
    },
    on: {
      init: function () {
        firstSlide = this.slides[0];
        lastSlide = this.slides[2];
        if (window.innerWidth < 992) {
          configHorizSlides(this);
        } else {
          setHorizentalSlideStyles(this.activeIndex);
        }
      },
      slideChange: function () {
        if (window.innerWidth > 992) {
          setHorizentalSlideStyles(this.activeIndex);
        }
      },
    },
  });

  verticalSections.forEach((section) => {
    $(section).on("click", handleSlideClick);
  });

  // ----------------------------------------------------------
  // Function to handle the click event on a slide
  // ----------------------------------------------------------
  function handleSlideClick(e) {
    e.stopPropagation();

    // Check if the clicked slide is inside a horizontal swiper
    const hasHorizSlider =
      $(e.target).closest(".horizSwiper").parent().length > 0;

    const horizantalClickedSlideIndex = getHorizontalClickedSlideIndex(
      e.target
    );

    const verticalSlideIndex = verticalSections.index(this);

    hasHorizSlider
      ? verticalSwiper.slideTo(horizantalClickedSlideIndex)
      : verticalSwiper.slideTo(verticalSlideIndex);
  }

  // Function to get the index of the clicked horizontal slide
  function getHorizontalClickedSlideIndex(clickedTarget) {
    return verticalSections.index(
      $(clickedTarget).closest(".horizSwiper").parent()
    );
  }

  // ----------------------------------------------------------
  //  Function to set styles for vertical slides based on active index
  // ----------------------------------------------------------
  function setVerticalSlideStyles(swiper) {
    const activeIndex = swiper.activeIndex;

    verticalSections.forEach((section, index) => {
      let bgImg = $(section).hasClass("horiz")
        ? $(section).find(".horizSwiper .swiper-slide-active .content .bg-img")
        : $(section).find("> .bg-img");

      // Apply styles for the active section
      if (index === activeIndex) {
        gsap.to(section, {
          duration: 1,
          opacity: 1,
          rotationY: 0,
          ease: "power2.out",
        });

        gsap.to(bgImg, {
          duration: 1,
          ease: "power2.out",
          scale: 1,
        });
      } else {
        // Apply styles for the inactive sections
        gsap.to(section, {
          rotationY: -30,
          opacity: 0.8,
          ease: "power2.out",
          perspective: 100,
        });
        gsap.to(bgImg, {
          duration: 1,
          ease: "power2.out",
          scale: 0.9,
        });
      }
    });
  }

  // ----------------------------------------------------------
  //  Function to set styles for horizontal slides based on active index
  // ----------------------------------------------------------

  function setHorizentalSlideStyles(activeIndex) {
    horizentalSections.forEach((section, index) => {
      if (index === activeIndex) {
        // Apply active styles to the current section
        gsap.to(section, {
          duration: 1,
          opacity: 1,
          rotationX: 0,
          ease: "power2.out",
          perspective: 100,
        });
      } else {
        // Apply inactive styles to other sections
        gsap.to(section, {
          rotationX: -30,
          duration: 1,
          opacity: 0.8,
          ease: "power2.out",
          perspective: 100,
        });
      }
    });
  }

  // -------------------------------------------------------
  // Function to configure horizontal slides and adjust vertical slides
  // --------------------------------------------------------

  function configHorizSlides(horizontalSwiper) {
    horizontalSwiper.removeSlide([0, 2]);
    verticalSwiper.addSlide(1, firstSlide);
    verticalSwiper.addSlide(3, lastSlide);
  }

  // -------------------------
  // initialCursor
  // -------------------------
  function initialCursor() {
    const cursorDot = $(".era-cursor-dot");
    const cursorBound = $(".era-cursor-bound");

    gsap.set([cursorDot, cursorBound], {
      xPercent: -50,
      yPercent: -50,
      force3D: true,
      zIndex: 9999,
    });

    function moveCursor(e) {
      const x = e.clientX;
      const y = e.clientY;

      gsap.to(cursorDot, {
        x: x,
        y: y,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(cursorBound, {
        x: x,
        y: y,
        duration: 0.38,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    $(document).on("mousemove", moveCursor);
  }
  initialCursor();
});
