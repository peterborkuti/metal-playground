'use strict';

import core from 'metal';
import templates from './Playground.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
import dom from 'metal-dom';
import Ajax from 'metal-ajax';

import Toggler from 'metal-toggler';
import Select from 'metal-select';
import Tooltip from 'metal-tooltip';
import Tabs from 'metal-tabs';

import SampleList from './SampleList';
import IFrame from './IFrame';
/**
 * Playground component.
 */
class Playground extends Component {
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

			Object.keys(that.editorModes).forEach(function(e) {
				var text = (selectedSample[e] ? selectedSample[e] : '');
				that.editor[e].setValue(text);
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

		Object.keys(this.editorModes).forEach(function(e) {
			var tArea =
				that.element.querySelector('.metal-playground-' + e + '-content');
			var editor = window.ace.edit(tArea);
			editor.setTheme("ace/theme/monokai");
			editor.getSession().setMode(that.editorModes[e]);

			var renderSampleRunner = that.renderSample.bind(that);
			editor.getSession().on('change', renderSampleRunner);

			that.editor[e] = editor;
		});

		this.iframe = new IFrame({
			parentElement:this.element.querySelector('.metal-playground-result-content')
		});

		var iFrameCreatorRunner = this.iframe.createIFrame.bind(this.iframe);

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
	},
	editorModes : { value: {'css': 'css', 'html': 'html', 'js': 'javascript', 'soy': 'soy_template'}}
};

export default Playground;
