# ember-trix-editor

Ember Trix Editor is an Ember addon that wraps Basecamp's [Trix editor](https://github.com/basecamp/trix)
in an Ember component. [Visit our demo](http://lynnetye.com/ember-trix-editor/) to see it in action.
(Code for our demo is located in [tests/dummy/app](tests/dummy/app).)

To use this component in your own Ember project, enter this command: `ember install ember-trix-editor`.

The component is consistent with Ember's data-down actions-up pattern:

### "Data down" to `{{trix-editor}}`
* `attachmentsDisabled` (boolean; if truthy, calls preventDefault() on the trix-file-accept event)
* `autofocus` (boolean; if truthy, adds the HTML autofocus attribute to the trix-editor tag)
* `editorClass` (string; space-separated list of class names that will be passed to the class attribute of the trix-editor tag)
* `placeholder` (string; text that will show up in the editor when it's empty)
* `value` (string; text to pre-populate the trix-editor)

### "Actions up" from `{{trix-editor}}`
* `trix-attachment-add`
* `trix-attachment-remove`
* `trix-blur`
* `trix-change`
* `trix-file-accept`
* `trix-focus`
* `trix-initialize`
* `trix-selection-change`

All actions send up a jQuery event, from which the original event and editor
property can be extracted.
```js
actions: {
  handleTrixAttachmentAdd(jqEvent) {
    var attachment = jqEvent.originalEvent.attachment;
    if (attachment.file) {
      // update file to server
      // call attachment.setAttributes();
    }
  }
}
```

## Contributing to Trix
This is the first time [Channing Allen](https://twitter.com/ChanningAllen) and [Lynne Tye](https://twitter.com/lynnetye)
have contributed to an open-source project! We welcome others to send bug reports,
make pull requests, or give us feedback.

Special thanks to [Courtland Allen](https://twitter.com/csallen) for his help.

### Installation

* `git clone` this repo
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
