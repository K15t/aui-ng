;(function (angular) {

  'use strict';

  var TAB_KEY =  9;
  var ESCAPE_KEY = 27;
  var UP_KEY = 38;
  var DOWN_KEY = 40;

  angular.module('k15t.auiNg')
    .directive('anDropdown2', function () {
        return {
          link: function (scope, $elm, attrs) {
            // ui status
            var isOpened = false;
            var isTriggerButtonFocused = false;
            var ignoreCancel = false;

            // attributes
            var dropdownId = attrs.anDropdown2;
            var align = attrs.anDropdown2Align;

            // elements
            var $dropdown, $items;
            var selectedItem = null;

            $elm
              .on('click', toggleHandler)
              .on('focus', focusHandler)
              .on('blur', blurHandler);

            function toggleHandler (e) {
              // set flag to prevent dropdown cancelation, preventDefault doesn't work here
              // because we do want the event to bubble up to cancel previously selected dropdowns
              ignoreCancel = true;

              selectedItem = null;

              toggleDropdown();
            }

            function focusHandler () {
              isTriggerButtonFocused = true;
            }

            function blurHandler () {
              isTriggerButtonFocused = false;
            }

            $(document)
              .on('click', cancelHandler)
              .on('keydown', keyboardHandler);

            function cancelHandler () {
              if (!ignoreCancel && isOpened) {
                hideDropdown();
              }

              ignoreCancel = false;
            }

            function keyboardHandler (evt) {
              if (isOpened && (evt.keyCode === ESCAPE_KEY || evt.keyCode === TAB_KEY)) {
                hideDropdown();

              } else if (isTriggerButtonFocused && (selectedItem === null  || isOpened === false)) {
                if (evt.keyCode === DOWN_KEY ||  evt.keyCode === UP_KEY) {
                  evt.preventDefault();
                  showDropdown();
                  selectItem(0);
                }

              } else if (isOpened) {
                switch (evt.keyCode) {
                  case UP_KEY:
                    evt.preventDefault();
                    selectItem(selectedItem  - 1);
                    break;

                  case DOWN_KEY:
                    evt.preventDefault();
                    selectItem(selectedItem + 1);
                    break;
                }
              }
            }

            function selectItem (i) {
              selectedItem = i % $items.length;
              $items.get(selectedItem).focus();
            }

            function toggleDropdown () {
              isOpened = !isOpened;
              if (isOpened) {
                initDropdown();
              }
              $dropdown.toggleClass('an-dropdown2-show');
            }

            function showDropdown () {
              isOpened = true;
              initDropdown();
              $dropdown.addClass('an-dropdown2-show');
            }

            function hideDropdown () {
              isOpened = false;
              $dropdown.removeClass('an-dropdown2-show');
            }

            function initDropdown () {
              var offset;

              $dropdown = $('#' + dropdownId);

              if ($dropdown.length === 0) {
                console.error('dropdown2 trigger can\'t find menu with the id "' + dropdownId + '"');

              } else {
                $dropdown.appendTo(document.body);
                $items = $dropdown.find('a');

                offset = $elm.offset();
                $dropdown.css({
                  top: offset.top + $elm.outerHeight() - 1,
                  left: align === 'left' ? offset.left : offset.left - $dropdown.outerWidth() + $elm.outerWidth()
                });
              }
            }

            $elm.on('$destroy', function () {
              $elm
                .off('click', toggleHandler)
                .off('focus', focusHandler)
                .off('blur', blurHandler);

              $(document)
                .off('click', cancelHandler)
                .off('keydown', keyboardHandler);
            });
          }
        };
      }
    );

})(angular);