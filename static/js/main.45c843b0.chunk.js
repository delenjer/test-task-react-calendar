(this.webpackJsonpreact_sum=this.webpackJsonpreact_sum||[]).push([[0],{107:function(e,t,a){e.exports=a(288)},283:function(e,t,a){},284:function(e,t,a){},285:function(e,t,a){},287:function(e,t,a){},288:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),o=a(4),r=a.n(o),s=a(66),l=a(27),u=a(6),i=a(65),m=a(20),b=a.n(m),d=a(64),f=a(106),v=a(19),O=a.n(v),j=(a(281),a(282),a(283),function(e){var t=e.choseColor,a=e.onSave,o=e.setNewObj,r=e.obj,s=e.onCancel,i=e.isEdit,m=e.thisTitle,b=e.thisNotes,v=Object(n.useState)(i?m:""),j=Object(u.a)(v,2),E=j[0],p=j[1],_=Object(n.useState)("#3b86ff"),h=Object(u.a)(_,2),y=h[0],C=h[1],N=Object(n.useState)(!1),S=Object(u.a)(N,2),x=S[0],g=S[1],k=Object(n.useState)(!1),w=Object(u.a)(k,2),D=w[0],T=w[1],A=Object(n.useState)(i?b:""),F=Object(u.a)(A,2),P=F[0],J=F[1],L=function(e){var t=e.currentTarget.value,a=e.currentTarget.name;switch(T(!1),a){case"title":p(t);break;case"notes":J(t)}};return c.a.createElement("form",{className:"event",action:"#"},c.a.createElement("input",{name:"title",type:"text",className:O()("event__input",{"event__input--error":D}),placeholder:"event name",onChange:L,value:E,autoComplete:"none"}),D&&c.a.createElement("p",{className:"event__error"},"Put more then 0  and less then 30 symbols"),c.a.createElement("div",{className:"calendar-box"},c.a.createElement(d.Calendar,{name:"date",value:r.start,dateFormat:"dd-mm-yy",onChange:function(e){o(Object(l.a)({},r,{start:e.value}))}}),c.a.createElement("i",{className:"icon-min far fa-calendar-alt"})),c.a.createElement("div",{className:"calendar-box"},c.a.createElement(d.Calendar,{name:"time",value:r.start,showTime:!0,timeOnly:!0,hourFormat:"24",onChange:function(e){o(Object(l.a)({},r,{start:e.value}))}}),c.a.createElement("i",{className:"icon-min far fa-clock"})),c.a.createElement("input",{name:"notes",type:"text",className:"event__input",placeholder:"notes",onChange:L,value:P}),c.a.createElement("button",{name:"color",type:"button",className:"event__buttons-color",onClick:function(){g(!0)}},"Add color"),c.a.createElement("div",{className:"buttons"},c.a.createElement("button",{type:"button",className:O()("buttons__event","buttons__event--danger",{"buttons__event--edit":i}),onClick:function(){g(!1),T(!1),J(""),p(""),C("#3b86ff"),s()}},i?"Discard":"Cancel"),c.a.createElement("button",{type:"button",onClick:function(){if(E.length<30&&E.length>1){var e={title:E,start:r.start,end:r.start,allDay:!0,resource:[y,P]};g(!1),a(e)}else T(!0)},className:O()("buttons__event",{"buttons__event--edit":i})},i?"Edit":"Save")),x&&c.a.createElement(f.SliderPicker,{color:y,onChangeComplete:function(e){C(e.hex),t(e.hex)}}))}),E=(a(284),function(e){var t=e.onClose,a=e.x,o=e.y,r=e.children,s=Object(n.useRef)(null),l=function(e){s.current&&!s.current.contains(e.target)&&t()};return Object(n.useEffect)((function(){return document.addEventListener("click",l),function(){document.removeEventListener("click",l)}})),c.a.createElement("div",{className:"modal__backdrop"},c.a.createElement("div",{className:"modal__wrapper",ref:s,style:{top:"".concat(a+10,"px"),left:"".concat(o-100,"px")}},c.a.createElement("button",{type:"button",className:"modal__close",onClick:t},c.a.createElement("i",{className:"fa fa-times-circle"})),c.a.createElement("div",{className:"modal__content"},r)))}),p={event:[{start:b()(),end:b()().add(1,"days").startOf("day"),title:"Some title",allDay:!0,resource:[]},{title:"some event",start:b()().add(-5,"day").startOf("day"),end:b()().add(-5,"day").startOf("day"),allDay:!0,resource:[]}]},_=(a(285),a(286),{dateFormat:"D",dayFormat:"ddd DD/MM"}),h=function(){var e=Object(i.b)(b.a),t=Object(n.useState)(""),a=Object(u.a)(t,2),o=a[0],r=a[1],m=Object(n.useState)(""),d=Object(u.a)(m,2),f=d[0],v=d[1],O=Object(n.useState)(p.event),h=Object(u.a)(O,2),y=h[0],C=h[1],N=Object(n.useState)(!1),S=Object(u.a)(N,2),x=S[0],g=S[1],k=Object(n.useState)(!1),w=Object(u.a)(k,2),D=w[0],T=w[1],A=Object(n.useState)("#3b86ff"),F=Object(u.a)(A,2),P=F[0],J=F[1],L=Object(n.useState)({start:new Date,end:new Date,box:[0,0]}),M=Object(u.a)(L,2),z=M[0],B=M[1],G=function(){x&&(g(!1),T(!1))};return c.a.createElement("div",{className:"calendar-container"},x&&c.a.createElement(E,{onClose:G,x:z.box[1],y:z.box[0]},c.a.createElement(j,{thisNotes:o,thisTitle:f,isEdit:D,setNewObj:B,onCancel:G,onSave:function(e){C([].concat(D?Object(s.a)(y.filter((function(e){return e.title!==f}))):Object(s.a)(y),[e])),g(!1)},obj:z,choseColor:function(e){J(e)}})),c.a.createElement(i.a,{resourceTitleAccessor:"Calendar View",localizer:e,events:y,startAccessor:"start",step:60,popup:!0,formats:_,endAccessor:"end",selectable:"ignoreEvents",onDoubleClickEvent:function(e){var t=Object(l.a)({},z,{box:[600,480]});r(e.resource[1]),v(e.title),B(t),x||(g(!0),T(!0))},onSelecting:function(e){return e.end===e.start},eventPropGetter:function(){return{style:{background:P}}},onSelectSlot:function(e){if(!x){g(!0);var t={start:e.slots[0],end:e.slots[0],box:[e.box.x,e.box.y]};B(t)}}}))},y=(a(287),function(){return c.a.createElement(h,null)});r.a.render(c.a.createElement(y,null),document.getElementById("root"))}},[[107,1,2]]]);
//# sourceMappingURL=main.45c843b0.chunk.js.map