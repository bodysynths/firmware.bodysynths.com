(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{747:function(e,t,i){Promise.resolve().then(i.bind(i,7958))},7958:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return E}});var n=i(7437),r=i(2265);let o=e=>"".concat("/body-synths-firmware","/").concat(e);function s(){return(0,n.jsx)("div",{className:"card text-primary-content w-full",children:(0,n.jsx)("a",{href:"https://bodysynths.com/",children:(0,n.jsx)("img",{className:"w-full",src:o("header.png"),alt:"Example Image"})})})}let a=(0,i(9099).Ue)(e=>({device:null,firmwareBinFile:null,manifestationTolerant:!1}));function c(){let[e,t]=(0,r.useState)([]),[i,s]=(0,r.useState)("");a(e=>e.firmwareBinFile);let c="number"==typeof i;(0,r.useEffect)(()=>{fetch(o("releases.json")).then(e=>e.json()).then(e=>{t(e.data.sort((e,t)=>new Date(t.date)-new Date(e.date)))}).catch(e=>{console.error("Error fetching releases:",e)})},[]),(0,r.useEffect)(()=>{e.length>0&&!c&&s(0)},[e]),(0,r.useEffect)(()=>{if(!c){a.setState({firmwareBinFile:null});return}let t=e[i].file;fetch(o("firmware/".concat(t,".bin"))).then(e=>e.arrayBuffer()).then(e=>{a.setState({firmwareBinFile:new Uint8Array(e)})}).catch(e=>{console.error("Error loading file:",e)})},[i]);let l=c?e[i]:null;return(0,n.jsx)("div",{className:"card bg-white text-primary-content w-full",children:(0,n.jsxs)("div",{className:"card-body",children:[(0,n.jsx)("h2",{className:"card-title",children:"Firmware"}),e.map((e,t)=>(0,n.jsxs)("div",{className:"collapse collapse-plus bg-base-200 text-white",children:[(0,n.jsx)("input",{type:"radio",name:"my-accordion-3",defaultChecked:0==t}),(0,n.jsx)("div",{className:"collapse-title ",children:e.title}),(0,n.jsxs)("div",{className:"collapse-content space-y-4",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{children:" Release Notes:"}),(0,n.jsx)("ul",{className:"list-disc pl-5 space-y-2",children:e.release_notes.map((e,t)=>(0,n.jsx)("li",{children:e},t))})]}),(0,n.jsx)("div",{children:(0,n.jsx)("button",{className:"".concat(i!=t?"":"btn-disabled"," btn-primary btn btn-outline"),onClick:()=>s(t),children:i!=t?"Select This Version":"This Version Selected"})})]})]},t)),(0,n.jsxs)("div",{children:["Selected Firmware Version: ",l?l.title:"None"]})]})})}var l=i(2266);let u={};u.DETACH=0,u.DNLOAD=1,u.UPLOAD=2,u.GETSTATUS=3,u.CLRSTATUS=4,u.GETSTATE=5,u.ABORT=6,u.appIDLE=0,u.appDETACH=1,u.dfuIDLE=2,u.dfuDNLOAD_SYNC=3,u.dfuDNBUSY=4,u.dfuDNLOAD_IDLE=5,u.dfuMANIFEST_SYNC=6,u.dfuMANIFEST=7,u.dfuMANIFEST_WAIT_RESET=8,u.dfuUPLOAD_IDLE=9,u.dfuERROR=10,u.STATUS_OK=0,u.Device=function(e,t){this.device_=e,this.settings=t,this.intfNumber=t.interface.interfaceNumber},u.findDeviceDfuInterfaces=function(e){let t=[];for(let i of e.configurations)for(let e of i.interfaces)for(let n of e.alternates)if(254==n.interfaceClass&&1==n.interfaceSubclass&&(1==n.interfaceProtocol||2==n.interfaceProtocol)){let r={configuration:i,interface:e,alternate:n,name:n.interfaceName};t.push(r)}return t},u.findAllDfuInterfaces=function(){return navigator.usb.getDevices().then(e=>{let t=[];for(let i of e)for(let e of u.findDeviceDfuInterfaces(i))t.push(new u.Device(i,e));return t})},u.Device.prototype.logDebug=function(e){console.log("logdebug: ",e)},u.Device.prototype.logInfo=function(e){console.log("logInfo: ",e)},u.Device.prototype.logWarning=function(e){console.log("logWarning: ",e)},u.Device.prototype.logError=function(e){console.log("logError: ",e)},u.Device.prototype.logProgress=function(e,t){void 0===t?console.log(e):console.log(e+"/"+t)},u.Device.prototype.open=async function(){await this.device_.open();let e=this.settings.configuration.configurationValue;(null===this.device_.configuration||this.device_.configuration.configurationValue!=e)&&await this.device_.selectConfiguration(e);let t=this.settings.interface.interfaceNumber;this.device_.configuration.interfaces[t].claimed||await this.device_.claimInterface(t);let i=this.settings.alternate.alternateSetting,n=this.device_.configuration.interfaces[t];(null===n.alternate||n.alternate.alternateSetting!=i)&&await this.device_.selectAlternateInterface(t,i)},u.Device.prototype.close=async function(){try{await this.device_.close()}catch(e){console.log(e)}},u.Device.prototype.readDeviceDescriptor=function(){return this.device_.controlTransferIn({requestType:"standard",recipient:"device",request:6,value:256,index:0},18).then(e=>"ok"==e.status?Promise.resolve(e.data):Promise.reject(e.status))},u.Device.prototype.readStringDescriptor=async function(e,t){void 0===t&&(t=0);let i={requestType:"standard",recipient:"device",request:6,value:768|e,index:t};var n=await this.device_.controlTransferIn(i,1);if("ok"==n.status){let e=n.data.getUint8(0);if("ok"==(n=await this.device_.controlTransferIn(i,e)).status){let i=(e-2)/2,r=[];for(let e=0;e<i;e++)r.push(n.data.getUint16(2+2*e,!0));return 0==t?r:String.fromCharCode.apply(String,r)}}throw"Failed to read string descriptor ".concat(e,": ").concat(n.status)},u.Device.prototype.readInterfaceNames=async function(){let e={},t=new Set;for(let i=0;i<this.device_.configurations.length;i++){let n=await this.readConfigurationDescriptor(i),r=u.parseConfigurationDescriptor(n),o=r.bConfigurationValue;for(let i of(e[o]={},r.descriptors))4==i.bDescriptorType&&(i.bInterfaceNumber in e[o]||(e[o][i.bInterfaceNumber]={}),e[o][i.bInterfaceNumber][i.bAlternateSetting]=i.iInterface,i.iInterface>0&&t.add(i.iInterface))}let i={};for(let e of t)try{i[e]=await this.readStringDescriptor(e,1033)}catch(t){console.log(t),i[e]=null}for(let t in e)for(let n in e[t])for(let r in e[t][n]){let o=e[t][n][r];e[t][n][r]=i[o]}return e},u.parseDeviceDescriptor=function(e){return{bLength:e.getUint8(0),bDescriptorType:e.getUint8(1),bcdUSB:e.getUint16(2,!0),bDeviceClass:e.getUint8(4),bDeviceSubClass:e.getUint8(5),bDeviceProtocol:e.getUint8(6),bMaxPacketSize:e.getUint8(7),idVendor:e.getUint16(8,!0),idProduct:e.getUint16(10,!0),bcdDevice:e.getUint16(12,!0),iManufacturer:e.getUint8(14),iProduct:e.getUint8(15),iSerialNumber:e.getUint8(16),bNumConfigurations:e.getUint8(17)}},u.parseConfigurationDescriptor=function(e){let t=new DataView(e.buffer.slice(9)),i=u.parseSubDescriptors(t);return{bLength:e.getUint8(0),bDescriptorType:e.getUint8(1),wTotalLength:e.getUint16(2,!0),bNumInterfaces:e.getUint8(4),bConfigurationValue:e.getUint8(5),iConfiguration:e.getUint8(6),bmAttributes:e.getUint8(7),bMaxPower:e.getUint8(8),descriptors:i}},u.parseInterfaceDescriptor=function(e){return{bLength:e.getUint8(0),bDescriptorType:e.getUint8(1),bInterfaceNumber:e.getUint8(2),bAlternateSetting:e.getUint8(3),bNumEndpoints:e.getUint8(4),bInterfaceClass:e.getUint8(5),bInterfaceSubClass:e.getUint8(6),bInterfaceProtocol:e.getUint8(7),iInterface:e.getUint8(8),descriptors:[]}},u.parseFunctionalDescriptor=function(e){return{bLength:e.getUint8(0),bDescriptorType:e.getUint8(1),bmAttributes:e.getUint8(2),wDetachTimeOut:e.getUint16(3,!0),wTransferSize:e.getUint16(5,!0),bcdDFUVersion:e.getUint16(7,!0)}},u.parseSubDescriptors=function(e){let t;let i=e,n=[],r=!1;for(;i.byteLength>2;){let e=i.getUint8(0),o=i.getUint8(1),s=new DataView(i.buffer.slice(0,e));if(4==o)r=254==(t=u.parseInterfaceDescriptor(s)).bInterfaceClass&&1==t.bInterfaceSubClass,n.push(t);else if(r&&33==o){let e=u.parseFunctionalDescriptor(s);n.push(e),t.descriptors.push(e)}else{let i={bLength:e,bDescriptorType:o,data:s};n.push(i),t&&t.descriptors.push(i)}i=new DataView(i.buffer.slice(e))}return n},u.Device.prototype.readConfigurationDescriptor=function(e){let t=512|e;return this.device_.controlTransferIn({requestType:"standard",recipient:"device",request:6,value:t,index:0},4).then(e=>{if("ok"!=e.status)return Promise.reject(e.status);{let i=e.data.getUint16(2,!0);return this.device_.controlTransferIn({requestType:"standard",recipient:"device",request:6,value:t,index:0},i)}}).then(e=>"ok"==e.status?Promise.resolve(e.data):Promise.reject(e.status))},u.Device.prototype.requestOut=function(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return this.device_.controlTransferOut({requestType:"class",recipient:"interface",request:e,value:i,index:this.intfNumber},t).then(e=>"ok"==e.status?Promise.resolve(e.bytesWritten):Promise.reject(e.status),e=>Promise.reject("ControlTransferOut failed: "+e))},u.Device.prototype.requestIn=function(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return this.device_.controlTransferIn({requestType:"class",recipient:"interface",request:e,value:i,index:this.intfNumber},t).then(e=>"ok"==e.status?Promise.resolve(e.data):Promise.reject(e.status),e=>Promise.reject("ControlTransferIn failed: "+e))},u.Device.prototype.detach=function(){return this.requestOut(u.DETACH,void 0,1e3)},u.Device.prototype.waitDisconnected=async function(e){let t=this,i=this.device_;return new Promise(function(n,r){let o;e>0&&(o=setTimeout(r,e)),navigator.usb.addEventListener("disconnect",function r(s){s.device===i&&(e>0&&clearTimeout(o),t.disconnected=!0,navigator.usb.removeEventListener("disconnect",r),s.stopPropagation(),n(t))})})},u.Device.prototype.download=function(e,t){return this.requestOut(u.DNLOAD,e,t)},u.Device.prototype.dnload=u.Device.prototype.download,u.Device.prototype.upload=function(e,t){return this.requestIn(u.UPLOAD,e,t)},u.Device.prototype.clearStatus=function(){return this.requestOut(u.CLRSTATUS)},u.Device.prototype.clrStatus=u.Device.prototype.clearStatus,u.Device.prototype.getStatus=function(){return this.requestIn(u.GETSTATUS,6).then(e=>Promise.resolve({status:e.getUint8(0),pollTimeout:16777215&e.getUint32(1,!0),state:e.getUint8(4)}),e=>Promise.reject("DFU GETSTATUS failed: "+e))},u.Device.prototype.getState=function(){return this.requestIn(u.GETSTATE,1).then(e=>Promise.resolve(e.getUint8(0)),e=>Promise.reject("DFU GETSTATE failed: "+e))},u.Device.prototype.abort=function(){return this.requestOut(u.ABORT)},u.Device.prototype.abortToIdle=async function(){await this.abort();let e=await this.getState();if(e==u.dfuERROR&&(await this.clearStatus(),e=await this.getState()),e!=u.dfuIDLE)throw"Failed to return to idle state after abort: state "+e.state},u.Device.prototype.do_upload=async function(e){let t,i,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1/0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=r,s=[],a=0;this.logInfo("Copying data from DFU device to browser"),this.logProgress(0);do i=Math.min(e,n-a),t=await this.upload(i,o++),this.logDebug("Read "+t.byteLength+" bytes"),t.byteLength>0&&(s.push(t),a+=t.byteLength),Number.isFinite(n)?this.logProgress(a,n):this.logProgress(a);while(a<n&&t.byteLength==i);return a==n&&await this.abortToIdle(),this.logInfo("Read ".concat(a," bytes")),new Blob(s,{type:"application/octet-stream"})},u.Device.prototype.poll_until=async function(e){let t=await this.getStatus(),i=this;for(;!e(t.state)&&t.state!=u.dfuERROR;)await function(e){return new Promise(function(t,n){i.logDebug("Sleeping for "+e+"ms"),setTimeout(t,e)})}(t.pollTimeout),t=await this.getStatus();return t},u.Device.prototype.poll_until_idle=function(e){return this.poll_until(t=>t==e)},u.Device.prototype.do_download=async function(e,t,i){let n=0,r=t.byteLength,o=0;for(this.logInfo("Copying data from browser to DFU device"),this.logProgress(n,r);n<r;){let i;let s=Math.min(r-n,e),a=0;try{a=await this.download(t.slice(n,n+s),o++),this.logDebug("Sent "+a+" bytes"),i=await this.poll_until_idle(u.dfuDNLOAD_IDLE)}catch(e){throw"Error during DFU download: "+e}if(i.status!=u.STATUS_OK)throw"DFU DOWNLOAD failed state=".concat(i.state,", status=").concat(i.status);this.logDebug("Wrote "+a+" bytes"),n+=a,this.logProgress(n,r)}this.logDebug("Sending empty block");try{await this.download(new ArrayBuffer([]),o++)}catch(e){throw"Error during final DFU download: "+e}if(this.logInfo("Wrote "+n+" bytes"),this.logInfo("Manifesting new firmware dfu.js"),i){let e;try{if((e=await this.poll_until(e=>e==u.dfuIDLE||e==u.dfuMANIFEST_WAIT_RESET)).state==u.dfuMANIFEST_WAIT_RESET&&this.logDebug("Device transitioned to MANIFEST_WAIT_RESET even though it is manifestation tolerant"),e.status!=u.STATUS_OK)throw"DFU MANIFEST failed state=".concat(e.state,", status=").concat(e.status)}catch(e){if(e.endsWith("ControlTransferIn failed: NotFoundError: Device unavailable.")||e.endsWith("ControlTransferIn failed: NotFoundError: The device was disconnected."))this.logWarning("Unable to poll final manifestation status");else throw"Error during DFU manifest: "+e}}else try{let e=await this.getStatus();this.logDebug("Final DFU status: state=".concat(e.state,", status=").concat(e.status))}catch(e){this.logDebug("Manifest GET_STATUS poll error: "+e)}try{await this.device_.reset()}catch(e){if("NetworkError: Unable to reset the device."==e||"NotFoundError: Device unavailable."==e||"NotFoundError: The device was disconnected."==e)this.logDebug("Ignored reset error");else throw"Error during reset for manifestation: "+e}};let f={};f.GET_COMMANDS=0,f.SET_ADDRESS=33,f.ERASE_SECTOR=65,f.Device=function(e,t){u.Device.call(this,e,t),this.memoryInfo=null,this.startAddress=NaN,t.name&&(this.memoryInfo=f.parseMemoryDescriptor(t.name))},f.Device.prototype=Object.create(u.Device.prototype),f.Device.prototype.constructor=f.Device,f.parseMemoryDescriptor=function(e){let t;let i=e.indexOf("/");if(!e.startsWith("@")||-1==i)throw'Not a DfuSe memory descriptor: "'.concat(e,'"');let n=e.substring(1,i).trim(),r=e.substring(i),o=[],s={" ":1,B:1,K:1024,M:1048576},a=/\/\s*(0x[0-9a-fA-F]{1,8})\s*\/(\s*[0-9]+\s*\*\s*[0-9]+\s?[ BKM]\s*[abcdefg]\s*,?\s*)+/g;for(;t=a.exec(r);){let e,i=/([0-9]+)\s*\*\s*([0-9]+)\s?([ BKM])\s*([abcdefg])\s*,?\s*/g,n=parseInt(t[1],16);for(;e=i.exec(t[0]);){let t={},i=parseInt(e[1],10),r=parseInt(e[2])*s[e[3]],a=e[4].charCodeAt(0)-97+1;t.start=n,t.sectorSize=r,t.end=n+r*i,t.readable=(1&a)!=0,t.erasable=(2&a)!=0,t.writable=(4&a)!=0,o.push(t),n+=r*i}}return{name:n,segments:o}},f.Device.prototype.dfuseCommand=async function(e,t,i){void 0===t&&void 0===i&&(t=0,i=1);let n=new ArrayBuffer(i+1),r=new DataView(n);if(r.setUint8(0,e),1==i)r.setUint8(1,t);else if(4==i)r.setUint32(1,t,!0);else throw"Don't know how to handle data of len "+i;try{await this.download(n,0)}catch(t){throw"Error during special DfuSe command "+({0:"GET_COMMANDS",33:"SET_ADDRESS",65:"ERASE_SECTOR"})[e]+":"+t}if((await this.poll_until(e=>e!=u.dfuDNBUSY)).status!=u.STATUS_OK)throw"Special DfuSe command "+commandName+" failed"},f.Device.prototype.getSegment=function(e){if(!this.memoryInfo||!this.memoryInfo.segments)throw"No memory map information available";for(let t of this.memoryInfo.segments)if(t.start<=e&&e<t.end)return t;return null},f.Device.prototype.getSectorStart=function(e,t){if(void 0===t&&(t=this.getSegment(e)),!t)throw"Address ".concat(e.toString(16)," outside of memory map");let i=Math.floor((e-t.start)/t.sectorSize);return t.start+i*t.sectorSize},f.Device.prototype.getSectorEnd=function(e,t){if(void 0===t&&(t=this.getSegment(e)),!t)throw"Address ".concat(e.toString(16)," outside of memory map");let i=Math.floor((e-t.start)/t.sectorSize);return t.start+(i+1)*t.sectorSize},f.Device.prototype.getFirstWritableSegment=function(){if(!this.memoryInfo||!this.memoryInfo.segments)throw"No memory map information available";for(let e of this.memoryInfo.segments)if(e.writable)return e;return null},f.Device.prototype.getMaxReadSize=function(e){if(!this.memoryInfo||!this.memoryInfo.segments)throw"No memory map information available";let t=0;for(let i of this.memoryInfo.segments)if(i.start<=e&&e<i.end){if(!i.readable)return 0;t+=i.end-e}else if(i.start==e+t){if(i.readable)t+=i.end-i.start;else break}return t},f.Device.prototype.erase=async function(e,t){let i=this.getSegment(e),n=this.getSectorStart(e,i),r=this.getSectorEnd(e+t-1),o=0,s=r-n;for(s>0&&this.logProgress(o,s);n<r;){if(i.end<=n&&(i=this.getSegment(n)),!i.erasable){o=Math.min(o+i.end-n,s),n=i.end,this.logProgress(o,s);continue}let e=Math.floor((n-i.start)/i.sectorSize),t=i.start+e*i.sectorSize;this.logDebug("Erasing ".concat(i.sectorSize,"B at 0x").concat(t.toString(16))),await this.dfuseCommand(f.ERASE_SECTOR,t,4),n=t+i.sectorSize,o+=i.sectorSize,this.logProgress(o,s)}},f.Device.prototype.do_download=async function(e,t,i){if(!this.memoryInfo||!this.memoryInfo.segments)throw"No memory map available";this.logInfo("Erasing DFU device memory");let n=0,r=t.byteLength,o=this.startAddress;isNaN(o)?(o=this.memoryInfo.segments[0].start,this.logWarning("Using inferred start address 0x"+o.toString(16))):null===this.getSegment(o)&&this.logError("Start address 0x".concat(o.toString(16)," outside of memory map bounds")),await this.erase(o,r),this.logInfo("Copying data from browser to DFU device");let s=o;for(;n<r;){let i;let o=Math.min(r-n,e),a=0;try{await this.dfuseCommand(f.SET_ADDRESS,s,4),this.logDebug("Set address to 0x".concat(s.toString(16))),a=await this.download(t.slice(n,n+o),2),this.logDebug("Sent "+a+" bytes"),i=await this.poll_until_idle(u.dfuDNLOAD_IDLE),s+=o}catch(e){throw"Error during DfuSe download: "+e}if(i.status!=u.STATUS_OK)throw"DFU DOWNLOAD failed state=".concat(i.state,", status=").concat(i.status);this.logDebug("Wrote "+a+" bytes"),n+=a,this.logProgress(n,r)}this.logInfo("Wrote ".concat(n," bytes")),this.logInfo("Manifesting new firmware dfuse.js");try{await this.dfuseCommand(f.SET_ADDRESS,o,4),await this.download(new ArrayBuffer,0)}catch(e){throw"Error during DfuSe manifestation: "+e}try{console.trace(),await this.poll_until(e=>e==u.dfuMANIFEST)}catch(e){this.logError(e)}},f.Device.prototype.do_upload=async function(e,t){let i=this.startAddress;return isNaN(i)?(i=this.memoryInfo.segments[0].start,this.logWarning("Using inferred start address 0x"+i.toString(16))):null===this.getSegment(i)&&this.logWarning("Start address 0x".concat(i.toString(16)," outside of memory map bounds")),this.logInfo("Reading up to 0x".concat(t.toString(16)," bytes starting at 0x").concat(i.toString(16))),await this.getState()!=u.dfuIDLE&&await this.abortToIdle(),await this.dfuseCommand(f.SET_ADDRESS,i,4),await this.abortToIdle(),await u.Device.prototype.do_upload.call(this,e,t,2)};let d=async function(e,t){if(t.some(e=>null==e.name)){let i=new u.Device(e,t[0]);await i.device_.open(),await i.device_.selectConfiguration(1);let n=await i.readInterfaceNames();for(let e of(await i.close(),t))if(null===e.name){let t=e.configuration.configurationValue,i=e.interface.interfaceNumber,r=e.alternate.alternateSetting;e.name=n[t][i][r]}}},g=function(e){},h=function(e){},p=function(e){},m=function(e){},D=function(e,t){},b=async(e,t)=>{try{await e.open()}catch(e){throw y(e),e}let i={};try{var n;i=await (n=e).readConfigurationDescriptor(0).then(e=>{let t=u.parseConfigurationDescriptor(e),i=null,r=n.settings.configuration.configurationValue;if(t.bConfigurationValue==r){for(let e of t.descriptors)if(33==e.bDescriptorType&&e.hasOwnProperty("bcdDFUVersion")){i=e;break}}return i?{WillDetach:(8&i.bmAttributes)!=0,ManifestationTolerant:(4&i.bmAttributes)!=0,CanUpload:(2&i.bmAttributes)!=0,CanDnload:(1&i.bmAttributes)!=0,TransferSize:i.wTransferSize,DetachTimeOut:i.wDetachTimeOut,DFUVersion:i.bcdDFUVersion}:{}},e=>{})}catch(e){throw y(e),e}if(i&&Object.keys(i).length>0&&(e.properties=i,i.CanDnload&&t(i.ManifestationTolerant),282==i.DFUVersion&&2==e.settings.alternate.interfaceProtocol&&(e=new f.Device(e.device_,e.settings))),e.logDebug=g,e.logInfo=h,e.logWarning=p,e.logError=m,e.logProgress=D,e.memoryInfo){let t=e.getFirstWritableSegment();t&&(2415919104===t.start&&(t.start+=262144),e.startAddress=t.start)}return e},y=()=>{console.log("DISCONNECTED")},v=async(e,t,i)=>{e&&(e.close().then(y),e=null),navigator.usb.requestDevice({filters:[]}).then(async e=>{let n=u.findDeviceDfuInterfaces(e);if(0==n.length)statusDisplay.textContent="The selected device does not have any USB DFU interfaces.";else if(1==n.length)await d(e,n),t(await b(new u.Device(e,n[0]),i));else{async function r(){let r=n.filter(e=>e.name.includes("0x08000000"));0===r.length?(console.log("No interace with flash address 0x08000000 found."),statusDisplay.textContent="The selected device does not have a Flash Memory sectiona at address 0x08000000."):t(await b(new u.Device(e,r[0]),i))}await d(e,n),await r()}}).catch(e=>{console.log(e)})},S=async(e,t,i,n)=>{if(console.log("PROGRAM"),e&&null!=i){try{(await e.getStatus()).state==u.dfuERROR&&await e.clearStatus()}catch(t){e.logWarning("Failed to clear status")}await e.do_download(1024,i,n).then(()=>{console.log("PROGRAM DONE"),n||e.waitDisconnected(5e3).then(e=>{y(),t(null)},e=>{console.log("Device unexpectedly tolerated manifestation.")})},e=>{console.log("PROGRAM ERROR"),console.log(e)})}};function w(){let[e,t]=(0,r.useState)(""),[i,s]=(0,r.useState)("");a(e=>e.firmwareBinFile);let c=a(e=>e.device);a(e=>e.manifestationTolerant);let u=e=>{a.setState({device:e})},f=e=>{a.setState({manifestationTolerant:e})},d=async()=>{await v(c,u,f)};return(0,r.useEffect)(()=>{fetch(o("instructions.md")).then(e=>e.text()).then(e=>{s(e)}).catch(e=>{console.error("Error fetching instructions:",e)})},[]),(0,n.jsx)("div",{className:"card bg-white text-primary-content w-full",children:(0,n.jsxs)("div",{className:"card-body",children:[(0,n.jsx)("h2",{className:"card-title",children:"Connect Device"}),(0,n.jsx)("article",{className:"prose text-primary-content",children:(0,n.jsx)("div",{dangerouslySetInnerHTML:{__html:(0,l.TU)(i)}})}),(0,n.jsx)("div",{className:"card-actions justify-end",children:(0,n.jsx)("button",{className:"".concat(c&&"btn-disabled"," btn-primary btn btn-outline"),onClick:d,children:c?"Device Connected":"Connect to Device"})})]})})}function T(){let[e,t]=(0,r.useState)(0),i=a(e=>e.firmwareBinFile),o=a(e=>e.device),s=a(e=>e.manifestationTolerant),c=e=>{a.setState({device:e})},l=async()=>{S(o,c,i,s)};return o&&(o.logProgress=(e,i)=>{t(100*e/i),console.log(e,i)}),(0,n.jsx)("div",{className:"card bg-white text-primary-content w-full",children:(0,n.jsxs)("div",{className:"card-body",children:[(0,n.jsx)("h2",{className:"card-title",children:"Update Device"}),(0,n.jsx)("progress",{className:"progress progress-primary w-full",value:e,max:"100"}),(0,n.jsx)("div",{className:"card-actions justify-end",children:(0,n.jsx)("button",{className:"".concat(i&&o?"":"btn-disabled"," btn-primary btn btn-outline"),onClick:l,children:"Update Device"})})]})})}function E(){return(0,n.jsx)("div",{className:"flex flex-col items-center min-h-screen py-8 font-mono",children:(0,n.jsxs)("div",{className:"items-center grid gap-6 w-3/5",children:[(0,n.jsx)(s,{}),(0,n.jsx)(c,{}),(0,n.jsx)(w,{}),(0,n.jsx)(T,{})]})})}}},function(e){e.O(0,[604,971,23,744],function(){return e(e.s=747)}),_N_E=e.O()}]);