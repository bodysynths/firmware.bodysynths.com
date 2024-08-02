(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{7471:function(e,t,n){Promise.resolve().then(n.bind(n,6576))},6576:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return C}});var r=n(7437),i=n(2265),s=n(357);let a=e=>{let t=s.env.NEXT_PUBLIC_BASE_PATH||"";return"".concat(t,"/").concat(e)};function o(){return(0,r.jsxs)("div",{className:"card text-white w-full items-center ",children:[(0,r.jsx)("a",{href:"https://bodysynths.com/",children:(0,r.jsx)("img",{className:"w-full",src:a("header.png"),alt:"Body Synths Logo"})}),(0,r.jsx)("div",{children:"Firmware Update Utility"})]})}let c=(0,n(9099).Ue)(e=>({releases:[],instrument:"",device:null,firmwareBinFile:null,manifestationTolerant:!1,firmwareName:"",errorModal:!1,errorMsg:"",setErrorModal:t=>e({errorModal:t}),setErrorMsg:t=>e({errorModal:!0,errorMsg:t})}));function l(e){let{options:t,onSelect:n,curOption:s,title:a}=e,[o,c]=(0,i.useState)(!1),l=e=>{n(e),c(!1)},d=e=>{c(!1),l(e)};return(0,r.jsxs)("div",{className:"dropdown space-y-1 w-full",children:[(0,r.jsx)("button",{className:"btn w-full",onClick:()=>c(!o),children:a}),o&&(0,r.jsx)("ul",{className:"menu dropdown-content bg-white rounded-box z-[1] p-2 space-y-2 w-full shadow",children:t.map((e,t)=>(0,r.jsx)("li",{children:(0,r.jsx)("button",{className:"btn",onClick:()=>d(e),children:e})},t))})]})}function d(){let[e,t]=(0,i.useState)(""),{instrument:n,setErrorMsg:s}=c();return(0,i.useEffect)(()=>{fetch(a("releases.json")).then(e=>e.json()).then(e=>{let n=e.data.sort((e,t)=>new Date(t.date)-new Date(e.date));c.setState({releases:n});let r=n.map(e=>e.instrument);r.length>0&&c.setState({instrument:r[0]}),t([...new Set(r)])}).catch(e=>{s("Error fetching releases: ".concat(e))})},[]),(0,r.jsx)("div",{className:"card bg-white text-primary-content w-full",children:(0,r.jsxs)("div",{className:"card-body space-y-2",children:[(0,r.jsx)("h2",{className:"card-title",children:"Instrument"}),(0,r.jsx)("div",{className:"card-actions ",children:(0,r.jsx)(l,{options:e,onSelect:e=>{c.setState({instrument:e})},curOption:n,title:"Select Instrument"})}),(0,r.jsxs)("div",{children:["Selected Instrument: ",(0,r.jsx)("span",{className:"font-bold",children:n||"None"})]})]})})}function u(e){let{idx:t,firmVer:n,selectedRelease:i,setSelectedRelease:s}=e,a=new Date(n.date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});return(0,r.jsxs)("div",{className:"collapse collapse-plus bg-white outline",children:[(0,r.jsx)("input",{type:"radio",name:"my-accordion-3",defaultChecked:0==t}),(0,r.jsxs)("div",{className:"collapse-title",children:[(0,r.jsx)("span",{className:"font-bold",children:n.title})," (".concat(a,")")]}),(0,r.jsxs)("div",{className:"collapse-content space-y-4",children:[(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("div",{children:" Release Notes:"}),(0,r.jsx)("ul",{className:"list-disc pl-5 space-y-2",children:n.release_notes.map((e,t)=>(0,r.jsx)("li",{children:e},t))})]}),(0,r.jsx)("div",{children:(0,r.jsx)("button",{className:"".concat(i!=t?"":"btn-disabled"," btn"),onClick:()=>s(t),children:i!=t?"Select This Version":"This Version is Selected"})})]})]})}function f(){let[e,t]=(0,i.useState)([]),[n,s]=(0,i.useState)(""),{releases:o,instrument:l,setErrorMsg:d}=c(),f="number"==typeof n;(0,i.useEffect)(()=>{e.length>0&&!f&&s(0)},[e]),(0,i.useEffect)(()=>{t(o.filter(e=>e.instrument===l))},[l]),(0,i.useEffect)(()=>{if(!f){c.setState({firmwareBinFile:null}),c.setState({firmwareName:null});return}let t=e[n].file,r=e[n].title;fetch(a("firmware/".concat(t,".bin"))).then(e=>{if(!e.ok)throw Error("HTTP error! status: ".concat(e.status));return e.arrayBuffer()}).then(e=>{c.setState({firmwareBinFile:new Uint8Array(e)}),c.setState({firmwareName:r})}).catch(e=>{d("Error fetching firmware file: ".concat(e))})},[n]);let h=f?e[n]:null;return(0,r.jsx)("div",{className:"card bg-white text-primary-content w-full",children:(0,r.jsxs)("div",{className:"card-body space-y-2",children:[(0,r.jsx)("h2",{className:"card-title",children:"Firmware Version"}),(0,r.jsx)("div",{className:"space-y-2",children:e.map((e,t)=>(0,r.jsx)(u,{idx:t,firmVer:e,selectedRelease:n,setSelectedRelease:s},t))}),(0,r.jsxs)("div",{children:["Selected Firmware Version: ",(0,r.jsx)("span",{className:"font-bold",children:h?h.title:"None"})]})]})})}var h=n(2266);let g={};g.DETACH=0,g.DNLOAD=1,g.UPLOAD=2,g.GETSTATUS=3,g.CLRSTATUS=4,g.GETSTATE=5,g.ABORT=6,g.appIDLE=0,g.appDETACH=1,g.dfuIDLE=2,g.dfuDNLOAD_SYNC=3,g.dfuDNBUSY=4,g.dfuDNLOAD_IDLE=5,g.dfuMANIFEST_SYNC=6,g.dfuMANIFEST=7,g.dfuMANIFEST_WAIT_RESET=8,g.dfuUPLOAD_IDLE=9,g.dfuERROR=10,g.STATUS_OK=0,g.Device=function(e,t){this.device_=e,this.settings=t,this.intfNumber=t.interface.interfaceNumber},g.findDeviceDfuInterfaces=function(e){let t=[];for(let n of e.configurations)for(let e of n.interfaces)for(let r of e.alternates)if(254==r.interfaceClass&&1==r.interfaceSubclass&&(1==r.interfaceProtocol||2==r.interfaceProtocol)){let i={configuration:n,interface:e,alternate:r,name:r.interfaceName};t.push(i)}return t},g.findAllDfuInterfaces=function(){return navigator.usb.getDevices().then(e=>{let t=[];for(let n of e)for(let e of g.findDeviceDfuInterfaces(n))t.push(new g.Device(n,e));return t})},g.Device.prototype.logDebug=function(e){console.log("logdebug: ",e)},g.Device.prototype.logInfo=function(e){console.log("logInfo: ",e)},g.Device.prototype.logWarning=function(e){console.log("logWarning: ",e)},g.Device.prototype.logError=function(e){console.log("logError: ",e)},g.Device.prototype.logProgress=function(e,t){void 0===t?console.log(e):console.log(e+"/"+t)},g.Device.prototype.open=async function(){await this.device_.open();let e=this.settings.configuration.configurationValue;(null===this.device_.configuration||this.device_.configuration.configurationValue!=e)&&await this.device_.selectConfiguration(e);let t=this.settings.interface.interfaceNumber;this.device_.configuration.interfaces[t].claimed||await this.device_.claimInterface(t);let n=this.settings.alternate.alternateSetting,r=this.device_.configuration.interfaces[t];(null===r.alternate||r.alternate.alternateSetting!=n)&&await this.device_.selectAlternateInterface(t,n)},g.Device.prototype.close=async function(){try{await this.device_.close()}catch(e){console.log(e)}},g.Device.prototype.readDeviceDescriptor=function(){return this.device_.controlTransferIn({requestType:"standard",recipient:"device",request:6,value:256,index:0},18).then(e=>"ok"==e.status?Promise.resolve(e.data):Promise.reject(e.status))},g.Device.prototype.readStringDescriptor=async function(e,t){void 0===t&&(t=0);let n={requestType:"standard",recipient:"device",request:6,value:768|e,index:t};var r=await this.device_.controlTransferIn(n,1);if("ok"==r.status){let e=r.data.getUint8(0);if("ok"==(r=await this.device_.controlTransferIn(n,e)).status){let n=(e-2)/2,i=[];for(let e=0;e<n;e++)i.push(r.data.getUint16(2+2*e,!0));return 0==t?i:String.fromCharCode.apply(String,i)}}throw"Failed to read string descriptor ".concat(e,": ").concat(r.status)},g.Device.prototype.readInterfaceNames=async function(){let e={},t=new Set;for(let n=0;n<this.device_.configurations.length;n++){let r=await this.readConfigurationDescriptor(n),i=g.parseConfigurationDescriptor(r),s=i.bConfigurationValue;for(let n of(e[s]={},i.descriptors))4==n.bDescriptorType&&(n.bInterfaceNumber in e[s]||(e[s][n.bInterfaceNumber]={}),e[s][n.bInterfaceNumber][n.bAlternateSetting]=n.iInterface,n.iInterface>0&&t.add(n.iInterface))}let n={};for(let e of t)try{n[e]=await this.readStringDescriptor(e,1033)}catch(t){console.log(t),n[e]=null}for(let t in e)for(let r in e[t])for(let i in e[t][r]){let s=e[t][r][i];e[t][r][i]=n[s]}return e},g.parseDeviceDescriptor=function(e){return{bLength:e.getUint8(0),bDescriptorType:e.getUint8(1),bcdUSB:e.getUint16(2,!0),bDeviceClass:e.getUint8(4),bDeviceSubClass:e.getUint8(5),bDeviceProtocol:e.getUint8(6),bMaxPacketSize:e.getUint8(7),idVendor:e.getUint16(8,!0),idProduct:e.getUint16(10,!0),bcdDevice:e.getUint16(12,!0),iManufacturer:e.getUint8(14),iProduct:e.getUint8(15),iSerialNumber:e.getUint8(16),bNumConfigurations:e.getUint8(17)}},g.parseConfigurationDescriptor=function(e){let t=new DataView(e.buffer.slice(9)),n=g.parseSubDescriptors(t);return{bLength:e.getUint8(0),bDescriptorType:e.getUint8(1),wTotalLength:e.getUint16(2,!0),bNumInterfaces:e.getUint8(4),bConfigurationValue:e.getUint8(5),iConfiguration:e.getUint8(6),bmAttributes:e.getUint8(7),bMaxPower:e.getUint8(8),descriptors:n}},g.parseInterfaceDescriptor=function(e){return{bLength:e.getUint8(0),bDescriptorType:e.getUint8(1),bInterfaceNumber:e.getUint8(2),bAlternateSetting:e.getUint8(3),bNumEndpoints:e.getUint8(4),bInterfaceClass:e.getUint8(5),bInterfaceSubClass:e.getUint8(6),bInterfaceProtocol:e.getUint8(7),iInterface:e.getUint8(8),descriptors:[]}},g.parseFunctionalDescriptor=function(e){return{bLength:e.getUint8(0),bDescriptorType:e.getUint8(1),bmAttributes:e.getUint8(2),wDetachTimeOut:e.getUint16(3,!0),wTransferSize:e.getUint16(5,!0),bcdDFUVersion:e.getUint16(7,!0)}},g.parseSubDescriptors=function(e){let t;let n=e,r=[],i=!1;for(;n.byteLength>2;){let e=n.getUint8(0),s=n.getUint8(1),a=new DataView(n.buffer.slice(0,e));if(4==s)i=254==(t=g.parseInterfaceDescriptor(a)).bInterfaceClass&&1==t.bInterfaceSubClass,r.push(t);else if(i&&33==s){let e=g.parseFunctionalDescriptor(a);r.push(e),t.descriptors.push(e)}else{let n={bLength:e,bDescriptorType:s,data:a};r.push(n),t&&t.descriptors.push(n)}n=new DataView(n.buffer.slice(e))}return r},g.Device.prototype.readConfigurationDescriptor=function(e){let t=512|e;return this.device_.controlTransferIn({requestType:"standard",recipient:"device",request:6,value:t,index:0},4).then(e=>{if("ok"!=e.status)return Promise.reject(e.status);{let n=e.data.getUint16(2,!0);return this.device_.controlTransferIn({requestType:"standard",recipient:"device",request:6,value:t,index:0},n)}}).then(e=>"ok"==e.status?Promise.resolve(e.data):Promise.reject(e.status))},g.Device.prototype.requestOut=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return this.device_.controlTransferOut({requestType:"class",recipient:"interface",request:e,value:n,index:this.intfNumber},t).then(e=>"ok"==e.status?Promise.resolve(e.bytesWritten):Promise.reject(e.status),e=>Promise.reject("ControlTransferOut failed: "+e))},g.Device.prototype.requestIn=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return this.device_.controlTransferIn({requestType:"class",recipient:"interface",request:e,value:n,index:this.intfNumber},t).then(e=>"ok"==e.status?Promise.resolve(e.data):Promise.reject(e.status),e=>Promise.reject("ControlTransferIn failed: "+e))},g.Device.prototype.detach=function(){return this.requestOut(g.DETACH,void 0,1e3)},g.Device.prototype.waitDisconnected=async function(e){let t=this,n=this.device_;return new Promise(function(r,i){let s;e>0&&(s=setTimeout(i,e)),navigator.usb.addEventListener("disconnect",function i(a){a.device===n&&(e>0&&clearTimeout(s),t.disconnected=!0,navigator.usb.removeEventListener("disconnect",i),a.stopPropagation(),r(t))})})},g.Device.prototype.download=function(e,t){return this.requestOut(g.DNLOAD,e,t)},g.Device.prototype.dnload=g.Device.prototype.download,g.Device.prototype.upload=function(e,t){return this.requestIn(g.UPLOAD,e,t)},g.Device.prototype.clearStatus=function(){return this.requestOut(g.CLRSTATUS)},g.Device.prototype.clrStatus=g.Device.prototype.clearStatus,g.Device.prototype.getStatus=function(){return this.requestIn(g.GETSTATUS,6).then(e=>Promise.resolve({status:e.getUint8(0),pollTimeout:16777215&e.getUint32(1,!0),state:e.getUint8(4)}),e=>Promise.reject("DFU GETSTATUS failed: "+e))},g.Device.prototype.getState=function(){return this.requestIn(g.GETSTATE,1).then(e=>Promise.resolve(e.getUint8(0)),e=>Promise.reject("DFU GETSTATE failed: "+e))},g.Device.prototype.abort=function(){return this.requestOut(g.ABORT)},g.Device.prototype.abortToIdle=async function(){await this.abort();let e=await this.getState();if(e==g.dfuERROR&&(await this.clearStatus(),e=await this.getState()),e!=g.dfuIDLE)throw"Failed to return to idle state after abort: state "+e.state},g.Device.prototype.do_upload=async function(e){let t,n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1/0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=i,a=[],o=0;this.logInfo("Copying data from DFU device to browser"),this.logProgress(0);do n=Math.min(e,r-o),t=await this.upload(n,s++),this.logDebug("Read "+t.byteLength+" bytes"),t.byteLength>0&&(a.push(t),o+=t.byteLength),Number.isFinite(r)?this.logProgress(o,r):this.logProgress(o);while(o<r&&t.byteLength==n);return o==r&&await this.abortToIdle(),this.logInfo("Read ".concat(o," bytes")),new Blob(a,{type:"application/octet-stream"})},g.Device.prototype.poll_until=async function(e){let t=await this.getStatus(),n=this;for(;!e(t.state)&&t.state!=g.dfuERROR;)await function(e){return new Promise(function(t,r){n.logDebug("Sleeping for "+e+"ms"),setTimeout(t,e)})}(t.pollTimeout),t=await this.getStatus();return t},g.Device.prototype.poll_until_idle=function(e){return this.poll_until(t=>t==e)},g.Device.prototype.do_download=async function(e,t,n){let r=0,i=t.byteLength,s=0;for(this.logInfo("Copying data from browser to DFU device"),this.logProgress(r,i);r<i;){let n;let a=Math.min(i-r,e),o=0;try{o=await this.download(t.slice(r,r+a),s++),this.logDebug("Sent "+o+" bytes"),n=await this.poll_until_idle(g.dfuDNLOAD_IDLE)}catch(e){throw"Error during DFU download: "+e}if(n.status!=g.STATUS_OK)throw"DFU DOWNLOAD failed state=".concat(n.state,", status=").concat(n.status);this.logDebug("Wrote "+o+" bytes"),r+=o,this.logProgress(r,i)}this.logDebug("Sending empty block");try{await this.download(new ArrayBuffer([]),s++)}catch(e){throw"Error during final DFU download: "+e}if(this.logInfo("Wrote "+r+" bytes"),this.logInfo("Manifesting new firmware dfu.js"),n){let e;try{if((e=await this.poll_until(e=>e==g.dfuIDLE||e==g.dfuMANIFEST_WAIT_RESET)).state==g.dfuMANIFEST_WAIT_RESET&&this.logDebug("Device transitioned to MANIFEST_WAIT_RESET even though it is manifestation tolerant"),e.status!=g.STATUS_OK)throw"DFU MANIFEST failed state=".concat(e.state,", status=").concat(e.status)}catch(e){if(e.endsWith("ControlTransferIn failed: NotFoundError: Device unavailable.")||e.endsWith("ControlTransferIn failed: NotFoundError: The device was disconnected."))this.logWarning("Unable to poll final manifestation status");else throw"Error during DFU manifest: "+e}}else try{let e=await this.getStatus();this.logDebug("Final DFU status: state=".concat(e.state,", status=").concat(e.status))}catch(e){this.logDebug("Manifest GET_STATUS poll error: "+e)}try{await this.device_.reset()}catch(e){if("NetworkError: Unable to reset the device."==e||"NotFoundError: Device unavailable."==e||"NotFoundError: The device was disconnected."==e)this.logDebug("Ignored reset error");else throw"Error during reset for manifestation: "+e}};let m={};m.GET_COMMANDS=0,m.SET_ADDRESS=33,m.ERASE_SECTOR=65,m.Device=function(e,t){g.Device.call(this,e,t),this.memoryInfo=null,this.startAddress=NaN,t.name&&(this.memoryInfo=m.parseMemoryDescriptor(t.name))},m.Device.prototype=Object.create(g.Device.prototype),m.Device.prototype.constructor=m.Device,m.parseMemoryDescriptor=function(e){let t;let n=e.indexOf("/");if(!e.startsWith("@")||-1==n)throw'Not a DfuSe memory descriptor: "'.concat(e,'"');let r=e.substring(1,n).trim(),i=e.substring(n),s=[],a={" ":1,B:1,K:1024,M:1048576},o=/\/\s*(0x[0-9a-fA-F]{1,8})\s*\/(\s*[0-9]+\s*\*\s*[0-9]+\s?[ BKM]\s*[abcdefg]\s*,?\s*)+/g;for(;t=o.exec(i);){let e,n=/([0-9]+)\s*\*\s*([0-9]+)\s?([ BKM])\s*([abcdefg])\s*,?\s*/g,r=parseInt(t[1],16);for(;e=n.exec(t[0]);){let t={},n=parseInt(e[1],10),i=parseInt(e[2])*a[e[3]],o=e[4].charCodeAt(0)-97+1;t.start=r,t.sectorSize=i,t.end=r+i*n,t.readable=(1&o)!=0,t.erasable=(2&o)!=0,t.writable=(4&o)!=0,s.push(t),r+=i*n}}return{name:r,segments:s}},m.Device.prototype.dfuseCommand=async function(e,t,n){void 0===t&&void 0===n&&(t=0,n=1);let r=new ArrayBuffer(n+1),i=new DataView(r);if(i.setUint8(0,e),1==n)i.setUint8(1,t);else if(4==n)i.setUint32(1,t,!0);else throw"Don't know how to handle data of len "+n;try{await this.download(r,0)}catch(t){throw"Error during special DfuSe command "+({0:"GET_COMMANDS",33:"SET_ADDRESS",65:"ERASE_SECTOR"})[e]+":"+t}if((await this.poll_until(e=>e!=g.dfuDNBUSY)).status!=g.STATUS_OK)throw"Special DfuSe command "+commandName+" failed"},m.Device.prototype.getSegment=function(e){if(!this.memoryInfo||!this.memoryInfo.segments)throw"No memory map information available";for(let t of this.memoryInfo.segments)if(t.start<=e&&e<t.end)return t;return null},m.Device.prototype.getSectorStart=function(e,t){if(void 0===t&&(t=this.getSegment(e)),!t)throw"Address ".concat(e.toString(16)," outside of memory map");let n=Math.floor((e-t.start)/t.sectorSize);return t.start+n*t.sectorSize},m.Device.prototype.getSectorEnd=function(e,t){if(void 0===t&&(t=this.getSegment(e)),!t)throw"Address ".concat(e.toString(16)," outside of memory map");let n=Math.floor((e-t.start)/t.sectorSize);return t.start+(n+1)*t.sectorSize},m.Device.prototype.getFirstWritableSegment=function(){if(!this.memoryInfo||!this.memoryInfo.segments)throw"No memory map information available";for(let e of this.memoryInfo.segments)if(e.writable)return e;return null},m.Device.prototype.getMaxReadSize=function(e){if(!this.memoryInfo||!this.memoryInfo.segments)throw"No memory map information available";let t=0;for(let n of this.memoryInfo.segments)if(n.start<=e&&e<n.end){if(!n.readable)return 0;t+=n.end-e}else if(n.start==e+t){if(n.readable)t+=n.end-n.start;else break}return t},m.Device.prototype.erase=async function(e,t){let n=this.getSegment(e),r=this.getSectorStart(e,n),i=this.getSectorEnd(e+t-1),s=0,a=i-r;for(a>0&&this.logProgress(s,a);r<i;){if(n.end<=r&&(n=this.getSegment(r)),!n.erasable){s=Math.min(s+n.end-r,a),r=n.end,this.logProgress(s,a);continue}let e=Math.floor((r-n.start)/n.sectorSize),t=n.start+e*n.sectorSize;this.logDebug("Erasing ".concat(n.sectorSize,"B at 0x").concat(t.toString(16))),await this.dfuseCommand(m.ERASE_SECTOR,t,4),r=t+n.sectorSize,s+=n.sectorSize,this.logProgress(s,a)}},m.Device.prototype.do_download=async function(e,t,n){if(!this.memoryInfo||!this.memoryInfo.segments)throw"No memory map available";this.logInfo("Erasing DFU device memory");let r=0,i=t.byteLength,s=this.startAddress;isNaN(s)?(s=this.memoryInfo.segments[0].start,this.logWarning("Using inferred start address 0x"+s.toString(16))):null===this.getSegment(s)&&this.logError("Start address 0x".concat(s.toString(16)," outside of memory map bounds")),await this.erase(s,i),this.logInfo("Copying data from browser to DFU device");let a=s;for(;r<i;){let n;let s=Math.min(i-r,e),o=0;try{await this.dfuseCommand(m.SET_ADDRESS,a,4),this.logDebug("Set address to 0x".concat(a.toString(16))),o=await this.download(t.slice(r,r+s),2),this.logDebug("Sent "+o+" bytes"),n=await this.poll_until_idle(g.dfuDNLOAD_IDLE),a+=s}catch(e){throw"Error during DfuSe download: "+e}if(n.status!=g.STATUS_OK)throw"DFU DOWNLOAD failed state=".concat(n.state,", status=").concat(n.status);this.logDebug("Wrote "+o+" bytes"),r+=o,this.logProgress(r,i)}this.logInfo("Wrote ".concat(r," bytes")),this.logInfo("Manifesting new firmware dfuse.js");try{await this.dfuseCommand(m.SET_ADDRESS,s,4),await this.download(new ArrayBuffer,0)}catch(e){throw"Error during DfuSe manifestation: "+e}try{await this.poll_until(e=>e==g.dfuMANIFEST)}catch(e){}},m.Device.prototype.do_upload=async function(e,t){let n=this.startAddress;return isNaN(n)?(n=this.memoryInfo.segments[0].start,this.logWarning("Using inferred start address 0x"+n.toString(16))):null===this.getSegment(n)&&this.logWarning("Start address 0x".concat(n.toString(16)," outside of memory map bounds")),this.logInfo("Reading up to 0x".concat(t.toString(16)," bytes starting at 0x").concat(n.toString(16))),await this.getState()!=g.dfuIDLE&&await this.abortToIdle(),await this.dfuseCommand(m.SET_ADDRESS,n,4),await this.abortToIdle(),await g.Device.prototype.do_upload.call(this,e,t,2)};let p=async function(e,t){if(t.some(e=>null==e.name)){let n=new g.Device(e,t[0]);await n.device_.open(),await n.device_.selectConfiguration(1);let r=await n.readInterfaceNames();for(let e of(await n.close(),t))if(null===e.name){let t=e.configuration.configurationValue,n=e.interface.interfaceNumber,i=e.alternate.alternateSetting;e.name=r[t][n][i]}}},b=function(e){},y=function(e){},w=function(e){},v=function(e){},D=function(e,t){},S=async(e,t)=>{try{await e.open()}catch(e){throw x(e),e}let n={};try{var r;n=await (r=e).readConfigurationDescriptor(0).then(e=>{let t=g.parseConfigurationDescriptor(e),n=null,i=r.settings.configuration.configurationValue;if(t.bConfigurationValue==i){for(let e of t.descriptors)if(33==e.bDescriptorType&&e.hasOwnProperty("bcdDFUVersion")){n=e;break}}return n?{WillDetach:(8&n.bmAttributes)!=0,ManifestationTolerant:(4&n.bmAttributes)!=0,CanUpload:(2&n.bmAttributes)!=0,CanDnload:(1&n.bmAttributes)!=0,TransferSize:n.wTransferSize,DetachTimeOut:n.wDetachTimeOut,DFUVersion:n.bcdDFUVersion}:{}},e=>{})}catch(e){throw x(e),e}if(n&&Object.keys(n).length>0&&(e.properties=n,n.CanDnload&&t(n.ManifestationTolerant),282==n.DFUVersion&&2==e.settings.alternate.interfaceProtocol&&(e=new m.Device(e.device_,e.settings))),e.logDebug=b,e.logInfo=y,e.logWarning=w,e.logError=v,e.logProgress=D,e.memoryInfo){let t=e.getFirstWritableSegment();t&&(2415919104===t.start&&(t.start+=262144),e.startAddress=t.start)}return e},x=()=>{},N=async function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:e=>{console.log(e)},i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[];e&&(e.close().then(x),e=null),navigator.usb.requestDevice({filters:i}).then(async e=>{let i=g.findDeviceDfuInterfaces(e);if(0==i.length)statusDisplay.textContent="The selected device does not have any USB DFU interfaces.";else if(1==i.length)await p(e,i),t(await S(new g.Device(e,i[0]),n));else{async function s(){let s=i.filter(e=>e.name.includes("0x08000000"));0===s.length?(r("No interace with flash address 0x08000000 found."),statusDisplay.textContent="The selected device does not have a Flash Memory sectiona at address 0x08000000."):t(await S(new g.Device(e,s[0]),n))}await p(e,i),await s()}}).catch(e=>{r(e)})},T=async(e,t,n,r,i)=>{if(e&&null!=n){try{(await e.getStatus()).state==g.dfuERROR&&await e.clearStatus()}catch(t){e.logWarning("Failed to clear status")}await e.do_download(1024,n,r).then(()=>{r||e.waitDisconnected(5e3).then(e=>{x(),t(null),i()},t=>{e.logError("Device unexpectedly tolerated manifestation.")})},t=>{e.logError(t)})}};function E(){let[e,t]=(0,i.useState)(0),[n,s]=(0,i.useState)(!0),[a,o]=(0,i.useState)(!1),{firmwareBinFile:l,device:d,manifestationTolerant:u,setErrorMsg:f,firmwareName:h}=c(),g=l&&d&&n,m=e=>{c.setState({device:e})},p=()=>{s(!0)};(0,i.useEffect)(()=>{g&&100==e&&t(0)},[d]);let b=async()=>{g&&(o(!0),T(d,m,l,u,p))};return d&&(d.logProgress=(e,n)=>{a&&e>0&&e<n&&(s(!1),o(!1)),t(100*e/n)},d.logError=e=>{o(!1),s(!0),t(0),f(e),c.setState({device:null})}),(0,r.jsxs)("button",{className:"btn ".concat(g&&!a?"":"btn-disabled","  w-full bg-black text-white border-black border relative ").concat(a||n?"":"cursor-default"),onClick:b,children:[!a&&!n&&(0,r.jsx)("progress",{className:"progress w-full absolute inset-0 h-full bg-black",style:{mixBlendMode:"difference",backgroundColor:"rgba(1,1,1,1)"},value:e,max:"100"}),a?(0,r.jsxs)(r.Fragment,{children:["Erasing Memory"," ",(0,r.jsx)("span",{className:"loading loading-spinner loading-xs"})]}):g||0==e?"Update to ".concat(h):100==e?"Finished Updating to ".concat(h):e.toFixed(0)+"%"]})}function j(){let[e,t]=(0,i.useState)(""),[n,s]=(0,i.useState)([]),{device:o,instrument:l,setErrorMsg:d}=c(),u=e=>{c.setState({device:e})},f=e=>{c.setState({manifestationTolerant:e})},g=async()=>{await N(o,u,f,d,n)};return(0,i.useEffect)(()=>{fetch(a("USBvendorID.json")).then(e=>e.json()).then(e=>{s(e.filters)}).catch(e=>{d("Error fetching vendor info: ".concat(e))}),fetch(a("instructions.md")).then(e=>e.text()).then(e=>{t(e)}).catch(e=>{d("Error fetching instructions: ".concat(e))})},[]),(0,r.jsx)("div",{className:"card bg-white text-primary-content w-full",children:(0,r.jsxs)("div",{className:"card-body space-y-2",children:[(0,r.jsx)("h2",{className:"card-title",children:"Connect Device"}),(0,r.jsx)("article",{className:"prose text-primary-content max-w-none w-full",children:(0,r.jsx)("div",{dangerouslySetInnerHTML:{__html:(0,h.TU)(e)}})}),(0,r.jsx)("div",{className:"card-actions",children:(0,r.jsx)("button",{className:"".concat(o&&"btn-disabled"," btn w-full"),onClick:g,children:o?"".concat(l," Connected"):"Connect to ".concat(l)})}),(0,r.jsx)("div",{className:"card-actions justify-center flex items-center",children:(0,r.jsx)(E,{})})]})})}var U=()=>(0,r.jsxs)(r.Fragment,{children:[" ",(0,r.jsx)("a",{className:"link",href:"https://bodysynths.com/pages/contact",children:"here"})," "]});function I(){let[e,t]=(0,i.useState)(""),{setErrorMsg:n}=c();return(0,i.useEffect)(()=>{fetch(a("windows.md")).then(e=>e.text()).then(e=>{t(e)}).catch(e=>{n("Error fetching Windows Help: ".concat(e))})},[]),(0,r.jsx)("div",{className:"card bg-white text-primary-content w-full",children:(0,r.jsxs)("div",{className:"card-body space-y-2",children:[(0,r.jsx)("h2",{className:"card-title",children:"Help"}),(0,r.jsxs)("details",{className:"collapse collapse-arrow outline",children:[(0,r.jsx)("summary",{className:"collapse-title font-medium",children:"Windows"}),(0,r.jsx)("div",{className:"collapse-content",children:(0,r.jsx)("article",{className:"prose text-primary-content max-w-none",children:(0,r.jsx)("div",{dangerouslySetInnerHTML:{__html:(0,h.TU)(e)}})})})]}),(0,r.jsxs)("details",{className:"collapse collapse-arrow outline",children:[(0,r.jsx)("summary",{className:"collapse-title font-medium",children:"Contact"}),(0,r.jsx)("div",{className:"collapse-content",children:(0,r.jsxs)("p",{children:["If you have further questions please contact us ",(0,r.jsx)(U,{}),"."]})})]})]})})}var _=()=>{let{errorModal:e,setErrorModal:t,errorMsg:n}=c();return e?(0,r.jsx)("div",{className:"fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50",children:(0,r.jsx)("div",{className:"modal modal-open",children:(0,r.jsxs)("div",{className:"modal-box text-primary-content bg-black text-white space-y-4",children:[(0,r.jsx)("div",{className:"bg-opacity-0 justify-end flex",children:(0,r.jsx)("button",{onClick:()=>t(!1),children:(0,r.jsx)("svg",{className:"swap-on fill-current",xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 512 512",children:(0,r.jsx)("polygon",{points:"400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"})})})}),(0,r.jsx)("div",{className:"card bg-white text-primary-content w-full",children:(0,r.jsxs)("div",{className:"card-body space-y-2",children:[(0,r.jsx)("h2",{className:"card-title",children:"Error"}),(0,r.jsxs)("p",{children:["Something went wrong. Please contact us",(0,r.jsx)(U,{}),"if the issue persists."]})]})}),(0,r.jsx)("div",{className:"card bg-white text-primary-content w-full",children:(0,r.jsxs)("div",{className:"card-body space-y-2",children:[(0,r.jsx)("h2",{className:"card-title",children:"Error Message"}),(0,r.jsx)("div",{children:n.length>0?n:"None"})]})})]})})}):null};function A(){return(0,r.jsx)("div",{className:"card bg-white text-primary-content w-full",children:(0,r.jsxs)("div",{className:"card-body space-y-2",children:[(0,r.jsx)("h2",{className:"card-title",children:"Browser Error"}),(0,r.jsx)("div",{children:"This browser does not support Web USB."}),(0,r.jsx)("div",{children:"Please Use Chrome Broswer"})]})})}function C(){let[e,t]=(0,i.useState)(null),{setErrorMsg:n}=c();return(0,i.useEffect)(()=>{let e="usb"in navigator;t(e),e||n("This browser does not support WebUSB. Please use Chrome Browser.")},[]),(0,r.jsx)("div",{className:"flex flex-col items-center min-h-screen py-8 font-mono",children:(0,r.jsxs)("div",{className:"items-center grid gap-6 w-full md:w-4/5 lg:w-7/10 xl:w-3/5 rounded-none",children:[(0,r.jsx)(o,{}),e?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(d,{}),(0,r.jsx)(f,{}),(0,r.jsx)(j,{}),(0,r.jsx)(I,{})]}):(0,r.jsx)(A,{}),(0,r.jsx)(_,{})]})})}}},function(e){e.O(0,[113,971,23,744],function(){return e(e.s=7471)}),_N_E=e.O()}]);