const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const ld=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}};
const sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- SAMPLE DATA (made up, not verified) ---------- */
const SAMPLES=[
{id:'s1',sample:1,type:'Internship',title:'Web Development Intern',org:'Sample Tech Studio',deadline:'2026-11-20',reqs:[{t:'year',min:2,max:3},{t:'cgpa',min:7.5},{t:'skills',list:['HTML','CSS','JavaScript']},{t:'doc',name:'Resume'},{t:'link'},{t:'weeks',n:8}]},
{id:'s2',sample:1,type:'Internship',title:'Data Analytics Intern',org:'Sample Analytics Lab',deadline:'2026-12-05',reqs:[{t:'year',min:2,max:4},{t:'cgpa',min:7},{t:'skills',list:['Excel','SQL']},{t:'doc',name:'Resume'},{t:'weeks',n:6}]},
{id:'s3',sample:1,type:'Scholarship',title:'Merit Scholarship',org:'Sample Education Trust',deadline:'2026-12-15',reqs:[{t:'year',min:1,max:4},{t:'percent',min:75},{t:'income',max:6},{t:'doc',name:'Marksheet'},{t:'doc',name:'Income certificate'},{t:'doc',name:'ID proof'}]},
{id:'s4',sample:1,type:'Scholarship',title:'First-Year Support Scholarship',org:'Sample Community Fund',deadline:'2026-11-25',reqs:[{t:'year',min:1,max:1},{t:'percent',min:60},{t:'income',max:4.5},{t:'doc',name:'Income certificate'}]},
{id:'s5',sample:1,type:'Competition',title:'Campus Code Sprint',org:'Sample Coding Club',deadline:'2026-11-30',reqs:[{t:'year',min:1,max:3},{t:'team',min:2,max:4},{t:'deadline'},{t:'link'}]},
{id:'s6',sample:1,type:'Competition',title:'CSS Design Challenge',org:'Sample Design Guild',deadline:'2026-11-18',kw:'web design frontend',reqs:[{t:'year',min:1,max:4},{t:'skills',list:['CSS','HTML']},{t:'team',min:1,max:2},{t:'deadline'}]},
{id:'s7',sample:1,type:'Competition',title:'Python Problem-Solving Contest',org:'Sample Coders Union',deadline:'2026-12-10',kw:'coding algorithms',reqs:[{t:'year',min:1,max:4},{t:'skills',list:['Python']},{t:'team',min:1,max:3},{t:'deadline'}]},
{id:'s8',sample:1,type:'Competition',title:'Build for Campus Hackathon',org:'Sample Innovation Cell',deadline:'2026-12-20',kw:'hackathon app project',reqs:[{t:'year',min:1,max:4},{t:'team',min:2,max:5},{t:'link'},{t:'deadline'}]},
{id:'s9',sample:1,type:'Competition',title:'Tech Quiz Challenge',org:'Sample Science Club',deadline:'2026-10-05',kw:'quiz general knowledge',reqs:[{t:'year',min:1,max:4},{t:'team',min:1,max:2},{t:'deadline'}]},
{id:'s10',sample:1,type:'Internship',title:'UI/UX Design Intern',org:'Sample Design Studio',deadline:'2026-11-28',kw:'design figma',reqs:[{t:'year',min:1,max:4},{t:'skills',list:['Figma','CSS']},{t:'doc',name:'Resume'},{t:'link'},{t:'weeks',n:6}]},
{id:'s11',sample:1,type:'Internship',title:'Python Automation Intern',org:'Sample Software Works',deadline:'2026-12-01',kw:'scripting automation',reqs:[{t:'year',min:2,max:3},{t:'cgpa',min:7},{t:'skills',list:['Python']},{t:'doc',name:'Resume'},{t:'weeks',n:8}]},
{id:'s12',sample:1,type:'Internship',title:'Content and Social Media Intern',org:'Sample Media Hub',deadline:'2026-11-22',kw:'writing marketing',reqs:[{t:'year',min:1,max:4},{t:'skills',list:['Writing']},{t:'doc',name:'Resume'},{t:'weeks',n:4}]},
{id:'s13',sample:1,type:'Internship',title:'Cybersecurity Basics Intern',org:'Sample Secure Labs',deadline:'2026-12-12',kw:'security',reqs:[{t:'year',min:2,max:4},{t:'cgpa',min:6.5},{t:'skills',list:['Networking','Linux']},{t:'doc',name:'Resume'}]},
{id:'s14',sample:1,type:'Scholarship',title:'Digital Skills Scholarship',org:'Sample Skills Foundation',deadline:'2027-01-10',kw:'computer technology',reqs:[{t:'year',min:1,max:3},{t:'percent',min:70},{t:'income',max:8},{t:'doc',name:'Marksheet'},{t:'doc',name:'ID proof'}]},
{id:'s15',sample:1,type:'Scholarship',title:'Computing Excellence Award',org:'Sample Academic Society',deadline:'2026-12-30',kw:'merit computer',reqs:[{t:'year',min:2,max:4},{t:'branch',list:['BCA','B.Tech','CSE','IT']},{t:'percent',min:80},{t:'doc',name:'Marksheet'}]}
];
const SAMPLE_STUDENT={year:'2',branch:'B.Tech CSE',cgpa:'8.2',percent:'',skills:'HTML, CSS, Python',link:'',weeks:'',income:'',team:'',docs:{Resume:'yes'}};
const DOCS=['Resume','Marksheet','Income certificate','ID proof'];
const LAB={year:'Year of study',branch:'Branch or course',cgpa:'CGPA (out of 10)',percent:'Marks %',skills:'Your skills (comma separated)',link:'Portfolio or GitHub link',weeks:'Weeks you are available',income:'Family income (lakh ₹ per year)',team:'Your team size'};
const PH={branch:'e.g. B.Tech CSE',skills:'e.g. HTML, CSS, Python',link:'https://github.com/yourname'};
const RANGE={cgpa:[0,10],percent:[0,100],weeks:[0,52],income:[0,1000],team:[1,20]};
const NAME={match:'Match',mis:'Mismatch',miss:'Missing info'};

