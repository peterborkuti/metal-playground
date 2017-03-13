'use strict';

import core from 'metal';
import templates from './Playground.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
import dom from 'metal-dom';
import Ajax from 'metal-ajax';
//import Toggler from 'metal-toggler';
import State from 'metal-state';

import SampleList from './SampleList';
import IFrame from './IFrame';
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

	renderSample() {

		var css = this.editor.css.getValue();
		var js = this.editor.js.getValue();
		var html = this.editor.html.getValue();

		this.iframe.setContent(css, js, html);
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

			this.renderSample();
		}
	}

	rendered() {
		var that = this;

		var sampleList = new SampleList({
										sampleRootUrl: this.sampleRootUrl,
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
		});

		this.iframe = new IFrame();

		//this.iframe.loadMetal();

		var iFrameCreatorRunner = this.iframe.appendIFrame.bind(
			this.iframe,
			this.element.querySelector('.metal-playground-result-content'));

		setTimeout(iFrameCreatorRunner, 0);
	}
}

Soy.register(Playground, templates);

/**
 * Playground state definition.
 * @type {!Object}
 * @static
 */
Playground.STATE = {
	editor: { value: {} },
	sampleRootUrl: {
		value: 'https://raw.githubusercontent.com/peterborkuti/metal-playground-samples/master/'
	}
};

export default Playground;
