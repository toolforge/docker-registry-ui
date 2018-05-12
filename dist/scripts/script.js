/*!
 * docker-registry-ui
 * Copyright (C) 2016-2018  Jones Magloire @Joxit
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
function Http(){this.oReq=new XMLHttpRequest,this.oReq.hasHeader=Http.hasHeader,this.oReq.getErrorMessage=Http.getErrorMessage,this._events={},this._headers={}}Http.prototype.addEventListener=function(e,r){this._events[e]=r;var t=this;switch(e){case"loadend":t.oReq.addEventListener("loadend",function(){if(401==this.status){var e=new XMLHttpRequest;e.open(t._method,t._url);for(key in t._events)e.addEventListener(key,t._events[key]);for(key in t._headers)e.setRequestHeader(key,t._headers[key]);e.withCredentials=!0,e.hasHeader=Http.hasHeader,e.getErrorMessage=Http.getErrorMessage,e.send()}else r.bind(this)()});break;case"load":t.oReq.addEventListener("load",function(){401!==this.status&&r.bind(this)()});break;default:t.oReq.addEventListener(e,function(){r.bind(this)()})}},Http.prototype.setRequestHeader=function(e,r){this.oReq.setRequestHeader(e,r),this._headers[e]=r},Http.prototype.open=function(e,r){this._method=e,this._url=r,this.oReq.open(e,r)},Http.prototype.send=function(){this.oReq.send()},Http.hasHeader=function(e){return this.getAllResponseHeaders().split("\n").some(function(r){return new RegExp("^"+e+":","i").test(r)})},Http.getErrorMessage=function(){return registryUI.url()&&registryUI.url().match("^http://")&&"https:"===window.location.protocol?"Mixed Content: The page at `"+window.location.origin+"` was loaded over HTTPS, but requested an insecure server endpoint `"+registryUI.url()+"`. This request has been blocked; the content must be served over HTTPS.":registryUI.url()?"An error occured":"Incorrect server endpoint."};var registryUI={};registryUI.URL_QUERY_PARAM_REGEX=/[&?]url=/,registryUI.URL_PARAM_REGEX=/^url=/,registryUI.name=registryUI.url=function(e){if(!registryUI._url){var r=registryUI.getUrlQueryParam();if(r)try{return registryUI._url=registryUI.decodeURI(r),registryUI._url}catch(e){console.log(e)}registryUI._url=registryUI.getRegistryServer(0)}return registryUI._url},registryUI.getRegistryServer=function(e){try{var r=JSON.parse(localStorage.getItem("registryServer"));if(r instanceof Array)return isNaN(e)?r.map(function(e){return e.trim().replace(/\/*$/,"")}):r[e]}catch(e){}return isNaN(e)?[]:""},registryUI.addServer=function(e){var r=registryUI.getRegistryServer();e=e.trim().replace(/\/*$/,"");var t=r.indexOf(e);t==-1&&(r.push(e),registryUI._url||registryUI.updateHistory(e),localStorage.setItem("registryServer",JSON.stringify(r)))},registryUI.changeServer=function(e){var r=registryUI.getRegistryServer();e=e.trim().replace(/\/*$/,"");var t=r.indexOf(e);t!=-1&&(r.splice(t,1),r=[e].concat(r),registryUI.updateHistory(e),localStorage.setItem("registryServer",JSON.stringify(r)))},registryUI.removeServer=function(e){var r=registryUI.getRegistryServer();e=e.trim().replace(/\/*$/,"");var t=r.indexOf(e);t!=-1&&(r.splice(t,1),localStorage.setItem("registryServer",JSON.stringify(r)),e==registryUI.url()&&(registryUI.updateHistory(registryUI.getRegistryServer(0)),route("")))},registryUI.updateHistory=function(e){history.pushState(null,"",(e?"?url="+registryUI.encodeURI(e):"?")+window.location.hash),registryUI._url=e},registryUI.getUrlQueryParam=function(){var e=window.location.search;if(registryUI.URL_QUERY_PARAM_REGEX.test(e)){var r=e.split(/^\?|&/).find(function(e){return e&&registryUI.URL_PARAM_REGEX.test(e)});return r?r.replace(registryUI.URL_PARAM_REGEX,""):r}},registryUI.encodeURI=function(e){return e.indexOf("&")<0?window.encodeURIComponent(e):btoa(e)},registryUI.decodeURI=function(e){return e.startsWith("http")?window.decodeURIComponent(e):atob(e)},registryUI.isImageRemoveActivated=!0,registryUI.catalog={},registryUI.taglist={},riot.mount("*");