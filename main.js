angular.module("ngRoundProgressBar.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("ngRoundProgressBar.html","<div class=\"loader\">\n  <div class=\"loader-bg\">\n    <div class=\"text\"></div>\n  </div>\n  <div class=\"spiner-holder-one animate-0-25-a\">\n    <div class=\"spiner-holder-two animate-0-25-b\">\n      <div class=\"loader-spiner\" style=\"\"></div>\n    </div>\n  </div>\n  <div class=\"spiner-holder-one animate-25-50-a\">\n    <div class=\"spiner-holder-two animate-25-50-b\">\n      <div class=\"loader-spiner\"></div>\n    </div>\n  </div>\n  <div class=\"spiner-holder-one animate-50-75-a\">\n    <div class=\"spiner-holder-two animate-50-75-b\">\n      <div class=\"loader-spiner\"></div>\n    </div>\n  </div>\n  <div class=\"spiner-holder-one animate-75-100-a\">\n    <div class=\"spiner-holder-two animate-75-100-b\">\n      <div class=\"loader-spiner\"></div>\n    </div>\n  </div>\n</div>\n");}]);
'use strict';
/*global angular*/

// based on the implementation from:
// http://blog.invatechs.com/round_progress_bar_with_html5_css3_and_javascript
angular.module('ngRoundProgressBar', ['ngRoundProgressBar.templates'])
  .directive('roundProgressBar', [function() {
    return {
      templateUrl: 'ngRoundProgressBar.html',

      link: function(scope, element, attrs) {

        scope.progress = scope.$eval(element.attr('round-progress-bar'));
        console.log('process is ' + scope.progress);

        function renderProgress(element, progress) {
          console.log(element[0]);
          var find = function(s) { return angular.element(element[0].querySelector(s)); };
          progress = Math.floor(progress * 100);
          var angle;


          if (progress<25) {
            angle = -90 + (progress/100)*360;
            find('.animate-0-25-b').css('transform','rotate('+angle+'deg)');
          } else if (progress>=25 && progress<50) {
            angle = -90 + ((progress-25)/100)*360;
            console.log(element.find('.animate-0-25-b'));
            find('.animate-0-25-b').css('transform','rotate(0deg)');
            find('.animate-25-50-b').css('transform','rotate('+angle+'deg)');
          } else if (progress>=50 && progress<75) {
            angle = -90 + ((progress-50)/100)*360;
            find('.animate-25-50-b, .animate-0-25-b').css('transform','rotate(0deg)');
            find('.animate-50-75-b').css('transform','rotate('+angle+'deg)');
          } else if (progress>=75 && progress<=100) {
            angle = -90 + ((progress-75)/100)*360;
            find('.animate-50-75-b, .animate-25-50-b, .animate-0-25-b')
              .css('transform','rotate(0deg)');
            find('.animate-75-100-b').css('transform','rotate('+angle+'deg)');
          }

          find('.text').html(progress+'%');
        }

        scope.$watch('progress', function(val){
          renderProgress(element, val);
        }, true);

      }
    };
  }]);
