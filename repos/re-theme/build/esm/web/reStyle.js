import{u as e,_ as t,a as r,e as a}from"./useTheme-c1a60747.js";import n,{useMemo as i,useState as o,useEffect as s}from"react";import{uuid as c,isFunc as l,isObj as u,noOpObj as m,ensureArr as f,clearObj as p,deepMerge as y,shallowEqual as v,exists as S}from"@keg-hub/jsutils";import{S as d}from"./styleInjector-70efa674.js";import"react-native-web/dist/modules/prefixStyles";import"react-native-web/dist/exports/StyleSheet/flattenStyle";import"react-native-web/dist/exports/StyleSheet/createReactDOMStyle";import"react-native-web/dist/exports/StyleSheet/createCompileableStyle";var getComponentName=function(e){return e.displayName||e.name||"keg-".concat(c().split("-").slice(4).join(""))},usePropClassName=function(e,t){return i((function(){var r=e?f(e):[];return t&&r.push(t),r}),[e,t])},useObjWithIdentity=function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),a=1;a<t;a++)r[a-1]=arguments[a];return i((function(){return p(e),Object.assign(e,y.apply(void 0,r)),e}),[e].concat(r))},useReStyles=function(r,a){var n=e(),c=o(a),f=t(c,2),p=f[0],y=f[1],S=v(a,p);return s((function(){!S&&y(a)}),[S]),i((function(){return l(r)?r(n,a):u(r)?r:m}),[n,r,S])},reStyle=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"style",i={},o=getComponentName(e),s=d(e,{displayName:o,className:o});return function(e){var c=n.forwardRef((function(c,l){var u=useReStyles(e,c),f=usePropClassName(c.className,o),p=S(c[t])?c[t]:m,y=useObjWithIdentity(i,u,p);return n.createElement(s,r({},c,a({},t,y),{style:y,className:f,ref:l}))}));return c.displayName="reStyle(".concat(o,")"),c}};export{reStyle};
//# sourceMappingURL=reStyle.js.map
