// Measuring the Critical Rendering Path with Navigation Timing
// https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp

function logCRP() {
  var t = window.performance.timing,
    interactive = t.domInteractive - t.domLoading,
    dcl = t.domContentLoadedEventStart - t.domLoading,
    complete = t.domComplete - t.domLoading;
  var stats = document.getElementById("crp-stats");
  //interactive is when DOM has been built
  //DomContentLoaded is when DOM and CSSOM have been built, and thus all scripts and stuff have been executed
  //domComplete is when total page has been loaded, including all subsources (like external images)
  stats.textContent = 'interactive: ' + interactive+ 'ms, DCL: ' + dcl + 'ms, onload: ' + complete + 'ms';
}

window.addEventListener("load", function(event) {
  console.log("All resources finished loading!");
  logCRP();
});
