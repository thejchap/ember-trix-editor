import $ from 'jquery';
import { computed, get } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/trix-editor';

export default Component.extend({
  attachmentsDisabled: false,

  editor: null,

  inputId: computed('elementId',function() {
    return `trix-editor-${get(this, 'elementId')}`;
  }),

  layout: layout,

  didInsertElement() {
    const $trixEditor = $(get(this, 'element')).find('trix-editor');

    $trixEditor.on('trix-attachment-add', event => {
      if (get(this, 'trix-attachment-add')) {
        get(this, 'trix-attachment-add')(event);
      }
    });

    $trixEditor.on('trix-attachment-remove', event => {
      if (get(this, 'trix-attachment-remove')) {
        get(this, 'trix-attachment-remove')(event);
      }
    });

    $trixEditor.on('trix-blur', event => {
      if (get(this, 'trix-blur')) {
        get(this, 'trix-blur')(event);
      }
    });

    $trixEditor.on('trix-change', event => {
      if (get(this, 'trix-change')) {
        get(this, 'trix-change')(event);
      }
    });

    $trixEditor.on('trix-file-accept', event => {
      if (get.attachmentsDisabled) {
        event.preventDefault();
      }

      if (get(this, 'trix-file-accept')) {
        get(this, 'trix-file-accept')(event);
      }
    });

    $trixEditor.on('trix-focus', event => {
      if (get(this, 'trix-focus')) {
        get(this, 'trix-focus')(event);
      }
    });

    $trixEditor.on('trix-initialize', event => {
      if (get(this, 'trix-initialize')) {
        get(this, 'trix-initialize')(event);
      }
    });

    $trixEditor.on('trix-selection-change', event => {
      if (get(this, 'trix-selection-change')) {
        get(this, 'trix-selection-change')(event);
      }
    });
  },

  willDestroyElement() {
    const $trixEditor = $(get(this, 'element')).find('trix-editor');

    $trixEditor.off('trix-attachment-add');
    $trixEditor.off('trix-attachment-remove');
    $trixEditor.off('trix-blur');
    $trixEditor.off('trix-change');
    $trixEditor.off('trix-file-accept');
    $trixEditor.off('trix-focus');
    $trixEditor.off('trix-initialize');
    $trixEditor.off('trix-selection-change');
  },

  autofocusOn: computed('autofocus', function () {
    return get(this, 'autofocus') ? true : null;
  })
});
