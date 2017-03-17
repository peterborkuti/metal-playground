'use strict';

import State from 'metal-state';

class IFrame extends State {

	loadMetal() {
		var that = this;
		Ajax.request(this.metal_link, 'GET').then(
			function(xhr) {
				that.metalSource = xhr.responseText;
		});
	}

	createIFrame() {
		// create the iframe and attach it to the document
		var iframe = document.createElement("iframe");
		try {
		    this.parentElement.removeChild(this.iframe);
		} catch (err) {};
		iframe = this.parentElement.appendChild(iframe);

		// find the iframe's document and write some content
		var idocument = iframe.contentDocument || iframe.contentWindow.document;

		idocument.open();
		idocument.write("<!DOCTYPE html>");
		idocument.write("<html>");
		idocument.write("<head>");
		idocument.write('<link rel="stylesheet" href="' + this.bootstrap_link + '">');
		idocument.write('<script src="' + this.metal_link + '"></script>');
		idocument.write("<style>");
		idocument.write(this.css);
		idocument.write("</style>");
		idocument.write("</head>");
		idocument.write("<body>");
		idocument.write(this.html);
		idocument.write("<script>");
		idocument.write(this.js);
		idocument.write("</script>");
		idocument.write("</body>");
		idocument.write("</html>");
		idocument.close();

		this.iframe = iframe;
		this.idocument = idocument;
	}

	setContent(css, js, html) {
		if ((css !== this.css) || (js !== this.js) || (html != this.html)) {
			this.css = css;
			this.js = js;
			this.html = html;
			this.createIFrame();
		}
	}
}

IFrame.STATE = {
	metal_link: {
		//value : 'https://metal.github.io/metal.js-standalone/bin/metal.bundle.js'
		//value: 'https://code.jquery.com/jquery-3.1.1.min.js'
		value : 'playground.js'
	},
	bootstrap_link: {
		value : 'bootstrap.min.css'
	},
	iframe : { value : {}},
	idocument: { value: {}},
	metalSource: { value: ''},
	parentElement : {value: {}}
};

export default IFrame;
