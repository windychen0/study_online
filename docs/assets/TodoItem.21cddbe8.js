import{d as e,c as t,g as n,i as s,o as r}from"./index.46b48c1d.js";var a=e({props:{name:{type:String,default:""},btn:{type:String,default:"Done"}},emits:["confirm"]});const o={class:"flex justify-between pl-3 mb-4"};a.render=function(e,a,i,d,m,c){return r(),t("div",o,[n("span",null,s(e.name),1),n("button",{class:"border rounded-md py-1 px-3 text-sm text-gray-700 select-none",onClick:a[1]||(a[1]=t=>e.$emit("confirm"))},s(e.btn),1)])};export{a as _};