'use strict';

/**
 * The soy template functions are automatically exported by `List.soy.js`.
 */

import Select from 'metal-select';
import Sample from './Sample';
import {State, validators} from 'metal-state';
import Ajax from 'metal-ajax';

class SampleList extends State {
	constructor(opt_config, opt_obj, opt_context) {
		super(opt_config, opt_obj, opt_context);
		this.load();
		this.select = new Select(
				{items: [], values: [], label: 'Samples'},
				this.element
		);
	}

	getSelectItems() {

	}

	getSelectValues() {

	}

	fillItems(indexFile) {
		var that = this;

		var obj = JSON.parse(indexFile);

		var items = [];

		var values = [];

		Object.keys(obj).forEach(function(description) {
			var dirName = obj[description];
			var sample = new Sample({
				description: description,
				sampleRootUrl: that.sampleRootUrl,
				sampleDirName: dirName
			});
			that.items[dirName] = sample;
			console.log(description, dirName);
			items.push(description);
			values.push(dirName);
		});

		this.select.items = items;
		this.select.values = values;
	}

	load() {
		var that = this;

		var url = this.sampleRootUrl + "/" + this.indexFileName;

		if (url.length > this.indexFileName.length + 1) {
					Ajax.request(url, 'GET').then(
						function(xhr) {
							that.fillItems(xhr.responseText);
						}
					)
			}
		}
}

/**
 * This is adding more configuration to this class' state.
 * @type {!Object}
 */
SampleList.STATE = {
	/**
	 * The `items` state's default value will be an empty list.
	 * @type {!Array}
	 */
	items: {
		value: {}
	},

	sampleRootUrl : {
		validator: validators.string,
		value: ''
	},

	indexFileName : {
		value: 'index.json'
	},

	element: {
		value: {}
	},

	select: {
		value: {}
	}

};

export default SampleList;
