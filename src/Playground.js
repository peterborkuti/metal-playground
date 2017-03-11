'use strict';

import core from 'metal';
import templates from './Playground.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
//import Toggler from 'metal-toggler';

/**
 * Playground component.
 */
class Playground extends Component {
	rendered() {
		that = this;
		['css', 'html', 'js'].forEach(function(e) {
			var tArea =
				that.element.querySelector('.metal-playground-' + e + '-content');
				var editor = window.ace.edit(tArea);
    		editor.setTheme("ace/theme/monokai");
    		editor.getSession().setMode("ace/mode/javascript");
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
};

export default Playground;
