(this.webpackJsonpwebcrypto=this.webpackJsonpwebcrypto||[]).push([[0],{22:function(e,t,n){"use strict";function r(e,t){var n=new Blob([e],{type:"text/plain"}),r=document.createElement("a");r.href=URL.createObjectURL(n),r.download=t,r.click(),r.remove()}function a(e){navigator.clipboard&&navigator.clipboard.writeText(e)}n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return a}))},48:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return b}));var r=n(11),a=n(4),c=n(0),i=n(81),l=n(39),o=n(52),u=n(83),s=n(76),d=n(80),p=n(82),j=n(22);function b(t){var n=Object(c.useState)(""),b=Object(r.a)(n,2),f=b[0],h=b[1],O=Object(c.useState)(""),y=Object(r.a)(O,2),x=y[0],v=y[1],w=Object(c.useState)(""),m=Object(r.a)(w,2),k=m[0],g=m[1],E=Object(c.useState)(!1),P=Object(r.a)(E,2),C=P[0],K=P[1];return Object(c.useEffect)((function(){v(C?"Invalid input or key":"")}),[C]),Object(a.jsx)(s.a,{variant:"outlined",children:Object(a.jsx)(d.a,{children:Object(a.jsxs)(l.a,{className:"vspacing",children:[Object(a.jsxs)(i.a,{variant:"h5",component:"h2",title:null!==t.keyPair?"Ready to decrypt":"Not ready to decrypt: Key is not set",children:["\ud83d\udd13Decrypt",null!==t.keyPair?" \ud83d\udfe2":" \ud83d\udfe0"]}),Object(a.jsx)(l.a,{children:Object(a.jsx)(o.a,{multiline:!0,spellCheck:!1,rows:3,onChange:function(n){var r=null===n||void 0===n?void 0:n.target.value;h(r);var a=t.keyPair;if(""===r)return g(""),void K(!1);null!==a&&window.crypto.subtle.decrypt("RSA-OAEP",a.privateKey,e.from(r,"base64")).then((function(e){var t=new TextDecoder("utf-8").decode(new Uint8Array(e));g(t),K(!1)})).catch((function(e){console.log(e.name),g(""),K(!0)}))},variant:"outlined",fullWidth:!0,label:"Encrypted Text",error:C,helperText:x,children:f})}),Object(a.jsx)(l.a,{children:Object(a.jsx)(o.a,{disabled:!0,multiline:!0,spellCheck:!1,rows:2,variant:"filled",fullWidth:!0,label:"Decrypted text",InputProps:{readOnly:!0},value:k||""})}),Object(a.jsx)(l.a,{display:"flex",justifyContent:"flex-end",children:Object(a.jsx)(p.a,{children:Object(a.jsx)(u.a,{title:"Copy decrypted text",disabled:""===k,onClick:function(e){return Object(j.b)(k)},variant:"outlined",children:"Copy"})})})]})})})}}).call(this,n(70).Buffer)},65:function(e,t,n){},75:function(e,t,n){"use strict";n.r(t);var r=n(4),a=n(0),c=n.n(a),i=n(9),l=n.n(i),o=(n(65),n(11)),u=n(81),s=n(114),d=n(111),p=n(49),j=n(112),b=n(113),f=n(13),h=n.n(f),O=n(20),y=n(39),x=n(52),v=n(83),w=n(76),m=n(80),k=n(82),g=n(22);function E(e){for(var t=new ArrayBuffer(e.length),n=new Uint8Array(t),r=0,a=e.length;r<a;r++)n[r]=e.charCodeAt(r);return t}function P(e){var t=new Uint8Array(e);return String.fromCharCode.apply(null,t)}function C(e,t,n){var r=e.indexOf(t),a=e.indexOf(n);return e.substring(r+t.length,a)}function K(e){return A.apply(this,arguments)}function A(){return(A=Object(O.a)(h.a.mark((function e(t){var n,r,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"-----BEGIN PRIVATE KEY-----","-----END PRIVATE KEY-----",n=C(t,"-----BEGIN PRIVATE KEY-----","-----END PRIVATE KEY-----"),r=window.atob(n),a=E(r),e.abrupt("return",window.crypto.subtle.importKey("pkcs8",a,{name:"RSA-OAEP",hash:"SHA-256"},!0,["decrypt"]));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(e){return I.apply(this,arguments)}function I(){return(I=Object(O.a)(h.a.mark((function e(t){var n,r,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"-----BEGIN PUBLIC KEY-----","-----END PUBLIC KEY-----",n=C(t,"-----BEGIN PUBLIC KEY-----","-----END PUBLIC KEY-----"),r=window.atob(n),a=E(r),e.abrupt("return",window.crypto.subtle.importKey("spki",a,{name:"RSA-OAEP",hash:"SHA-256"},!0,["encrypt"]));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function N(e){return R.apply(this,arguments)}function R(){return(R=Object(O.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Promise.all([K(t),S(t)]).then((function(e){return{privateKey:e[0],publicKey:e[1]}})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function B(){return(B=Object(O.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,t){var n=document.createElement("input");n.type="file",n.accept="text/plain",n.multiple=!1,n.onchange=function(r){var a=n.files;if(null!==a&&a.length>0){var c=new FileReader;c.onload=function(){N(c.result).then((function(t){return e(t)})).catch((function(){return t()}))},c.readAsText(a[0])}else t()},n.click()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function T(e,t){return"-----BEGIN ".concat(t,"-----\n").concat(e,"\n-----END ").concat(t,"-----")}function U(e,t,n){return Y.apply(this,arguments)}function Y(){return(Y=Object(O.a)(h.a.mark((function e(t,n,r){var a,c,i;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.crypto.subtle.exportKey(n,t);case 2:return a=e.sent,c=P(a),i=window.btoa(c),e.abrupt("return",T(i,r));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function L(e){return D.apply(this,arguments)}function D(){return(D=Object(O.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",U(t,"pkcs8","PRIVATE KEY"));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function W(e){return G.apply(this,arguments)}function G(){return(G=Object(O.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",U(t,"spki","PUBLIC KEY"));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(e){return window.crypto.subtle.digest("SHA-256",E(e)).then((function(e){return function(e){var t=Array.from(new Uint8Array(e)).map((function(e){return e+127991}));return String.fromCodePoint.apply(null,t)}(e)}))}function H(e){var t=Object(a.useState)(""),n=Object(o.a)(t,2),c=n[0],i=n[1],l=Object(a.useState)(""),s=Object(o.a)(l,2),d=s[0],p=s[1],j=Object(a.useState)(""),b=Object(o.a)(j,2),f=b[0],h=b[1],O=Object(a.useState)(""),E=Object(o.a)(O,2),P=E[0],C=E[1],K=Object(a.useState)(!1),A=Object(o.a)(K,2),S=A[0],I=A[1];function R(t){Promise.all([L(t.privateKey),W(t.publicKey)]).then((function(n){var r=Object(o.a)(n,2),a=r[0],c=r[1];localStorage.setItem("keyPair",c+"\n"+a),Promise.all([V(a),V(c)]).then((function(e){var t=Object(o.a)(e,2),n=t[0],r=t[1];i(a),p(c),h(n),C(r)})),I(!0),e.onKeyPairChange(t)}))}return function(){var e=localStorage.getItem("keyPair");null!==e&&""===c&&""===d&&(console.log("Load key pair from localStorage"),N(e).then((function(e){R(e)})))}(),Object(r.jsx)(w.a,{variant:"outlined",children:Object(r.jsx)(m.a,{children:Object(r.jsxs)(y.a,{className:"vspacing",children:[Object(r.jsx)(u.a,{variant:"h5",component:"h2",children:"\ud83d\udddd\ufe0fYour Key Pair"}),Object(r.jsxs)(y.a,{display:"flex",justifyContent:"space-between",alignItems:"stretch",children:[Object(r.jsx)(y.a,{width:"30%",children:Object(r.jsxs)(w.a,{variant:"outlined",children:[Object(r.jsx)(m.a,{children:Object(r.jsx)(x.a,{multiline:!0,spellCheck:!1,rows:2,variant:"filled",fullWidth:!0,label:"Public Key's Fingerprint",InputProps:{readOnly:!0},value:P||""})}),Object(r.jsx)(y.a,{display:"flex",justifyContent:"flex-end",children:Object(r.jsx)(k.a,{children:Object(r.jsx)(v.a,{title:"Copy public key",disabled:!S,onClick:function(){return Object(g.b)(d)},size:"small",variant:"outlined",children:"Copy"})})})]})}),Object(r.jsx)(y.a,{width:"30%",children:Object(r.jsx)(w.a,{variant:"outlined",children:Object(r.jsx)(m.a,{children:Object(r.jsx)(x.a,{multiline:!0,spellCheck:!1,rows:2,variant:"filled",fullWidth:!0,label:"Private Key's Fingerprint",InputProps:{readOnly:!0},value:f||""})})})}),Object(r.jsxs)(y.a,{width:"30%",display:"flex",flexDirection:"column",justifyContent:"space-around",children:[Object(r.jsx)(v.a,{onClick:function(){window.crypto.subtle.generateKey({name:"RSA-OAEP",modulusLength:2048,publicExponent:new Uint8Array([1,0,1]),hash:"SHA-256"},!0,["encrypt","decrypt"]).then((function(e){(function(e){return void 0!==e.privateKey})(e)&&(console.log("New key pair is generated."),I(!0),R(e))}))},variant:"outlined",children:"Generate Key Pair"}),Object(r.jsx)(v.a,{onClick:function(){(function(){return B.apply(this,arguments)})().then((function(e){R(e)})).catch((function(e){console.log(e)}))},variant:"outlined",children:"Load Key Pair"}),Object(r.jsx)(v.a,{disabled:!S,variant:"outlined",onClick:function(){return Object(g.a)(d+"\n"+c,"KeyPair.txt")},children:"Save Key Pair"})]})]})]})})})}function F(){var e=Object(a.useState)(""),t=Object(o.a)(e,2),n=t[0],c=t[1],i=Object(a.useState)(""),l=Object(o.a)(i,2),s=l[0],d=l[1],p=Object(a.useState)(!1),j=Object(o.a)(p,2),b=j[0],f=j[1],h=Object(a.useState)(""),O=Object(o.a)(h,2),E=O[0],C=O[1];return Object(a.useEffect)((function(){d(b?"Invalid public key":"")}),[b]),Object(r.jsx)(w.a,{variant:"outlined",children:Object(r.jsx)(m.a,{children:Object(r.jsxs)(y.a,{className:"vspacing",children:[Object(r.jsx)(u.a,{variant:"h5",component:"h2",children:"\ud83d\udd12Encrypt"}),Object(r.jsx)(y.a,{children:Object(r.jsx)(x.a,{error:b,spellCheck:!1,multiline:!0,rows:4,onChange:function(e){var t=null===e||void 0===e?void 0:e.target.value;c(t),""===t?f(!1):S(t).then((function(e){f(!1)})).catch((function(e){f(!0)}))},variant:"outlined",fullWidth:!0,label:"Receivers Public Key",helperText:s})}),Object(r.jsx)(y.a,{children:Object(r.jsx)(x.a,{multiline:!0,spellCheck:!1,rows:2,variant:"outlined",onChange:function(e){var t=null===e||void 0===e?void 0:e.target.value;""!==t?""===n||b||S(n).then((function(e){var n=(new TextEncoder).encode(t);window.crypto.subtle.encrypt({name:"RSA-OAEP"},e,n).then((function(e){var t=P(e),n=window.btoa(t);C(n)})).catch((function(e){return console.log(e)}))})):C("")},fullWidth:!0,label:"Text to encrypt"})}),Object(r.jsx)(y.a,{children:Object(r.jsx)(x.a,{disabled:!0,multiline:!0,spellCheck:!1,rows:2,variant:"filled",fullWidth:!0,label:"Encrypted text",InputProps:{readOnly:!0},value:E||""})}),Object(r.jsx)(y.a,{display:"flex",justifyContent:"flex-end",children:Object(r.jsx)(k.a,{children:Object(r.jsx)(v.a,{title:"Copy encrypted text",disabled:""===E,onClick:function(e){return Object(g.b)(E)},variant:"outlined",children:"Copy"})})})]})})})}var J=n(48);var M=function(){var e=Object(d.a)("(prefers-color-scheme: dark)"),t=Object(a.useState)(null),n=Object(o.a)(t,2),i=n[0],l=n[1],f=c.a.useMemo((function(){return Object(p.a)({palette:{type:e?"dark":"light"}})}),[e]);return Object(r.jsxs)(j.a,{theme:f,children:[Object(r.jsx)(b.a,{}),Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)("header",{className:"App-header"}),Object(r.jsxs)(s.a,{maxWidth:"md",className:"vspacing",children:[Object(r.jsx)(u.a,{component:"h1",variant:"h2",children:"Webcrypto"}),Object(r.jsx)(H,{onKeyPairChange:function(e){return l(e)}}),Object(r.jsx)(F,{}),Object(r.jsx)(J.a,{keyPair:i})]})]})]})};l.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(M,{})}),document.getElementById("root"))}},[[75,1,2]]]);
//# sourceMappingURL=main.ab68c9b1.chunk.js.map