(this["webpackJsonpblog-platform"]=this["webpackJsonpblog-platform"]||[]).push([[0],{117:function(e,t,a){e.exports=a(146)},125:function(e,t,a){},146:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(9),o=a.n(i),l=a(40),c=a(50),s=a(18),u={articles:[],currentArticle:{title:null,author:{username:null},body:null,favorited:null,favoritesCount:null},articlesCount:0,isAutorized:!1,show:"all",currentUser:{},currentMenuItem:null};a(125);var p=a(16),d=a(24),m=a(25),h=a(27),f=a(26),g=a(7),v=a.n(g),y=function(e,t){return{type:"ARTICLES_LOADED",articles:e,articlesCount:t}},b=function(e){return{type:"CURRENT_ARTICLE_LOADED",currentArticle:e}},x=function(e){return{type:"AUTHORIZED",isAutorized:e}},E=function(e){return{type:"CURRENT_USER_PROFILE_LOAD",currentUser:e}},w=function(e){return{type:"SET_CURRENT_MENU_ITEM",currentMenuItem:e}},C=function(){var e=localStorage.getItem("token");return{Authorization:"Token ".concat(e)}};function A(){return!!localStorage.getItem("username")}var O=a(14),L=a(10),k=a.n(L),j=a(23),z=a(15),S=a(176);function B(){var e=Object(O.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return B=function(){return e},e}var I=function(e){Object(h.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(d.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).logout=function(){var t=e.props,a=t.authorization,n=t.history,r=t.setCurrentUser;a(!1),localStorage.clear(),r({}),n.push("/blog-platform/login")},e.getAllArticles=function(){var t=e.props,a=t.setShowAll,n=t.history,r=t.setCurrentMenuItem,i=C(),o=e.props.articlesLoaded;a(),v.a.get("https://conduit.productionready.io/api/articles?limit=9",{headers:i}).then((function(e){var t=e.data,a=t.articles,i=t.articlesCount;o(a,i),r("showAllArticles"),n.push("/blog-platform")}))},e.getMyArticles=function(){var t=e.props,a=t.setShowMy,n=t.currentUser,r=t.history,i=t.setCurrentMenuItem,o=n.username,l=C(),c=e.props.articlesLoaded;a(),v.a.get("https://conduit.productionready.io/api/articles?limit=9&author=".concat(o),{headers:l}).then((function(e){var t=e.data,a=t.articles,n=t.articlesCount;c(a,n),r.push("/blog-platform"),i("showMyArticles")}))},e.addArticle=function(){var t=e.props,a=t.history;(0,t.setCurrentMenuItem)("addArticle"),a.push("/blog-platform/add")},e.getProfileUser=Object(j.a)(k.a.mark((function t(){var a,n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.props.setCurrentUser,n=C(),t.next=4,v.a.get("https://conduit.productionready.io/api/user",{headers:n}).then((function(e){var t=e.data.user;a(t)}));case 4:case"end":return t.stop()}}),t)}))),e}return Object(m.a)(a,[{key:"componentDidMount",value:function(){this.getProfileUser()}},{key:"render",value:function(){var e=this.props.currentMenuItem,t={width:"275px",marginBottom:"7px"},a={border:"1px solid gray",boxShadow:"0 0 4px 0 #34495e",width:"275px",marginBottom:"7px"},n=this.props.currentUser,i=n.image,o=n.username,l=n.email,c=n.bio;return null===i&&(i="https://static.productionready.io/images/smiley-cyrus.jpg"),null===c&&(c="\u0425\u043e\u0440\u043e\u0448\u0438\u0439 \u0442\u0430\u043c\u0430\u0434\u0430, \u043f\u0440\u043e\u0432\u043e\u0436\u0443 \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u043d\u044b\u0435 \u043a\u043e\u043d\u043a\u0443\u0440\u0441\u044b"),r.a.createElement("div",{style:{minHeight:"800px",border:"1px solid gray",borderRadius:"10px",boxShadow:"0 0 6px 0 #34495e",padding:"12px",maxWidth:"300px",margin:"5px",marginRight:"15px",marginTop:"6px"}},r.a.createElement("div",{style:{width:"275px",marginBottom:"5px",textAlign:"center"}},"\u041b\u0438\u0447\u043d\u044b\u0439 \u043a\u0430\u0431\u0438\u043d\u0435\u0442"),r.a.createElement("div",{style:{border:"1px solid gray",borderRadius:"10px",padding:"12px",marginBottom:"30px",marginTop:"15px",backgroundColor:"#e0e0e0"}},r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",{style:{display:"flex"}},r.a.createElement("div",null,r.a.createElement("img",{src:i,alt:"",style:{display:"block",backgroundColor:"white",width:"100px",height:"100px",borderRadius:"10px",marginBottom:"5px"}})),r.a.createElement("div",{style:{padding:"10px",paddingTop:"5px"}},r.a.createElement("div",{style:{marginBottom:"10px"}},o," (",l,")"))),r.a.createElement("div",{style:{padding:"8px"}},'"',c,'"'))),r.a.createElement(M,null,r.a.createElement(S.a,{variant:"contained",size:"small",onClick:this.getAllArticles,className:"active",style:"showAllArticles"===e?a:t},"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0441\u0435 \u0441\u0442\u0430\u0442\u044c\u0438"),r.a.createElement(S.a,{variant:"contained",size:"small",onClick:this.getMyArticles,style:"showMyArticles"===e?a:t},"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0441\u0435 \u043c\u043e\u0438 \u0441\u0442\u0430\u0442\u044c\u0438"),r.a.createElement(S.a,{variant:"contained",size:"small",onClick:this.addArticle,style:"addArticle"===e?a:t},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0441\u0442\u0430\u0442\u044c\u044e"),r.a.createElement(S.a,{variant:"contained",size:"small",color:"primary",onClick:this.logout,style:{width:"275px",marginBottom:"5px"}},"\u0412\u044b\u0445\u043e\u0434")))}}]),a}(n.Component),M=z.a.div(B()),R=Object(s.b)((function(e){return{articles:e.articles,articlesCount:e.articlesCount,autorized:e.autorized,showAll:e.showAll,currentUser:e.currentUser,currentMenuItem:e.currentMenuItem}}),(function(e){return{articlesLoaded:function(t,a){return e(y(t,a))},authorization:function(t){return e(x(t))},setShowAll:function(){return e({type:"SHOW_ALL",show:"all"})},setShowMy:function(){return e({type:"SHOW_MY",show:"my"})},setCurrentUser:function(t){return e(E(t))},setCurrentMenuItem:function(t){return e(w(t))}}}))(I),U=a(187),_=a(100),T=a.n(_),D=a(56),N=a.n(D),W=a(64),F=a.n(W),H=a(188);function P(){var e=Object(O.a)(["\n  text-align: right;\n  font-size: 15px;\n  color: red;\n"]);return P=function(){return e},e}function V(){var e=Object(O.a)(["\n  color: #3a3833;\n  text-align: right;\n  font-size: 15px;\n"]);return V=function(){return e},e}function q(){var e=Object(O.a)(["\n  color: #3a3833;\n  font-size: 16px;\n  &:hover {\n    text-decoration: underline;\n  }\n"]);return q=function(){return e},e}function X(){var e=Object(O.a)(["\n  text-align: right;\n  &:hover {\n    transform: scale(1.1);\n  }\n"]);return X=function(){return e},e}function G(){var e=Object(O.a)(["\n  border: 1px solid gray;\n  border-radius: 10px;\n  box-shadow: 0 0 6px 0 #34495e;\n  padding: 5px;\n  cursor: pointer;\n  width: 250px;\n  height: 280px;\n  margin: 15px;\n  margin-top: 5px;\n  transition: 0.1s;\n  &:hover {\n    transform: scale(1.03);\n  }\n  display: flex;\n  flex-direction: column;\n"]);return G=function(){return e},e}var J=function(e){Object(h.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(d.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={article:{author:{username:""}}},e.getArticleFromServer=function(){var t=e.props.slug;if(v.a.get("https://conduit.productionready.io/api/articles/".concat(t)).then((function(t){e.setState({article:t.data.article})})),A()){var a=C();v.a.get("https://conduit.productionready.io/api/articles/".concat(t),{headers:a}).then((function(t){e.setState({article:t.data.article})}))}else v.a.get("https://conduit.productionready.io/api/articles/".concat(t)).then((function(t){e.setState({article:t.data.article})}))},e.setLike=function(){var t=Object(j.a)(k.a.mark((function t(a){var n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=C(),t.next=3,v.a.post("https://conduit.productionready.io/api/articles/".concat(a,"/favorite"),null,{headers:n}).then((function(t){e.setState({article:t.data.article})}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.setUnlike=function(){var t=Object(j.a)(k.a.mark((function t(a){var n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=C(),t.next=3,v.a.delete("https://conduit.productionready.io/api/articles/".concat(a,"/favorite"),{headers:n}).then((function(t){e.setState({article:t.data.article})}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.toggleLike=function(t,a,n){n?e.setUnlike(a):e.setLike(a)},e}return Object(m.a)(a,[{key:"componentDidMount",value:function(){this.getArticleFromServer()}},{key:"render",value:function(){var e=this,t=this.props,a=t.slug,n=t.currentUser,i=this.state.article,o=i.title,c=i.author,s=i.tagList,u=i.favoritesCount,p=i.createdAt,d=i.updatedAt,m=i.favorited,h="/blog-platform/articles/".concat(a),f=A(),g=p!==d?r.a.createElement("div",null,"\u0418\u0437\u043c\u0435\u043d\u0435\u043d\u043e: ",Object(U.a)(new Date,new Date(d))," \u043c\u0438\u043d\u0443\u0442 \u043d\u0430\u0437\u0430\u0434"):null,v=f?m?r.a.createElement(H.a,{title:"\u0423\u0431\u0440\u0430\u0442\u044c \u043b\u0430\u0439\u043a"},r.a.createElement(F.a,{color:"primary",className:"btnLike",alt:"like",onClick:function(t){return e.toggleLike(t,a,m)}})):r.a.createElement(H.a,{title:"\u041f\u043e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u043b\u0430\u0439\u043a"},r.a.createElement(N.a,{color:"primary",className:"btnLike",onClick:function(t){return e.toggleLike(t,a,m)}})):r.a.createElement(H.a,{title:"\u0414\u043b\u044f \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u0438 \u043b\u0430\u0439\u043a\u0430\u0442\u044c \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u043e\u0432\u0430\u0442\u044c\u0441\u044f"},r.a.createElement(N.a,{className:"btnLike",onClick:function(){return console.log("\u041d\u0435\u043b\u044c\u0437\u044f \u043b\u0430\u0439\u043a\u0430\u0442\u044c!")}})),y=f&&n.username===c.username?r.a.createElement(K,null,r.a.createElement(H.a,{title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u0442\u0430\u0442\u044c\u044e"},r.a.createElement(T.a,{style:{fontSize:30}}))):null;return r.a.createElement(Z,null,r.a.createElement("div",{style:{backgroundColor:"#3f51b5",color:"white",borderRadius:"10px",marginBottom:"5px",padding:"10px 15px",textAlign:"center",display:"flex",height:"77px"}},r.a.createElement("div",{style:{textAlign:"center",flexGrow:"1"}},o),y),r.a.createElement("div",{style:{border:"1px solid gray",borderRadius:"10px",padding:"12px",backgroundColor:"#e0e0e0"}},r.a.createElement(H.a,{title:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443 \u0430\u0432\u0442\u043e\u0440\u0430"},r.a.createElement(Q,null,c.username)),r.a.createElement($,null,Object(U.a)(new Date,new Date(p))," \u043c\u0438\u043d\u0443\u0442 \u043d\u0430\u0437\u0430\u0434"),r.a.createElement(ee,null,g)),r.a.createElement("div",{className:"tagsList",style:{padding:"5px 0 70px 5px",marginBottom:"5px",overflowWrap:"break-word",overflow:"auto"}},s," \xa0"),r.a.createElement("div",{style:{paddingTop:"5px",display:"flex"}},r.a.createElement("div",{style:{border:"1px solid gray",borderRadius:"10px",padding:"5px",display:"flex",width:"100%",backgroundColor:"#e0e0e0"}},r.a.createElement("div",{style:{display:"flex",textAlign:"left",flexGrow:"1"}},r.a.createElement("div",{className:"btnLike",style:{marginRight:"5px"}},v),r.a.createElement("div",{style:{color:"#3f51b5",fontSize:"18px",paddingTop:"1px"}},u)),r.a.createElement("div",{style:{flexGrow:"1",textAlign:"right"}},r.a.createElement(l.b,{to:h,style:{color:"#3a3833",fontSize:"14px"}},"\u0447\u0438\u0442\u0430\u0442\u044c \u0434\u0430\u043b\u044c\u0448\u0435 >>")))))}}]),a}(n.Component);var Y=Object(s.b)((function(e){return{articles:e.articles,currentUser:e.currentUser}}))(J),Z=z.a.div(G()),K=z.a.div(X()),Q=z.a.div(q()),$=z.a.div(V()),ee=z.a.div(P()),te=a(185);var ae=Object(s.b)((function(e){return{articles:e.articles,articlesCount:e.articlesCount,autorized:e.autorized,show:e.show}}),(function(e){return{articlesLoaded:function(t,a){return e(y(t,a))}}}))((function(e){var t=e.articles,a=e.articlesCount,n=e.history,i=e.articlesLoaded,o=t.map((function(e){var t=e.slug,a=e.favorited;return r.a.createElement("div",{key:t,onClick:function(e){return c(e,t)}},r.a.createElement(Y,{slug:t,favorited:a}))})),l=Math.ceil(a/9),c=function(e,t){e.target.parentElement.classList.contains("btnLike")||n.push("/blog-platform/articles/".concat(t))},s={count:l,variant:"outlined",shape:"rounded",onChange:function(t){var a=e.show,n=t.currentTarget.textContent,r=9*n-9,o=localStorage.getItem("username"),l="";if(n>1&&(l="&offset=".concat(r)),A()){var c=C();"all"===a?v.a.get("https://conduit.productionready.io/api/articles?limit=9".concat(l),{headers:c}).then((function(e){var t=e.data,a=t.articles,n=t.articlesCount;i(a,n)})):v.a.get("https://conduit.productionready.io/api/articles?limit=9&author=".concat(o).concat(l),{headers:c}).then((function(e){var t=e.data,a=t.articles,n=t.articlesCount;i(a,n)}))}else v.a.get("https://conduit.productionready.io/api/articles?limit=9".concat(l)).then((function(e){var t=e.data,a=t.articles,n=t.articlesCount;i(a,n)}))},defaultPage:1,articles:t};return r.a.createElement("div",null,r.a.createElement("div",{className:"listArticles",style:{display:"flex",minWidth:"1000px",maxWidth:"1600px",flexWrap:"wrap",marginBottom:"15px"}},o),r.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:"500px"}},r.a.createElement(te.a,s)))})),ne=function(e){Object(h.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(d.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).getListArticles=function(){var t=e.props,a=t.authorized,n=t.show,r=localStorage.getItem("username");if(a){var i=C();"all"===n?v.a.get("https://conduit.productionready.io/api/articles?limit=9",{headers:i}).then((function(e){var t=e.data,a=t.articles,n=t.articlesCount;y(a,n),w("showAllArticles")})):v.a.get("https://conduit.productionready.io/api/articles?limit=9&author=".concat(r),{headers:i}).then((function(e){var t=e.data,a=t.articles,n=t.articlesCount;y(a,n),w("showMyArticles")}))}},e.setAuthorization=function(){(0,e.props.authorization)(A())},e}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.history;A()?this.getListArticles():e.push("/blog-platform/login")}},{key:"render",value:function(){var e=this.props.history;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{marginTop:"15px"}},r.a.createElement("div",{style:{display:"flex",marginBottom:"15px"}},r.a.createElement(R,{history:e}),r.a.createElement(ae,{history:e}))))}}]),a}(n.Component);var re=Object(s.b)((function(e){return{articles:e.articles,articlesCount:e.articlesCount,isAutorized:e.isAutorized,showAll:e.showAll,currentUser:e.currentUser,currentMenuItem:e.currentMenuItem}}),(function(e){return{articlesLoaded:function(t,a){return e(y(t,a))},authorization:function(t){return e(x(t))},setCurrentMenuItem:function(t){return e(w(t))}}}))(ne),ie=a(12),oe=a(184),le=a(107),ce=a(189),se=a(190),ue=a(191),pe=a(193),de=a(181),me=a(104),he=a.n(me),fe=a(105),ge=a.n(fe);function ve(e){var t=e.errors,a=e.touched,n=e.values,i=e.name,o=e.onChange,l=e.onBlur,c=e.label,s=e.labelWidth,u=e.required,p=r.a.useState({showPassword:!1}),d=Object(le.a)(p,2),m=d[0],h=d[1];return r.a.createElement(ce.a,{size:"small",variant:"outlined",error:!!a[i]&&!!t[i]},r.a.createElement(se.a,{htmlFor:"outlined-adornment-password",required:u},c),r.a.createElement(ue.a,{id:"outlined-adornment-password",size:"small",type:m.showPassword?"text":"password",value:n[i],name:i,onChange:o,onBlur:l,endAdornment:r.a.createElement(pe.a,{position:"end"},r.a.createElement(de.a,{onClick:function(){h({showPassword:!m.showPassword})},edge:"end"},m.showPassword?r.a.createElement(he.a,null):r.a.createElement(ge.a,null))),labelWidth:s}))}function ye(){var e=Object(O.a)(["\n  display: block;\n  padding-top: 20px;\n"]);return ye=function(){return e},e}function be(){var e=Object(O.a)(["\n  margin-bottom: 20px;\n"]);return be=function(){return e},e}function xe(){var e=Object(O.a)(["\n  margin-bottom: 20px;\n  padding-top: 0;\n  text-align: center;\n"]);return xe=function(){return e},e}function Ee(){var e=Object(O.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return Ee=function(){return e},e}var we=function(e){Object(h.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(d.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).getListArticles=function(){v.a.get("https://conduit.productionready.io/api/articles?limit=9").then((function(t){var a=t.data,n=a.articles,r=a.articlesCount;e.props.articlesLoaded(n,r)}))},e.setAuthorization=function(){(0,e.props.authorization)(A())},e}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this.props,t=e.authorized,a=e.history;this.setAuthorization(),t?a.push("/blog-platform"):this.getListArticles()}},{key:"render",value:function(){var e=this.props.history;A()&&e.push("/blog-platform");var t=function(){var t=Object(j.a)(k.a.mark((function t(a){var n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={user:{username:a.name,email:a.email,password:a.password}},t.next=3,v.a.post("https://conduit.productionready.io/api/users",n).then((function(t){localStorage.setItem("username",t.data.user.username),e.push("/blog-platform")})).catch((function(e){console.log(e.response.data.errors)}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement("div",{style:{display:"flex",marginBottom:"15px",marginTop:"15px"}},r.a.createElement("div",{style:{minHeight:"800px",border:"1px solid gray",borderRadius:"10px",boxShadow:"0 0 6px 0 #34495e",padding:"12px",minWidth:"300px",margin:"5px",marginRight:"15px"}},r.a.createElement(ie.c,{initialValues:{name:"",password:"",email:""},onSubmit:t},(function(e){var t=e.values,a=e.handleChange,n=e.handleBlur,i=e.errors,o=e.touched,c=e.dirty,s=e.isValid,u={size:"small",name:"name",as:"input",component:oe.a,label:"\u0418\u043c\u044f",variant:"outlined",error:o.name&&Boolean(i.name),value:t.name,onChange:a("name"),onBlur:n("name"),required:!0,width:225},p={size:"small",name:"email",as:"input",component:oe.a,label:"\u042d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u0430\u044f \u043f\u043e\u0447\u0442\u0430",variant:"outlined",onChange:a("email"),error:o.email&&Boolean(i.email),onBlur:n("email"),required:!0},d={name:"password",errors:i,values:t,touched:o,onChange:a("password"),onBlur:n("password"),label:"\u041f\u0430\u0440\u043e\u043b\u044c",labelWidth:65,required:!0};return r.a.createElement(ie.b,null,r.a.createElement(Ae,null,r.a.createElement(Oe,null,"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"),r.a.createElement(Le,null,r.a.createElement(ie.a,u),o.name?i.name:""),r.a.createElement(Le,null,r.a.createElement(ie.a,p),o.email?i.email:""),r.a.createElement(Le,null,r.a.createElement(ve,d),o.password?i.password:""),r.a.createElement(S.a,{variant:"contained",size:"small",color:"primary",disabled:!c||!s,type:"submit"},"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f"),r.a.createElement(ke,null,r.a.createElement(l.b,{to:"/blog-platform/login",style:{color:"#3a3833"}},"\u0412\u043e\u0439\u0442\u0438"))))}))),r.a.createElement("div",{style:{display:"flex",marginBottom:"15px"}},r.a.createElement(ae,null)))}}]),a}(n.Component);var Ce=Object(s.b)((function(e){return{articles:e.articles,articlesCount:e.articlesCount}}),(function(e){return{articlesLoaded:function(t,a){return e(y(t,a))},authorization:function(t){return e(x(t))}}}))(we),Ae=z.a.div(Ee()),Oe=z.a.div(xe()),Le=z.a.div(be()),ke=z.a.span(ye());function je(){var e=Object(O.a)(["\n  display: block;\n  padding-top: 20px;\n"]);return je=function(){return e},e}function ze(){var e=Object(O.a)(["\n  margin-bottom: 20px;\n"]);return ze=function(){return e},e}function Se(){var e=Object(O.a)(["\n  margin-bottom: 20px;\n  padding-top: 0;\n  text-align: center;\n"]);return Se=function(){return e},e}function Be(){var e=Object(O.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return Be=function(){return e},e}var Ie=function(e){Object(h.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(d.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).getListArticles=function(){v.a.get("https://conduit.productionready.io/api/articles?limit=9").then((function(t){var a=t.data,n=a.articles,r=a.articlesCount;e.props.articlesLoaded(n,r)}))},e.setAuthorization=function(){(0,e.props.authorization)(A())},e.setLoginDataToLocalStorage=function(e){var t=e.username,a=e.email,n=e.token,r=e.bio,i=e.image;localStorage.setItem("username",t),localStorage.setItem("email",a),localStorage.setItem("token",n),localStorage.setItem("bio",r),localStorage.setItem("image",i)},e}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this.props,t=e.authorized,a=e.history;this.setAuthorization(),t?a.push("/blog-platform"):this.getListArticles()}},{key:"render",value:function(){var e=this,t=this.props.history,a=function(){var t=Object(j.a)(k.a.mark((function t(a){var n,r,i,o,l,c,s,u,p,d;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.props,r=n.authorization,i=n.history,o=n.setCurrentUser,l=n.setCurrentMenuItem,c=a.email,s=a.password,u={user:{email:c,password:s}},t.next=5,v.a.post("https://conduit.productionready.io/api/users/login",u);case 5:p=t.sent,d=p.data.user,e.setLoginDataToLocalStorage(d),o(d),r(!0),l("showAllArticles"),i.push("/blog-platform");case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement("div",{style:{display:"flex",marginBottom:"15px",marginTop:"15px"}},r.a.createElement("div",{style:{minHeight:"800px",border:"1px solid gray",borderRadius:"10px",boxShadow:"0 0 6px 0 #34495e",padding:"12px",minWidth:"300px",margin:"5px",marginRight:"15px"}},r.a.createElement(ie.c,{initialValues:{name:"",password:"",email:""},onSubmit:a},(function(e){var t=e.values,a=e.handleChange,n=e.handleBlur,i=e.errors,o=e.touched,c=e.dirty,s=e.isValid,u={size:"small",name:"email",as:"input",component:oe.a,label:"\u042d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u0430\u044f \u043f\u043e\u0447\u0442\u0430",variant:"outlined",onChange:a("email"),error:o.email&&Boolean(i.email),onBlur:n("email")},p={name:"password",errors:i,values:t,touched:o,onChange:a("password"),onBlur:n("password"),label:"\u041f\u0430\u0440\u043e\u043b\u044c",labelWidth:65,required:!1};return r.a.createElement(ie.b,null,r.a.createElement(Re,null,r.a.createElement(Ue,null,"\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u044f"),r.a.createElement(_e,null,r.a.createElement(ie.a,u),o.email?i.email:""),r.a.createElement(_e,null,r.a.createElement(ve,p),o.password?i.password:""),r.a.createElement(S.a,{variant:"contained",size:"small",color:"primary",disabled:!c||!s,type:"submit"},"\u0412\u043e\u0439\u0442\u0438")),r.a.createElement(Te,null,r.a.createElement(l.b,{to:"/blog-platform/signup",style:{color:"#3a3833"}},"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f")))}))),r.a.createElement("div",{style:{display:"flex",marginBottom:"15px"}},r.a.createElement(ae,{history:t})))}}]),a}(n.Component);var Me=Object(s.b)((function(e){return{articles:e.articles,articlesCount:e.articlesCount,autorized:e.autorized,currentUser:e.currentUser,currentMenuItem:e.currentMenuItem}}),(function(e){return{articlesLoaded:function(t,a){return e(y(t,a))},authorization:function(t){return e(x(t))},setCurrentUser:function(t){return e(E(t))},setCurrentMenuItem:function(t){return e(w(t))}}}))(Ie),Re=z.a.div(Be()),Ue=z.a.div(Se()),_e=z.a.div(ze()),Te=z.a.span(je()),De=function(e){Object(h.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(d.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).getArticleFromServer=function(){var t=e.props.match.params.slug,a=C();v.a.get("https://conduit.productionready.io/api/articles/".concat(t),{headers:a}).then((function(t){e.props.currentArticleLoaded(t.data.article)}))},e.setLike=Object(j.a)(k.a.mark((function t(){var a,n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.props.match.params.slug,n=C(),t.next=4,v.a.post("https://conduit.productionready.io/api/articles/".concat(a,"/favorite"),null,{headers:n}).then((function(t){e.props.currentArticleLoaded(t.data.article)}));case 4:case"end":return t.stop()}}),t)}))),e.setUnlike=Object(j.a)(k.a.mark((function t(){var a,n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.props.match.params.slug,n=C(),t.next=4,v.a.delete("https://conduit.productionready.io/api/articles/".concat(a,"/favorite"),{headers:n}).then((function(t){e.props.currentArticleLoaded(t.data.article)}));case 4:case"end":return t.stop()}}),t)}))),e.toggleLike=function(){e.props.currentArticle.favorited?e.setUnlike():e.setLike()},e.toEdit=function(){var t=e.props.match.params.slug;e.props.history.push("/blog-platform/articles/".concat(t,"/edit"))},e}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.setCurrentMenuItemNull;this.getArticleFromServer(),e("")}},{key:"render",value:function(){var e=this,t=this.props,a=t.currentArticle,n=t.history,i=this.props.match.params.slug,o=a.title,l=a.author,c=a.body,s=a.favorited,u=a.favoritesCount;console.log("typeof body ",typeof c);var p=s?r.a.createElement(F.a,{className:"btnLike",alt:"like",color:"primary",style:{fontSize:30},onClick:function(t){return e.toggleLike(t,i,s)}}):r.a.createElement(N.a,{className:"btnLike",color:"primary",style:{fontSize:30},onClick:function(t){return e.toggleLike(t,i,s)}});return r.a.createElement(r.a.Fragment,null,r.a.createElement("br",null),r.a.createElement("div",{style:{marginTop:"15px"}},r.a.createElement("div",{style:{display:"flex",marginBottom:"15px"}},r.a.createElement(R,{history:n}),r.a.createElement("div",{style:{maxWidth:"1600px",minHeight:"800px",border:"1px solid gray",borderRadius:"10px",boxShadow:"0 0 6px 0 #34495e",padding:"12px",minWidth:"300px",margin:"5px",marginRight:"15px"}},r.a.createElement("div",{style:{display:"flex"}},r.a.createElement("div",{style:{marginRight:"10px"}},r.a.createElement(S.a,{variant:"contained",size:"small",onClick:this.toEdit},"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c")),r.a.createElement("div",null,r.a.createElement(S.a,{variant:"contained",size:"small",onClick:function(){return console.log("\u043a\u043b\u0438\u043a!")}},"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"))),r.a.createElement("div",null,r.a.createElement("h3",null,o),r.a.createElement("div",{style:{marginBottom:"10px"}},l.username),r.a.createElement("div",{style:{marginBottom:"10px",overflowWrap:"break-word",maxWidth:"800px"}},c),r.a.createElement("div",{className:"btnLike",style:{display:"flex",cursor:"pointer"}},r.a.createElement("div",{className:"btnLike",style:{marginRight:"5px"}},p),r.a.createElement("div",{style:{color:"#3f51b5",fontSize:"25px"}},u)))))))}}]),a}(n.Component);var Ne=Object(s.b)((function(e){return{currentArticle:e.currentArticle}}),(function(e){return{currentArticleLoaded:function(t){return e(b(t))},setCurrentMenuItemNull:function(t){return e(w(t))}}}))(De),We=a(4);function Fe(){var e=Object(O.a)(["\n  margin-bottom: 20px;\n"]);return Fe=function(){return e},e}function He(e){var t=Object(We.a)({root:{height:"28px",alignSelf:"center",backgroundColor:"#1a73e8",color:"white",marginLeft:"0"}})(S.a),a=function(){var t=Object(j.a)(k.a.mark((function t(a){var n,r,i,o,l,c;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=C(),r=a.title,i=a.description,o=a.body,l=a.tagList,c={article:{title:r,description:i,body:o,tagList:[l]}},t.next=5,v.a.post("https://conduit.productionready.io/api/articles",c,{headers:n}).then((function(e){return console.log("response.data ",e.data)}));case 5:e.history.push("/blog-platform/");case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{marginTop:"15px"}},r.a.createElement("div",{style:{display:"flex",marginBottom:"15px"}},r.a.createElement(R,{history:e.history}),r.a.createElement("div",{style:{maxWidth:"1600px",minHeight:"800px",border:"1px solid gray",borderRadius:"10px",boxShadow:"0 0 6px 0 #34495e",padding:"12px",minWidth:"800px",margin:"5px",marginRight:"15px"}},r.a.createElement("div",null,r.a.createElement("h1",null,"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0441\u0442\u0430\u0442\u044c\u044e")),r.a.createElement("div",null,r.a.createElement(ie.c,{initialValues:{title:"",description:"",body:"",tagList:""},onSubmit:a},(function(e){var a=e.values,n=e.handleChange,i=e.handleBlur,o=e.errors,l=e.touched,c=e.dirty,s=e.isValid,u={size:"small",name:"title",as:"input",component:oe.a,label:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0441\u0442\u0430\u0442\u044c\u0438",variant:"outlined",error:l.title&&Boolean(o.title),value:a.title,onChange:n("title"),onBlur:i("title"),width:225},p={size:"small",name:"body",as:"input",component:oe.a,label:"\u0422\u0435\u043a\u0441\u0442 \u0441\u0442\u0430\u0442\u044c\u0438",variant:"outlined",error:l.body&&Boolean(o.body),value:a.body,onChange:n("body"),onBlur:i("body"),multiline:!0,rows:"10",width:"225"},d={size:"small",name:"description",as:"input",component:oe.a,label:"\u041a\u0440\u0430\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435",variant:"outlined",error:l.description&&Boolean(o.description),value:a.description,onChange:n("description"),onBlur:i("description"),width:"225"},m={size:"small",name:"tagList",as:"input",component:oe.a,label:"\u0422\u0435\u0433\u0438",variant:"outlined",error:l.tagList&&Boolean(o.tagList),value:a.tagList,onChange:n("tagList"),onBlur:i("tagList"),width:"225"};return r.a.createElement(ie.b,null,r.a.createElement(Pe,null,r.a.createElement(ie.a,u),l.title?o.title:""),r.a.createElement(Pe,null,r.a.createElement(ie.a,d),l.name?o.name:""),r.a.createElement(Pe,null,r.a.createElement(ie.a,m),l.name?o.name:""),r.a.createElement(Pe,null,r.a.createElement(ie.a,p),l.name?o.name:""),r.a.createElement(t,{variant:"contained",size:"small",color:"primary",disabled:!c||!s,type:"submit"},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0441\u0442\u0430\u0442\u044c\u044e"))})))))))}var Pe=z.a.div(Fe());function Ve(){var e=Object(O.a)(["\n  margin-bottom: 20px;\n"]);return Ve=function(){return e},e}var qe=function(e){Object(h.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(d.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).getArticleFromServer=function(){var t=e.props.match.params.slug;v.a.get("https://conduit.productionready.io/api/articles/".concat(t)).then((function(t){e.props.currentArticleLoaded(t.data.article)}))},e}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.setCurrentMenuItemNull;this.getArticleFromServer(),e("")}},{key:"render",value:function(){var e=this,t=this.props.match.params.slug,a=this.props.currentArticle,n=void 0===a?{author:{username:null}}:a,i={title:n.title,description:n.description,body:n.body,tagList:n.tagList},o=function(){var a=Object(j.a)(k.a.mark((function a(n){var r,i,o,l,c,s;return k.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r=C(),i=n.title,o=n.description,l=n.body,c=n.tagList,s={article:{title:i,description:o,body:l,tagList:[c]}},a.next=5,v.a.put("https://conduit.productionready.io/api/articles/".concat(t),s,{headers:r}).then((function(){return e.props.history.push("/blog-platform/")}));case 5:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{marginTop:"15px"}},r.a.createElement("div",{style:{display:"flex",marginBottom:"15px"}},r.a.createElement(R,{history:this.props.history}),r.a.createElement("div",{style:{maxWidth:"1600px",minHeight:"800px",border:"1px solid gray",borderRadius:"10px",boxShadow:"0 0 6px 0 #34495e",padding:"12px",minWidth:"800px",margin:"5px",marginRight:"15px"}},r.a.createElement("div",null,r.a.createElement("h1",null,"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0441\u0442\u0430\u0442\u044c\u044e")),r.a.createElement(ie.c,{initialValues:i,onSubmit:o},(function(e){var t=e.values,a=e.handleChange,n=e.handleBlur,i=e.errors,o=e.touched,l=e.dirty,c=e.isValid,s={size:"small",name:"title",as:"input",component:oe.a,label:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0441\u0442\u0430\u0442\u044c\u0438",variant:"outlined",error:o.title&&Boolean(i.title),value:t.title,onChange:a("title"),onBlur:n("title"),width:225},u={size:"small",name:"body",as:"input",component:oe.a,label:"\u0422\u0435\u043a\u0441\u0442 \u0441\u0442\u0430\u0442\u044c\u0438",variant:"outlined",error:o.body&&Boolean(i.body),value:t.body,onChange:a("body"),onBlur:n("body"),multiline:!0,rows:"10",width:"225"},p={size:"small",name:"description",as:"input",component:oe.a,label:"\u041a\u0440\u0430\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435",variant:"outlined",error:o.description&&Boolean(i.description),value:t.description,onChange:a("description"),onBlur:n("description"),width:"225"},d={size:"small",name:"tagList",as:"input",component:oe.a,label:"\u0422\u0435\u0433\u0438",variant:"outlined",error:o.tagList&&Boolean(i.tagList),value:t.tagList,onChange:a("tagList"),onBlur:n("tagList"),width:"225"};return r.a.createElement(ie.b,null,r.a.createElement(Xe,null,r.a.createElement(ie.a,s),o.title?i.title:""),r.a.createElement(Xe,null,r.a.createElement(ie.a,p),o.name?i.name:""),r.a.createElement(Xe,null,r.a.createElement(ie.a,d),o.name?i.name:""),r.a.createElement(Xe,null,r.a.createElement(ie.a,u),o.name?i.name:""),r.a.createElement(S.a,{variant:"contained",size:"small",color:"primary",disabled:!l||!c,type:"submit"},"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c"))}))))))}}]),a}(n.Component),Xe=z.a.div(Ve());var Ge=Object(s.b)((function(e){return{currentArticle:e.currentArticle,currentMenuItem:e.currentMenuItem}}),(function(e){return{currentArticleLoaded:function(t){return e(b(t))},setCurrentMenuItemNull:function(t){return e(w(t))}}}))(qe),Je=a(182),Ye=a(183),Ze=a(106),Ke=a.n(Ze);function Qe(e){return r.a.createElement("div",{className:"test"},r.a.createElement(Je.a,{position:"static"},r.a.createElement(Ye.a,null,r.a.createElement(de.a,{edge:"start",color:"inherit","aria-label":"menu",onClick:function(){}},r.a.createElement(Ke.a,null)))))}var $e=Object(s.b)((function(e){return{articles:e.articles,articlesCount:e.articlesCount,autorized:e.autorized,showAll:e.showAll,currentUser:e.currentUser}}),(function(e){return{articlesLoaded:function(t,a){return e(y(t,a))},authorization:function(t){return e(x(t))},setShowAll:function(){return e({type:"SHOW_ALL",show:"all"})}}}))((function(){return r.a.createElement("div",{className:"app"},r.a.createElement(Qe,null),r.a.createElement(p.a,{exact:!0,path:"/blog-platform",component:re}),r.a.createElement(p.a,{path:"/blog-platform/signup",component:Ce}),r.a.createElement(p.a,{path:"/blog-platform/login",component:Me}),r.a.createElement(p.a,{exact:!0,path:"/blog-platform/articles/:slug",component:Ne}),r.a.createElement(p.a,{path:"/blog-platform/add",component:He}),r.a.createElement(p.a,{path:"/blog-platform/articles/:slug/edit",component:Ge}))})),et=("object"===typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):c.c)(Object(c.a)()),tt=Object(c.d)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.articles,r=t.articlesCount,i=t.currentArticle,o=t.isAutorized,l=t.currentUser,c=t.currentMenuItem;switch(a){case"ARTICLES_LOADED":return Object.assign({},e,{articles:n,articlesCount:r});case"CURRENT_ARTICLE_LOADED":return Object.assign({},e,{currentArticle:i});case"AUTHORIZED":return Object.assign({},e,{isAutorized:o});case"SHOW_ALL":return Object.assign({},e,{show:"all"});case"SHOW_MY":return Object.assign({},e,{show:"my"});case"CURRENT_USER_PROFILE_LOAD":return Object.assign({},e,{currentUser:l});case"SET_CURRENT_MENU_ITEM":return Object.assign({},e,{currentMenuItem:c});default:return e}}),et),at=r.a.createElement(s.a,{store:tt},r.a.createElement(l.a,null,r.a.createElement($e,null)));o.a.render(at,document.getElementById("root"))}},[[117,1,2]]]);
//# sourceMappingURL=main.8940da78.chunk.js.map