let filter='All',cur=null,profile=ld('ok_profile',{docs:{}}),custom=ld('ok_custom',[]),premium=ld('ok_premium',false),saved=ld('ok_saved',[]);
profile.docs=profile.docs||{};
const profileFilled=()=>['year','branch','cgpa','percent','skills','link','weeks','income','team'].some(k=>String(profile[k]||'').trim()!=='')||Object.values(profile.docs||{}).some(Boolean);
let editing=!profileFilled();
const all=()=>SAMPLES.concat(custom);
const daysLeft=d=>d?Math.ceil((new Date(d+'T23:59:59')-new Date())/864e5):null;
const dlText=d=>d==null?'No deadline set':d<0?'Closed':d==0?'Last day':d+' days left';
const plural=(n,w)=>n+' '+w+(n==1?'':'s');
function toast(t){const e=$('#toast');e.textContent=t;e.style.display='block';clearTimeout(toast.t);toast.t=setTimeout(()=>e.style.display='none',3200)}

/* ---------- RULE ENGINE ---------- */
const O=(label,ask,have,s,why,fix)=>({label,ask,have:have===0||have?have:'Not provided',s,why,fix:fix||''});
function check(r,p,o){
 const n=k=>{const v=p[k];return v===''||v==null||isNaN(+v)?null:+v};
 const t=r.t;
 if(t=='year'){const a='Year '+r.min+(r.max>r.min?' to '+r.max:''),y=n('year');
  if(y==null)return O('Year of study',a,'','miss','Cannot check without your year.','Select your year of study.');
  return y>=r.min&&y<=r.max?O('Year of study',a,'Year '+y,'match','Within the required years.'):O('Year of study',a,'Year '+y,'mis','Not open for your year.','Look for opportunities meant for your year.')}
 if(t=='branch'){const b=(p.branch||'').trim().toLowerCase(),a=r.list.join(', ');
  if(!b)return O('Branch',a,'','miss','Cannot check without your branch.','Enter your branch or course.');
  return r.list.some(x=>{x=x.toLowerCase();return b.includes(x)||x.includes(b)})?O('Branch',a,p.branch,'match','Your branch is accepted.'):O('Branch',a,p.branch,'mis','Your branch is not on the list.','Ask the organizer if other branches can apply.')}
 if(t=='cgpa'||t=='percent'){const L=t=='cgpa'?'CGPA':'Marks %',v=n(t),a=r.min+' or above';
  if(v==null)return O(L,a,'','miss','Cannot check without your '+L+'.','Enter your '+L+'.');
  return v>=r.min?O(L,a,v,'match','At or above the minimum.'):O(L,a,v,'mis','Below the minimum.','Ask if exceptions are allowed, or look at other options.')}
 if(t=='income'){const v=n('income'),a='Up to '+r.max+' lakh per year';
  if(v==null)return O('Family income',a,'','miss','Cannot check without your family income.','Enter your family income per year in lakh.');
  return v<=r.max?O('Family income',a,v+' lakh','match','Within the limit.'):O('Family income',a,v+' lakh','mis','Above the income limit.','This may not be open to you. Check the official rules.')}
 if(t=='team'){const v=n('team'),a=r.min+' to '+r.max+' members';
  if(v==null)return O('Team size',a,'','miss','Cannot check without your team size.','Enter how many people are in your team.');
  return v>=r.min&&v<=r.max?O('Team size',a,v,'match','Team size is allowed.'):O('Team size',a,v,'mis','Team size is outside the allowed range.','Change your team to '+a+'.')}
 if(t=='weeks'){const v=n('weeks'),a=r.n+' weeks';
  if(v==null)return O('Availability',a,'','miss','Cannot check without your available weeks.','Confirm how many weeks you are free.');
  return v>=r.n?O('Availability',a,v+' weeks','match','You are free long enough.'):O('Availability',a,v+' weeks','mis','You are free for fewer weeks than needed.','Check if a shorter period is possible.')}
 if(t=='deadline'){const d=daysLeft(o.deadline);
  if(d==null)return O('Deadline','Before the deadline','','miss','No deadline was entered.','Find the deadline on the official page.');
  return d>=0?O('Deadline','Before '+o.deadline,dlText(d),'match','The deadline has not passed.'):O('Deadline','Before '+o.deadline,'Closed','mis','The deadline has passed.','Look for the next round or similar opportunities.')}
 if(t=='skills'){const a=r.list.join(', '),have=(p.skills||'').split(',').map(x=>x.trim().toLowerCase()).filter(Boolean);
  if(!have.length)return O('Skills',a,'','miss','Cannot check without your skills.','List the skills you have.');
  const gone=r.list.filter(x=>!have.includes(x.toLowerCase()));
  return gone.length?O('Skills',a,p.skills,'mis',gone.join(', ')+(gone.length>1?' are':' is')+' not listed.','Add '+gone.join(', ')+' if you know it, or learn it before applying.'):O('Skills',a,p.skills,'match','You listed all required skills.')}
 if(t=='doc'){const v=(p.docs||{})[r.name];
  if(!v)return O(r.name,'Required','','miss','We do not know if your '+r.name+' is ready.','Tell us if your '+r.name+' is ready.');
  return v=='yes'?O(r.name,'Required','Ready','match',r.name+' is ready.'):O(r.name,'Required','Not ready','mis',r.name+' is not ready.','Prepare your '+r.name+'.')}
 if(t=='link'){const v=(p.link||'').trim();
  if(!v)return O('Portfolio or GitHub','Link required','','miss','Cannot be checked without a link.','Add a portfolio or GitHub link.');
  return /^\S+\.\S+$/.test(v)?O('Portfolio or GitHub','Link required',v,'match','A link is provided.'):O('Portfolio or GitHub','Link required',v,'miss','This does not look like a link.','Enter a full link, like https://github.com/yourname.')}
}
function clean(p){const c=Object.assign({},p);for(const k in RANGE){const v=c[k];if(v!==''&&v!=null&&(isNaN(+v)||+v<RANGE[k][0]||+v>RANGE[k][1]))c[k]=''}return c}

