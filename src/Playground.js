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
	getAceMode(mode) {
		if (mode === 'js') {
			mode = 'javascript'
		};

		return 'ace/mode/' + mode;
	}

	sampleSelected() {
		var that = this;
		var index = this.sampleList.select.selectedIndex;
		if (index > -1) {
			var sampleKey = this.sampleList.select.values[index];
			var selectedSample = this.sampleList.items[sampleKey];
			['css', 'html', 'js'].forEach(function(e) {
				that.editor[e].setValue(selectedSample[e]);
			});
		}
	}

	rendered() {
		var that = this;

		var sampleList = new SampleList({
										sampleRootUrl: 'https://raw.githubusercontent.com/peterborkuti/metal-playground-samples/master/',
										element: this.element.querySelector('.metal-playground-select')
									});
		var sampleSelectedHandler = this.sampleSelected.bind(this);

		this.sampleList = sampleList;
		this.sampleList.select.on('stateChanged', sampleSelectedHandler);

		['css', 'html', 'js'].forEach(function(e) {
			var tArea =
				that.element.querySelector('.metal-playground-' + e + '-content');
				var editor = window.ace.edit(tArea);
				editor.setTheme("ace/theme/monokai");
    		editor.getSession().setMode(that.getAceMode(e));
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
