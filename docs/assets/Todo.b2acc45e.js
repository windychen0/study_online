import{_ as o}from"./TodoItem.21cddbe8.js";import{d,r as e,t as n,a as t,f as s,c as r,F as a,b as l,e as i,g as m,w as u,v as c,o as f,h as p}from"./index.46b48c1d.js";var b=d({components:{TodoItem:o},setup:()=>({todo:e(""),todoStore:n,addTodo:t,finish:s})});const x={key:0},h={class:"flex rounded-md"};b.render=function(o,d,e,n,t,s){const b=p("TodoItem");return f(),r(a,null,[o.todoStore.todoList.length?(f(),r("div",x,[(f(!0),r(a,null,l(o.todoStore.todoList,(d=>(f(),r(b,{key:d.id,name:d.name,onConfirm:e=>o.finish(d.id),btn:"Done"},null,8,["name","onConfirm"])))),128))])):i("",!0),m("div",h,[u(m("input",{type:"text",class:"border rounded-none rounded-l-md px-3 py-1.5 flex-1 focus:outline-none",placeholder:"todo","onUpdate:modelValue":d[1]||(d[1]=d=>o.todo=d)},null,512),[[c,o.todo,void 0,{trim:!0}]]),m("button",{class:"border rounded-none rounded-r-md px-4 border-green-600 bg-green-600 text-white select-none",onClick:d[2]||(d[2]=d=>{o.addTodo(o.todo),o.todo=""})}," Add ")])],64)};export default b;
