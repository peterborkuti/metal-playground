'use strict';

import validators from 'metal-state';
import Ajax from 'metal-ajax';
import core from 'metal';

/**
 * The `State` class provides features for configuring state and listening to
 * its changes. It's very useful to extend from it.
 */
import State from 'metal-state';

/**
 * This class represents a Playground Sample
 * You have to instantiate it with the 'url' of a directory of a sample as
 * a cofiguration value and a description.
 * Sample will load the files from the remote directory and set the js, html,
 * and css states which you can watch.
 */
class Sample extends State {

	constructor(opt_config, opt_obj, opt_context) {
		super(opt_config, opt_obj, opt_context);
		this.load();
	}

	load() {
		var that = this;

		var baseUrl = this.sampleRootUrl + "/" + this.sampleDirName + "/" +
			this.sampleDirName + ".";

		if (baseUrl.length > 3) {
			['js', 'css', 'html'].forEach(
				function(e) {
					Ajax.request(baseUrl + e, 'GET').then(
						function(xhr) {
							that[e] = xhr.responseText;
						}
					)
				})
			};
		}
}

/**
 * State configurations should be defined in the `STATE` static variable.
 * @type {!Object}
 */
Sample.STATE = {
	description: {
		validator: validators.string,
		required: true
	},
	sampleRootUrl : {
		validator: validators.string,
		value: ''
	},
	sampleDirName : {
		validator: validators.string,
		value: ''
	},
	js: {
		validator: validators.string,
		value: ''
	},
	html: {
		validator: validators.string,
		value: ''
	},
	css: {
		validator: validators.string,
		value: ''
	}
};

export default Sample;
