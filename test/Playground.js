'use strict';

import dom from 'metal-dom';
import { object } from 'metal';
import Playground from '../src/Playground';

var playground;

describe('Playground', function() {
	afterEach(function() {
		if (playground) {
			playground.dispose();
		}
	});

	it('should render no nodes by default', function() {
		playground = new Playground();

		var nodesElement = playground.element.querySelector('.playground');
		assert.strictEqual(0, nodesElement.childNodes.length);
	});
});
