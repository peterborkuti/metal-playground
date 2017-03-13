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

	appendIFrame(element) {
		// create the iframe and attach it to the document
		var iframe = document.createElement("iframe");
		//iframe.setAttribute("scrolling", "no");
		//iframe.setAttribute("frameborder", "0");
		iframe = element.appendChild(iframe);

		// find the iframe's document and write some content
		var idocument = iframe.contentDocument || iframe.contentWindow.document;
		idocument.open();
		idocument.write("<!DOCTYPE html>");
		idocument.write("<html>");
		idocument.write("<head>");
		idocument.write('<link rel="stylesheet" href="' + this.bootstrap_link + '">');
		//idocument.write('<script src="' + this.metal_link + '"></script>');
		idocument.write("</head>");
		idocument.write("<body>");
		idocument.write("<script>");
		idocument.write("console.log('scr1')");
		/*
		idocument.write("(function(d, s, id){");
	  idocument.write("   var js, fjs = d.getElementsByTagName(s)[0];");
	  idocument.write("   if (d.getElementById(id)) {return;}");
	  idocument.write("   js = d.createElement(s); js.id = id;");
	  idocument.write("   js.src = '" + this.metal_link + "';");
	  idocument.write("   fjs.parentNode.insertBefore(js, fjs);");
	  idocument.write(" }(document, 'script', 'metal-sdk'));");
		*/
		idocument.write("</script>");
		idocument.write("</body>");
		idocument.write("</html>");
		idocument.close();

		this.iframe = iframe;
		this.idocument = idocument;
	}

	setContent(css, js, html) {
		var doc = this.idocument;
		var body = doc.querySelector('body');
		var g = doc.createElement('script');

		body.innerHTML = html;
		body.appendChild(g);

		var head = doc.querySelector('head');
		var style = head.querySelector('style');
		if (style) {
			head.removeChild(style);
		}
		style = doc.createElement('style');
		style.innerHTML = css;
		head.appendChild(style);

		var ss = "(function(d, s, id){";
	  ss+="   var js, fjs = d.getElementsByTagName(s)[0];";
	  ss+="   if (d.getElementById(id)) {return;}";
	  ss+="   js = d.createElement(s); js.id = id;";
	  ss+="   js.src = '" + this.metal_link + "';";
	  ss+="   fjs.parentNode.insertBefore(js, fjs);";
	  ss+=" }(document, 'script', 'metal-sdk'));";

		g = doc.createElement('script');
		var s = body.getElementsByTagName('script')[0];
		g.text = js;
		s.parentNode.insertBefore(g, s);

		//this.iframe.contentWindow.eval(js);
	}
}

IFrame.STATE = {
	metal_link: {
		//value : 'https://metal.github.io/metal.js-standalone/bin/metal.bundle.js'
		value: 'https://code.jquery.com/jquery-3.1.1.min.js'
	},
	bootstrap_link: {
		value : 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'
	},
	iframe : { value : {}},
	idocument: { value: {}},
	metalSource: { value: ''}
};


export default IFrame;
