'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
import templates from './IFrame.soy.js';

class IFrame extends Component {

	constructor(opt_config, opt_obj, opt_context) {
		super(opt_config, opt_obj, opt_context);

		// catch domready events from the iframe
		window.addEventListener('message', this.domready.bind(this));

		var iframe = document.createElement("iframe");
		iframe = this.element.appendChild(iframe);
		this.iframe = iframe;

		//render on each change
		//jotted.on('change', this.change.bind(this), 100)

	}

	loadMetal() {
		var that = this;
		Ajax.request(this.metal_link, 'GET').then(
			function(xhr) {
				that.metalSource = xhr.responseText;
		});
	}

	generateIFrameContent_() {
		// find the iframe's document and write some content
		var idocument = this.iframe.contentDocument || this.iframe.contentWindow.document;
		idocument.open();
		idocument.write("<!DOCTYPE html>\n");
		idocument.write("<html>\n");
		idocument.write("<head>\n");
		idocument.write('<link rel="stylesheet" href="' + this.bootstrap_link + '">\n');
		idocument.write('<script src="' + this.metal_link + '"></script>\n');
		/*
		idocument.write("<script>\n");
		idocument.write("        (function () {\n");
		idocument.write("          window.addEventListener('DOMContentLoaded', function () {\n");
		idocument.write(" //debugger;\n");
		idocument.write("            //window.parent.postMessage(JSON.stringify({\n");
		idocument.write("              //type: 'metal-playground-dom-ready'\n");
		idocument.write("            //}), '*')\n");
		idocument.write("          })\n");
		idocument.write("        }())\n");
		idocument.write("</script>\n");
*/
		idocument.write("<style>\n");
		idocument.write(this.css);
		idocument.write("</style>\n");
		idocument.write("</head>\n");
		idocument.write("<body>\n");
		idocument.write(this.html);
		idocument.write("<script></script>\n");
		idocument.write("<script>\n");
		idocument.write("window.onload=function(){\n");
		idocument.write(this.js);
		idocument.write("}\n");
		idocument.write("</script>\n");
		idocument.write("</body>\n");
		idocument.write("</html>");
		idocument.close();
	}

	appendIFrame_() {
		// create the iframe and attach it to the document
		var iframe = document.createElement("iframe");
		//iframe.setAttribute("scrolling", "no");
		//iframe.setAttribute("frameborder", "0");

		//it returns with the old child
		this.iframe.parentNode.replaceChild(iframe, this.iframe);
		this.iframe = iframe;

		this.generateIFrameContent_();
	}

	setContent(css, js, html) {
		if ((this.css === css) && (this.js === js) && (this.html === html)) {
			//same content as before
			return;
		}

		this.css = css;
		this.js = js;
		this.html = html;

		this.appendIFrame_();
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

IFrame.STATE = {
	metal_link: {
		value : 'metal.bundle.js'
		//value: 'https://code.jquery.com/jquery-3.1.1.min.js'
	},
	bootstrap_link: {
		value : 'bootstrap.min.css'
	},
	iframe : { value : {}},
	metalSource: { value: ''},
	css : {value : ''},
	js : {value: ''},
	html: {value: ''},
	element: {value: {}}
};

export default IFrame;
