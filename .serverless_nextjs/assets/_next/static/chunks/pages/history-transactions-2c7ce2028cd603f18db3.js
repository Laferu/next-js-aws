_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[19],{"DW+y":function(e,t,n){"use strict";n.d(t,"e",(function(){return c})),n.d(t,"i",(function(){return i})),n.d(t,"h",(function(){return o})),n.d(t,"a",(function(){return s})),n.d(t,"f",(function(){return l})),n.d(t,"d",(function(){return d})),n.d(t,"g",(function(){return u})),n.d(t,"b",(function(){return p})),n.d(t,"c",(function(){return f}));var a=n("vOnD"),r=n("j4pp"),c=a.c.header.withConfig({displayName:"history-transactions__StyledHeader",componentId:"sc-1nlmvee-0"})(["@media screen and (min-width:768px){}"]),i=a.c.div.withConfig({displayName:"history-transactions__TitleContainer",componentId:"sc-1nlmvee-1"})(["padding:0 10px;margin-bottom:15px;"]),o=a.c.div.withConfig({displayName:"history-transactions__TitleArrowContainer",componentId:"sc-1nlmvee-2"})(["display:flex;align-items:center;margin-top:10px;margin-left:-30px;"]),s=a.c.div.withConfig({displayName:"history-transactions__Arrow",componentId:"sc-1nlmvee-3"})(["mask:url('/assets/icons/arrow-left.svg');mask-size:contain;mask-repeat:no-repeat;mask-position:center;background-color:",";width:30px;height:22px;margin-right:20px;&:hover,&:active{opacity:.6;cursor:pointer;}a{display:block;height:100%;width:100%;}"],(function(e){return e.theme.palette.primary.main})),l=a.c.div.withConfig({displayName:"history-transactions__TableWrapper",componentId:"sc-1nlmvee-4"})(["max-height:500px;display:flex;width:100%;flex-direction:column;td[data-label='Categoria']{text-transform:capitalize;}"]),d=a.c.div.withConfig({displayName:"history-transactions__LegendContainer",componentId:"sc-1nlmvee-5"})(["display:flex;justify-content:space-evenly;margin-top:70px;margin-bottom:30px;column-gap:20px;p{padding-left:10px;font-size:10px;color:",";font-weight:500;@media screen and (min-width:768px){padding-left:15px;font-size:14px;}}"],(function(e){return e.theme.palette.secondary.dark})),u=a.c.td.withConfig({displayName:"history-transactions__TdStatus",componentId:"sc-1nlmvee-6"})(["color:",";"],(function(e){var t=e.status,n=e.theme;return"SUCCESS"===t?n.palette.green.dark:"WARNING"===t?n.palette.warning.main:"ERROR"===t?n.palette.danger.main:void 0})),p=Object(a.c)(r.Icon).withConfig({displayName:"history-transactions__IconLegend",componentId:"sc-1nlmvee-7"})(["&&:before{width:20px;height:20px;}"]),f=a.c.div.withConfig({displayName:"history-transactions__Legend",componentId:"sc-1nlmvee-8"})(["display:flex;align-items:center;"]);a.c.h4.withConfig({displayName:"history-transactions__TicketInformationTitle",componentId:"sc-1nlmvee-9"})(["font-size:14px;font-weight:500;color:",";height:55px;display:flex;align-items:center;"],(function(e){return e.theme.palette.primary.main})),a.c.div.withConfig({displayName:"history-transactions__TicketInformationRow",componentId:"sc-1nlmvee-10"})(["border-top:1px solid ",";height:55px;padding-top:8px;h6{font-size:10px;font-weight:500;color:",";padding-bottom:5px;}p{font-size:14px;font-weight:500;color:",";}a{font-size:14px;font-weight:500;display:block;&:link,&:visited{color:",";text-decoration:none;}&:hover,&:active{text-decoration:underline}}"],(function(e){return e.theme.palette.secondary.lightButton}),(function(e){return e.theme.palette.secondary.dark}),(function(e){return e.theme.palette.secondary.dark}),(function(e){return e.theme.palette.secondary.dark}))},sznF:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/history-transactions",function(){return n("y69g")}])},y69g:function(e,t,n){"use strict";n.r(t),n.d(t,"__N_SSP",(function(){return T}));var a=n("nKUr"),r=n("o0o1"),c=n.n(r),i=n("HaE+"),o=n("KQm4"),s=n("rePB"),l=n("q1tI"),d=n("c32n"),u=n("sWYD"),p=n("I+5a"),f=n.n(p),h=n("20a2"),b=n("AHrM"),j=n("t66P"),m=n("jrVH"),g=n("1Yd/"),x=n("Cye+"),O=n("MsoC"),v=n("j4pp"),y=n("DW+y"),C=n("qyQd"),w=n("Qb08"),N=n("bQj1"),k=n("99WI"),_=n("LG9w");function I(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?I(Object(n),!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var T=!0;t.default=function(e){var t=e.profile,n=e.accountId,r=Object(l.useState)(!0),p=r[0],I=r[1],T=Object(l.useState)(!1),S=T[0],D=T[1],E=Object(l.useState)([]),R=E[0],A=E[1],V=Object(l.useContext)(N.a),L=V.url,z=V.state,B=z.setTransactionData,F=z.setTransactionsData,W=z.transactionsData,H=Object(h.useRouter)(),M=Object(l.useCallback)((function(){var e=[{name:"Status",fieldName:"status",type:"select",value:null,list:[{name:"Aprovado",fieldValue:"SUCCESS,PAID",checked:!1},{name:"Pendente",fieldValue:"PENDING,CREATED,AWAITING_CONFIRMATION,PROCESSING",checked:!1},{name:"Recusado",fieldValue:"FAILED,ERROR,CANCELLED",checked:!1}]},{name:"Data",fieldName:"date",type:"date",value:null,date:[new Date,new Date]},{name:"Tipo de transa\xe7\xe3o",fieldName:"type",type:"select",value:null,list:[{name:"Pagamento - Boleto",categoryValue:"CASH_OUT",fieldValue:"BANK_SLIP",checked:!1},{name:"Dep\xf3sito - Boleto",categoryValue:"CASH_IN",fieldValue:"BANK_SLIP",checked:!1},{name:"Cart\xe3o de cr\xe9dito",fieldValue:"CREDIT_CARD",checked:!1},{name:"TED",fieldValue:"BANK_TED",checked:!1},{name:"Transfer\xeancia P2P",fieldValue:"TRANSFER",checked:!1}]},{name:"Valor",fieldName:"amount",type:"search",format:"money",value:[null,null]},{name:"Cliente",fieldName:"name",type:"search",value:""},{name:"CPF/CNPJ",fieldName:"document",type:"search",format:"cpf",value:""}];0===W.filters.length?(F((function(t){return P(P({},t),{},{filters:[].concat(e)})})),A([].concat(e))):A(Object(o.a)(W.filters))}),[]),U=Object(j.b)("history-transactions"),G=Object(l.useCallback)((function(){return(R||W.filters).reduce((function(e,t){if(t.value)return"date"===t.fieldName?P(P({},e),{},{fromDate:Object(d.a)(t.value[0]),toDate:Object(d.a)(t.value[1])}):"amount"===t.fieldName?null!==t.value[0]&&null!==t.value[1]?P(P({},e),{},{amountFrom:t.value[0],amountTo:t.value[1]}):e:P(P({},e),{},Object(s.a)({},t.fieldName,t.value));if("status"===t.fieldName){var n=t.list.filter((function(e){return!0===e.checked}));if(n.length===t.list.length)return e;if(n.length>0)return P(P({},e),{},{status:n.map((function(e){return e.fieldValue})).toString()})}if("type"===t.fieldName){var a=t.list.filter((function(e){return!0===e.checked}));if(a.length===t.list.length)return e;if(a.length>0){var r=a.map((function(e){return e.fieldValue})).filter((function(e,t,n){return t===n.indexOf(e)})).toString();if(a.filter((function(e){return"Pagamento - Boleto"===e.name||"Dep\xf3sito - Boleto"===e.name})).length>0){var c=a.map((function(e){return e.categoryValue})).filter((function(e,t,n){return t===n.indexOf(e)&&void 0!==e})).toString();return P(P({},e),{},{service:c,serviceType:r})}return P(P({},e),{},{serviceType:r})}}return e}),{})}),[R,W.filters]),K=Object(l.useCallback)(Object(i.a)(c.a.mark((function e(){var t,a,r,i,o,s=arguments;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=s.length>0&&void 0!==s[0]?s[0]:0,a=s.length>1&&void 0!==s[1]?s[1]:{},I(!0),e.prev=3,r=10,e.next=7,U.refetch({id:n,limit:r,starting_after:r*t,queryParams:a});case 7:if(0!==(i=e.sent).data.length){e.next=16;break}if(!(W.transactions.length>0)){e.next=13;break}return F((function(e){return P(P({},e),{},{pageCount:e.pageCount-1})})),I(!1),e.abrupt("return");case 13:I(!1),e.next=18;break;case 16:F((function(e){return P(P({},e),{},{currentPage:t})})),t+1>=W.pageCount&&i.data.length===r&&F((function(e){return P(P({},e),{},{pageCount:e.pageCount+1})}));case 18:o=i.data.map((function(e){var t=!e.positive,n="".concat(t?"-":"+").concat(Object(b.a)(Number(e.amount))),a=Object(u.a)(new Date(e.createdAt),"dd/MM/yyyy");return P(P({},e),{},{date:a,value:n,isNegative:t})})),F((function(e){return P(P({},e),{},{transactions:o})})),I(!1),D(!1),e.next=30;break;case 24:e.prev=24,e.t0=e.catch(3),console.log(e.t0),F((function(e){return P(P({},e),{},{transactions:[]})})),D(!0),I(!1);case 30:case"end":return e.stop()}}),e,null,[[3,24]])}))),[W.filters,R,W.pageCount,W.transactions]),J=Object(l.useCallback)(Object(i.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==W.transactions.length){e.next=13;break}return e.prev=1,e.next=4,K(0);case 4:I(!1),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(1),D(!0),I(!1);case 11:e.next=14;break;case 13:I(!1);case 14:case"end":return e.stop()}}),e,null,[[1,7]])}))),[]),Q=Object(l.useCallback)(function(){var e=Object(i.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=G(),e.next=4,K(t.selected,n);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}(),[K,G]),q=Object(l.useCallback)(Object(i.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=G(),e.next=4,K(0,t);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log("erro",e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])}))),[K,G]),X=Object(l.useCallback)((function(e){B(e),"ledger"!==e.arr?H.push("".concat(L.baseUrl,"/history-transactions/").concat(e.arr,"/").concat(e.method,"/").concat(e.id)):H.push("".concat(L.baseUrl,"/history-transactions/").concat(e.arr,"/").concat(0,"/").concat(e.id))}),[]);return Object(l.useEffect)((function(){M(),J()}),[J,M]),Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(g.a,{title:"Swipe - Hist\xf3rico de Transa\xe7\xf5es",shouldExcludeTitleSuffix:!0,image:"logo.png",shouldIndexPage:!1}),Object(a.jsx)(m.a,{profile:t.data}),Object(a.jsxs)(v.Wrapper,{children:[Object(a.jsx)(k.a,{children:Object(a.jsxs)(v.StyledMain,{children:[Object(a.jsxs)(y.e,{children:[Object(a.jsx)(y.i,{children:Object(a.jsx)(v.Title,{children:"Hist\xf3rico de transa\xe7\xf5es"})}),Object(a.jsx)(O.a,{state:{list:R||W.filters,setList:A},action:q,width:"1000px"})]}),Object(a.jsx)(v.ShadowBox,{className:"mt-40",children:Object(a.jsxs)(v.TableContainer,{children:[Object(a.jsx)(C.a,{children:Object(a.jsx)(w.a,{isLoading:p,errorMessage:"N\xe3o foi poss\xedvel exibir os dados.",isError:S,children:Object(a.jsx)(y.f,{children:Object(a.jsx)(k.a,{children:Object(a.jsxs)(v.ResponsiveTable,{children:[Object(a.jsx)("thead",{children:Object(a.jsxs)("tr",{children:[Object(a.jsx)("th",{children:"Status"}),Object(a.jsx)("th",{children:"Data"}),Object(a.jsx)("th",{children:"Id da transa\xe7\xe3o"}),Object(a.jsx)("th",{children:"Tipo de Transa\xe7\xe3o"}),Object(a.jsx)("th",{children:"Valor"}),Object(a.jsx)("th",{children:"Cliente"}),Object(a.jsx)("th",{children:"CPF/CNPJ"}),Object(a.jsx)("th",{children:"Categoria"})]})}),Object(a.jsx)("tbody",{children:W.transactions.map((function(e,t){return Object(a.jsxs)(v.TrLink,{onClick:function(){return X(e)},children:[Object(a.jsx)("td",{"data-label":"Status",children:Object(a.jsx)(v.Icon,{status:e.status})}),Object(a.jsx)("td",{"data-label":"Data",children:e.date}),Object(a.jsx)("td",{"data-label":"Id da transa\xe7\xe3o",children:e.id}),Object(a.jsx)("td",{"data-label":"Tipo de transa\xe7\xe3o",children:e.methodType}),Object(a.jsx)("td",{"data-label":"Valor",children:e.value}),Object(a.jsx)("td",{"data-label":"Cliente",children:e.name}),Object(a.jsx)("td",{"data-label":"CPF",children:Object(_.a)(e.document).formatedValue}),Object(a.jsx)("td",{"data-label":"Categoria",children:e.arr})]},t)}))})]})})})})}),Object(a.jsx)(v.PaginateContainer,{children:Object(a.jsx)(f.a,{previousLabel:"<",nextLabel:">",breakLabel:"...",breakClassName:"break-me",activeClassName:"active",containerClassName:"pagination",subContainerClassName:"pages pagination",forcePage:W.currentPage,pageCount:W.pageCount,marginPagesDisplayed:2,pageRangeDisplayed:2,onPageChange:Q})})]})}),Object(a.jsxs)(y.d,{children:[Object(a.jsxs)(y.c,{children:[Object(a.jsx)(y.b,{status:"SUCCESS"}),Object(a.jsx)("p",{children:"Transa\xe7\xe3o Realizada"})]}),Object(a.jsxs)(y.c,{children:[Object(a.jsx)(y.b,{status:"WARNING"}),Object(a.jsx)("p",{children:"Transa\xe7\xe3o Pendente"})]}),Object(a.jsxs)(y.c,{children:[Object(a.jsx)(y.b,{status:"ERROR"}),Object(a.jsx)("p",{children:"Transa\xe7\xe3o Recusada"})]})]})]})}),Object(a.jsx)(x.a,{})]})]})}}},[["sznF",0,1,2,3,4,5,6,7,8,10]]]);