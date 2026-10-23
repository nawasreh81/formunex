/* ---------- FormuNex book library: PDF, Word and image books as references, searched by page ----------
   Books are stored in the company's Supabase workspace (see supabase/library.sql):
   the file goes to the private "library" bucket, scanned pages and images are read with OCR (Tesseract.js),
   its text is split into passages per page
   and indexed with Postgres full-text search. The assistant adds matching passages
   (book + page) to its answers. Needs the Supabase connection from config.js. */
(()=>{
Object.assign(T.ar,{lib:"مكتبة الكتب",libSub:"ارفع كتباً بصيغة PDF أو Word أو صور لتكون مرجعاً للبرنامج. يبحث المساعد فيها ويعرض الفقرات المناسبة مع اسم الكتاب ورقم الصفحة.",
 libUpload:"رفع كتب (PDF / Word / صور)",libSearch:"ابحث في الكتب…",libBooks:"الكتب",libNone:"لا توجد كتب بعد. ارفع أول كتاب.",libPages:"{n} صفحة",libOpen:"فتح",libDel:"حذف",
 libDelQ:"حذف الكتاب «{t}» ونصه من المكتبة لكل المستخدمين؟",libReading:"جارٍ قراءة «{t}»: صفحة {p} من {n}",libSaving:"جارٍ حفظ «{t}»…",libAdded:"أُضيف «{t}» ({n} صفحة)",
 libNoText:"«{t}» لا يحتوي نصاً قابلاً للقراءة، فلم يُضف.",libNotPdf:"«{t}» صيغة غير مدعومة. المدعوم: PDF و Word (.docx) والصور (JPG / PNG).",libOcrQ:"«{t}» فيه {n} صفحة مصوّرة. قراءتها بالتعرّف الضوئي (OCR) تستغرق حوالي {m} دقيقة، ودقتها أقل من النص العادي. أبقِ الصفحة مفتوحة. متابعة؟",libOcr:"تعرّف ضوئي (OCR) على «{t}»: صفحة {p} من {n}",libOcrLoad:"تحميل أداة التعرّف الضوئي (أول مرة فقط)…",libFileFail:"حُفظ نص «{t}» لكن تعذّر رفع الملف الأصلي ({e}).",
 libErr:"تعذّر إضافة «{t}»: {e}",libResults:"{n} نتيجة",libNoRes:"لم أجد شيئاً في الكتب عن هذا.",libNeedCloud:"مكتبة الكتب تحتاج الاتصال بمساحة عمل الشركة (Supabase).",
 libNeedSql:"المكتبة غير مفعّلة في قاعدة البيانات بعد. شغّل ملف supabase/library.sql في Supabase مرة واحدة.",libRO:"يمكنك البحث والقراءة. رفع الكتب وحذفها للمدير وفريق البحث والتطوير.",
 libFromBooks:"من مكتبة الكتب:",libAsking:"أبحث في مكتبة الكتب…",libAskNone:"لم أجد في الكتب فقرة تطابق سؤالك. جرّب كلمات أدق، مثل اسم المادة أو العملية (مثلاً: «ليسيثين» أو «تبلور السكر»).",libAskEmpty:"لا توجد كتب في المكتبة بعد. ارفع كتاباً من «مكتبة الكتب» ثم اسألني.",libAskSql:"مكتبة الكتب غير مفعّلة بعد في قاعدة البيانات. شغّل ملف supabase/library.sql في Supabase مرة واحدة، ثم أعد فتح التطبيق.",libAskErr:"تعذّر البحث في الكتب الآن ({e}). تأكد من الاتصال بالإنترنت.",libChunks:"مقاطع",libLog:"سجل الرفع",libClear:"مسح",libLogHint:"إذا ظهر خطأ، صوّر هذه الرسالة وأرسلها.",libNoIdx:"لم يُفهرس، احذفه وارفعه مجدداً",libPage:"صفحة {p}",libAdded2:"أُضيف",libNoFile:"النص فقط"});
Object.assign(T.en,{lib:"Book library",libSub:"Upload books as PDF, Word or images to use as references. The assistant searches them and shows matching passages with the book and page.",
 libUpload:"Upload books (PDF / Word / images)",libSearch:"Search the books…",libBooks:"Books",libNone:"No books yet. Upload your first book.",libPages:"{n} pages",libOpen:"Open",libDel:"Delete",
 libDelQ:"Delete “{t}” and its text from the library for everyone?",libReading:"Reading “{t}”: page {p} of {n}",libSaving:"Saving “{t}”…",libAdded:"Added “{t}” ({n} pages)",
 libNoText:"“{t}” has no readable text, so it was not added.",libNotPdf:"“{t}” is not a supported format. Supported: PDF, Word (.docx) and images (JPG / PNG).",libOcrQ:"“{t}” has {n} scanned pages. Reading them with OCR takes about {m} min and is less accurate than normal text. Keep this page open. Continue?",libOcr:"OCR on “{t}”: page {p} of {n}",libOcrLoad:"Loading the OCR engine (first time only)…",libFileFail:"Saved the text of “{t}” but couldn't upload the original file ({e}).",
 libErr:"Couldn't add “{t}”: {e}",libResults:"{n} results",libNoRes:"Nothing in the books about this.",libNeedCloud:"The book library needs the company workspace connection (Supabase).",
 libNeedSql:"The library isn't set up in the database yet. Run supabase/library.sql in Supabase once.",libRO:"You can search and read. Uploading and deleting books is for administrators and R&D.",
 libFromBooks:"From the book library:",libAsking:"Searching the book library…",libAskNone:"I found no passage in the books that matches your question. Try more specific words, like an ingredient or process name.",libAskEmpty:"There are no books in the library yet. Upload one in “Book library”, then ask me.",libAskSql:"The book library isn't set up in the database yet. Run supabase/library.sql in Supabase once, then reopen the app.",libAskErr:"Couldn't search the books right now ({e}). Check the internet connection.",libChunks:"Passages",libLog:"Upload log",libClear:"Clear",libLogHint:"If you see an error, take a screenshot of this message and send it.",libNoIdx:"Not indexed: delete and upload again",libPage:"page {p}",libAdded2:"Added",libNoFile:"text only"});

IC.lib='<path d="M4 19V5a2 2 0 0 1 2-2h5v16H6a2 2 0 0 0-2 2z"/><path d="M20 19V5a2 2 0 0 0-2-2h-5v16h5a2 2 0 0 1 2 2z"/><path d="M4 21h7M13 21h7"/>';
ALL_TABS.splice(ALL_TABS.indexOf("know")+1,0,"lib");

/* Arabic-aware normalisation, used for both stored passages and queries */
const STRIP=/^(وال|بال|كال|فال|لل|ال)(?=..)/;
function norm(s){return String(s||"").normalize("NFKC").toLowerCase()
 .replace(/[ً-ٰٟـ]/g,"").replace(/[إأآٱ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").replace(/ؤ/g,"و").replace(/ئ/g,"ي")
 .replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[^\p{L}\p{N}\s]/gu," ").split(/\s+/).filter(Boolean).map(w=>w.replace(STRIP,"")).join(" ")}
const STOP=new Set("في من على الى عن مع او ان هذا هذه ذلك التي الذي الذين كيف ما ماذا ماهي ماهو هل لماذا متى اين كم و يا هي هو هم انا انت لي لنا ممكن يمكن اريد اعرف اشرح قل عند بين ثم كل اي ايش شو حول اكثر افضل لو اذا كتاب كتب الكتاب الكتب the a an of to in on for and or is are how what why which with from by do does did i you my your can could should about".split(" ").map(w=>norm(w)));
// light stemming for the query only: passages are matched by substring on the server, so a shorter stem still finds
// "بالليسيثين", "والسكريات" or "emulsifiers"
const stem=w=>{if(/^[a-z]/.test(w))return w.length>5?w.replace(/(ies|es|s|ing|ed)$/,""):w;
 if(w.length>4)w=w.replace(/^[وفبلك]/,"");if(w.length>4)w=w.replace(/(ات|ون|ين|ها|هم|يه|يا)$/,"");if(w.length>4)w=w.replace(/[هي]$/,"");return w};
const queryOf=q=>[...new Set(norm(q).split(" ").filter(w=>w.length>1&&!STOP.has(w)).map(stem).filter(w=>w.length>2))].slice(0,12).join(" ");
window.FX_LIB_TEST={norm,queryOf};

/* split one page into passages of about 900 characters, at sentence or word boundaries */
function chunks(text){const t=text.replace(/\s+/g," ").trim();const out=[];let i=0;
 while(i<t.length){let j=Math.min(t.length,i+900);
  if(j<t.length){const cut=Math.max(t.lastIndexOf(". ",j),t.lastIndexOf("۔",j),t.lastIndexOf("؟",j),t.lastIndexOf("! ",j));j=cut>i+400?cut+1:(t.lastIndexOf(" ",j)>i+400?t.lastIndexOf(" ",j):j)}
  const s=t.slice(i,j).trim();if(s.length>20)out.push(s);i=j}
 return out}

let logs=[];let books=null,loading=false,missing=false,q="",results=null,searching=false,prog="",busy=false;
const ctx=()=>window.FX_CTX?window.FX_CTX():null;
const fill=(s,o)=>Object.entries(o).reduce((a,[k,v])=>a.split("{"+k+"}").join(v),s);
async function loadBooks(){const c=ctx();if(!c||!c.org||loading)return;loading=true;
 try{const {data,error}=await c.sb.from("books").select("id,title,file_name,file_path,pages,created_at").eq("org_id",c.org).order("created_at",{ascending:false});
  if(error){missing=/relation|schema cache|does not exist|PGRST205|42P01/i.test((error.message||"")+(error.code||""));books=[];
   if(!missing)logs.unshift({ok:false,msg:errText(error),at:new Date().toTimeString().slice(0,5)})}
  else{missing=false;books=data||[];
   // passages per book, so a book whose text was not saved stands out
   await Promise.all(books.map(b=>c.sb.from("book_chunks").select("id",{count:"exact",head:true}).eq("book_id",b.id)
    .then(r=>{b.chunks=r.error?null:r.count||0},()=>{b.chunks=null})))}}
 catch(x){books=books||[];logs.unshift({ok:false,msg:errText(x),at:new Date().toTimeString().slice(0,5)})}
 loading=false;if(tab==="lib")render()}
async function search(text,limit){const c=ctx(),qq=queryOf(text);if(!c||!c.org||!qq)return [];
 const {data,error}=await c.sb.rpc("search_books",{p_org:c.org,p_query:qq,p_limit:limit||10});if(error)throw error;return data||[]}

function mark(s,text){let h=esc(s);const ws=queryOf(text).split(" ").filter(w=>w.length>1);
 if(!ws.length)return h;
 // highlight on the shown text: match each normalised word loosely (Arabic letter variants, optional "ال")
 const cls=ch=>({"ا":"[اأإآٱ]","ي":"[يىئ]","ه":"[هة]","و":"[وؤ]"}[ch]||ch.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));
 const re=new RegExp("("+ws.map(w=>[...w].map(cls).join("[\\u064B-\\u065F\\u0640]*")).join("|")+")","gi");
 return h.replace(re,"<mark>$1</mark>")}
function snippet(s,text){const t=String(s);if(t.length<=420)return mark(t,text);
 const first=queryOf(text).split(" ")[0]||"";const n=norm(t);let at=first?n.indexOf(first):-1;
 at=at<0?0:Math.max(0,Math.round(at*t.length/Math.max(1,n.length))-120);
 return (at>0?"… ":"")+mark(t.slice(at,at+420),text)+(at+420<t.length?" …":"")}
const resultHTML=(r,text)=>`<div class="libres"><div class="libref"><b>${esc(r.title)}</b> · ${fill(L().libPage,{p:r.page})}</div><div class="libtxt">${snippet(r.content,text)}</div></div>`;

window.vLib=function(){const T=L(),c=ctx();
 if(!window.FX_CLOUD||!c||!c.org)return header(T.lib,T.libSub)+`<div class="panel"><p class="sub" style="margin:0">${T.libNeedCloud}</p></div>`;
 if(books===null){loadBooks();return header(T.lib,T.libSub)+`<div class="panel"><p class="sub" style="margin:0">${T.loading||"…"}</p></div>`}
 if(missing)return header(T.lib,T.libSub)+`<div class="panel"><p class="warnline" style="margin:0">${T.libNeedSql}</p></div>`;
 const up=c.canWrite?`<label class="btn primary" style="cursor:pointer">＋ ${T.libUpload}<input id="libFile" type="file" accept=".pdf,.docx,.doc,.jpg,.jpeg,.png,.webp,application/pdf,image/*" multiple hidden ${busy?"disabled":""}></label>`:`<span class="sub" style="font-size:12.5px">${T.libRO}</span>`;
 const res=results===null?"":`<div class="panel stack"><h2 style="margin:0">${results.length?fill(T.libResults,{n:results.length}):T.libNoRes}</h2>${results.map(r=>resultHTML(r,q)).join("")}</div>`;
 const list=books.length?`<div class="tablewrap"><table><thead><tr><th>${T.libBooks}</th><th class="num">${fill(T.libPages,{n:""}).trim()}</th><th class="num">${T.libChunks}</th><th>${T.libAdded2}</th><th></th></tr></thead><tbody>
  ${books.map(b=>`<tr><td><b>${esc(b.title)}</b></td><td class="num">${b.pages}</td><td class="num">${b.chunks==null?"—":b.chunks?b.chunks:`<span class="warnline" style="font-size:12px">0 · ${T.libNoIdx}</span>`}</td><td style="font-size:12.5px"><bdi dir="ltr" style="font-family:var(--f-mono)">${esc(String(b.created_at).slice(0,10))}</bdi></td>
   <td style="white-space:nowrap">${b.file_path?`<button class="mini" data-lopen="${b.id}">${T.libOpen}</button>`:`<span class="sub" style="font-size:12px">${T.libNoFile}</span>`}${c.canWrite?`<button class="x" data-ldel="${b.id}" aria-label="${T.libDel}">✕</button>`:""}</td></tr>`).join("")}
  </tbody></table></div>`:`<p class="sub" style="margin:0">${T.libNone}</p>`;
 return header(T.lib,T.libSub,up)+`<div class="stack">
  <form id="libForm" class="toolbar" style="flex-wrap:nowrap"><input id="libQ" type="search" placeholder="${T.libSearch}" value="${esc(q)}" style="flex:1;min-width:0"><button class="btn" type="submit" ${searching?"disabled":""}>${T.send||"⌕"}</button></form>
  ${prog?`<div class="panel"><p class="sub" style="margin:0" id="libProg">${esc(prog)}</p></div>`:""}
  ${logs.length?`<div class="panel stack"><div class="toolbar" style="justify-content:space-between"><h2 style="margin:0">${T.libLog}</h2><button class="mini" id="libLogClr">${T.libClear}</button></div>
   ${logs.some(l=>!l.ok)?`<p class="sub" style="margin:0">${T.libLogHint}</p>`:""}
   ${logs.map(l=>`<div style="font-size:13.5px;line-height:1.7;${l.ok?"":"color:var(--bad,#e06c6c)"}"><bdi dir="ltr" style="font-family:var(--f-mono);opacity:.7">${l.at}</bdi> ${l.ok?"✓":"⚠"} ${esc(l.msg)}</div>`).join("")}</div>`:""}
  ${res}<div class="panel stack"><h2 style="margin:0">${T.libBooks} (${books.length})</h2>${list}</div></div>`};

window.bindLib=function(){const T=L(),c=ctx();if(!c||!c.org)return;
 const f=v("libForm");if(f)f.onsubmit=async e=>{e.preventDefault();q=v("libQ").value;if(!q.trim()){results=null;render();return}
  searching=true;try{results=await search(q,20)}catch(x){results=[];toast(String(x.message||x))}searching=false;render()};
 const lc=v("libLogClr");if(lc)lc.onclick=()=>{logs=[];render()};
 const inp=v("libFile");if(inp)inp.onchange=()=>{const fs=[...inp.files];if(fs.length)addBooks(fs)};
 document.querySelectorAll("[data-lopen]").forEach(b=>b.onclick=async()=>{const bk=books.find(x=>x.id===b.dataset.lopen);if(!bk)return;
  const w=window.open("about:blank","_blank");const {data,error}=await c.sb.storage.from("library").createSignedUrl(bk.file_path,3600);
  if(error){if(w)w.close();toast(String(error.message||error));return}if(w)w.location=data.signedUrl;else location.href=data.signedUrl});
 document.querySelectorAll("[data-ldel]").forEach(b=>b.onclick=async()=>{const bk=books.find(x=>x.id===b.dataset.ldel);if(!bk||!confirm(fill(T.libDelQ,{t:bk.title})))return;
  const {error}=await c.sb.from("books").delete().eq("id",bk.id);if(error){toast(String(error.message||error));return}
  if(bk.file_path)c.sb.storage.from("library").remove([bk.file_path]).catch(()=>{});
  books=books.filter(x=>x.id!==bk.id);results=null;render()})};

function note(ok,msg){logs.unshift({ok,msg,at:new Date().toTimeString().slice(0,5)});logs=logs.slice(0,20);toast(msg);if(tab==="lib")render()}
function setProg(s){prog=s;const el=v("libProg");if(el)el.textContent=s;else if(tab==="lib")render()}
/* OCR: Tesseract.js in the browser, Arabic + English; window.FX_OCR can override the file locations */
const TESS="https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js";
let ocrWorker=null;
async function ocr(img,label){if(!ocrWorker){setProg(L().libOcrLoad);await loadScript((window.FX_OCR&&window.FX_OCR.script)||TESS);
  ocrWorker=await window.Tesseract.createWorker(["ara","eng"],1,Object.assign({},window.FX_OCR&&window.FX_OCR.opts))}
 if(label)setProg(label);const {data}=await ocrWorker.recognize(img);return data.text||""}
async function endOcr(){if(ocrWorker){const w=ocrWorker;ocrWorker=null;await w.terminate().catch(()=>{})}}
const hasText=s=>norm(s).replace(/\s/g,"").length>=25;
const kindOf=f=>{const e=(f.name.split(".").pop()||"").toLowerCase();
 return e==="pdf"||f.type==="application/pdf"?"pdf":e==="docx"?"docx":e==="doc"?"doc":(/^(jpe?g|png|webp|bmp|gif)$/.test(e)||/^image\//.test(f.type))?"image":null};
async function readPdf(file,title){await loadScript(LIBS.pdfw);await loadScript(LIBS.pdf);const lib=window.pdfjsLib;lib.GlobalWorkerOptions.workerSrc=LIBS.pdfw;
 const doc=await lib.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;const pages=[];
 for(let p=1;p<=doc.numPages;p++){if(p%5===1||p===doc.numPages)setProg(fill(L().libReading,{t:title,p,n:doc.numPages}));
  const pg=await doc.getPage(p);const tc=await pg.getTextContent();let s="";
  tc.items.forEach(i=>{s+=i.str+(i.hasEOL?"\n":" ")});pages.push(s);pg.cleanup&&pg.cleanup()}
 // scanned pages: no text layer, so render them and read them with OCR
 const scan=pages.map((s,i)=>hasText(s)?-1:i).filter(i=>i>=0);
 if(scan.length&&confirm(fill(L().libOcrQ,{t:title,n:scan.length,m:Math.max(1,Math.ceil(scan.length*7/60))}))){
  let k=0;for(const i of scan){const label=fill(L().libOcr,{t:title,p:++k,n:scan.length});setProg(label);
   const pg=await doc.getPage(i+1),vp=pg.getViewport({scale:2});const cv=document.createElement("canvas");cv.width=vp.width;cv.height=vp.height;
   await pg.render({canvasContext:cv.getContext("2d"),viewport:vp}).promise;pages[i]=await ocr(cv,label);cv.width=cv.height=0;pg.cleanup&&pg.cleanup()}}
 doc.destroy&&doc.destroy();return pages}
async function readDocx(file){await loadScript(LIBS.docx);const r=await window.mammoth.extractRawText({arrayBuffer:await file.arrayBuffer()});
 // Word files have no fixed pages: number them in sections of about 3000 characters
 const t=r.value||"",out=[];for(let i=0;i<t.length;i+=3000){let j=Math.min(t.length,i+3000);const nl=t.lastIndexOf("\n",j);if(j<t.length&&nl>i+1500)j=nl;out.push(t.slice(i,j));i=j-3000}
 return out}
async function readImage(file,title){const label=fill(L().libOcr,{t:title,p:1,n:1});setProg(label);return [await ocr(file,label)]}
// the exact error from Supabase, plus a plain hint for the usual causes
const errText=x=>{const m=String(x&&(x.message||x.error_description||x.error)||x),code=x&&(x.code||x.statusCode)||"";const T=L();
 let hint="";if(/books|book_chunks|schema cache|does not exist|PGRST20[25]|42P01/i.test(m+code))hint=" — "+T.libNeedSql;
 else if(/row-level security|42501|permission|Unauthorized|403/i.test(m+code))hint=lg()==="ar"?" — لا توجد صلاحية: تأكد أن حسابك مدير أو بحث وتطوير، وأن library.sql شُغّل كاملاً.":" — No permission: make sure your account is admin or R&D and library.sql ran fully.";
 else if(/bucket|not found/i.test(m))hint=lg()==="ar"?" — مخزن الملفات «library» غير موجود. شغّل library.sql مرة أخرى.":" — The “library” storage bucket is missing. Run library.sql again.";
 else if(/size|too large|413/i.test(m+code))hint=lg()==="ar"?" — الملف أكبر من 50 ميغابايت.":" — The file is larger than 50 MB.";
 return m+(code?` (${code})`:"")+hint};
async function addBooks(files){const c=ctx();if(!c||!c.org||busy)return;busy=true;const T=L();
 try{for(const file of files){const title=file.name.replace(/\.(pdf|docx?|jpe?g|png|webp|bmp|gif)$/i,"").trim()||file.name;
  const kind=kindOf(file);
  if(kind==="doc"){note(false,T.docOld);continue}
  if(!kind){note(false,fill(T.libNotPdf,{t:title}));continue}
  let bookId=null;
  try{const pages=kind==="pdf"?await readPdf(file,title):kind==="docx"?await readDocx(file):await readImage(file,title);
   const rows=[];pages.forEach((txt,i)=>chunks(txt).forEach(s=>rows.push({page:i+1,content:s,norm:norm(s)})));
   if(rows.reduce((a,r)=>a+r.norm.replace(/\s/g,"").length,0)<15){note(false,fill(T.libNoText,{t:title}));continue}
   setProg(fill(T.libSaving,{t:title}));
   const b=await c.sb.from("books").insert({org_id:c.org,title,file_name:file.name,pages:pages.length,size_bytes:file.size}).select("id").single();if(b.error)throw b.error;bookId=b.data.id;
   for(let i=0;i<rows.length;i+=300){const {error}=await c.sb.from("book_chunks").insert(rows.slice(i,i+300).map(r=>({...r,org_id:c.org,book_id:bookId})));if(error)throw error}
   const ext=(file.name.split(".").pop()||"bin").toLowerCase(),path=c.org+"/"+bookId+"."+ext;
   const upl=await c.sb.storage.from("library").upload(path,file,{contentType:file.type||"application/octet-stream",upsert:true}).catch(e=>({error:e}));
   if(upl&&upl.error)note(false,fill(T.libFileFail,{t:title,e:errText(upl.error)}));
   else await c.sb.from("books").update({file_path:path}).eq("id",bookId);
   note(true,fill(T.libAdded,{t:title,n:pages.length}))}
  catch(x){console.warn("library",x);if(bookId)await c.sb.from("books").delete().eq("id",bookId).then(()=>{},()=>{});
   note(false,fill(T.libErr,{t:title,e:errText(x)}))}}}
 catch(x){note(false,errText(x))}
 await endOcr().catch(()=>{});busy=false;prog="";results=null;const again=()=>{if(loading)return setTimeout(again,300);books=null;loadBooks()};again()}

/* assistant: answer from the books. The built-in answers need a formula and can fail on an empty workspace,
   so when they fail or find nothing, the books give the answer (or a clear message why not). */
const baseAnswer=answer;let waitN=0;
const NOTHING=["لم أجد إجابة في البيانات المتاحة","I couldn't find that in the available data"];
answer=function(text){let out=null;try{out=baseAnswer(text)}catch(e){console.warn("assistant",e)}
 const c=ctx(),T=L();
 if(!window.FX_CLOUD||!c||!c.org||!queryOf(text))return out==null?T.libAskNone:out;
 const generic=out==null||NOTHING.some(s=>String(out).includes(s));const id="lw"+(++waitN);
 const put=html=>{const k=chatLog.findIndex(m=>m[0]==="ai"&&String(m[1]).includes('data-lw="'+id+'"'));
  if(k>=0)chatLog[k]=["ai",html];else if(!generic)chatLog.push(["ai",html]);else return;if(tab==="ai")render()};
 search(text,4).then(rs=>{if(rs.length)return put(`<div class="mh">${T.libFromBooks}</div>`+rs.map(r=>resultHTML(r,text)).join(""));
  if(!generic)return;
  return c.sb.from("books").select("id",{count:"exact",head:true}).eq("org_id",c.org).then(r=>put(r.error?(/books|relation|schema cache|does not exist/i.test(r.error.message||"")?T.libAskSql:fill(T.libAskErr,{e:r.error.message})):r.count?T.libAskNone:T.libAskEmpty))})
 .catch(e=>{if(generic)put(/search_books|function|schema cache|does not exist/i.test(String(e&&e.message))?T.libAskSql:fill(T.libAskErr,{e:String(e&&e.message||e)}))});
 return generic?`<span class="sub" data-lw="${id}">${T.libAsking}</span>`:out};

const st=document.createElement("style");
st.textContent=`.libres{border-top:1px solid var(--line);padding-top:10px;margin-top:4px}.libres:first-of-type{border-top:0}
.libref{font-size:12.5px;color:var(--accent);margin-bottom:4px}.libtxt{font-size:14px;line-height:1.75}.libres mark{background:rgba(212,169,69,.28);color:inherit;border-radius:3px;padding:0 2px}`;
document.head.appendChild(st);
})();
