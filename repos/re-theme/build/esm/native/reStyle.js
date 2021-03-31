import{u as r,_ as n,a as t,l as e}from"./useTheme-b25cfed0.js";import u,{useMemo as a,useRef as c,useState as o,useEffect as i}from"react";import{uuid as f,isFunc as l,isObj as s,noOpObj as m,ensureArr as v,deepMerge as p,shallowEqual as y,exists as d}from"@keg-hub/jsutils";var StyleInjector=function(r){return function(n){return u.createElement(r,n)}},getComponentName=function(r){return r.displayName||r.name||"keg-".concat(f().split("-").slice(4).join(""))},usePropClassName=function(r,n){return a((function(){var t=r?v(r):[];return n&&t.push(n),t}),[r,n])},useShallowMemoMerge=function(){for(var r=arguments.length,n=new Array(r),t=0;t<r;t++)n[t]=arguments[t];var e=c(null);return a((function(){var r=p.apply(void 0,n),t=y(e.current,r)?e.current:r;return t!==e.current&&(e.current=t),t}),[].concat(n))},useReStyles=function(t,e){var u=r(),c=o(e),f=n(c,2),v=f[0],p=f[1],d=y(e,v);return i((function(){!d&&p(e)}),[d]),a((function(){return l(t)?t(u,e):s(t)?t:m}),[u,t,d])},reStyle=function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"style",a=getComponentName(r),c=StyleInjector(r);return function(r){var o=u.forwardRef((function(o,i){var f=useReStyles(r,o),l=usePropClassName(o.className,a),s=d(o[n])?o[n]:null,m=useShallowMemoMerge(f,s);return u.createElement(c,t({},o,e({},n,m),{style:m,className:l,ref:i}))}));return o.displayName="reStyle(".concat(a,")"),o}};export{reStyle};
//# sourceMappingURL=reStyle.js.map
