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

  var horizSwiper = new Swiper(".horizSwiper", {
    spaceBetween: 50,
    initialSlide: 1,
    allowTouchMove: true,
    speed: 1500,
    // slidesPerView: 1.2,
    centeredSlides: true,
    slideToClickedSlide: true,
    on: {
      init: function () {
        setHorizentalSlideStyles(this.activeIndex, this.previousIndex);
      },
      slideChange: function () {
        setHorizentalSlideStyles(this.activeIndex,this.previousIndex);
      },
    },
  });

  var verticalSwiper = new Swiper(".verticalSwiper", {
    direction: "vertical",
    mousewheel: true,
    centeredSlides: true,
    // slidesPerView: 1.5,
    // initialSlide: 1,
    slideToClickedSlide: true,
    speed: 1500,
    breakpoints: {
      0: {
        spaceBetween: 10,
      },
      992: {
        spaceBetween: 50,
      },
    },
    on: {
      init: function () {
        setVerticalSlideStyles(this.activeIndex, this.previousIndex);
      },
      slideChange: function (e) {
        setVerticalSlideStyles(this.activeIndex, this.previousIndex);
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
  function setVerticalSlideStyles(activeIndex,previousIndex) {
    verticalSections.forEach((section, index) => {
      // let element = $(section).hasClass("horiz")
      //   ? $(section).find(".horizSwiper .swiper-slide-active")
      //   : section;

      let contentSlide = $(section).hasClass("horiz")
      ? $(section).find(".horizSwiper .swiper-slide-active .content")
      : $(section).find("> .content");


      if (activeIndex > previousIndex) {
        gsap.fromTo(
          contentSlide,
          {
            rotationX: 5,
            ease: "sine.out",
            // scale:0.9,
            duration: 2,
          },
          {
            duration: 2,
            ease: "sine.out",
            rotationX: 0,
            // scale:1,
          }
        );
      } else if (activeIndex < previousIndex) {
        gsap.fromTo(
          contentSlide,
          {
            rotationX: -5,
            ease: "ease.out2",
            // scale:0.9,
            duration: 2,
          },
          {
            duration: 2,
            ease: "sine.out",
            rotationX: 0,
            // scale:1,
          }
        );
      }

    

      if (index === activeIndex) {
        gsap.to(section, {
          duration: 2,
          opacity: 1,
          // rotationY: 0,
          ease: "power2.out",
        });
       
      } else {
        gsap.to(section, {
          // rotationY: -30,
          duration: 2,
          opacity: 0.8,
          ease: "power2.out",
          perspective: 100,
        });
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

  function setHorizentalSlideStyles(activeIndex,previousIndex) {
    horizentalSections.forEach((section, index) => {
      let contentSlide = $(section).find("> .content");


      if (activeIndex > previousIndex) {
        gsap.fromTo(
          contentSlide,
          {
            rotationY: -3,
            ease: "sine.out",
            // scale:0.9,
            x:50,
            duration: 2,
          },
          {
            ease: "sine.out",
            rotationY: 0,
            // scale:1,
            duration: 2,
            x:0
          }
        );
      } else if (activeIndex < previousIndex) {
        gsap.fromTo(
          contentSlide,
          {
            rotationY: 3,
            ease: "ease.out2",
            // scale:0.9,
            duration: 2,
            x:50
          },
          {
            duration: 2,
            ease: "sine.out",
            rotationY: 0,
            // scale:1,
            x:0
          }
        );
      }

      if (index === activeIndex) {
        gsap.to(section, {
          duration: 1,
          opacity: 1,
          rotationX: 0,
          perspective: 100,
          ease: "power2.out",
          // position:"relative",
        });
        // gsap.fromTo(
        //   contentSlide,
        //   {
        //     rotationY: -3,
        //     // scale:0.9,
        //     duration: 1,
        //   },
        //   {
        //     duration: 1,
        //     rotationY: 0,
        //     // scale:1,
        //   }
        // );
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
});
