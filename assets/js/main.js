$(document).ready(function () {
  // const horizSlider = gsap.utils.toArray(".horiz");
  // const verticalSlider = gsap.utils.toArray(".vertical");
  // const horizSections = gsap.utils.toArray(".horiz > section");
  // const horizActiveElement = $(".horiz > section.active").get(0);

  // function verticalSectionPosition(verticalSections) {
  //   // element.addClass("inset-20");
  //   verticalSections.forEach((section, index) => {
  //     $(section).addClass("inset-20");

  //     gsap.set(section, {
  //       y: index * 90 + "%",
  //       // scaleY: "0.9",
  //     });
  //   });

  //   gsap.set(verticalSlider, {
  //     scaleX: "0.9",
  //   });
  // }
  // function horizSectionPosition(horizSections) {
  //   horizSections.forEach((section, index) => {
  //     $(section).addClass("inset-20");
  //     gsap.set(section, {
  //       // x: index * 100 + "%",
  //       width: "80%",
  //     });
  //   });

  //   gsap.set(horizSlider, {
  //     width: `${horizSections.length * 100}%`,
  //   });
  // }

  // if (horizActiveElement) {
  //   const activeIndex = horizSections.indexOf(horizActiveElement);
  //   const targetX = `${(100 / horizSections.length) * activeIndex}%`;

  //   gsap.to(horizSlider, {
  //     x: `-${targetX}`,
  //   });
  // }

  // verticalSectionPosition(verticalSections);
  // horizSectionPosition(horizSections);

  // function configNextElement(element) {
  //   if (element.hasClass("active")) {
  //     let nextElement = element.next();

  //     while (nextElement.length) {
  //       nextElement.addClass("after");
  //       nextElement = nextElement.next();
  //     }
  //   }
  // }

  // function configPrevElement(element) {
  //   if (element.hasClass("active")) {
  //     let prevElement = element.prev();

  //     while (prevElement.length) {
  //       prevElement.addClass("before");
  //       prevElement = prevElement.prev();
  //     }
  //   }
  // }

  // function configSectionPositions(element, index) {
  // if (element.hasClass("horiz")) {
  //   applyTranslateToHorizSections();
  // } else {
  //   applyTranslateToVerticalSections(index);
  // }
  // }

  // function applyTranslateToHorizSections() {
  //   const $eraSections = $(".era-section.horiz");

  //   if ($eraSections.length) {
  //     $eraSections.first().addClass("translate-x-[101%]");
  //     $eraSections.last().addClass("-translate-x-[101%]");
  //   }
  // }

  // function applyTranslateToVerticalSections(index) {
  //   const $verticalEraSections = $(".era-section.vertical");
  //   const $activeEraSectionIndex = $(".era-section.active").data("index");

  //   // $verticalEraSections.each(function () {
  //   //   if (index < $activeEraSectionIndex) {
  //   //     console.log($verticalEraSections[index]);
  //   //   }
  //   // });
  //   // const translateYValue = (activeIndex - index) * window.outerHeight;
  //   // $verticalEraSections[index].css('transform', `translateY(${translateYValue}px)`);
  //   // if ($eraSections.length) {
  //   // $eraSections.first().addClass("translate-y-[102%]");
  //   // $eraSections.last().addClass("-translate-y-[102%]");
  //   // }
  // }

  // var windowHeight = window.innerHeight;

  const verticalSections = gsap.utils.toArray(
    ".verticalSwiper > .swiper-wrapper  > .swiper-slide"
  );
  const verticalBgSections = gsap.utils.toArray(
    ".verticalSwiper > .swiper-wrapper  > .swiper-slide > img.bg-img"
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

  var  horizSwiper = new Swiper(".horizSwiper", {
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

  let verticalSwipeSlide = $(
    ".verticalSwiper > .swiper-wrapper>  .swiper-slide"
  );

  verticalSwipeSlide.each(function (e) {
    $(this).on("click", handleSlideClick);
  });

  function handleSlideClick(e) {
    e.stopPropagation();

    // Check if the clicked slide is inside a horizontal swiper
    const hasHorizSlider =
      $(e.target).closest(".horizSwiper").parent().length > 0;

    const horizantalClickedSlideIndex = getHorizontalClickedSlideIndex(
      e.target
    );

    const verticalSlideIndex = verticalSwipeSlide.index(this);

    hasHorizSlider
      ? verticalSwiper.slideTo(horizantalClickedSlideIndex)
      : verticalSwiper.slideTo(verticalSlideIndex);
  }

  // Function to get the horizontal slide index based on the clicked target
  function getHorizontalClickedSlideIndex(clickedTarget) {
    return verticalSwipeSlide.index(
      $(clickedTarget).closest(".horizSwiper").parent()
    );
  }

  // Function to set the styles
  function setVerticalSlideStyles(swiper) {
    const activeIndex = swiper.activeIndex;
    const previousIndex = swiper.previousIndex;
    const slides = swiper.slides;
    verticalSections.forEach((section, index) => {
      // let element = $(section).hasClass("horiz")
      //   ? $(section).find(".horizSwiper .swiper-slide-active")
      //   : section;

      let content = $(section).hasClass("horiz")
        ? $(section).find(".horizSwiper .swiper-slide-active .content")
        : $(section).find("> .content");

      let bgImg = $(section).hasClass("horiz")
        ? $(section).find(".horizSwiper .swiper-slide-active .content .bg-img")
        : $(section).find("> .bg-img");

      if (index === activeIndex) {
        // const prevSlide = slides[previousIndex];
        // const currentSlide = slides[activeIndex];
        // const nextSlide = slides[activeIndex + 1];

        // let prevContent = $(prevSlide).hasClass("horiz")
        //   ? $(prevSlide).find(".horizSwiper .swiper-slide-active .content")
        //   : $(prevSlide).find("> .content");

        // let nextContent = $(nextSlide).hasClass("horiz")
        //   ? $(nextSlide).find(".horizSwiper .swiper-slide-active .content")
        //   : $(nextSlide).find("> .content");

        // gsap.to(prevContent, {
        //   duration: 1,
        //   opacity: 1,
        //   rotationX: 3,
        //   ease: "power2.out",
        // });
        // gsap.to(nextContent, {
        //   duration: 1,
        //   opacity: 1,
        //   rotationX: -3,
        //   ease: "power2.out",
        // });
        // gsap.to(content, {
        //   duration: 1,
        //   opacity: 1,
        //   rotationX: 0,
        //   ease: "power2.out",
        // });

        gsap.to(section, {
          duration: 1,
          opacity: 1,
          rotationY: 0,
          ease: "power2.out",
        });
        // gsap.to(content, {
        //   duration: 1,
        //   rotationX: 0,
        //   ease: "power2.out",
        // });
        gsap.to(bgImg, {
          duration: 1,
          ease: "power2.out",
          scale: 1,
        });
      } else {
        gsap.to(section, {
          rotationY: -30,
          // duration: 1,
          opacity: 0.8,
          ease: "power2.out",
          perspective: 100,
        });
        gsap.to(bgImg, {
          duration: 1,
          ease: "power2.out",
          scale: 0.9,
        });

        // gsap.to(section, {
        //   rotationY: -30,
        //   duration: 1,
        //   opacity: 0.8,
        //   ease: "power2.out",
        //   perspective: 100,
        // });
      }
    });

    // verticalBgSections.forEach((section, index) => {
    //   if (index === activeIndex) {
    //     gsap.to(section, {
    //       duration: 1,
    //       rotationX: 0,
    //       ease: "power2.out",
    //     });
    //   } else {
    //     gsap.to(section, {
    //       rotationX: -3,
    //       duration: 1,
    //       ease: "power2.out",
    //     });
    //   }
    // });
  }

  function setHorizentalSlideStyles(activeIndex) {
    horizentalSections.forEach((section, index) => {
      if (index === activeIndex) {
        gsap.to(section, {
          duration: 1,
          opacity: 1,
          rotationX: 0,
          ease: "power2.out",
          perspective: 100,
          // position:"relative",
        });
      } else {
        gsap.to(section, {
          rotationX: -30,
          duration: 1,
          opacity: 0.8,
          ease: "power2.out",
          perspective: 100,
          // position:"fixed",
        });
      }
    });
  }

  function configHorizSlides(swiper) {
    swiper.removeSlide([0, 2]);
    verticalSwiper.addSlide(1, firstSlide);
    verticalSwiper.addSlide(3, lastSlide);
  }
});
