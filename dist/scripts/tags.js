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
riot.tag2("add",'<material-popup> <div class="material-popup-title">Add your Server ?</div> <div class="material-popup-content"> <material-input onkeyup="{registryUI.addTag.onkeyup}" placeholder="Server URL"></material-input> <span>Write your URL without /v2</span> </div> <div class="material-popup-action"> <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onclick="registryUI.addTag.add();">Add</material-button> <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onclick="registryUI.addTag.close();">Cancel</material-button> </div> </material-popup>',"","",function(e){registryUI.addTag=registryUI.addTag||{},this.one("mount",function(){registryUI.addTag.dialog=this.tags["material-popup"],registryUI.addTag.dialog.getAddServer=function(){return this.tags["material-input"]?this.tags["material-input"].value:""}}),registryUI.addTag.onkeyup=function(e){13==e.keyCode&&registryUI.addTag.add()},registryUI.addTag.show=function(){registryUI.addTag.dialog.open()},registryUI.addTag.add=function(){registryUI.addTag.dialog.getAddServer().length>0&&registryUI.addServer(registryUI.addTag.dialog.getAddServer()),registryUI.home(),registryUI.addTag.close()},registryUI.addTag.close=function(){registryUI.addTag.dialog.tags["material-input"].value="",registryUI.addTag.dialog.close()}}),riot.tag2("app",'<header> <material-navbar> <div class="logo">Docker Registry UI</div> <menu></menu> </material-navbar> </header> <main> <catalog if="{route.routeName == \'home\'}"></catalog> <taglist if="{route.routeName == \'taglist\'}"></taglist> <change></change> <add></add> <remove></remove> <material-snackbar></material-snackbar> </main> <footer> <material-footer> <a class="material-footer-logo" href="https://joxit.github.io/docker-registry-ui/">Docker Registry UI</a> <ul class="material-footer-link-list"> <li> <a href="https://github.com/Joxit/docker-registry-ui">Contribute on GitHub</a> </li> <li> <a href="https://github.com/Joxit/docker-registry-ui/blob/master/LICENSE">Privacy &amp; Terms</a> </li> </ul> </material-footer> </footer>',"","",function(e){registryUI.appTag=this,route.base("#!"),route("",function(){route.routeName="home",registryUI.catalog.display&&(registryUI.catalog.loadend=!1,registryUI.catalog.display()),registryUI.appTag.update()}),route("/taglist/*",function(e){route.routeName="taglist",registryUI.taglist.name=e,registryUI.taglist.display&&(registryUI.taglist.loadend=!1,registryUI.taglist.display()),registryUI.appTag.update()}),registryUI.home=function(){"home"==route.routeName?registryUI.catalog.display():route("")},registryUI.snackbar=function(e,t){registryUI.appTag.tags["material-snackbar"].addToast({message:e,isError:t})},registryUI.errorSnackbar=function(e){return registryUI.snackbar(e,!0)},route.parser(null,function(e,t){const r=t.replace(/\?/g,"\\?").replace(/\*/g,"([^?#]+?)").replace(/\.\./,".*"),a=new RegExp("^"+r+"$"),i=e.match(a);if(i)return i.slice(1)}),route.start(!0)}),riot.tag2("catalog",'<material-card ref="catalog-tag" class="catalog"> <div class="material-card-title-action"> <h2>Repositories of {registryUI.name()}</h2> </div> <div hide="{registryUI.catalog.loadend}" class="spinner-wrapper"> <material-spinner></material-spinner> </div> <ul class="list highlight" show="{registryUI.catalog.loadend}"> <li each="{item in registryUI.catalog.repositories}" onclick="registryUI.catalog.go(\'{item}\');"> <span> <i class="material-icons">send</i> {item} </span> </li> </ul> </material-card>',"","",function(e){registryUI.catalog.instance=this,registryUI.catalog.display=function(){registryUI.catalog.repositories=[];var e=new Http;e.addEventListener("load",function(){registryUI.catalog.repositories=[],200==this.status?(registryUI.catalog.repositories=JSON.parse(this.responseText).repositories||[],registryUI.catalog.repositories.sort()):404==this.status?registryUI.snackbar("Server not found",!0):registryUI.snackbar(this.responseText)}),e.addEventListener("error",function(){registryUI.snackbar(this.getErrorMessage(),!0),registryUI.catalog.repositories=[]}),e.addEventListener("loadend",function(){registryUI.catalog.loadend=!0,registryUI.catalog.instance.update()}),e.open("GET",registryUI.url()+"/v2/_catalog"),e.send()},registryUI.catalog.go=function(e){route("taglist/"+e)},registryUI.catalog.display()}),riot.tag2("change",'<material-popup> <div class="material-popup-title">Change your Server ?</div> <div class="material-popup-content"> <div class="select-padding"> <select class="mdl-textfield__input mdl-textfield__select" name="server-list" ref="server-list"> <option each="{url in registryUI.getRegistryServer()}" riot-value="{url}">{url}</option> </select> </div> </div> <div class="material-popup-action"> <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onclick="registryUI.changeTag.change();">Change</material-button> <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onclick="registryUI.changeTag.close();">Cancel</material-button> </div> </material-popup>',"","",function(e){registryUI.changeTag=registryUI.changeTag||{},this.one("mount",function(){registryUI.changeTag.dialog=this.tags["material-popup"],registryUI.changeTag.dialog.getServerUrl=function(){return this.refs["server-list"]?this.refs["server-list"].value:""},registryUI.changeTag.dialog.on("updated",function(){this.refs["server-list"]&&(this.refs["server-list"].value=registryUI.url())})}),registryUI.changeTag.show=function(){registryUI.changeTag.dialog.open()},registryUI.changeTag.change=function(){registryUI.changeTag.dialog.getServerUrl().length>0&&registryUI.changeServer(registryUI.changeTag.dialog.getServerUrl()),registryUI.home(),registryUI.changeTag.dialog.close()},registryUI.changeTag.close=function(){registryUI.changeTag.dialog.close()}}),riot.tag2("image-size","<div>{this.bytesToSize(this.size)}</div>","","",function(e){var t=this;this.bytesToSize=function(e){var t=["Bytes","KB","MB","GB","TB"];if(void 0==e||isNaN(e))return"?";if(0==e)return"0 Byte";var r=parseInt(Math.floor(Math.log(e)/Math.log(1024)));return Math.ceil(e/Math.pow(1024,r))+" "+t[r]};var r=new Http;r.addEventListener("loadend",function(){200==this.status||202==this.status?(t.size=JSON.parse(this.responseText).layers.reduce(function(e,t){return e+t.size},0),t.update()):404==this.status?registryUI.errorSnackbar("Manifest for "+e.name+":"+e.tag+" not found"):registryUI.snackbar(this.responseText)}),r.open("GET",registryUI.url()+"/v2/"+e.name+"/manifests/"+e.tag),r.setRequestHeader("Accept","application/vnd.docker.distribution.manifest.v2+json"),r.send()}),riot.tag2("menu",'<material-button id="menu-control-button" onclick="registryUI.menuTag.toggle();" waves-center="true" rounded="true" waves-opacity="0.6" waves-duration="600"> <i class="material-icons">more_vert</i> </material-button> <material-dropdown id="menu-control-dropdown"> <p onclick="registryUI.addTag.show(); registryUI.menuTag.close();">Add URL</p> <p onclick="registryUI.changeTag.show(); registryUI.menuTag.close();">Change URL</p> <p onclick="registryUI.removeTag.show(); registryUI.menuTag.close();">Remove URL</p> </material-dropdown> <div class="overlay" onclick="registryUI.menuTag.close();" show="{registryUI.menuTag.isOpen && registryUI.menuTag.isOpen()}"></div>',"","",function(e){registryUI.menuTag=registryUI.menuTag||{},registryUI.menuTag.update=this.update,this.one("mount",function(e){var t=this;registryUI.menuTag.close=function(){t.tags["material-dropdown"].close(),t.update()},registryUI.menuTag.isOpen=function(){return t.tags["material-dropdown"].opened},registryUI.menuTag.toggle=function(){t.tags["material-dropdown"].opened?t.tags["material-dropdown"].close():t.tags["material-dropdown"].open(),t.update()}})}),riot.tag2("remove-image",'<a href="#" onclick="registryUI.removeImage.remove(\'{opts.name}\', \'{opts.tag}\')"> <i class="material-icons">delete</i> </a>',"","",function(e){registryUI.removeImage=registryUI.removeImage||{},registryUI.removeImage.update=this.update,registryUI.removeImage.remove=function(e,t){var r=new Http;r.addEventListener("loadend",function(){if(registryUI.taglist.refresh(),200==this.status){if(!this.hasHeader("Docker-Content-Digest"))return void registryUI.errorSnackbar("You need to add Access-Control-Expose-Headers: ['Docker-Content-Digest'] in your server configuration.");var r=this.getResponseHeader("Docker-Content-Digest"),a=new Http;a.addEventListener("loadend",function(){200==this.status||202==this.status?(registryUI.taglist.refresh(),registryUI.snackbar("Deleting "+e+":"+t+" image. Run `registry garbage-collect config.yml` on your registry")):404==this.status?registryUI.errorSnackbar("Digest not found"):registryUI.snackbar(this.responseText)}),a.open("DELETE",registryUI.url()+"/v2/"+e+"/manifests/"+r),a.setRequestHeader("Accept","application/vnd.docker.distribution.manifest.v2+json"),a.addEventListener("error",function(){registryUI.errorSnackbar("An error occurred when deleting image. Check if your server accept DELETE methods Access-Control-Allow-Methods: ['DELETE'].")}),a.send()}else 404==this.status?registryUI.errorSnackbar("Manifest for "+e+":"+t+" not found"):registryUI.snackbar(this.responseText)}),r.open("HEAD",registryUI.url()+"/v2/"+e+"/manifests/"+t),r.setRequestHeader("Accept","application/vnd.docker.distribution.manifest.v2+json"),r.send()}}),riot.tag2("remove",'<material-popup> <div class="material-popup-title">Remove your Registry Server ?</div> <div class="material-popup-content"> <ul class="list"> <li each="{url in registryUI.getRegistryServer()}"> <span> <a href="#" onclick="registryUI.removeTag.removeUrl(\'{url}\');"> <i class="material-icons">delete</i> </a> <span class="url">{url}</span> </span> </li> </ul> </div> <div class="material-popup-action"> <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onclick="registryUI.removeTag.close();">Close</material-button> </div> </material-popup>',"","",function(e){registryUI.removeTag=registryUI.removeTag||{},registryUI.removeTag.update=this.update,registryUI.removeTag.removeUrl=function(e){registryUI.removeServer(e),registryUI.removeTag.close()},registryUI.removeTag.close=function(){registryUI.removeTag.dialog.close(),registryUI.removeTag.update()},registryUI.removeTag.show=function(){registryUI.removeTag.dialog.open()},this.one("mount",function(){registryUI.removeTag.dialog=this.tags["material-popup"]})}),riot.tag2("taglist",'<material-card ref="taglist-tag" class="taglist"> <div class="material-card-title-action"> <a href="#!" onclick="registryUI.home();"> <i class="material-icons">arrow_back</i> </a> <h2>Tags of {registryUI.name() + \'/\' + registryUI.taglist.name}</h2> </div> <div hide="{registryUI.taglist.loadend}" class="spinner-wrapper"> <material-spinner></material-spinner> </div> <table show="{registryUI.taglist.loadend}" style="border: none;"> <thead> <tr> <th class="material-card-th-left">Repository</th> <th>Size</th> <th class="{registryUI.taglist.asc ? \'material-card-th-sorted-ascending\' : \'material-card-th-sorted-descending\'}" onclick="registryUI.taglist.reverse();">Tag</th> <th show="{registryUI.isImageRemoveActivated}"></th> </tr> </thead> <tbody> <tr each="{item in registryUI.taglist.tags}"> <td class="material-card-th-left">{registryUI.taglist.name}</td> <td><image-size name="{registryUI.taglist.name}" tag="{item}"></image-size></td> <td>{item}</td> <td show="{registryUI.isImageRemoveActivated}"> <remove-image name="{registryUI.taglist.name}" tag="{item}"></remove-image> </td> </tr> </tbody> </table> </material-card>',"","",function(e){registryUI.taglist.instance=this,registryUI.taglist.display=function(){if(registryUI.taglist.tags=[],"taglist"==route.routeName){var e=new Http;registryUI.taglist.instance.update(),e.addEventListener("load",function(){registryUI.taglist.tags=[],200==this.status?(registryUI.taglist.tags=JSON.parse(this.responseText).tags||[],registryUI.taglist.tags.sort()):404==this.status?registryUI.snackbar("Server not found",!0):registryUI.snackbar(this.responseText,!0)}),e.addEventListener("error",function(){registryUI.snackbar(this.getErrorMessage(),!0),registryUI.taglist.tags=[]}),e.addEventListener("loadend",function(){registryUI.taglist.loadend=!0,registryUI.taglist.instance.update()}),e.open("GET",registryUI.url()+"/v2/"+registryUI.taglist.name+"/tags/list"),e.send(),registryUI.taglist.asc=!0}},registryUI.taglist.display(),registryUI.taglist.instance.update(),registryUI.taglist.reverse=function(){registryUI.taglist.asc?(registryUI.taglist.tags.reverse(),registryUI.taglist.asc=!1):(registryUI.taglist.tags.sort(),registryUI.taglist.asc=!0),registryUI.taglist.instance.update()},registryUI.taglist.refresh=function(){route(registryUI.taglist.name)}});