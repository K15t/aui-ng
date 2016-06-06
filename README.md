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

A directive which maps to `AUI Select2`

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

## License
MIT