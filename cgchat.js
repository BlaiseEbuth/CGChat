// ==UserScript==
// @name        CGChat
// @namespace   Turtle Scripts
// @match       https://www.codingame.com/*
// @grant       none
// @version     2.0.1
// @author      BlaiseEbuth
// @description A stand alone version of the Codingame's chat.
// ==/UserScript==

'use strict'

function getLocation()
{
  var loc = window.location.href.split("/");

  return loc[loc.length - 1];
}

function getElement(elementName, elementType = "class", elementIndex = 0)
{
  var element = undefined;

  if(elementType == "class")
    element = document.getElementsByClassName(elementName)[elementIndex];
  else if(elementType == "tag")
    element = document.getElementsByTagName(elementName)[elementIndex];
  else
    element = document.getElementById(elementName);

  return element;
}

function hideElement(element)
{
  element.setAttribute('style', 'display: none !important;');
}

function styleLogIn()
{
  var logBtn = getElement("navigation-auth_login-button");

  if(logBtn)
  {
    logBtn.click();

    var logFrm = getElement("popup");

    if(logFrm)
    {
      getElement("popup-skip").style.display = "none";

      logFrm.style.width = "100%";
      logFrm.style.height = "100%";

      getElement("cg-login-wrapper").style.height = "100%";
      getElement("cg-authentication-form").style.height = "100%";
      getElement("container-0-1-34").style.height = "100%";
    }
  }
}

function styleChat()
{
  if(getElement("small-chat"))
    getElement("hide-btn").click();
  
  hideElement(getElement("left-column"));
  hideElement(getElement("hide-wrapper"));
  hideElement(getElement("help-center"));
  hideElement(getElement("navigation", "tag"));
  hideElement(getElement("cg-discord-disclaimer", "tag"));

  getElement("chat-wrapper").setAttribute('style', 'display: flex !important; width: 100% !important;');
	getElement("chat", "id").setAttribute('style', 'display: flex !important; width: 100% !important;');

  getElement("chat").style.width = "100%";
  getElement("messages").style.width = "100%";
  getElement("settings-btn").style.margin = "0";
  
  var setPopup = getElement("settings-popup");

  setPopup.style.width = "100px";

  var settings = setPopup.children;

  for(var i = 0; i < settings.length - 1; ++i)
    hideElement(settings[i]);

  hideElement(settings[settings.length - 1].children[1]);
}

function main()
{
	if(getLocation() == "start")
    styleLogIn();
  else
    styleChat();
}

setInterval(main, 100);
