$(document).ready(function () {
  new fullpage('#fullpage', {
    //options here
    autoScrolling:true,
    scrollHorizontally: true,
    sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
    anchors:['firstPage', 'secondPage'],
    dragAndMove: {enable:true},
  });
});
