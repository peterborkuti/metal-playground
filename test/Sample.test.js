'use strict';

import Sample from '../src/Sample';

describe(
	'Sample',
	() => {
		let component;

		afterEach(
			() => {
				if (component) {
					component.dispose();
				}
			}
		);

		it(
			'renders',
			() => {
				component = new Sample();

				expect(component).toBeTruthy();
			}
		);
	}
);
