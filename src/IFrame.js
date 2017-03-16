'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
import templates from './IFrame.soy.js';

class IFrame extends Component {

	rendered() {
		console.log(this.element);
	}

	//from jotted's render.js
	domready (e) {
		// only catch messages from the iframe
		if (e.source !== this.iframe.contentWindow) {
			return
		}

		var data = {}
		try {
			data = JSON.parse(e.data)
		} catch (e) {}

		if (data.type === 'metal-playground-dom-ready') {
			this.lastCallback()
		}
	}
}

Soy.register(IFrame, templates);

IFrame.STATE = {
	metal_link: {
		value : 'metal.bundle.js'
		//value: 'https://code.jquery.com/jquery-3.1.1.min.js'
	},
	bootstrap_link: {
		value : 'bootstrap.min.css'
	},
	babel_link: {
		//value : 'babel.bundle.js'
		value : ''
	},

	iframe : { value : {}},

	doctype_html : {value : '<!DOCTYPE html>'},

	css : {value : ''},
	js : {value: ''},
	html: {value: ''}
};

export default IFrame;
