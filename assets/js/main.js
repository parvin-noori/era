$(document).ready(function () {
  const verticalSections = gsap.utils.toArray(
    ".verticalSwiper > .swiper-wrapper  > .swiper-slide"
  );
  const horizentalSections = gsap.utils.toArray(
    ".horizSwiper > .swiper-wrapper  > .swiper-slide"
  );

  let verticalSwipeSlide = $(
    ".verticalSwiper > .swiper-wrapper>  .swiper-slide"
  );
  let horizentalSwipeSlide = $(
    ".horizSwiper > .swiper-wrapper>  .swiper-slide"
  );

  let verticalSlideIndex;

  var verticalSwiper = new Swiper(".verticalSwiper", {
    direction: "vertical",
    mousewheel: true,
    updateOnWindowResize: true,
    slidesPerView: 1,
    speed: 1000,
    slideToClickedSlide: true,
    breakpoints: {
      0: {
        spaceBetween: 20,
      },
      992: {
        initialSlide: 1.5,
        spaceBetween: 50,
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
    // allowTouchMove: false,
    slidesPerView: 1.1,

    slideToClickedSlide: true,
    updateOnWindowResize: true,
    breakpoints: {
      0: {
        direction: "vertical",
        initialSlide: 0,
      },
      992: {
        initialSlide: 1,
        // spaceBetween: 50,
        direction: "horizontal",
        centeredSlides: true,
      },
    },
    on: {
      init: function () {
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

  window.addEventListener('resize', () => {
    horizSwiper.update();
  });

  horizentalSwipeSlide.each(function (e) {
    $(this).on("click", handleSlideClick);
  });
  ///////////////////////////////////////////////////////////////////
  // Function to handle the click event on a slide
  ///////////////////////////////////////////////////////////////////
  function handleSlideClick(e) {
    e.stopPropagation();

    // Check if the clicked slide is inside a horizontal swiper
    const hasVerticalSlider =
      $(e.target).closest(".verticalSwiper").parent().length > 0;

    const horizantalClickedSlideIndex = getVerticalClickedSlideIndex(e.target);

    const horizentalSlideIndex = horizentalSwipeSlide.index(this);

    hasVerticalSlider
      ? horizSwiper.slideTo(horizantalClickedSlideIndex)
      : horizSwiper.slideTo(horizentalSlideIndex);
  }

  // Function to get the index of the clicked horizontal slide
  function getVerticalClickedSlideIndex(clickedTarget) {
    return horizentalSwipeSlide.index(
      $(clickedTarget).closest(".verticalSwiper").parent()
    );
  }

  ///////////////////////////////////////////////////////////////////
  // Function to set styles for vertical slides based on active index
  ///////////////////////////////////////////////////////////////////
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

  ///////////////////////////////////////////////////////////////////
  // // Function to set styles for horizontal slides based on active index
  ///////////////////////////////////////////////////////////////////

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
        // Apply active styles to the current section
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

  function configHorizSlides(swiper) {
    const allSlides = Array.from(swiper.slides);

    swiper.slides.forEach((slide, index) => {
      if ($(slide).hasClass("vertical")) {
        verticalSlideIndex = index;
      }
    });

    for (let i = swiper.slides.length - 1; i >= 0; i--) {
      const slide = swiper.slides[i];
      if (!$(slide).hasClass("vertical")) {
        swiper.removeSlide(i); // Remove the slide if it doesn't have the "vertical" class
      }
    }

    for (let i = 0; i < verticalSlideIndex; i++) {
      verticalSwiper.addSlide(i, allSlides[i]); // Add slides before the vertical one
    }

    for (let i = verticalSlideIndex + 1; i < allSlides.length; i++) {
      verticalSwiper.addSlide(verticalSwiper.slides.length, allSlides[i]); // Add slides after the vertical one
    }
  }

  ///////////////////////////////////////////////////////////////////
  // Function to configure horizontal slides and adjust vertical slides
  ///////////////////////////////////////////////////////////////////
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

      // Animate dot with lerp for smooth movement
      gsap.to(cursorDot, {
        x: x,
        y: y,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Animate bound with slower lerp
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