/* ---------- NAVIGATION ---------- */
function show(p){
 $$('.page').forEach(s=>s.hidden=s.id!=p);
 $$('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.p==p));
 if(p=='discover')renderDiscover();if(p=='premium')renderPremium();if(p=='add')renderAdd();
 window.scrollTo(0,0)}

/* ---------- DISCOVER ---------- */
const STOP=['i','want','a','an','the','for','me','show','find','in','and','or','to','my','of','any','some','please'];
const stem=t=>t.length>4?t.replace(/ies$/,'y').replace(/s$/,''):t;
const hay=o=>[o.type,o.title,o.org,o.kw||''].concat(...o.reqs.filter(r=>r.t=='skills').map(r=>r.list)).join(' ').toLowerCase();
function score(o){const p=clean(profile),rs=o.reqs.map(r=>check(r,p,o));return{a:rs.filter(x=>x.s=='match').length,b:rs.filter(x=>x.s=='mis').length,c:rs.filter(x=>x.s=='miss').length,n:rs.length}}
function renderDiscover(){
 $('#chips').innerHTML=['All','Internship','Scholarship','Competition'].map(t=>`<button class="chip${t==filter?' on':''}" data-f="${t}">${t}</button>`).join('');
 renderProfile();renderCards()}
function renderCards(){
 const q=($('#q').value||'').toLowerCase().split(/\s+/).filter(w=>w&&!STOP.includes(w)).map(stem),up=$('#up').checked;
 const list=all().filter(o=>{const d=daysLeft(o.deadline);return(filter=='All'||o.type==filter)&&(!up||d==null||d>=0)&&q.every(t=>hay(o).includes(t))}).map(o=>({o,s:score(o)}));
 if($('#sort').value=='match')list.sort((x,y)=>x.s.b-y.s.b||y.s.a-x.s.a);else list.sort((x,y)=>(x.o.deadline||'9').localeCompare(y.o.deadline||'9'));
 $('#count').textContent='Showing '+list.length+' of '+all().length+' opportunities';
 $('#cards').innerHTML=list.length?list.map(({o,s})=>{const d=daysLeft(o.deadline),m=s.c==s.n?'Add your details above to see if you are eligible.':s.b?'Some requirements do not match.':s.c?'Some details are missing.':'All requirements match.';
  return `<article class="card t-${o.type}"><div class="pills"><span class="pill">${o.type}</span><span class="pill ${o.sample?'smp':'own'}">${o.sample?'Sample, not verified':'Added by you'}</span></div><h3>${esc(o.title)}</h3><p class="mut">${esc(o.org||'Organizer not given')}</p><p class="dl${d!=null&&d<0?' late':''}">${dlText(d)}</p>${editing||s.c==s.n?'<p class="mut">Save your details to see if you match.</p>':`<div class="counts"><span class="c m">${s.a} Match</span><span class="c x">${s.b} Mismatch</span><span class="c q">${s.c} Missing</span></div>`}<div class="btns"><button class="btn" data-check="${o.id}">See details</button><button class="btn ghost" data-save="${o.id}">${saved.includes(o.id)?'Saved':'Save'}</button>${o.sample?'':`<button class="btn ghost" data-del="${o.id}">Delete</button>`}</div></article>`}).join(''):'<p class="empty">No opportunity matches your search. Try another word, like css, python or scholarship, or clear the search. You can also add a real one with Add opportunity.</p>'}

/* ---------- PROFILE (save and edit) ---------- */
function renderProfile(){
 const box=$('#dprof');
 if(editing)box.innerHTML=`<h2>Your details</h2><p class="mut">Fill what you know, then save. Empty means Missing info, not a fail.</p><div class="pf"><div class="fields">${fieldsHTML(['year','branch','cgpa','skills'])}</div><details class="more"><summary>More details (optional)</summary><div class="fields">${fieldsHTML(['percent','income','weeks','team','link'].concat(DOCS.map(d=>'doc:'+d)))}</div></details><div class="btns"><button type="button" class="btn" data-act="save">Save my details</button><button type="button" class="btn ghost" data-act="sample">Load sample student</button><button type="button" class="btn ghost" data-act="clear">Clear</button></div></div>`;
 else{const bits=[profile.year&&'Year '+profile.year,profile.branch,profile.cgpa&&'CGPA '+profile.cgpa,profile.skills&&'Skills: '+profile.skills].filter(Boolean).map(esc);
  box.innerHTML=`<div class="phead"><div><b>Your details are saved</b><p class="mut">${bits.join(', ')||'Saved on this device'}</p></div><button type="button" class="btn ghost" data-act="edit">Edit details</button></div>`}
 fillForm()}
function rangeErrs(){const p=clean(profile);$$('.pf [data-e]').forEach(e=>{const k=e.dataset.e,v=profile[k];e.textContent=(RANGE[k]&&v!==''&&v!=null&&p[k]==='')?'Enter a number from '+RANGE[k][0]+' to '+RANGE[k][1]+'.':''})}

/* ---------- CHECKER ---------- */
function inputFor(k){
 if(k=='year')return '<select data-k="year"><option value="">Select</option>'+[1,2,3,4].map(y=>`<option value="${y}">Year ${y}</option>`).join('')+'</select>';
 const num=k in RANGE;
 return `<input data-k="${k}" ${num?'type="number" step="any" inputmode="decimal"':'type="text"'} placeholder="${PH[k]||''}">`}
const fieldsHTML=keys=>keys.map(k=>k.startsWith('doc:')?`<label>${k.slice(4)}<select data-doc="${k.slice(4)}"><option value="">Not sure</option><option value="yes">Ready</option><option value="no">Not ready</option></select></label>`:`<label>${LAB[k]}${inputFor(k)}<span class="err" data-e="${k}"></span></label>`).join('');
function openCheck(id){
 cur=all().find(o=>o.id==id);if(!cur)return;
 const keys=[];cur.reqs.forEach(r=>{if(r.t=='doc')keys.push('doc:'+r.name);else if(r.t!='deadline'&&!keys.includes(r.t))keys.push(r.t)});
 const f=fieldsHTML(keys);
 const d=daysLeft(cur.deadline);
 $('#checker').innerHTML=`<button class="btn ghost" data-p="discover">Back to Discover</button>
 <div class="pills" style="margin-top:14px"><span class="pill">${cur.type}</span><span class="pill ${cur.sample?'smp':'own'}">${cur.sample?'Sample data, not verified':'Added by you'}</span></div>
 <h1>${esc(cur.title)}</h1><p class="mut">${esc(cur.org||'Organizer not given')}. ${dlText(d)}.</p>
 <div class="two"><form class="pf" onsubmit="return false"><h2>Your details</h2><p class="mut">Leave a field empty if you do not know yet. Empty means Missing info, not a fail.</p>${f}<div class="btns"><button type="button" class="btn ghost" data-act="sample">Load sample student</button><button type="button" class="btn ghost" data-act="clear">Clear</button></div></form><div id="result"></div></div>`;
 fillForm();renderResult();show('checker')}
function fillForm(){
 $$('.pf [data-k]').forEach(el=>el.value=profile[el.dataset.k]==null?'':profile[el.dataset.k]);
 $$('.pf [data-doc]').forEach(el=>el.value=profile.docs[el.dataset.doc]||'')}
function renderResult(){
 const p=clean(profile),rs=cur.reqs.map(r=>check(r,p,cur));
 $$('.pf [data-e]').forEach(e=>{const k=e.dataset.e,v=profile[k];e.textContent=(RANGE[k]&&v!==''&&v!=null&&p[k]==='')?'Enter a number from '+RANGE[k][0]+' to '+RANGE[k][1]+'.':''});
 const a=rs.filter(x=>x.s=='match').length,b=rs.filter(x=>x.s=='mis').length,c=rs.filter(x=>x.s=='miss').length;
 let cls='',v;
 if(c==rs.length){v='Fill in your details to see how you measure up.'}
 else if(b){cls='bad';v='Not ready to apply yet. Fix '+plural(b,'gap')+(c?' and add '+plural(c,'missing detail')+'.':'.')}
 else if(c){cls='warn';v='Almost there. Add '+plural(c,'missing detail')+' to confirm you can apply.'}
 else{cls='good';v='Ready to apply. Every requirement matches.'}
 const steps=rs.filter(x=>x.s!='match').sort((x,y)=>(x.s=='mis'?0:1)-(y.s=='mis'?0:1));
 $('#result').innerHTML=`<div class="sum ${cls}"><div class="counts"><span class="c m">${a} Match</span><span class="c x">${b} Mismatch</span><span class="c q">${c} Missing info</span></div><p class="verdict">${v}</p></div>
 ${rs.map(x=>`<div class="row ${x.s}"><div class="rl"><b>${esc(x.label)}</b><span>Asks: ${esc(x.ask)}</span><span>You: ${esc(x.have)}</span><span>${esc(x.why)}</span></div><span class="badge ${x.s}">${NAME[x.s]}</span></div>`).join('')}
 <h2>Gap-to-Action Roadmap</h2>${steps.length?'<ul class="road">'+steps.map(x=>`<li><label><input type="checkbox"><span>${esc(x.fix)}</span></label></li>`).join('')+'</ul>':'<p class="mut">Nothing to fix. Confirm the details on the official page and apply.</p>'}`}

/* ---------- ADD OPPORTUNITY ---------- */
function renderAdd(){
 $('#add').innerHTML=`<h1>Add your own opportunity</h1><p class="mut">Fill only the requirements it has. It becomes the same checklist as every other opportunity.</p>
 <div class="form"><label>Title<input type="text" id="a_title"></label>
 <label>Type<select id="a_type"><option>Internship</option><option>Scholarship</option><option>Competition</option></select></label>
 <label>Organizer (optional)<input type="text" id="a_org"></label>
 <label>Deadline (optional)<input type="date" id="a_dl"></label>
 <label>Earliest year allowed<input type="number" id="a_ymin" min="1" max="4"></label>
 <label>Latest year allowed<input type="number" id="a_ymax" min="1" max="4"></label>
 <p class="mut">Example: "open to 2nd and 3rd year students" means earliest 2 and latest 3. Leave both empty if every year can apply.</p>
 <label>Branches allowed (comma separated)<input type="text" id="a_br"></label>
 <label>Minimum CGPA (out of 10)<input type="number" step="any" id="a_cgpa"></label>
 <label>Minimum marks %<input type="number" step="any" id="a_pct"></label>
 <label>Skills needed (comma separated)<input type="text" id="a_sk"></label>
 <label>Maximum family income (lakh ₹ per year)<input type="number" step="any" id="a_inc"></label>
 <label>Weeks needed<input type="number" id="a_wk"></label>
 <label>Team size from<input type="number" id="a_tmin"></label>
 <label>Team size up to<input type="number" id="a_tmax"></label>
 <fieldset><legend>Required documents and links</legend>${DOCS.map((d,i)=>`<label class="chk"><input type="checkbox" data-adoc="${d}"> ${d}</label>`).join('')}<label class="chk"><input type="checkbox" id="a_link"> Portfolio or GitHub link</label><label class="chk"><input type="checkbox" id="a_dreq"> Must apply before the deadline</label></fieldset></div>
 <p class="err" id="a_err"></p><button class="btn" id="a_save">Save opportunity</button>`}
function saveOpp(){
 const g=i=>$('#'+i).value.trim(),num=i=>g(i)===''?null:+g(i),err=m=>{$('#a_err').textContent=m};
 const title=g('a_title');if(!title)return err('Enter a title for the opportunity.');
 const r=[],ymin=num('a_ymin'),ymax=num('a_ymax'),cg=num('a_cgpa'),pc=num('a_pct'),inc=num('a_inc'),wk=num('a_wk'),tmin=num('a_tmin'),tmax=num('a_tmax');
 if([cg,pc,inc,wk,tmin,tmax,ymin,ymax].some(x=>x!=null&&isNaN(x)||x<0))return err('Numbers must be zero or more.');
 if(ymin!=null||ymax!=null){const a=ymin==null?1:ymin,b=ymax==null?4:ymax;if(a>b)return err('Earliest year cannot be after the latest year.');r.push({t:'year',min:a,max:b})}
 if(g('a_br'))r.push({t:'branch',list:g('a_br').split(',').map(x=>x.trim()).filter(Boolean)});
 if(cg!=null){if(cg>10)return err('CGPA must be 10 or less.');r.push({t:'cgpa',min:cg})}
 if(pc!=null){if(pc>100)return err('Marks % must be 100 or less.');r.push({t:'percent',min:pc})}
 if(g('a_sk'))r.push({t:'skills',list:g('a_sk').split(',').map(x=>x.trim()).filter(Boolean)});
 if(inc!=null)r.push({t:'income',max:inc});
 if(wk!=null)r.push({t:'weeks',n:wk});
 if(tmin!=null||tmax!=null){const a=tmin==null?1:tmin,b=tmax==null?20:tmax;if(a>b)return err('Team size from cannot be more than team size up to.');r.push({t:'team',min:a,max:b})}
 $$('[data-adoc]').forEach(c=>{if(c.checked)r.push({t:'doc',name:c.dataset.adoc})});
 if($('#a_link').checked)r.push({t:'link'});
 if($('#a_dreq').checked){if(!g('a_dl'))return err('Enter a deadline, or untick "Must apply before the deadline".');r.push({t:'deadline'})}
 if(!r.length)return err('Add at least one requirement.');
 custom.push({id:'c'+Date.now(),type:$('#a_type').value,title,org:g('a_org'),deadline:g('a_dl'),reqs:r});sv('ok_custom',custom);
 toast('Saved. Open it from Discover to check your readiness.');filter='All';show('discover')}

/* ---------- PREMIUM (demo preview, no real payment) ---------- */
function renderPremium(){
 const items=saved.map(id=>all().find(o=>o.id==id)).filter(Boolean);
 $('#premium').innerHTML=`<h1>Plans</h1><p class="mut">Proposed plans for this prototype. Prices are not validated yet and no real payment happens here.</p>
 <div class="grid">
 <article class="card"><h3>Free</h3><p class="price">₹0</p><p><b>Who pays:</b> nobody</p><ul><li>Discover opportunities</li><li>Readiness checker</li><li>Gap-to-Action Roadmap</li><li>Add your own opportunity</li></ul></article>
 <article class="card hl"><h3>Student Premium</h3><p class="price">₹99 / month <small>proposed</small></p><p><b>Who pays:</b> the student</p><ul><li>Save opportunities (works in this demo)</li><li>Deadline reminder list (works in this demo)</li><li>Email and phone alerts (planned)</li><li>Recurring-cycle alerts (planned)</li></ul><button class="btn" id="p_toggle">${premium?'Turn off demo':'Try Premium demo'}</button></article>
 <article class="card"><h3>College plan</h3><p class="price">Per-student licence <small>to be validated</small></p><p><b>Who pays:</b> the college placement cell</p><ul><li>Checklists for the college's own opportunities (planned)</li><li>See how ready students are (planned)</li></ul></article></div>
 <h2>Value versus cost</h2><p>A student saves hours of reading rules and avoids applying where they do not qualify. Running cost stays low because the checker runs in the browser.</p>
 ${premium?`<h2>Your saved opportunities and reminders</h2>${items.length?items.map(o=>`<div class="row"><div class="rl"><b>${esc(o.title)}</b><span>${dlText(daysLeft(o.deadline))}</span></div><button class="btn ghost" data-unsave="${o.id}">Remove</button></div>`).join(''):'<p class="empty">Nothing saved yet. Press Save on an opportunity in Discover.</p>'}`:''}`}

/* ---------- EVENTS ---------- */
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.p)return show(d.p);
 if(d.f){filter=d.f;return renderDiscover()}
 if(d.check)return openCheck(d.check);
 if(d.save){if(!premium){toast('Turn on the Premium demo to save opportunities.');return show('premium')}
  saved=saved.includes(d.save)?saved.filter(x=>x!=d.save):saved.concat(d.save);sv('ok_saved',saved);return renderDiscover()}
 if(d.unsave){saved=saved.filter(x=>x!=d.unsave);sv('ok_saved',saved);return renderPremium()}
 if(d.del){custom=custom.filter(o=>o.id!=d.del);sv('ok_custom',custom);return renderDiscover()}
 if(b.id=='p_toggle'){premium=!premium;sv('ok_premium',premium);toast(premium?'Premium demo is on. No payment was made.':'Premium demo is off.');return renderPremium()}
 if(b.id=='a_save')return saveOpp();
 if(d.act){
  if(d.act=='edit'){editing=true;renderProfile();return renderCards()}
  if(d.act=='save'){const p=clean(profile),bad=Object.keys(RANGE).some(k=>profile[k]!==''&&profile[k]!=null&&p[k]==='');
   if(!profileFilled())return toast('Add at least one detail first.');
   if(bad)return toast('Fix the highlighted numbers first.');
   editing=false;sv('ok_profile',profile);renderProfile();renderCards();return toast('Details saved on this device.')}
  profile=d.act=='sample'?JSON.parse(JSON.stringify(SAMPLE_STUDENT)):{docs:{}};editing=d.act=='clear';sv('ok_profile',profile);renderProfile();renderCards();if(cur&&!$('#checker').hidden)renderResult();return}
});
['input','change'].forEach(ev=>document.addEventListener(ev,e=>{
 const el=e.target;if(!el.closest)return;
 if(el.id=='q'||el.id=='sort'||el.id=='up')return renderCards();
 if(!el.closest('.pf'))return;
 if(el.dataset.k)profile[el.dataset.k]=el.value;
 if(el.dataset.doc)profile.docs[el.dataset.doc]=el.value;
 sv('ok_profile',profile);rangeErrs();renderCards();if(cur&&!$('#checker').hidden)renderResult()}));
show('discover');
