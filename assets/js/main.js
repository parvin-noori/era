$(document).ready(function () {
  const eraSections = $(".era-section");

  eraSections.each(function () {
    const eraSection = $(this);

    activeSectionPosition(eraSection);
    configNextElement(eraSection);
    configPrevElement(eraSection);
    configSectionPositions(eraSection);
  });

  function activeSectionPosition(element) {
    element.addClass("inset-20");
  }

  function configNextElement(element) {
    if (element.hasClass("active")) {
      let nextElement = element.next();

      while (nextElement.length) {
        nextElement.addClass("after");
        nextElement = nextElement.next();
      }
    }
  }

  function configPrevElement(element) {
    if (element.hasClass("active")) {
      let prevElement = element.prev();

      while (prevElement.length) {
        prevElement.addClass("before");
        prevElement = prevElement.prev();
      }
    }
  }

  function configSectionPositions(element) {
    if (element.hasClass("horiz")) {
      applyTranslateToHorizSections();
    } else {
      applyTranslateToVerticalSections();
    }
  }

  function applyTranslateToHorizSections() {
    const $eraSections = $(".era-section.horiz");

    if ($eraSections.length) {
      $eraSections.first().addClass("translate-x-[101%]");
      $eraSections.last().addClass("-translate-x-[101%]");
    }
  }

  function applyTranslateToVerticalSections() {
    const $eraSections = $(".era-section.vertical");

    if ($eraSections.length) {
      // $eraSections.first().addClass("translate-y-[102%]");
      // $eraSections.last().addClass("-translate-y-[102%]");
    }
  }

  var windowHeight = window.innerHeight;
  console.log(windowHeight);
});
