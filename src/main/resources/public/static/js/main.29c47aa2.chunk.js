(this["webpackJsonp5003-project"]=this["webpackJsonp5003-project"]||[]).push([[0],{118:function(e,c,t){},119:function(e,c,t){},121:function(e,c,t){},149:function(e,c,t){},150:function(e,c,t){},151:function(e,c,t){},152:function(e,c,t){},153:function(e,c,t){},222:function(e,c,t){"use strict";t.r(c);var n=t(0),a=t.n(n),s=t(27),i=t.n(s),j=(t(118),t(110)),r=(t(119),t(120),t(31)),l=t(8),d=(t(121),t(227)),o=t(226),b=t(109),h=t(41),x=t.n(h),O=t(58),p=t.n(O),m="post",u="localhost:8888",f=t(6);function v(){return Object(f.jsxs)("div",{className:"login",children:[Object(f.jsxs)("div",{className:"form",children:[Object(f.jsx)("div",{className:"title",children:"\u767b\u5f55"}),Object(f.jsxs)(d.b,{direction:"vertical",children:[Object(f.jsx)(o.a,{placeholder:"\u8f93\u5165\u90ae\u7bb1",id:"email"}),Object(f.jsx)(o.a.Password,{placeholder:"\u8bf7\u8f93\u5165\u5bc6\u7801",id:"password"})]}),Object(f.jsx)(b.a,{type:"primary",onClick:function(){var e=x()("#email"),c=x()("#password");p()({method:m,url:u+"",data:{email:e,password:c}}).then((function(e){})).catch((function(e){console.log(e)}))},className:"action-button",children:"\u767b\u5f55"})]}),Object(f.jsxs)("div",{className:"more",children:["\u6ca1\u6709\u8d26\u53f7? \u53bb",Object(f.jsx)(r.b,{to:"/sign-up",children:"\u6ce8\u518c"}),"."]})]})}t(149);function g(){return Object(f.jsxs)("div",{className:"sign-up",children:[Object(f.jsxs)("div",{className:"form",children:[Object(f.jsx)("div",{className:"title",children:"\u6ce8\u518c"}),Object(f.jsxs)(d.b,{direction:"vertical",children:[Object(f.jsx)(o.a,{placeholder:"\u8f93\u5165\u90ae\u7bb1",id:"email"}),Object(f.jsx)(o.a.Password,{placeholder:"\u8bf7\u8f93\u5165\u5bc6\u7801",id:"password"}),Object(f.jsx)(o.a.Password,{placeholder:"\u518d\u6b21\u8bf7\u8f93\u5165\u5bc6\u7801",id:"password-verify"})]}),Object(f.jsx)(b.a,{type:"primary",className:"action-button",onClick:function(){var e=x()("#email"),c=x()("#password"),t=x()("#password-verify");p()({method:m,url:u+"",data:{email:e,password:c,passwordVerify:t}}).then((function(e){})).catch((function(e){console.log(e)}))},children:"\u6ce8\u518c"})]}),Object(f.jsxs)("div",{className:"more",children:["\u5df2\u7ecf\u6709\u8d26\u53f7? \u53bb",Object(f.jsx)(r.b,{to:"/login",children:"\u767b\u5f55"}),"."]})]})}t(150);function y(){return Object(f.jsx)("div",{children:"\u5458\u5de5\u7ba1\u7406"})}var w=t(42),N=t(225),I=t(228),k=t(229),C=t(230),P=t(231);t(151);function F(){return Object(f.jsx)("div",{children:"\u8003\u52e4\u7ba1\u7406"})}t(152);function S(){return Object(f.jsx)("div",{children:"\u85aa\u8d44\u7ba1\u7406"})}t(153);function B(){return Object(f.jsx)("div",{children:"\u62db\u8058\u7ba1\u7406"})}var J=function(){var e=Object(n.useState)({name:"Ross"}),c=Object(j.a)(e,2),t=c[0];return c[1],Object(f.jsx)("div",{className:"App",children:Object(f.jsxs)(r.a,{children:[Object(f.jsx)(l.a,{path:"/login",children:Object(f.jsx)(v,{})}),Object(f.jsx)(l.a,{path:"/sign-up",children:Object(f.jsx)(g,{})}),Object(f.jsxs)(l.a,{path:"/app",children:[Object(f.jsxs)(w.d,{children:[Object(f.jsxs)(w.b,{children:[Object(f.jsxs)(N.a,{defaultSelectedKeys:["1"],theme:"dark",mode:"horizontal",children:[Object(f.jsx)(N.a.Item,{icon:Object(f.jsx)(I.a,{}),children:Object(f.jsx)(r.b,{to:"/app/employee-management",children:"\u5458\u5de5\u7ba1\u7406"})},"1"),Object(f.jsx)(N.a.Item,{icon:Object(f.jsx)(k.a,{}),children:Object(f.jsx)(r.b,{to:"/app/attendance-management",children:"\u8003\u52e4\u7ba1\u7406"})},"2"),Object(f.jsx)(N.a.Item,{icon:Object(f.jsx)(C.a,{}),children:Object(f.jsx)(r.b,{to:"/app/salary-management",children:"\u85aa\u8d44\u7ba1\u7406"})},"3"),Object(f.jsx)(N.a.Item,{icon:Object(f.jsx)(P.a,{}),children:Object(f.jsx)(r.b,{to:"/app/employment-management",children:"\u62db\u8058\u7ba1\u7406"})},"4")]}),null!==t&&Object(f.jsx)("div",{className:"account",children:t.name})]}),Object(f.jsx)(w.d,{})]}),Object(f.jsx)(w.a,{children:Object(f.jsxs)(l.c,{children:[Object(f.jsx)(l.a,{exact:!0,path:"/app/employee-management",children:Object(f.jsx)(y,{})}),Object(f.jsx)(l.a,{exact:!0,path:"/app/attendance-management",children:Object(f.jsx)(F,{})}),Object(f.jsx)(l.a,{exact:!0,path:"/app/salary-management",children:Object(f.jsx)(S,{})}),Object(f.jsx)(l.a,{exact:!0,path:"/app/employment-management",children:Object(f.jsx)(B,{})})]})})]})]})})},L=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,232)).then((function(c){var t=c.getCLS,n=c.getFID,a=c.getFCP,s=c.getLCP,i=c.getTTFB;t(e),n(e),a(e),s(e),i(e)}))};i.a.render(Object(f.jsx)(a.a.StrictMode,{children:Object(f.jsx)(J,{})}),document.getElementById("root")),L()}},[[222,1,2]]]);
//# sourceMappingURL=main.29c47aa2.chunk.js.map