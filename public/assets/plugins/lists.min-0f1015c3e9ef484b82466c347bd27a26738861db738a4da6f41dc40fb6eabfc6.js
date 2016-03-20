/*!
 * froala_editor v1.2.8 (https://www.froala.com/wysiwyg-editor)
 * License https://www.froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

!function(a){a.Editable.commands=a.extend(a.Editable.commands,{insertOrderedList:{title:"Numbered List",icon:"fa fa-list-ol",refresh:function(){},callback:function(a){this.formatList(a)},undo:!0},insertUnorderedList:{title:"Bulleted List",icon:"fa fa-list-ul",refresh:function(){},callback:function(a){this.formatList(a)},undo:!0}}),a.Editable.prototype.refreshLists=function(){var b=a(this.getSelectionElement()),c=this.parents(b,"ul, ol");if(c.length>0){var d="insertUnorderedList";"OL"==c[0].tagName&&(d="insertOrderedList"),this.$editor.find('button[data-cmd="'+d+'"]').addClass("active")}},a.Editable.prototype.processBackspace=function(b){var c=b.prev();if(c.length){for(this.removeMarkers(),("UL"==c.get(0).tagName||"OL"==c.get(0).tagName)&&(c=c.find("li:last"));c.find("> ul, > ol").length;)c=c.find("> ul li:last, > ol li:last");var d=c.find("> p, > h1, > h3, > h4, > h5, > h6, > div, > pre, > blockquote");if(0===c.text().length&&0===c.find("img, table, input, iframe, video").length)c.remove();else{if(this.emptyElement(c.get(0))||(this.keep_enter=!0,b.find("> p, > h1, > h3, > h4, > h5, > h6, > div, > pre, > blockquote").each(function(b,c){a(c).replaceWith(a(c).html())}),this.keep_enter=!1),d.length)if(a(d[d.length-1]).append(this.markers_html),0===b.find("ul, ol").length)a(d[d.length-1]).append(b.html());else{for(var e=!1,f=b.contents(),g=0;g<f.length;g++){var h=f[g];["OL","UL"].indexOf(f[g].tagName)>=0&&(e=!0),e?a(d[d.length-1]).after(h):a(d[d.length-1]).append(h)}this.$element.find("breakli").remove();var i=d[d.length-1].nextSibling;i&&"BR"==i.tagName&&a(i).remove()}else this.emptyElement(c.get(0))?(this.$element.find("breakli").replaceWith(this.markers_html),c.html(b.html())):(c.append(this.markers_html),c.append(b.html()));b.remove(),this.cleanupLists(),this.restoreSelectionByMarkers()}this.$element.find("breakli").remove()}else this.$element.find("breakli").remove(),this.parents(b,"ul").length?this.formatList("insertUnorderedList",!1):this.formatList("insertOrderedList",!1);this.sync()},a.Editable.prototype.liBackspace=function(){if(""!==this.text())return!0;var b,c=this.getSelectionElement(),d=this.parents(a(c),"table, li");if(d.length>0&&"TABLE"===d[0].tagName)return!0;if(b="LI"==c.tagName?a(c):this.parents(a(c),"li:first"),this.removeMarkers(),this.emptyElement(b.get(0))?(b.prepend("<breakli></breakli>"),1==b.find("br").length&&b.find("br").remove()):this.insertHTML("<breakli></breakli>"),b.find("breakli").prev().length&&"TABLE"===b.find("breakli").prev().get(0).tagName&&b.find("breakli").next().length&&"BR"===b.find("breakli").next().get(0).tagName)return this.setSelection(b.find("breakli").prev().find("td:first").get(0)),b.find("breakli").next().remove(),this.$element.find("breakli").remove(),!1;for(var e,f=b.html(),g=[],h=0;h<f.length;h++){if(chr=f.charAt(h),"<"!=chr)return this.$element.find("breakli").remove(),!0;var i=f.indexOf(">",h+1);if(-1!==i){e=f.substring(h,i+1);var j=this.tagName(e);if(h=i,"breakli"==j){if(!this.isClosingTag(e)&&!this.isClosingTag(g[g.length-1]))return this.processBackspace(b),!1}else g.push(e)}}return this.$element.find("breakli").remove(),!0},a.Editable.prototype.textLiEnter=function(b){this.removeMarkers(),this.insertSimpleHTML("<breakli></breakli>",!1);var c,d,e=b.html(),f=[],g={},h=[],i=0,j=b.prop("attributes"),k="";for(d=0;d<j.length;d++)k+=" "+j[d].name+'="'+j[d].value+'"';var l=!1;for(d=0;d<e.length;d++)if(chr=e.charAt(d),"<"==chr){var m=e.indexOf(">",d+1);if(-1!==m){c=e.substring(d,m+1);var n=this.tagName(c);if(d=m,"breakli"==n){if(!this.isClosingTag(c)){for(var o=f.length-1;o>=0;o--){var p=this.tagName(f[o]);h.push("</"+p+">")}h.push("</li>"),h.push("<li"+k+">");for(var q=0;q<f.length;q++)h.push(f[q]);h.push('<span class="f-marker" data-type="false" data-collapsed="true" data-id="0" data-fr-verified="true"></span><span class="f-marker" data-type="true" data-collapsed="true" data-id="0" data-fr-verified="true"></span>'),l=!1}}else if(h.push(c),l=!1,!this.isSelfClosingTag(c))if(this.isClosingTag(c)){var r=g[n].pop();f.splice(r,1)}else f.push(c),void 0===g[n]&&(g[n]=[]),g[n].push(f.length-1)}}else i++,32!=chr.charCodeAt(0)||l?(h.push(chr),l=!0):h.push("&nbsp;");var s=a(b.parents("ul, ol")[0]);b.replaceWith("<li"+k+">"+h.join("")+"</li>"),s.find("p:empty + table").prev().remove(),s.find("p + table").each(function(b,c){var d=a(c);d.prev().append(d.clone()),d.remove()}),s.find("table + p").each(function(b,c){var d=a(c);d.append(d.prev().clone()),d.prev().remove()}),this.keep_enter=!0,s.find(this.valid_nodes.join(",")).each(a.proxy(function(b,c){""===a(c).text().trim()&&0===a(c).find(this.valid_nodes.join(",")).length&&a(c).prepend(a.Editable.INVISIBLE_SPACE)},this)),this.keep_enter=!1},a.Editable.prototype.liEnter=function(){var b,c=this.getSelectionElement(),d=this.parents(a(c),"table, li");if(d.length>0&&"TABLE"==d[0].tagName)return!0;if(b="LI"==c.tagName?a(c):this.parents(a(c),"li:first"),this.getSelectionTextInfo(b.get(0)).atStart&&""===this.text())b.before("<li>"+a.Editable.INVISIBLE_SPACE+"</li>");else{if(0===this.trim(b.text()).length&&0===b.find("img, table, iframe, input, object").length)return this.outdent(!1),!1;this.textLiEnter(b),this.$element.find("breakli").remove(),this.restoreSelectionByMarkers()}return this.sync(),!1},a.Editable.prototype.listTab=function(){var b=a(this.getSelectionElement());return this.parents(b,"ul, ol").length>0&&0===this.parents(b,"table").length?(this.indent(),!1):void 0},a.Editable.prototype.listShiftTab=function(){var b=a(this.getSelectionElement());return this.parents(b,"ul, ol").length>0&&0===this.parents(b,"table").length?(this.outdent(),!1):void 0},a.Editable.prototype.indentList=function(a,b){return"LI"===a.get(0).tagName?(b?this.outdentLi(a):this.indentLi(a),this.cleanupLists(),!1):!0},a.Editable.prototype.initList=function(){this.addListener("tab",this.listTab),this.addListener("shift+tab",this.listShiftTab),this.addListener("refresh",this.refreshLists),this.addListener("indent",this.indentList),this.isImage||this.isLink||this.options.editInPopup||this.$element.on("keypress",a.proxy(function(b){if(["TEXTAREA","INPUT"].indexOf(b.target.tagName)<0&&!this.isHTML){var c=b.which,d=this.getSelectionElement();if("LI"==d.tagName||this.parents(a(d),"li").length>0){if(13==c&&!b.shiftKey&&this.options.multiLine)return this.liEnter();if(8==c)return this.liBackspace()}}},this))},a.Editable.initializers.push(a.Editable.prototype.initList),a.Editable.prototype.formatList=function(b,c){if(this.browser.msie&&a.Editable.getIEversion()<9)return document.execCommand(b,!1,!1),!1;void 0===c&&(c=!0);var d,e,f=!1,g=!0,h=!1,i=this.getSelectionElements(),j=this.parents(a(i[0]),"ul, ol");if(j.length&&("UL"===j[0].tagName?"insertUnorderedList"!=b&&(f=!0):"insertOrderedList"!=b&&(f=!0)),this.saveSelectionByMarkers(),f){d="ol","insertUnorderedList"===b&&(d="ul");var k=a(j[0]);k.replaceWith("<"+d+">"+k.html()+"</"+d+">")}else{for(var l=0;l<i.length;l++)if(e=a(i[l]),("TD"==e.get(0).tagName||"TH"==e.get(0).tagName)&&this.wrapTextInElement(e),this.parents(e,"li").length>0||"LI"==e.get(0).tagName){var m;m="LI"==e.get(0).tagName?e:a(e.parents("li")[0]);var n=this.parents(e,"ul, ol");if(n.length>0&&(d=n[0].tagName.toLowerCase(),m.before('<span class="close-'+d+'" data-fr-verified="true"></span>'),m.after('<span class="open-'+d+'" data-fr-verified="true"></span>')),0===this.parents(a(n[0]),"ol, ul").length||f)if(0===m.find(this.valid_nodes.join(",")).length){var o=m.html().replace(/\u200B/gi,"");this.options.paragraphy?(0===m.text().replace(/\u200B/gi,"").length&&(o+=m.find("br").length>0?"":this.br),o="<"+this.options.defaultTag+this.attrs(m.get(0))+">"+o,o=o+"</"+this.options.defaultTag+">"):o+=m.find("br").length>0?"":this.br,m.replaceWith(o)}else m.replaceWith(m.html().replace(/\u200B/gi,""));else this.parents(a(n[0]),"ol, ul").length>0&&(m.append('<span class="open-li" data-fr-verified="true"></span>'),m.before('<span class="close-li" data-fr-verified="true"></span>'));h=!0}else g=!1;h&&this.cleanupLists(),(g===!1||f===!0)&&(this.wrapText(),this.restoreSelectionByMarkers(),i=this.getSelectionElements(),this.saveSelectionByMarkers(),this.elementsToList(i,b),this.unwrapText(),this.cleanupLists())}this.options.paragraphy&&!f&&this.wrapText(!0),this.restoreSelectionByMarkers(),c&&this.repositionEditor(),b="insertUnorderedList"==b?"unorderedListInserted":"orderedListInserted",this.triggerEvent(b)},a.Editable.prototype.elementsToList=function(b,c){var d="<ol>";"insertUnorderedList"==c&&(d="<ul>"),b[0]==this.$element.get(0)&&(b=this.$element.find("> "+this.valid_nodes.join(", >")));for(var e=0;e<b.length;e++){var f=a(d);$element=a(b[e]),$element.get(0)!=this.$element.get(0)&&("TD"===$element.get(0).tagName||"TH"===$element.get(0).tagName?(this.wrapTextInElement($element,!0),this.elementsToList($element.find("> "+this.valid_nodes.join(", >")),c)):(""===$element.attr("class")&&$element.removeAttr("class"),f.append($element.get(0).tagName==this.options.defaultTag&&0===$element.get(0).attributes.length?a("<li>").html($element.clone().html()):a("<li>").html($element.clone())),$element.replaceWith(f)))}},a.Editable.prototype.indentLi=function(b){var c=b.parents("ul, ol"),d=c.get(0).tagName.toLowerCase();b.find("> ul, > ol").length>0&&b.prev("li").length>0?(this.wrapTextInElement(b),b.find("> "+this.valid_nodes.join(" , > ")).each(function(b,c){a(c).wrap("<"+d+"></"+d+">").wrap("<li></li>")}),b.prev("li").append(b.find("> ul, > ol")),b.remove()):0===b.find("> ul, > ol").length&&b.prev("li").length>0&&(b.prev().append(a("<"+d+">").append(b.clone())),b.remove(),a(c.find("li").get().reverse()).each(function(b,c){var d=a(c);d.find(" > ul, > ol").length>0&&d.prev()&&d.prev().find(" > ul, > ol").length>0&&1===d.contents().length&&(d.prev().append(d.html()),d.remove())}))},a.Editable.prototype.outdentLi=function(b){var c=a(b.parents("ul, ol")[0]),d=this.parents(c,"ul, ol"),e=c.get(0).tagName.toLowerCase();0===b.prev("li").length&&this.parents(b,"li").length>0?(b.before('<span class="close-'+e+'" data-fr-verified="true"></span>'),b.before('<span class="close-li" data-fr-verified="true"></span>'),b.before('<span class="open-li" data-fr-verified="true"></span>'),b.after('<span class="open-'+e+'" data-fr-verified="true"></span>'),b.replaceWith(b.html())):(b.before('<span class="close-'+e+'" data-fr-verified="true"></span>'),b.after('<span class="open-'+e+'" data-fr-verified="true"></span>'),this.parents(b,"li").length>0&&(b.before('<span class="close-li" data-fr-verified="true"></span>'),b.after('<span class="open-li" data-fr-verified="true"></span>'))),d.length||(0===b.find(this.valid_nodes.join(",")).length?b.replaceWith(b.html().replace(/\u200b/gi,"")+this.br):(b.find(this.valid_nodes.join(", ")).each(a.proxy(function(b,c){this.emptyElement(c)&&a(c).append(this.br)},this)),b.replaceWith(b.html().replace(/\u200b/gi,""))))},a.Editable.prototype.listTextEmpty=function(b){var c=a(b).text().replace(/(\r\n|\n|\r|\t|\u200B)/gm,"");return(""===c||b===this.$element.get(0))&&1===a(b).find("br").length}}(jQuery);