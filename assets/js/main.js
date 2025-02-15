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

  let firstSlide;
  let lastSlide;

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
        initialSlide: 1,
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
      sliderFirstMove: function () {
        // hideSlides(this);
      },
      tap: function () {
        // hideSlides(this);
        // gsap.to(slidesWrapper, {
        //   xPercent: 88,
        // });
      },
    },
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
    swiper.removeSlide([0, 2]);
    verticalSwiper.addSlide(0, firstSlide);
    verticalSwiper.addSlide(4, lastSlide);
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

  // let endFixedSlide = $(".end-fixed-slide");
  // let startFixedSlide = $(".start-fixed-slide");
  // let slidesWrapper = $(".slides-wrapper");

  // gsap.set(endFixedSlide, {
  //   height: $(verticalSwiper.slides[0]).height(),
  //   width: $(verticalSwiper.slides[0]).width(),
  //   xPercent: 93,
  //   rotationX: -30,
  // });
  // gsap.set(startFixedSlide, {
  //   height: $(verticalSwiper.slides[0]).height(),
  //   width: $(verticalSwiper.slides[0]).width(),
  //   xPercent: -93,
  //   rotationX: -30,
  // });

  // endFixedSlide.on("click", function () {
  //   gsap.to(slidesWrapper, {
  //     xPercent: -88,
  //   });

  //   gsap.to(endFixedSlide, {
  //     rotationX: 0,
  //     // scaleY: 1.2,
  //   });
  // });
  // startFixedSlide.on("click", function () {
  //   gsap.to(slidesWrapper, {
  //     xPercent: 88,
  //   });

  //   gsap.to(startFixedSlide, {
  //     rotationX: 0,
  //     // scaleY: 1.2,
  //   });
  // });
});
