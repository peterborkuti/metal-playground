'use strict';

import core from 'metal';
import templates from './Playground.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
import dom from 'metal-dom';
//import Toggler from 'metal-toggler';
import State from 'metal-state';

import SampleList from './SampleList';

/**
 * Playground component.
 */
class Playground extends Component {

	sampleSelected() {
		console.log('sampleSelected');
	}

	rendered() {
		var that = this;

		var sampleList = new SampleList({
										sampleRootUrl: 'https://raw.githubusercontent.com/peterborkuti/metal-playground-samples/master/',
										element: this.element.querySelector('.metal-playground-select')
									});

		this.sampleList = sampleList;
		this.sampleList.select.on('stateChanged', this.sampleSelected);

		['css', 'html', 'js'].forEach(function(e) {
			var tArea =
				that.element.querySelector('.metal-playground-' + e + '-content');
				var editor = window.ace.edit(tArea);
				editor.setTheme("ace/theme/monokai");
    		editor.getSession().setMode("ace/mode/javascript");
				that.editor[e] = editor;
		})
	}
}

Soy.register(Playground, templates);

/**
 * Playground state definition.
 * @type {!Object}
 * @static
 */
Playground.STATE = {
	editor: { value: {} }
};

export default Playground;
