$(document).ready(function () {
  const eraSections = $(".era-section");

  eraSections.each(function (index) {
    const eraSection = $(this);

    activeSectionPosition(eraSection);
    configNextElement(eraSection);
    configPrevElement(eraSection);
    configSectionPositions(eraSection,index);

    eraSection.attr('data-index', index);
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

  function configSectionPositions(element,index) {
    if (element.hasClass("horiz")) {
      applyTranslateToHorizSections();
    } else {
      applyTranslateToVerticalSections(index);
    }
  }

  function applyTranslateToHorizSections() {
    const $eraSections = $(".era-section.horiz");

    if ($eraSections.length) {
      $eraSections.first().addClass("translate-x-[101%]");
      $eraSections.last().addClass("-translate-x-[101%]");
    }
  }

  function applyTranslateToVerticalSections(index) {
    const $verticalEraSections = $(".era-section.vertical");
    const $activeEraSectionIndex = $(".era-section.active").data('index');

    // if ($eraSections.length) {
      // $eraSections.first().addClass("translate-y-[102%]");
      // $eraSections.last().addClass("-translate-y-[102%]");
    // }
  }

  var windowHeight = window.innerHeight;
});
