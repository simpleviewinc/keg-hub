import{_ as e,R as t,a as n,b as r,c as i,d as o,g as a,u as l}from"./useTheme-02b45ea6.js";export{R as ReThemeContext,g as getDefaultTheme,s as setDefaultTheme,u as useTheme}from"./useTheme-02b45ea6.js";import c,{useState as f,useEffect as d,useMemo as m,useCallback as h,useRef as v,useLayoutEffect as p}from"react";import{deepFreeze as b,get as E,isFunc as x,isNum as T,isArr as y,isObj as L,logData as w,mapObj as S,softFalsy as C,toNum as D,deepMerge as W,isStr as A,noPropArr as z,isEmptyColl as B,checkCall as O,noPropObj as $,shallowEqual as H,noOpObj as I}from"@keg-hub/jsutils";var V,j,_=b({BUILD_EVENT:"build",CHANGE_EVENT:"change",RESIZE_EVENT:"resize",ADD_EVENT:"addEventListener",REMOVE_EVENT:"removeEventListener",KEG_STYLES_TAG_ID:"keg-components-stylesheet",PLATFORM:{NATIVE:"$native",IOS:"$ios",android:"$android",WEB:"$web",ALL:"$all"}}),N=(e(V={m:"margin",mT:"marginTop",mB:"marginBottom",mR:"marginRight",mL:"marginLeft",mH:"marginHorizontal",mV:"marginVertical",p:"padding",pT:"paddingTop",pB:"paddingBottom",pR:"paddingRight",pL:"paddingLeft",pH:"paddingHorizontal",pV:"paddingVertical",bC:"borderColor",bW:"borderWidth",bS:"borderStyle"},"bC","borderColor"),e(V,"bRad","borderRadius"),e(V,"bTC","borderTopColor"),e(V,"bTW","borderTopWidth"),e(V,"bBC","borderBottomColor"),e(V,"bBW","borderBottomWidth"),e(V,"bRC","borderRightColor"),e(V,"bRW","borderRightWidth"),e(V,"bLC","borderLeftColor"),e(V,"bLW","borderLeftWidth"),e(V,"c","color"),e(V,"bg","background"),e(V,"bgC","backgroundColor"),e(V,"d","display"),e(V,"ovf","overflow"),e(V,"ovfX","overflowX"),e(V,"ovfY","overflowY"),e(V,"pos","position"),e(V,"z","zIndex"),e(V,"tp","top"),e(V,"bt","bottom"),e(V,"btm","bottom"),e(V,"lt","left"),e(V,"rt","right"),e(V,"bxS","boxShadow"),e(V,"op","opacity"),e(V,"ptrE","pointerEvents"),e(V,"otl","outline"),e(V,"fl","flex"),e(V,"flD","flexDirection"),e(V,"flWr","flexWrap"),e(V,"flB","flexBasis"),e(V,"flG","flexGrow"),e(V,"flS","flexShrink"),e(V,"jtC","justifyContent"),e(V,"alC","alignContent"),e(V,"alS","alignSelf"),e(V,"alI","alignItems"),e(V,"w","width"),e(V,"h","height"),e(V,"minH","minHeight"),e(V,"maxH","maxHeight"),e(V,"minW","minWidth"),e(V,"maxW","maxWidth"),e(V,"ftF","fontFamily"),e(V,"ftSz","fontSize"),e(V,"ftS","fontStyle"),e(V,"ftWt","fontWeight"),e(V,"lnH","lineHeight"),e(V,"ltrS","letterSpacing"),e(V,"txAl","textAlign"),e(V,"txDc","textDecoration"),e(V,"txDL","textDecorationLine"),V),getRNPlatform=function(){return j||(e=require("react-native").Platform,j=e);var e},k={},addThemeEvent=function(e,t){if(e&&x(t))return k[e]=k[e]||[],k[e].push(t),k[e].length-1},removeThemeEvent=function(e,t){e&&k[e]&&(t||0===t)&&(T(t)?k[e].splice(t,1):x(t)&&y(k[e])&&(k[e]=k[e].filter((function(e){return e!==t}))))},fireThemeEvent=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];y(k[e])&&k[e].forEach((function(e){return e.apply(void 0,n)}))},withTheme=function(e){return function(r){return c.createElement(t.Consumer,null,(function(t){return c.createElement(e,n({theme:t},r))}))}},P={},getCurrentTheme=function(){return P},F={entries:[["$xsmall",1],["$small",320],["$medium",768],["$large",1024],["$xlarge",1366]],hash:{},indexes:{}},buildSizeMapParts=function(){F.indexes=F.entries.reduce((function(e,t,n){return e[t[0]]=n,e[n]=t[0],F.hash[t[0]]=t[1],e}),{})},setSizes=function(e){return L(e)?(S(e,(function(t,n){var r=F.indexes[t];if(!C(r))return w("Invalid ".concat(t," for theme size! Allowed keys are xsmall | small | medium | large | xlarge"),"warn");var i=D(e[t]);if(!i||!F.entries[r])return w("Invalid size entry. Size must be a number and the size entry must exist!","Size: ".concat(i),"Entry: ".concat(F.entries[r]),"warn");F.entries[r]=[t,i]})),buildSizeMapParts(),F):w("setDimensions method requires an argument of type 'Object'.\nReceived: ",e,"error")},getSize=function(e){var t=T(e)&&e||D(e),n=F.entries.reduce((function(e,n){var i=r(n,2),o=i[0],a=i[1];return t>=a&&(e?a>F.hash[e]&&(e=o):e=o),e}),"$xsmall");return[n,F.hash[n]]},getMergeSizes=function(e){var t=Object.keys(F.hash),n=t.indexOf(e);return[t.slice(0,n+1),t.slice(n+1)]};buildSizeMapParts();var M,getSizeMap=function(){return F},loadReactNativeDimensions=function(){return require("react-native").Dimensions},checkDimensions=function(e){return function(){return(M=M||loadReactNativeDimensions())?e.apply(void 0,arguments):console.error("[ ReTheme ERROR ] - Missing Dimensions","\n   - You must initialize 'Dimensions' before using the 'ReThemeProvider'","\n   - Do this by calling 'setRNDimensions(Dimensions)'","\n   - The first argument must be the 'Dimensions' export of 'react-native'","\n   - Or an Object with a matching API")}},G={get:checkDimensions((function(){var e;return M?(e=M).get.apply(e,arguments):{width:0,height:0}})),set:checkDimensions((function(){var e;M&&(e=M).set.apply(e,arguments)})),update:checkDimensions((function(){var e;M&&(e=M).update.apply(e,arguments)})),addEventListener:checkDimensions((function(){var e;M&&(e=M).addEventListener.apply(e,arguments)})),removeEventListener:checkDimensions((function(){var e;M&&(e=M).removeEventListener.apply(e,arguments)}))},useDimensions=function(){var e=f(G.get("window")),t=r(e,2),n=t[0],i=t[1],onChange=function(e){var t=e.window,n=t.width,r=t.height,o=t.scale,a=t.fontScale;i({width:n,height:r,scale:o,fontScale:a})};return d((function(){return G.addEventListener("change",onChange),function(){return onChange.shouldUnmount=!0,G.removeEventListener("change",onChange)}}),[]),n},Y=_.PLATFORM,getPlatforms=function(){var e,t,n,r=(e=getRNPlatform(),t=E(e,"OS"),n=[],"web"!==t&&n.push("$native"),n.push("$"+t),[_.PLATFORM.ALL].concat(n)),i=Object.values(Y).filter((function(e){return!r.includes(e)}));return[r,i]},getTheme=function(){for(var e=getCurrentTheme(),t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return W.apply(void 0,i(n.reduce((function(t,n){var r=L(n)?n:A(n)||y(n)?E(e,n):null;return r&&t.push(r),t}),[])))},extract=function(e,t){if(!e[t])return e;var n=e[t];return delete e[t],W(e,n)},q=function compileStyles(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!L(e))return e;var n=t.platforms,i=t.sizes,a=t.omit,u=t.aliases,s=void 0===u?N:u,l=Object.entries(e).reduce((function(e,u){var l=r(u,2),c=l[0],f=l[1];if(n.includes(c)||i.includes(c))e[c]=o(o({},e[c]),compileStyles(f,t));else if(!a.includes(c)){var d=s[c]||c;e[d]=L(f)?o(o({},e[d]),compileStyles(f,t)):f}return e}),{}),c=n.reduce(extract,l),f=i.reduce(extract,c);return f},useCurrentSize=function(){var e=useDimensions(),t=m((function(){return getSize(e.width)}),[e.width]),n=r(t,2);return[n[0],n[1],e]},usePlatforms=function(){return m((function(){return getPlatforms()}),[])},ReThemeProvider=function(e){var n=e.children,i=e.theme,o=e.merge,u=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=usePlatforms(),i=r(n,2),o=i[0],a=i[1],u=useCurrentSize(),s=r(u,3),l=s[0],c=s[1],f=s[2],d=f.width,h=f.height,v=m((function(){return getMergeSizes(l)||z}),[l]),g=r(v,2),p=g[0],b=g[1],E=m((function(){return a.concat(b)}),[a,b]),x=m((function(){return t?{key:l,size:c,width:d,height:h}:null}),[l,c,d,h]),T=m((function(){return q(e,{platforms:o,sizes:p,omit:E})}),[e,o,l]);return t&&(T.get=getTheme,T.RTMeta=x),T}(function(e,t){return m((function(){if(!t)return e;var n=a();return n&&n!==e?W(n,e):e}),[e,t])}(i,Boolean(o||!o&&!1!==o)||!1),!0);return P=u,d((function(){fireThemeEvent(_.BUILD_EVENT,u)}),[u]),c.createElement(t.Provider,{value:u},n)},setRNPlatform=function(e){},setRNDimensions=function(e){return e},useStylesCallback=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:z,n=arguments.length>2?arguments[2]:void 0,r=h(e,t),o=l(),a=!(!n||!L(n)||B(n))&&n;return m((function(){return O.apply(void 0,[r,o,a].concat(i(t)))||$}),[o,r,a])},useStyle=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=l();return m((function(){return r.get.apply(r,t)||$}),[r].concat(t))},nativeThemeHook=function(e,t,n){var i=E(n,"ref",v()),o=f(e),a=r(o,2),u=a[0],s=a[1];return p((function(){var t,n;(t=e)!==(n=u)&&!H(t,n)&&s(u)}),[e,t]),[i,e,s]},usePointerState=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I;return{hover:!1,focus:!1,active:!1,events:I,ref:e.ref}};export{ReThemeProvider,addThemeEvent,fireThemeEvent,getMergeSizes,getSize,getSizeMap,removeThemeEvent,setRNDimensions,setRNPlatform,setSizes,useDimensions,usePointerState,useStyle,useStylesCallback,nativeThemeHook as useThemeActive,nativeThemeHook as useThemeFocus,nativeThemeHook as useThemeHover,withTheme};
//# sourceMappingURL=index.js.map
