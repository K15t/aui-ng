# aui-ng

aui-ng is a set of components which have the purpose to simplify the integration between AUI and Angular.JS.
The library is still under heavy development and is considered in an experimental state. So be aware that
things will change rapidly and tests still need to be written.

## Installation

```
bower install aui-ng --save
```

## Components

### Dialog

Standalone Dialog service which can be used as replacement for AUIs Dialog1 and Dialog2.
In general it is more flexible than Dialog1/2 and fits better into the angular world.

Inject `anDialog` into your controller to use the dialog factory. There are convenience factories such as `anConfirmDialog`,
`anMessageDialog` and `anSimpleDialog` available, which will provide basic templates for different use cases. Call
`anDialog.create(options)` to create a new dialog. The options object should provide the following properties.

#### Options Object

* `width`: `Number`, width of the dialog, default: 640px
* `height`: `Number`, height of the dialog, default: 480px
* `contentTemplate`: `function`, returning a promise with a templatestring or a string containing the path to the content
template
* `controller`: `String`, name of a controller
* `controllerAs`: `String`, alias for the controller which got previously defined, default: 'dialogCtrl'
* `closeOnEscape`: `Boolean`, closes the dialog on press of ESC key, default: true
* `closeOnBlanketClick`: `Boolean`, closes the dialog on click outside of the dialog, default: false
* `onOpen`: `function`, callback which runs once the dialog is open
* `onClose`: `function`, callback which runs once the dialog got closed
* `promises`: `Array`, list of promises that will be resolved before showing the the dialog
* `locals`: `Object`, will be attached to the controller scope

```javascript
anDialog.create({
  width: 300,
  height: 600,
  contentTemplate: '/templates/dialogTemplate.html',
  controller: 'myDialogCtrl',
  closeOnEscape: false,
  closeOnBlanketClick: true,
  onOpen: function() {console.log("very open")},
  onClose: function() {console.log("such close")},
  locals: {
    local1: 1,
    local2: function() {
      alert("I'm so local")
    }
  }
});
```

#### Scope properties

The controllers scope will provide the following properties by default.

* `$close` or `$submit`: `function`, closes the current dialog
* `$isLoading`: `Boolean`, show or hide loading indicator

### Page

A set of directives which can be used to create pages and panels. Think of the Dialog1 pages and
panels feature but as standalone directives and not coupled to the dialog scenario.

#### Example

```html
<div an-pages>
    <div an-page="startpage">
        <button ng-click="$gotoPage('second-page')">goto the second page</button>
    </div>

    <div an-page="second-page">
        <div an-panel>
            <h1>First Panel!</h1>
            <button ng-click="$nextPanel()" ng-show="$hasNextPanel()">goto next panel</button>
        </div>

        <div an-panel>
            <h1>Second Panel!</h1>
            <button ng-click="$prevPanel()" ng-show="$hasPrevPanel()">goto prev panel</button>
        </div>
    </div>
</div>
```

#### Programmatic usage

```javascript
// use the anPagesManager service to get access to
// a specific anPages instance

var myPages = anPagesManager.getById('my-pages-id');
myPages.gotoPage('second-page');
```

### DatePicker

A directive which maps to `AJS datepicker`

### Select2

A directive which maps to `AUI Select2`.

Some notes:

* The directive is in a quite experimental state and might not support everything that select2 supports.
* The select2 version, which is used by AUI, is 3.5.x (not the latest version).
* If the option `selectData` is set to `true` then the raw data of the selected option is saved in the model bound to `ng-model`. For example, if `selectData` is set to `true` then the object `{ id: 'foo', 'Foo' }` would be saved in the model and if it is set to `false`, only `foo` would be saved.
* If a `query`-function is set and an `initSelection`-function is not set and `selectData` is set to `false` then a dataflow is only supported from `select2` to the angular model, but not the other way around (a warning will be shown in the console in this case).

Example usage:

```html
    <!-- somewhere in your controllers template: -->

    <input name="select-animal"
        an-select2="$ctrl.getSelect2Options()"
        type="text"
        ng-model="$ctrl.selectedAnimal">

    <div>
        <!--
            the value of selectedAnimal would be { id: 'dog', text: 'Dog' } for example
            if the user would select the dog entry because selectData is set to true.
         -->
        The selected animal: {{ $ctrl.selectedAnimal }}
    </div>
```

```javascript
    // somewhere in your controller:

    MyController.prototype.getSelect2Options() {
        const options = [
            { id: 'dog', text: 'Dog' },
            { id: 'cat', text: 'Cat' },
            { id: 'mouse', text: 'Mouse' }
        ];

        return {
            selectData: true,
            allowClear: true,
            placeholder: 'select animal',
            data: options
        };
    }
```

### Tooltip

A directive which maps to `AJS tooltip`

### Dropdown2

`an-dropdown2` is a replacement for `AUI Dropdown2`. It can be used by adding the `an-dropdown2` directive to an element,
which is used as the trigger. The dropdown list is referenced by passing its id to the `an-dropdown2` directive.
This implementation currently doesn't support lazy loaded or dynamicaly changing dropdown lists.

#### Properties

* an-dropdown2: id of the dropdown list (required)
* an-dropdown2-align: alignment of the dropdown list - `left` or `right` (optional)


#### Example

```html
<button class="aui-button" an-dropdown2="food-dropdown" an-dropdown2-align="left">eat</button>

<div class="an-dropdown2" id="food-dropdown">
    <ul class="aui-list-truncate">
          <li><a href="http://example.com/" tabindex="-1">Ice cream</a></li>
          <li><a href="http://example.com/" tabindex="-1">Chocolate</a></li>
          <li><a href="http://example.com/" tabindex="-1">Lollipop</a></li>
          <li><a href="http://example.com/" tabindex="-1">Jelly Beans</a></li>
    </ul>
</div>
```

### Messages

Messages contains the directive `an-messages-container` and the factory
`an-messages`. In general it can be used to push messages into the UI.
You can define spots in your UI where you want the messages to get displayed.

#### Example

In your template:

```html
<div an-messages-container="myMessageContainer"></div>
```

In your code:

```javascript
anMessages.addMessage('myMessageContainer', {
    title: 'Some Warning',
    message: 'some sort of warning occured!',
    severity: 'warning'
});
```

This will generate an AUI-Message and push it into the `myMessageContainer` container.
You can push multiple messages into the container, they will be displayed underneath
each other.

Removing a message is done like this:

```javascript
var removeMessage = anMessages.addMessage('myMessageContainer', {
    title: 'Some Info',
    message: 'some sort of info occured!',
    severity: 'info'
});

// ... somewhere else in your code (removes that message from the container):
removeMessage();
```

Or you can remove all messages from a specific message container:

```javascript
anMessages.clearMessages('myMessageContainer');
```

## Contribute to this project
If you like to contribute on this project, request a new feature or you find a bug please see [CONTRIBUTING.md](https://github.com/K15t/aui-ng/blob/master/CONTRIBUTING.md)
for further details.

## License
Licensed under The MIT License (MIT).
