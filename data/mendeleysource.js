(function MendeleyBookmarklet() {
  if (!window.mendeleybookmarklet) window.mendeleybookmarklet = {};
  var iframeZIndex = 2147483640;
  var body, iframe, loadingDiv, closeButton, closeButtonDiv, iframeLoadCounter;
  var partnerSiteRegexes = ["://([^./]*www.)?sciencedirect.com[^/]*/"];
  var iframeCss = {
    "position": "fixed",
    "z-index": iframeZIndex,
    "visibility": "hidden",
    "-moz-box-sizing": "border-box",
    "box-sizing": "border-box",
    "padding": "15px",
    "border": "0",
    "background": "transparent",
    "height": "100%",
    "width": "350px",
    "top": "0",
    "right": "0",
    "overflow": "hidden"
  };
  var loadingDivCss = {
    "position": "fixed",
    "z-index": iframeZIndex + 1,
    "top": "15px",
    "right": "15px",
    "border": " 5px solid #ADADAD",
    "border-radius": "5px",
    "margin": " 0",
    "padding": " 0",
    "width": "320px",
    "background": " #f7f7f7",
    "color": "#666",
    "-moz-box-sizing": " border-box",
    "box-sizing": " border-box"
  };
  var loadingTitleCss = {
    "padding": " 8px",
    "text-align": "left",
    "font-family": "Arial, sans-serif",
    "font-size": "14px",
    "line-height": "24px",
    "padding-left": "50px",
    "background-image": " -webkit-linear-gradient(bottom, rgb(226,226,226) 0%, rgb(255,255,255) 100%)"
  };
  var loadingContentCss = {
    "font-size": "14px",
    "text-align": "center"
  };
  var loadingSpinnerCss = {
    "margin": "30px 0 10px -5px"
  };
  var mendeleyBadgeCss = {
    "position": "absolute",
    "top": "0",
    "left": "10px;"
  };
  var closeButtonDivCss = {
    "position": "fixed",
    "z-index": iframeZIndex + 2
  };
  var closeButtonCss = {
    "position": "fixed",
    "top": "7px",
    "right": "320px",
    "cursor": "pointer"
  };
  var closeButtonCssIE = {
    "position": "fixed",
    "background": "#222",
    "color": "#fff",
    "border": " 2px solid #fff",
    "height": "20px",
    "line-height": "22px !important",
    "width": "21px",
    "top": "7px",
    "right": "320px",
    "text-align": "center",
    "font-size": "16px !important",
    "font-weight": "bold !important",
    "text-decoration": "none !important",
    "font-family": "Arial, sans-serif !important"
  };

  function applyCss(el, css) {
    var s = "";
    for (var p in css) s += p + ":" + css[p] + ";";
    el.style.cssText = el.style.cssText + s
  }

  function handleIframeLoad() {
    if (++iframeLoadCounter == 2) {
      loadingDiv.style.visibility = "hidden";
      iframe.style.visibility = "visible";
      setLoadingFlag(false)
    }
  }

  function createIframe() {
    iframe = document.createElement("IFRAME");
    iframe.src = "about:blank";
    iframe.allowTransparency = true;
    iframe.height = "100%";
    iframe.width = "350px";
    iframe.frameBorder = 0;
    applyCss(iframe, iframeCss);
    body.appendChild(iframe);
    if (iframe.attachEvent) iframe.attachEvent("onload", handleIframeLoad);
    else iframe.onload = handleIframeLoad
  }

  function createLoadingDiv() {
    loadingDiv = document.createElement("DIV");
    applyCss(loadingDiv, loadingDivCss);
    var mendeleyBadge = document.createElement("IMG");
    applyCss(mendeleyBadge, mendeleyBadgeCss);
    mendeleyBadge.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAhCAYAAAC4JqlRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNkU1NTk1NTNDREMxMUUyQUM0M0VEQjQ5QTA2NjkzRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNkU1NTk1NjNDREMxMUUyQUM0M0VEQjQ5QTA2NjkzRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU2RTU1OTUzM0NEQzExRTJBQzQzRURCNDlBMDY2OTNGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU2RTU1OTU0M0NEQzExRTJBQzQzRURCNDlBMDY2OTNGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VdfT4QAABq5JREFUeNrEV1ls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";
    var loadingTitle = document.createElement("DIV");
    applyCss(loadingTitle, loadingTitleCss);
    loadingTitle.innerHTML = "Save to Mendeley";
    var loadingContent = document.createElement("DIV");
    applyCss(loadingContent, loadingContentCss);
    var loadingSpinner = document.createElement("IMG");
    applyCss(loadingSpinner, loadingSpinnerCss);
    loadingSpinner.src = "data:image/gif;base64,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";
    loadingContent.appendChild(loadingSpinner);
    var loadingMessage = document.createElement("P");
    loadingMessage.innerHTML = "Loading...";
    loadingContent.appendChild(loadingMessage);
    body.appendChild(loadingDiv);
    loadingDiv.appendChild(mendeleyBadge);
    loadingDiv.appendChild(loadingTitle);
    loadingDiv.appendChild(loadingContent)
  }

  function createCloseButtonDiv() {
    closeButtonDiv = document.createElement("DIV");
    applyCss(closeButtonDiv, closeButtonDivCss);
    if (navigator.appVersion.indexOf("MSIE 7.") != -1) {
      closeButton = document.createElement("A");
      applyCss(closeButton, closeButtonCssIE);
      closeButton.href = "#";
      closeButton.innerHTML = "&#215;"
    } else {
      closeButton = document.createElement("IMG");
      applyCss(closeButton, closeButtonCss);
      closeButton.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNDMxM0JBQUFCRTUxMUUyODZCQ0IyQzQxNEVBNDQ0NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNEI0Q0E1NkFDMDExMUUyODZCQ0IyQzQxNEVBNDQ0NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE0MzEzQkE4QUJFNTExRTI4NkJDQjJDNDE0RUE0NDQ3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE0MzEzQkE5QUJFNTExRTI4NkJDQjJDNDE0RUE0NDQ3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VICatgAAA6dJREFUeNqcVktLW1EQnjxMKqkhVdMKWogKUmsNVLCmixSJXVgXsauCIAguXBb8A1JcKd26VXBbUNBNu9AgFKJWpSRqQy2RgA+sBhMrVZOY3M53ODdc85DUgUnOnTPzfec5c3RUXHTQeDzeZTab3Uaj8aXBYHiq0+keKYryO51O/7i+vl5OJBJfbTbbIvsqUksSgBtisdhbBgooJQj84I84GZ8HmPttTKVSn3nkXTBsbm7S2toaBYNB2t3dpWg0StXV1dTQ0EBOp5Pa29uptbVVBPPMFsvKyt6gqZ2VrgDBKhM839/fp7m5OZqfn6fT09Oi066srCSv10u9vb1UV1cHou9M1KEl0mkJksnkF3bwbG9v09TUFC0tLZW6xNTZ2UmDg4PU0tJCPFCfyWTqVon00kd/eHjoBQFmMDk5ST6fjzKZTMkKf8QhHjjAAy7JHzELXucPMMzMzNDCwgLxZv63Ig7xEIlnBL4gCYfDr5n9WSAQoNnZ2bxRjo2NFRx9ITvigQM84KokBqvV+grsfr+fjo+Pb4xufHycenp6aGtr64Yd37CjX2tHPHAgEtcgSMrLy3EaaGNjI28JhoeHs5sbCoWEDf+qoD83BjgQiStI9Hyjn2hBcrWxsTELurOzk23DXshfHYTE1WPT7/OljYNRDSomkUgk23Y4HEX9OP0Q7weaaU5DNrHxfIGisFRVVRU9OVoClbCYL3BkBoiqG69cXFz8grGpqangKdrb28uC19bWZtuwF/IHDkTiisuY4bQhdqqtrS1vVBMTE1nQmpoaYcO/KujPjQEOROJmBAlPfRlGt9stcpE2YGhoSJx9u91+w45v2NGvtSMeOHJJgZtBu4zVfn5+/hNpe3R0VGHHOyviIcADLvAxExynq/X19Y9g7O/vp+7u7julFcQhHiLxriS+yF1m1oe8hn6Mgi+T0tfXp1RUVJSs8EccBDjAk7jZcoKKZmF9fHZ2FoIjFyhlZGREqa+vVywWS1FFP/zgD0E8cCSeIa+eIBOwPjg5OfnEWfQFOlZXV0UaX1lZIdSZo6MjcbpQN1wuF3k8HuroEFkJVfMbH4h33IyxXuZWSJUIh8CKkfDJec91O1xKjYcf/OUMrBJHd2uNZzXJ6Vqnp6e7mpubXXwJnfwqcXDSs11eXvIjJh45ODgIcp5aGRgYwGvlD+tf1uRtNV5r02vI7kk1a0YIgBRrQp6gKw14ptAS3frukptnkMR6DUlGalpq0XfXPwEGAC/2hSkSgXukAAAAAElFTkSuQmCC"
    }
    closeButton.id =
      "mendeley-bookmarklet-close";
    closeButton.title = "Close the importer";
    closeButton.onclick = function() {
      cleanUpOnShutdown();
      return false
    };
    body.appendChild(closeButtonDiv);
    closeButtonDiv.appendChild(closeButton)
  }

  function submitIframeForm(hroot) {
    var iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write("" + "<html>" + "<head></head>" + "<body onload=\"document.getElementsByTagName('FORM')[0].submit();\">" + getForm(hroot) + "</body>" + "</html>");
    iframeDoc.close()
  }

  function saveInjectedElements() {
    window.mendeleybookmarklet.elements = {
      iframe: iframe,
      loadingDiv: loadingDiv,
      closeButtonDiv: closeButtonDiv
    }
  }

  function getInjectedElements() {
    return window.mendeleybookmarklet.elements
  }

  function cleanUpOnInitUI() {
    iframeLoadCounter = 0;
    removeElements(getInjectedElements());
    window.mendeleybookmarklet.elements = undefined
  }

  function cleanUpOnShutdown() {
    removeElements(getInjectedElements());
    window.mendeleybookmarklet = undefined
  }

  function removeElements(elements) {
    if (elements)
      for (var key in elements) {
        var element = elements[key];
        if (element) element.parentNode.removeChild(element)
      }
  }

  function setLoadingFlag(loading) {
    window.mendeleybookmarklet.loading = loading ? true : undefined
  }

  function getLoadingFlag() {
    return window.mendeleybookmarklet.loading
  }

  function removeScriptTag() {
    var scriptNode = document.getElementsByTagName("body")[0].lastChild;
    var src = scriptNode.getAttribute("src");
    try {
      scriptNode.parentNode.removeChild(scriptNode)
    } catch (e) {}
    return src
  }

  function shouldSendCookies() {
    var url = document.location;
    for (var i = 0; i < partnerSiteRegexes.length; i++) {
      var regex = new RegExp(partnerSiteRegexes[i]);
      if (regex.test(url)) return true
    }
    return false
  }

  function getForm(hroot) {
    var div = document.createElement("DIV"),
      form = document.createElement("FORM"),
      endpointUrl = hroot + "/import/";
    data = {
      version: 1.1
    };
    if (typeof MendeleyImporterApi !== "undefined") {
      var isBookmarklet = !MendeleyImporterApi.getOpenedWithApi();
      var dataCallback = MendeleyImporterApi.getDataCallback();
      var identityCallback = MendeleyImporterApi.getUserIdentityCallback();
      var hostId = MendeleyImporterApi.getHostId();
      if (hostId && typeof hostId === "string") data.hostId =
        hostId;
      if (dataCallback && typeof dataCallback === "function") data.documents = dataCallback(isBookmarklet);
      if (identityCallback && typeof identityCallback === "function") data.identity = identityCallback(isBookmarklet);
      MendeleyImporterApi.setOpenedWithApi(false)
    } else {
      endpointUrl += "html/";
      data.html = "<html>" + document.documentElement.innerHTML + "</html>";
      data.url = window.location.href;
      data.cookies = shouldSendCookies() ? document.cookie : false
    }
    appendSerialized(form, data);
    form.setAttribute("ACTION", endpointUrl);
    form.setAttribute("METHOD",
      "POST");
    form.setAttribute("ACCEPT-CHARSET", "UTF-8");
    div.appendChild(form);
    return div.innerHTML
  }

  function appendSerialized(form, data, path) {
    var prop, item, input;
    for (prop in data) {
      if (!data.hasOwnProperty(prop)) continue;
      item = data[prop];
      if (typeof item === "string" || typeof item === "number") {
        input = document.createElement("INPUT");
        input.setAttribute("TYPE", "hidden");
        input.setAttribute("NAME", path ? path + "[" + prop + "]" : prop);
        input.setAttribute("VALUE", data[prop]);
        form.appendChild(input)
      } else if (typeof item === "object") appendSerialized(form,
        item, path ? path + "[" + prop + "]" : prop)
    }
  }

  function initUI(hroot) {
    if (getLoadingFlag()) {
      alert("Please wait while the importer is loading");
      return
    }
    cleanUpOnInitUI();
    setLoadingFlag(true);
    body = document.getElementsByTagName("BODY")[0];
    createLoadingDiv();
    createCloseButtonDiv();
    createIframe();
    saveInjectedElements();
    submitIframeForm(hroot)
  }

  function run() {
    var source = removeScriptTag();
    var mendeleyHroot = source.match(/^https?:\/\/[^/]+/);
    initUI(mendeleyHroot)
  }
  try {
    run()
  } catch (e) {}
})();
