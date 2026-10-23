/* ---------- FormuNex cloud: Supabase accounts and shared company data ----------
   Loaded after the app. When config.js has no Supabase settings this file does nothing
   and FormuNex keeps working on this device only, exactly as before.
   Each item of the app state (a formula, a material, a test...) is one row in public.records,
   so people editing different items never overwrite each other. Changes are saved locally
   first, pushed to Supabase, and arrive live on every other signed-in device. */
(()=>{
const CFG=window.FX_CONFIG||{};
if(!CFG.supabaseUrl||!CFG.supabaseAnonKey||!window.supabase||!window.supabase.createClient)return;
window.FX_CLOUD=true;
const APP_URL=location.origin+location.pathname;
const sb=window.supabase.createClient(CFG.supabaseUrl,CFG.supabaseAnonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
window.FX_SB=sb;

Object.assign(T.ar,{email:"البريد الإلكتروني",company:"اسم الشركة",signupTitle:"إنشاء مساحة عمل لشركتك",signupSub:"تُنشأ مساحة عمل خاصة بشركتك وتكون أنت مديرها، ثم تضيف فريقك من شاشة المستخدمين.",
 createOrg:"إنشاء مساحة العمل",haveAccount:"لدي حساب — تسجيل الدخول",newCompany:"شركة جديدة؟ أنشئ مساحة عمل",forgot:"نسيت كلمة المرور؟",forgotTitle:"استعادة كلمة المرور",forgotSub:"أدخل بريدك وسنرسل لك رابطاً لتعيين كلمة مرور جديدة.",
 sendLink:"إرسال الرابط",resetSent:"إذا كان البريد مسجلاً فستصلك رسالة خلال دقائق.",checkEmail:"أرسلنا رسالة تأكيد إلى {e}. افتح الرابط في الرسالة ثم سجّل الدخول.",
 recoverTitle:"تعيين كلمة مرور جديدة",noOrgTitle:"لست عضواً في أي مساحة عمل",noOrgSub:"اطلب من مدير النظام في شركتك إضافة بريدك، أو أنشئ مساحة عمل جديدة لشركتك.",
 loading:"جارٍ التحميل…",notConfirmed:"لم يُؤكَّد البريد بعد. افتح رابط التأكيد في بريدك.",userExists:"هذا البريد مسجل من قبل. سجّل الدخول بدلاً من ذلك.",noUser:"لا يوجد حساب بهذا البريد بعد.",
 rate:"محاولات كثيرة. انتظر قليلاً ثم حاول مجدداً.",netErr:"تعذّر الاتصال بالخادم. تحقق من الإنترنت.",emailBad:"أدخل بريداً إلكترونياً صحيحاً.",
 stOk:"متزامن",stSync:"جارٍ الحفظ…",stOff:"بدون إنترنت — التغييرات محفوظة على الجهاز",stErr:"تعذّر الحفظ، ستُعاد المحاولة",stRO:"عرض فقط",
 workspace:"مساحة العمل",sendReset:"إرسال رابط كلمة المرور",resetMailed:"أُرسل رابط تعيين كلمة المرور إلى {e}",remove:"إزالة",
 tempPw:"كلمة مرور مؤقتة",userAddedMail:"أُضيف المستخدم. إن كان تأكيد البريد مفعّلاً فعليه فتح رسالة التأكيد أولاً.",
 hint:"البيانات محفوظة في مساحة عمل شركتك وتتزامن بين الأجهزة.",authNote:"الحسابات وبيانات الشركة محفوظة في Supabase، ولا يرى بيانات شركتك إلا أعضاؤها.",
 demoTitle:"البيانات التجريبية",demoSub:"مساحة العمل فيها خلطات ومشاريع ومواد ومعدات تجريبية جاءت مع النسخة الأولى. احذفها لتبدأ ببياناتك فقط. ما أضفته أنت يبقى كما هو.",demoBtn:"حذف البيانات التجريبية",
 demoConfirm:"سيُحذف كل المحتوى التجريبي (الخلطات والمشاريع والمواد والمعدات والاختبارات والمستندات التجريبية) من مساحة العمل لكل المستخدمين. ما أضفته أنت لن يُحذف. هل تريد المتابعة؟",demoDone:"حُذف {n} عنصر تجريبي",
 roleHelp:"مدير النظام: كل الشاشات وإدارة المستخدمين · البحث والتطوير: كل الشاشات والتعديل ما عدا إدارة المستخدمين · الإنتاج: عرض لوحة المشاريع وورقة الإنتاج والملصقات فقط."});
Object.assign(T.en,{email:"Email",company:"Company name",signupTitle:"Create your company workspace",signupSub:"This creates a private workspace for your company with you as administrator. Add your team from the Users screen.",
 createOrg:"Create workspace",haveAccount:"I have an account — sign in",newCompany:"New company? Create a workspace",forgot:"Forgot password?",forgotTitle:"Reset your password",forgotSub:"Enter your email and we'll send a link to set a new password.",
 sendLink:"Send link",resetSent:"If that email is registered, a message will arrive in a few minutes.",checkEmail:"We sent a confirmation email to {e}. Open the link in it, then sign in.",
 recoverTitle:"Set a new password",noOrgTitle:"You're not in a workspace yet",noOrgSub:"Ask your company's administrator to add your email, or create a new workspace for your company.",
 loading:"Loading…",notConfirmed:"Email not confirmed yet. Open the confirmation link in your inbox.",userExists:"That email is already registered. Sign in instead.",noUser:"There's no account with that email yet.",
 rate:"Too many attempts. Wait a moment and try again.",netErr:"Couldn't reach the server. Check your connection.",emailBad:"Enter a valid email address.",
 stOk:"Synced",stSync:"Saving…",stOff:"Offline — changes kept on this device",stErr:"Couldn't save, retrying",stRO:"View only",
 workspace:"Workspace",sendReset:"Send password link",resetMailed:"Password link sent to {e}",remove:"Remove",
 tempPw:"Temporary password",userAddedMail:"User added. If email confirmation is on, they must open the confirmation email first.",
 hint:"Data is saved to your company workspace and syncs across devices.",authNote:"Accounts and company data are stored in Supabase. Only your company's members can see its data.",
 demoTitle:"Sample data",demoSub:"This workspace contains sample formulas, projects, materials and equipment that came with the prototype. Remove them to keep only your own data. Anything you added stays.",demoBtn:"Remove sample data",
 demoConfirm:"All sample content (formulas, projects, materials, equipment, tests and documents) will be removed from the workspace for every user. Anything you added is kept. Continue?",demoDone:"Removed {n} sample items",
 roleHelp:"Administrator: every screen plus user management · R&D: every screen with editing, except user management · Production: view projects, production sheet and labels only."});

const SEP="\u0001",PREFS=["lang","cur","batch","serving"],SKIP=new Set([...PREFS,"users"]);
let ORG=null,ORGNAME="",USER=null,members=[],synced=new Map(),lastSeen=null,channel=null;
let status="ok",pushTimer=null,pushing=false,again=false,cacheTimer=null,remoteQ=[],remoteTimer=null,deferRender=false;
let authMode="loading",authInfo="",recovering=false,bootedFor=null;

/* canonical JSON: jsonb reorders keys, so compare with sorted keys */
function canon(x){if(x===null||typeof x!=="object")return JSON.stringify(x===undefined?null:x);
 if(Array.isArray(x))return "["+x.map(canon).join(",")+"]";
 return "{"+Object.keys(x).filter(k=>x[k]!==undefined).sort().map(k=>JSON.stringify(k)+":"+canon(x[k])).join(",")+"}"}
const keyOf=(c,i)=>c+SEP+i;

function toRecs(st){const m=new Map();
 for(const k of Object.keys(st)){if(SKIP.has(k))continue;const v=st[k];if(v===undefined)continue;let shape="val";
  if(Array.isArray(v)&&v.every(x=>x&&typeof x==="object"&&!Array.isArray(x)&&x.id!=null&&x.id!=="")&&new Set(v.map(x=>String(x.id))).size===v.length){
   shape="arr";v.forEach((x,i)=>m.set(keyOf(k,"i:"+x.id),{coll:k,id:"i:"+x.id,data:{o:i,v:x}}))}
  else if(v&&typeof v==="object"&&!Array.isArray(v)){shape="map";Object.keys(v).forEach((id,i)=>m.set(keyOf(k,"k:"+id),{coll:k,id:"k:"+id,data:{o:i,v:v[id]}}))}
  else m.set(keyOf(k,"_"),{coll:k,id:"_",data:{v}});
  m.set(keyOf(k,"#"),{coll:k,id:"#",data:{t:shape}})}
 return m}
function fromRecs(m){const by={};for(const r of m.values())(by[r.coll]=by[r.coll]||[]).push(r);
 const out={};
 for(const c in by){const rs=by[c],meta=rs.find(r=>r.id==="#"),t=meta?meta.data.t:"val";
  if(t==="arr")out[c]=rs.filter(r=>r.id.startsWith("i:")).sort((a,b)=>a.data.o-b.data.o).map(r=>r.data.v);
  else if(t==="map"){out[c]={};rs.filter(r=>r.id.startsWith("k:")).sort((a,b)=>a.data.o-b.data.o).forEach(r=>out[c][r.id.slice(2)]=r.data.v)}
  else{const r=rs.find(r=>r.id==="_");out[c]=r?r.data.v:null}}
 return out}
window.FX_SYNC_TEST={canon,toRecs,fromRecs};

const canWrite=()=>!!ME&&(ME.role==="admin"||ME.role==="rnd");
function localDirty(){const d=new Map();if(!canWrite())return d;const cur=toRecs(S);
 for(const [k,r] of cur){const s=synced.get(k);if(!s||s.json!==canon(r.data))d.set(k,r)}
 for(const k of synced.keys())if(!cur.has(k))d.set(k,null);
 return d}
function rebuild(dirty){const m=new Map(synced);for(const [k,r] of dirty){if(r)m.set(k,r);else m.delete(k)}
 const c=fromRecs(m);for(const k of Object.keys(S))if(!SKIP.has(k)&&!(k in c))delete S[k];
 for(const k in c)S[k]=JSON.parse(JSON.stringify(c[k]));
 S.users=memberUsers()}
function setSynced(r){if(r.deleted||r.data==null){synced.delete(keyOf(r.coll,r.id));return}
 const j=canon(r.data);synced.set(keyOf(r.coll,r.id),{coll:r.coll,id:r.id,data:JSON.parse(j),json:j})}
function seen(r){if(r.updated_at&&(!lastSeen||r.updated_at>lastSeen))lastSeen=r.updated_at}

/* ---------- local cache (offline start) ---------- */
const cacheKey=()=>"fx-cloud:"+ORG;
function saveCache(){if(!ORG)return;try{const st={};for(const k of Object.keys(S))if(!SKIP.has(k))st[k]=S[k];
 localStorage.setItem(cacheKey(),JSON.stringify({synced:[...synced.values()].map(s=>({coll:s.coll,id:s.id,data:s.data})),S:st,lastSeen}));
 localStorage.setItem("fx-cloud-last",JSON.stringify({user:USER&&USER.id,org:ORG,orgName:ORGNAME,members}))}catch(e){}}
const saveCacheSoon=()=>{clearTimeout(cacheTimer);cacheTimer=setTimeout(saveCache,400)};
function loadCache(){try{return JSON.parse(localStorage.getItem(cacheKey())||"null")}catch(e){return null}}
function savePrefs(){try{const p={};PREFS.forEach(k=>p[k]=S[k]);localStorage.setItem("fx-prefs",JSON.stringify(p));localStorage.setItem("nakha-tab",tab)}catch(e){}}
try{const p=JSON.parse(localStorage.getItem("fx-prefs")||"null");if(p)PREFS.forEach(k=>{if(p[k]!==undefined)S[k]=p[k]})}catch(e){}

/* ---------- status chip ---------- */
function setStatus(s){status=s;const el=document.getElementById("fxSync");if(el){el.textContent=stText();el.dataset.s=s}}
const stText=()=>{const t=L();return !canWrite()&&ME?t.stRO:{ok:"● "+t.stOk,sync:"◌ "+t.stSync,off:"○ "+t.stOff,err:"! "+t.stErr}[status]};

/* ---------- push local changes ---------- */
function schedule(ms){clearTimeout(pushTimer);pushTimer=setTimeout(push,ms)}
async function push(){
 if(!ORG||!canWrite())return;if(pushing){again=true;return}
 const cur=toRecs(S),rows=[],done=[];
 for(const [k,r] of cur){const s=synced.get(k),j=canon(r.data);if(!s||s.json!==j){rows.push({org_id:ORG,coll:r.coll,id:r.id,data:JSON.parse(j),deleted:false});done.push(()=>synced.set(k,{coll:r.coll,id:r.id,data:JSON.parse(j),json:j}))}}
 for(const [k,s] of synced)if(!cur.has(k)){rows.push({org_id:ORG,coll:s.coll,id:s.id,data:null,deleted:true});done.push(()=>synced.delete(k))}
 if(!rows.length){setStatus("ok");return}
 pushing=true;setStatus("sync");
 try{for(let i=0;i<rows.length;i+=200){const {error}=await sb.from("records").upsert(rows.slice(i,i+200),{onConflict:"org_id,coll,id"});if(error)throw error}
  done.forEach(f=>f());saveCache();setStatus("ok")}
 catch(e){console.warn("FormuNex sync",e);setStatus(navigator.onLine?"err":"off");schedule(navigator.onLine?8000:30000)}
 finally{pushing=false;if(again){again=false;schedule(300)}}}

persist=function(){savePrefs();if(ORG){saveCacheSoon();if(canWrite())schedule(700)}};

/* ---------- pull remote changes ---------- */
function applyRows(rows,full){
 const dirty=localDirty();
 if(full)synced=new Map();
 rows.forEach(r=>{seen(r);setSynced(r)});
 rebuild(dirty);syncIng();saveCacheSoon();
 if(dirty.size)schedule(300);
 safeRender()}
function safeRender(){const a=document.activeElement;
 if(a&&a.closest&&a.closest("#view")&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)){deferRender=true;return}
 deferRender=false;render()}
document.addEventListener("focusout",()=>{if(deferRender)setTimeout(()=>{if(deferRender)safeRender()},50)});
function queueRemote(r){
 const s=synced.get(keyOf(r.coll,r.id));seen(r);
 if(r.deleted?!s:(s&&s.json===canon(r.data)))return; // our own echo or nothing new
 remoteQ.push(r);clearTimeout(remoteTimer);remoteTimer=setTimeout(()=>{const q=remoteQ;remoteQ=[];applyRows(q,false)},150)}
async function fetchRecords(since){const all=[];let from=0;
 for(;;){let q=sb.from("records").select("coll,id,data,deleted,updated_at").eq("org_id",ORG).order("coll").order("id").range(from,from+999);
  q=since?q.gte("updated_at",since):q.eq("deleted",false);
  const {data,error}=await q;if(error)throw error;all.push(...data);if(data.length<1000)break;from+=1000}
 return all}
async function catchUp(){if(!ORG)return;try{const rows=await fetchRecords(lastSeen);const fresh=rows.filter(r=>{const s=synced.get(keyOf(r.coll,r.id));return r.deleted?!!s:!(s&&s.json===canon(r.data))});
 rows.forEach(seen);if(fresh.length)applyRows(fresh,false);schedule(200)}catch(e){setStatus("off")}}
addEventListener("online",()=>{catchUp()});
addEventListener("offline",()=>setStatus("off"));

/* ---------- members ---------- */
const when=s=>{if(!s)return "";const d=new Date(s),p=n=>String(n).padStart(2,"0");return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`};
const memberUsers=()=>members.map(m=>({id:m.user_id,name:m.name,username:m.email,role:m.role,active:m.active,last:when(m.last_login)}));
async function loadMembers(){const {data,error}=await sb.from("members").select("user_id,email,name,role,active,last_login,created_at").eq("org_id",ORG).order("created_at");
 if(error)throw error;members=data;S.users=memberUsers();const me=members.find(m=>m.user_id===USER.id);
 if(me&&me.active)ME={id:me.user_id,name:me.name,username:me.email,role:me.role};else ME=null}

/* ---------- boot after sign-in ---------- */
function clearOrg(){if(channel){sb.removeChannel(channel);channel=null}ORG=null;ORGNAME="";members=[];synced=new Map();lastSeen=null;
 for(const k of Object.keys(S))if(!SKIP.has(k))delete S[k];S.users=[];ME=null}
/* the prototype's sample data: used to tell demo items apart from the company's own */
function demoState(){const s=seed();s.tests=s.tests||seedTests();s.mats=s.mats||seedMats();s.approved=s.approved||seedApproved();s.evals=s.evals||[];return s}
const blankForm=()=>({name:{ar:"تركيبة جديدة",en:"New formula"},ver:1,proj:"",upd:today(),rows:[],proc:[]});
/* a new company starts empty, with one blank formula so the workbench has something to open */
function seedOrg(){const d=demoState();
 for(const k of Object.keys(d))if(!SKIP.has(k))S[k]=Array.isArray(d[k])?[]:(d[k]&&typeof d[k]==="object")?{}:d[k];
 S.forms={f1:blankForm()};S.cur="f1"}
/* remove only the sample items (same ids as the prototype's demo data); everything the team added stays */
function removeDemo(){const d=demoState();let n=0;
 for(const k of Object.keys(d)){if(SKIP.has(k)||!S[k])continue;const dv=d[k];
  if(Array.isArray(dv)&&Array.isArray(S[k])){const ids=new Set(dv.filter(x=>x&&x.id!=null).map(x=>String(x.id))),js=new Set(dv.map(x=>canon(x)));
   const keep=S[k].filter(x=>!(x&&x.id!=null?ids.has(String(x.id)):js.has(canon(x))));n+=S[k].length-keep.length;S[k]=keep}
  else if(dv&&typeof dv==="object"&&S[k]&&typeof S[k]==="object")for(const id of Object.keys(dv))if(id in S[k]){delete S[k][id];n++}}
 const fids=new Set(Object.keys(S.forms||{}));
 (S.projects||[]).forEach(p=>{if(Array.isArray(p.forms))p.forms=p.forms.filter(f=>fids.has(f))});
 if(!S.forms||!Object.keys(S.forms).length){S.forms={["f"+Date.now().toString(36)]:blankForm()}}
 if(!S.forms[S.cur])S.cur=Object.keys(S.forms)[0];
 return n}
const hasDemo=()=>{const d=demoState();return Object.keys(d.forms).some(f=>S.forms&&S.forms[f]&&canon(S.forms[f].name)===canon(d.forms[f].name))||(S.projects||[]).some(p=>d.projects.some(q=>q.id===p.id&&q.en===p.en))};
async function boot(session){
 USER=session.user;bootedFor=USER.id;authInfo="";
 let ms=null;
 try{const {data,error}=await sb.from("members").select("org_id,role,active,orgs(name)").eq("user_id",USER.id);if(error)throw error;ms=data}
 catch(e){ // offline: reopen the last workspace from this device
  let last=null;try{last=JSON.parse(localStorage.getItem("fx-cloud-last")||"null")}catch(_){}
  if(last&&last.user===USER.id&&last.org){ORG=last.org;ORGNAME=last.orgName||"";members=last.members||[];S.users=memberUsers();
   const me=members.find(m=>m.user_id===USER.id);ME=me&&me.active?{id:me.user_id,name:me.name,username:me.email,role:me.role}:null;
   const c=loadCache();if(c){synced=new Map();(c.synced||[]).forEach(setSynced);lastSeen=c.lastSeen;Object.assign(S,c.S||{});syncIng()}
   setStatus("off");authMode="signin";render();return}
  authMode="signin";authInfo=L().netErr;render();return}
 const active=ms.filter(m=>m.active);
 if(!active.length){
  let pend=null;try{pend=JSON.parse(localStorage.getItem("fx-pending:"+(USER.email||"").toLowerCase())||"null")}catch(_){}
  if(!ms.length&&pend){const {error}=await sb.rpc("create_org",{p_name:pend.company,p_full_name:pend.name});
   try{localStorage.removeItem("fx-pending:"+(USER.email||"").toLowerCase())}catch(_){}
   if(!error)return boot(session)}
  ME=null;authMode=ms.length?"disabled":"noorg";render();return}
 let want=null;try{want=localStorage.getItem("fx-org")}catch(_){}
 const pick=active.find(m=>m.org_id===want)||active[0];
 ORG=pick.org_id;ORGNAME=(pick.orgs&&pick.orgs.name)||"";try{localStorage.setItem("fx-org",ORG)}catch(_){}
 await loadMembers();
 // start from this device's copy (keeps edits made offline), then bring in the server's
 const c=loadCache();synced=new Map();
 if(c){(c.synced||[]).forEach(setSynced);for(const k of Object.keys(S))if(!SKIP.has(k))delete S[k];Object.assign(S,c.S||{});lastSeen=c.lastSeen}
 else for(const k of Object.keys(S))if(!SKIP.has(k))delete S[k];
 setStatus("sync");
 const rows=await fetchRecords(null);
 if(!rows.length&&!c){if(canWrite()){seedOrg();synced=new Map();syncIng();render();await push()}}
 else applyRows(rows,true);
 if(!S.forms||!Object.keys(S.forms).length){seedOrg();syncIng()}
 subscribe();sb.rpc("touch_login",{p_org:ORG}).then(()=>{},()=>{});
 setStatus("ok");tab=allowedTabs().includes(tab)?tab:"dash";render()}
function subscribe(){if(channel)sb.removeChannel(channel);
 channel=sb.channel("fx-"+ORG)
  .on("postgres_changes",{event:"*",schema:"public",table:"records",filter:"org_id=eq."+ORG},p=>{if(p.new&&p.new.coll)queueRemote(p.new)})
  .on("postgres_changes",{event:"*",schema:"public",table:"members",filter:"org_id=eq."+ORG},()=>{loadMembers().then(()=>{if(!ME){authMode="disabled";clearOrg()}safeRender()},()=>{})})
  .subscribe(s=>{if(s==="SUBSCRIBED")catchUp()})}

sb.auth.onAuthStateChange((ev,session)=>{setTimeout(()=>{
 if(ev==="PASSWORD_RECOVERY"){recovering=true;authMode="recover";ME=null;render();return}
 if(ev==="SIGNED_OUT"||!session){bootedFor=null;clearOrg();authMode=authMode==="loading"?"signin":authMode;render();return}
 if(recovering)return;
 if((ev==="INITIAL_SESSION"||ev==="SIGNED_IN")&&bootedFor!==session.user.id)boot(session).catch(e=>{console.warn(e);authMode="signin";authInfo=L().netErr;render()})
},0)});

async function signOut(){try{if(ORG)localStorage.removeItem(cacheKey());localStorage.removeItem("fx-cloud-last")}catch(e){}
 clearOrg();bootedFor=null;authMode="signin";chatLog=[];render();try{await sb.auth.signOut()}catch(e){}}

/* ---------- error text ---------- */
function errText(e){const T=L(),m=String(e&&(e.message||e.code)||e||"");
 if(/last_admin/.test(m))return T.lastAdmin;if(/no_user/.test(m))return T.noUser;if(/not_admin/.test(m))return T.disabledUser;
 if(/Invalid login credentials/i.test(m))return T.badLogin;if(/not confirmed/i.test(m))return T.notConfirmed;
 if(/already (registered|exists)/i.test(m))return T.userExists;if(/rate|too many|429/i.test(m))return T.rate;
 if(/fetch|network|Failed to/i.test(m))return T.netErr;if(/password/i.test(m)&&/(6|8|characters|weak)/i.test(m))return T.pwShort;return m}
const okEmail=s=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

/* ---------- sign-in screens ---------- */
vAuth=function(){const T=L();
 const f=(id,lbl,type="text",ac="")=>`<label class="field">${lbl}<input id="${id}" type="${type}" ${ac?`autocomplete="${ac}"`:""} ${type==="email"?'dir="ltr"':""} required></label>`;
 const M={
  loading:[T.loading,"",""],
  signin:[T.login,T.loginSub,f("au_email",T.email,"email","email")+f("au_pw",T.password,"password","current-password")],
  signup:[T.signupTitle,T.signupSub,f("au_company",T.company,"text","organization")+f("au_name",T.fullName,"text","name")+f("au_email",T.email,"email","email")+f("au_pw",T.password,"password","new-password")+f("au_pw2",T.confirmPw,"password","new-password")],
  forgot:[T.forgotTitle,T.forgotSub,f("au_email",T.email,"email","email")],
  recover:[T.recoverTitle,"",f("au_pw",T.newPw,"password","new-password")+f("au_pw2",T.confirmPw,"password","new-password")],
  noorg:[T.noOrgTitle,T.noOrgSub,f("au_company",T.company,"text","organization")+f("au_name",T.fullName,"text","name")],
  disabled:[T.disabledUser,"",""],
  sent:["",authInfo,""]}[authMode]||[T.login,"",""];
 const btn={signin:T.signIn,signup:T.createOrg,forgot:T.sendLink,recover:T.changePw,noorg:T.createOrg}[authMode];
 const links={signin:[["signup",T.newCompany],["forgot",T.forgot]],signup:[["signin",T.haveAccount]],forgot:[["signin",T.haveAccount]],sent:[["signin",T.haveAccount]],noorg:[["out",T.logout]],disabled:[["out",T.logout]]}[authMode]||[];
 return `<div class="authwrap"><div class="panel authcard stack">
  <div class="brand"><div class="mark">F</div><div><b>FormuNex</b><small>${T.tagline}</small></div></div>
  ${M[0]||M[1]?`<div>${M[0]?`<h1 style="font-size:22px">${M[0]}</h1>`:""}${M[1]?`<p class="sub" style="margin-top:4px">${esc(M[1])}</p>`:""}</div>`:""}
  ${btn?`<form id="authForm" class="stack" novalidate>${M[2]}
   <div id="authErr" class="warnline" role="alert">${authMode!=="sent"&&authInfo?esc(authInfo):""}</div>
   <button class="btn primary" type="submit" id="authBtn" style="justify-content:center;padding-block:10px">${btn}</button></form>`:""}
  <div class="toolbar" style="justify-content:space-between;flex-wrap:wrap">${links.map(([m,l])=>`<button class="btn ghost" type="button" data-am="${m}">${l}</button>`).join("")}<button class="btn ghost" type="button" id="authLang">${lg()==="ar"?"English":"العربية"}</button></div>
  <p class="sub" style="font-size:12px;margin:0">${T.authNote}</p></div></div>`};

bindAuth=function(){const T=L();
 v("authLang").onclick=()=>{S.lang=lg()==="ar"?"en":"ar";savePrefs();render()};
 document.querySelectorAll("[data-am]").forEach(b=>b.onclick=()=>{if(b.dataset.am==="out"){signOut();return}authMode=b.dataset.am;authInfo="";render()});
 const form=v("authForm");if(!form)return;
 const val=id=>{const e=v(id);return e?e.value:""},err=m=>{v("authErr").textContent=m};
 const first=form.querySelector("input");if(first)first.focus();
 form.onsubmit=async e=>{e.preventDefault();const btn=v("authBtn");err("");
  const email=val("au_email").trim().toLowerCase(),pw=val("au_pw"),pw2=val("au_pw2");
  if(v("au_email")&&!okEmail(email)){err(T.emailBad);return}
  if((authMode==="signup"||authMode==="noorg")&&(!val("au_company").trim()||!val("au_name").trim())){err(T.company+" / "+T.fullName+"؟");return}
  if((authMode==="signup"||authMode==="recover")){if(pw.length<8){err(T.pwShort);return}if(pw!==pw2){err(T.pwMismatch);return}}
  btn.disabled=true;
  try{
   if(authMode==="signin"){const {error}=await sb.auth.signInWithPassword({email,password:pw});if(error)throw error;authMode="loading";render()}
   else if(authMode==="signup"){
    try{localStorage.setItem("fx-pending:"+email,JSON.stringify({company:val("au_company").trim(),name:val("au_name").trim()}))}catch(_){}
    const {data,error}=await sb.auth.signUp({email,password:pw,options:{emailRedirectTo:APP_URL,data:{full_name:val("au_name").trim()}}});if(error)throw error;
    if(data.user&&data.user.identities&&!data.user.identities.length)throw new Error("already registered");
    if(!data.session){authMode="sent";authInfo=T.checkEmail.replace("{e}",email);render()}else{authMode="loading";render()}}
   else if(authMode==="forgot"){const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:APP_URL});if(error)throw error;authMode="sent";authInfo=T.resetSent;render()}
   else if(authMode==="recover"){const {data,error}=await sb.auth.updateUser({password:pw});if(error)throw error;recovering=false;toast(T.pwChanged);history.replaceState(null,"",APP_URL);
    authMode="loading";render();const {data:{session}}=await sb.auth.getSession();if(session)await boot(session)}
   else if(authMode==="noorg"){const {error}=await sb.rpc("create_org",{p_name:val("au_company").trim(),p_full_name:val("au_name").trim()});if(error)throw error;
    authMode="loading";render();const {data:{session}}=await sb.auth.getSession();await boot(session)}
  }catch(x){btn.disabled=false;err(errText(x))}}};

/* ---------- users & my account ---------- */
vUsers=function(){const T=L(),R=r=>ROLES[r]?ROLES[r][lg()]:r;
 const mine=`<div class="panel stack"><h2>${T.account}</h2>
  <div class="spec-grid"><span>${T.fullName}</span><b>${esc(ME.name)}</b><span>${T.email}</span><b><bdi dir="ltr">${esc(ME.username)}</bdi></b><span>${T.role}</span><b>${R(ME.role)}</b><span>${T.workspace}</span><b>${esc(ORGNAME)}</b></div>
  <form id="pwForm" class="stack"><h3>${T.changePw}</h3><div class="fgrid">
   <label class="field">${T.currentPw}<input id="pw_cur" type="password" autocomplete="current-password"></label>
   <label class="field">${T.newPw}<input id="pw_new" type="password" autocomplete="new-password"></label>
   <label class="field">${T.confirmPw}<input id="pw_new2" type="password" autocomplete="new-password"></label></div>
   <div id="pwErr" class="warnline" role="alert"></div><button class="btn primary" type="submit" style="align-self:flex-start">${T.changePw}</button></form></div>`;
 if(!isAdmin())return header(T.account,T.accountSub)+mine;
 const list=`<div class="panel stack"><div class="toolbar" style="justify-content:space-between"><h2 style="margin:0">${T.usersList} (${S.users.length})</h2></div>
  <div class="tablewrap"><table><thead><tr><th>${T.fullName}</th><th>${T.email}</th><th>${T.role}</th><th>${T.status}</th><th>${T.lastLogin}</th><th></th></tr></thead><tbody>
  ${S.users.map(u=>`<tr style="${u.active===false?"opacity:.55":""}"><td><b>${esc(u.name)}</b>${u.id===ME.id?` <span class="tag">${T.you}</span>`:""}</td><td><bdi dir="ltr">${esc(u.username)}</bdi></td>
   <td><select data-urole="${u.id}" ${u.id===ME.id?"disabled":""}>${Object.keys(ROLES).map(r=>`<option value="${r}" ${u.role===r?"selected":""}>${R(r)}</option>`).join("")}</select></td>
   <td><span class="pill ${u.active===false?"st-discovery":"st-validation"}">${u.active===false?T.inactive:T.active}</span></td><td style="font-size:12.5px">${u.last?`<bdi dir="ltr" style="font-family:var(--f-mono)">${u.last}</bdi>`:`<span class="sub">${T.never}</span>`}</td>
   <td style="white-space:nowrap"><button class="mini" data-ux="mail" data-uid="${u.id}">${T.sendReset}</button>${u.id!==ME.id?`<button class="mini" data-ux="toggle" data-uid="${u.id}">${u.active===false?T.activate:T.deactivate}</button><button class="x" data-ux="del" data-uid="${u.id}" aria-label="${T.remove}">✕</button>`:""}</td></tr>`).join("")}
  </tbody></table></div><p class="sub" style="margin:0;font-size:12.5px">${T.roleHelp}</p></div>`;
 const add=`<form id="addUser" class="panel stack"><h2>${T.addUser}</h2><div class="fgrid">
  <label class="field">${T.fullName}<input id="nu_name" autocomplete="off"></label><label class="field">${T.email}<input id="nu_email" type="email" dir="ltr" autocomplete="off"></label>
  <label class="field">${T.role}<select id="nu_role">${Object.keys(ROLES).map(r=>`<option value="${r}" ${r==="rnd"?"selected":""}>${R(r)}</option>`).join("")}</select></label>
  <label class="field">${T.tempPw}<input id="nu_pw" type="password" autocomplete="new-password"></label></div>
  <div id="nuErr" class="warnline" role="alert"></div><button class="btn primary" type="submit" style="align-self:flex-start">${T.saveUser}</button></form>`;
 const demo=hasDemo()?`<div class="panel stack"><h2>${T.demoTitle}</h2><p class="sub" style="margin:0">${T.demoSub}</p><button class="btn" id="fxDemo" type="button" style="align-self:flex-start">${T.demoBtn}</button></div>`:"";
 return header(T.users,T.usersSub)+`<div class="stack">${demo}${list}<div class="grid g2">${add}${mine}</div></div>`};

bindUsers=function(){const T=L();
 v("pwForm").onsubmit=async e=>{e.preventDefault();const er=m=>v("pwErr").textContent=m;const cur=v("pw_cur").value,n1=v("pw_new").value,n2=v("pw_new2").value;
  if(n1.length<8){er(T.pwShort);return}if(n1!==n2){er(T.pwMismatch);return}
  const a=await sb.auth.signInWithPassword({email:ME.username,password:cur});if(a.error){er(/Invalid/i.test(a.error.message)?T.wrongPw:errText(a.error));return}
  const {error}=await sb.auth.updateUser({password:n1});if(error){er(errText(error));return}render();toast(T.pwChanged)};
 if(!isAdmin())return;
 const call=async(fn,args)=>{const {error}=await sb.rpc(fn,args);if(error){toast(errText(error));await loadMembers().catch(()=>{});render();return false}await loadMembers();render();return true};
 v("addUser").onsubmit=async e=>{e.preventDefault();const er=m=>v("nuErr").textContent=m;
  const name=v("nu_name").value.trim(),email=v("nu_email").value.trim().toLowerCase(),pw=v("nu_pw").value,role=v("nu_role").value;
  if(!name){er(T.fullName+"؟");return}if(!okEmail(email)){er(T.emailBad);return}if(pw.length<8){er(T.pwShort);return}
  const btn=e.submitter||v("addUser").querySelector("button");btn.disabled=true;
  try{const tmp=window.supabase.createClient(CFG.supabaseUrl,CFG.supabaseAnonKey,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false,storageKey:"fx-tmp-signup"}});
   const {error}=await tmp.auth.signUp({email,password:pw,options:{emailRedirectTo:APP_URL,data:{full_name:name}}});
   if(error&&!/already/i.test(error.message))throw error;
   const r=await sb.rpc("add_member",{p_org:ORG,p_email:email,p_name:name,p_role:role});if(r.error)throw r.error;
   await loadMembers();render();toast(T.userAddedMail)}
  catch(x){btn.disabled=false;er(errText(x))}};
 const db=v("fxDemo");if(db)db.onclick=()=>{if(!confirm(T.demoConfirm))return;const n=removeDemo();persist();render();toast(T.demoDone.replace("{n}",n))};
 document.querySelectorAll("[data-urole]").forEach(el=>el.onchange=()=>call("update_member",{p_org:ORG,p_user:el.dataset.urole,p_role:el.value,p_active:null}).then(ok=>ok&&toast(T.saved)));
 document.querySelectorAll("[data-ux]").forEach(b=>b.onclick=async()=>{const a=b.dataset.ux,u=S.users.find(x=>x.id===b.dataset.uid);if(!u)return;
  if(a==="mail"){const {error}=await sb.auth.resetPasswordForEmail(u.username,{redirectTo:APP_URL});toast(error?errText(error):T.resetMailed.replace("{e}",u.username));return}
  if(a==="toggle")call("update_member",{p_org:ORG,p_user:u.id,p_role:null,p_active:u.active===false});
  if(a==="del"&&confirm(T.remove+": "+u.name+"?"))call("remove_member",{p_org:ORG,p_user:u.id})})};

/* ---------- shell: sync chip, sign-out, no demo reset ---------- */
const baseShell=shell;
shell=function(){baseShell();
 document.getElementById("resetBtn").hidden=true;
 const lo=document.getElementById("logoutBtn");if(lo)lo.onclick=signOut;
 const ub=document.getElementById("userBox");
 if(ME&&ub){const c=document.createElement("div");c.id="fxSync";c.className="fxsync";c.dataset.s=canWrite()?status:"ro";c.textContent=stText();c.title=ORGNAME;ub.appendChild(c)}};
const st=document.createElement("style");
st.textContent=`.fxsync{font-size:11.5px;color:var(--side-mute);margin-top:6px;white-space:nowrap}.fxsync[data-s=ok]{color:#8fd1ac}.fxsync[data-s=err]{color:#f0a097}.fxsync[data-s=off]{color:#e7c27d}
@media (max-width:760px){.fxsync{margin:0 6px}}`;
document.head.appendChild(st);

loadSession=function(){};
ME=null;S.users=[];clearOrg();render();
})();
