import { module, test } from 'qunit';
import $ from 'jquery';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | trix editor', function(hooks) {
  setupRenderingTest(hooks);

  test('renders', async function (assert) {
    assert.expect(5);

    await render(hbs``);

    let $trixEditor = this.$().find('> div');
    assert.strictEqual($trixEditor.length, 0);

    await render(hbs`{{trix-editor}}`);

    $trixEditor = this.$().find('> div');
    assert.strictEqual($trixEditor.length, 1);
    assert.strictEqual($trixEditor.find('> input').length, 1);
    assert.strictEqual($trixEditor.find('> trix-toolbar').length, 1);
    assert.strictEqual($trixEditor.find('> trix-editor').length, 1);
  });

  test('sets correct HTML attributes to inputId attribute', async function (assert) {
    assert.expect(2);

    await render(hbs`{{trix-editor inputId="attrs-id"}}`);
    const inputIdAttribute = this.$().find('div > input').attr('id');
    const customInputId = 'attrs-id';
    assert.strictEqual(inputIdAttribute, customInputId);
    const trixEditorInputAttribute = this.$().find('div > trix-editor').attr('input');
    assert.strictEqual(trixEditorInputAttribute, customInputId);
  });

  test('is focused based on autofocus attribute', async function(assert) {
    assert.expect(7);

    await render(hbs`{{trix-editor}}`);
    let $trixEditor = this.$().find('trix-editor');
    assert.notOk($trixEditor.is(':focus'), 'editor not focused by default');

    await render(hbs`{{trix-editor autofocus=false}}`);
    $trixEditor = this.$().find('trix-editor');
    assert.notOk($trixEditor.is(':focus'), 'editor not focused when autofocus attr is false');

    await render(hbs`{{trix-editor autofocus=true}}`);
    $trixEditor = this.$().find('trix-editor');
    assert.ok($trixEditor.is(':focus'), 'editor focused when autofocus attr is true');

    // Demonstrate that the component looks at the truthiness of the autofocus attribute.

    await render(hbs`{{trix-editor autofocus=0}}`);
    $trixEditor = this.$().find('trix-editor');
    assert.notOk($trixEditor.is(':focus'), 'editor not focused when autofocus attr is int 0');

    await render(hbs`{{trix-editor autofocus=1}}`);
    $trixEditor = this.$().find('trix-editor');
    assert.ok($trixEditor.is(':focus'), 'editor focused when autofocus attr is int 1');

    await render(hbs`{{trix-editor autofocus=""}}`);
    $trixEditor = this.$().find('trix-editor');
    assert.notOk($trixEditor.is(':focus'), 'editor not focused when autofocus attr is a falsey string');

    await render(hbs`{{trix-editor autofocus="true"}}`);
    $trixEditor = this.$().find('trix-editor');
    assert.ok($trixEditor.is(':focus'), 'editor focused when autofocus attr is a truthy string');
  });

  test('sets trix-editor\'s placeholder attribute to placeholder attr', async function (assert) {
    assert.expect(2);

    await render(hbs`{{trix-editor}}`);
    let $trixEditor = this.$().find('trix-editor');
    assert.notOk($trixEditor.attr('placeholder'), 'placeholder empty if not set');

    await render(hbs`{{trix-editor placeholder="test placeholder"}}`);
    $trixEditor = this.$().find('trix-editor');
    assert.strictEqual($trixEditor.attr('placeholder'),
                       'test placeholder',
                       'placeholder attribute determines placeholder text');
  });

  test('sets trix-editor\'s class attribute to editorClass attr', async function (assert) {
    assert.expect(3);

    await render(hbs`{{trix-editor}}`);
    let $trixEditor = this.$().find('trix-editor');
    assert.notOk($trixEditor.attr('class'), 'class is empty by default');

    await render(hbs`{{trix-editor editorClass="one"}}`);
    $trixEditor = this.$().find('trix-editor');
    assert.ok($trixEditor.hasClass('one'), 'accepts class name from editorClass');

    await render(hbs`{{trix-editor editorClass="one two"}}`);
    $trixEditor = this.$().find('trix-editor');
    assert.ok($trixEditor.hasClass('one two'), 'accepts multiple class names from editorClass');
  });

  test('sets trix-editor\'s event listeners on insert', async function (assert) {
    assert.expect(8);

    await render(hbs`{{trix-editor}}`);
    const trixEditorEl = this.$().find('trix-editor')[0];
    const eventNames = Object.keys($._data(trixEditorEl, 'events'));
    eventNames.forEach(eventName => {
      assert.notEqual(eventNames.indexOf(eventName),
                      -1,
                      `${eventName} event is bound on insert`);
    });
  });

  test('removes trix-editor\'s event listeners on destruction', async function (assert) {
    assert.expect(2);

    await render(hbs`{{trix-editor}}`);
    const $trixEditor = this.$().find('trix-editor');
    const trixEditorEl = $trixEditor[0];
    let eventsObject = $._data(trixEditorEl, 'events');
    assert.ok(eventsObject, 'events are bound initially on insert');

    await render(hbs``);
    eventsObject = $._data(trixEditorEl, 'events');
    assert.notOk(eventsObject, 'events are removed on destruction');
  });
});
