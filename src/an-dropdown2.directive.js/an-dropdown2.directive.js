;(function (angular) {

  'use strict';

  angular.module('k15t.auiNg')
    .directive('anDropdown2', function () {
        return {
          link: function (scope, $elm, attrs) {
            var ignoreCancel = false;
            var align = attrs.anDropdown2Align;
            var $dropdown = $('#' + attrs.anDropdown2).appendTo(document.body);

            $elm
              .on('click', toggleHandler)
              .on('focus', enableKeyboardHandler)
              .on('blur', disableKeyboardHandler);

            function toggleHandler (e) {
              var offset = $elm.offset();

              // set flag to prevent dropdown cancelation, preventDefault doesn't work here
              // because we do want the event to bubble up to cancel previously selected dropdowns
              ignoreCancel = true;

              $dropdown
                .toggleClass('an-dropdown2-show')
                .css({
                  top: offset.top + $elm.outerHeight() - 1,
                  left: align === 'left' ? offset.left : offset.left - $dropdown.outerWidth() + $elm.outerWidth()
                });
            }

            function enableKeyboardHandler () {
              $(document).on('keyup', escapeKeyHandler);
            }

            function disableKeyboardHandler () {
              $(document).off('keyup', escapeKeyHandler);
            }

            $(document)
              .on('click', cancelHandler);

            function cancelHandler () {
              if (!ignoreCancel) {
                hideDropdown();
              }

              ignoreCancel = false;
            }

            function escapeKeyHandler (evt) {
              // esc key
              if (evt.keyCode === 27) {
                hideDropdown();
              }
            }

            function hideDropdown () {
              $dropdown.removeClass('an-dropdown2-show');
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