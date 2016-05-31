;(function (angular) {

  'use strict';

  angular.module('k15t.auiNg')
    .directive('anDropdown2', function () {
        return {
          link: function (scope, $elm, attrs) {
            var ignoreCancel = false;
            var align = attrs.anDropdown2Align;
            var dropDownId = attrs.anDropdown2;

            $elm.on('click', toggleHandler);

            function toggleHandler (e) {
              var offset = $elm.offset();
              var $dropDown = $('#' + dropDownId);

              // set flag to prevent dropdown cancelation, preventDefault doesn't work here
              // because we do want the event to bubble up to cancel previously selected dropdowns
              ignoreCancel = true;

              $dropDown
                .toggleClass('an-dropdown2-show')
                .css({
                  top: offset.top + $elm.outerHeight() - 1,
                  left: align === 'left' ? offset.left : offset.left - $dropDown.outerWidth() + $elm.outerWidth()
                });
            }

            $(document).on('click', cancelHandler);

            function cancelHandler () {
              if (!ignoreCancel) {
                $('#' + dropDownId).removeClass('an-dropdown2-show');
              }

              ignoreCancel = false;
            }

            $elm.on('$destroy', function () {
              $elm.off('click', toggleHandler);
              $(document).off('click', cancelHandler);
            });
          }
        };
      }
    );

})(angular);