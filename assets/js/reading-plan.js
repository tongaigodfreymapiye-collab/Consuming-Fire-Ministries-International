/* CFMI daily Bible reading plan. Uses the ministry's supplied reading order. */
(function(){
  'use strict';
  const order = [
    'Obadiah','Jude','3 John','2 John','Haggai','Zephaniah','Habakkuk','Philemon','Titus','2 Thessalonians','Nahum','Jonah','2 Peter','Malachi','1 Thessalonians','Ruth','Song of Solomon','Philippians','Colossians','James','1 Peter','Joel','1 John','Micah','Amos','Hosea','1 Corinthians','Daniel','2 Corinthians','Genesis','Exodus','John','Matthew','Mark','Luke','Acts','Deuteronomy','Numbers','Leviticus','Joshua','Judges','Romans','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Isaiah','Jeremiah','Lamentations','Ezekiel','Zechariah','Hebrews','Galatians','Ephesians','1 Timothy','2 Timothy','Revelation'
  ];
  const chapters = {
    'Genesis':50,'Exodus':40,'Leviticus':27,'Numbers':36,'Deuteronomy':34,'Joshua':24,'Judges':21,'Ruth':4,
    '1 Samuel':31,'2 Samuel':24,'1 Kings':22,'2 Kings':25,'1 Chronicles':29,'2 Chronicles':36,'Ezra':10,'Nehemiah':13,'Esther':10,
    'Job':42,'Psalms':150,'Proverbs':31,'Ecclesiastes':12,'Song of Solomon':8,'Isaiah':66,'Jeremiah':52,'Lamentations':5,'Ezekiel':48,
    'Daniel':12,'Hosea':14,'Joel':3,'Amos':9,'Obadiah':1,'Jonah':4,'Micah':7,'Nahum':3,'Habakkuk':3,'Zephaniah':3,'Haggai':2,'Zechariah':14,'Malachi':4,
    'Matthew':28,'Mark':16,'Luke':24,'John':21,'Acts':28,'Romans':16,'1 Corinthians':16,'2 Corinthians':13,'Galatians':6,'Ephesians':6,'Philippians':4,'Colossians':4,'1 Thessalonians':5,'2 Thessalonians':3,'1 Timothy':6,'2 Timothy':4,'Titus':3,'Philemon':1,'Hebrews':13,'James':5,'1 Peter':5,'2 Peter':3,'1 John':5,'2 John':1,'3 John':1,'Jude':1,'Revelation':22
  };
  const start = new Date(2026, 9, 26, 12, 0, 0); // Monday 26 October 2026, Deuteronomy 18
  const startIndex = order.indexOf('Deuteronomy');
  function dayOnly(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate(),12,0,0)}
  function sessionsBefore(date){
    const target=dayOnly(date), anchor=dayOnly(start);
    if(target<=anchor)return 0;
    let count=0, cursor=new Date(anchor);
    while(cursor<target){if(cursor.getDay()!==0)count++;cursor.setDate(cursor.getDate()+1)}
    return count;
  }
  function readingAt(slot){
    let bi=startIndex, ch=18, remaining=Math.max(0,slot);
    while(remaining>0){
      if(ch < (chapters[order[bi]]||1)) ch++;
      else {bi=(bi+1)%order.length;ch=1;}
      remaining--;
    }
    return {book:order[bi],chapter:ch,index:bi,bookNumber:bi+1,totalBooks:order.length,reference:order[bi]+' '+ch+':1',slot};
  }
  function getForDate(date){
    const d=dayOnly(date), anchor=dayOnly(start), sunday=d.getDay()===0;
    const r=readingAt(sessionsBefore(d));
    const nextDate=new Date(d); if(sunday) nextDate.setDate(nextDate.getDate()+1);
    return {...r,isRestDay:sunday,beforeStart:d<anchor,date:d,nextDate};
  }
  function formatDate(date, opts={weekday:'long',day:'numeric',month:'long',year:'numeric'}){return date.toLocaleDateString(undefined,opts)}
  window.CFMIReadingPlan={order,chapters,start,getForDate,readingAt,sessionsBefore,formatDate};

  function initReminder(){
    if(document.getElementById('cfmi-reading-reminder'))return;
    const today=new Date(), plan=getForDate(today);
    let readingLine;
    if(plan.isRestDay) readingLine='Sunday is our rest day. Next reading: '+plan.book+' '+plan.chapter+' on '+formatDate(plan.nextDate,{weekday:'long',day:'numeric',month:'long'})+'.';
    else readingLine='Today’s reading: '+plan.book+' '+plan.chapter+'.';
    const seenKey='cfmi-reading-reminder-dismissed-'+today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    try{if(localStorage.getItem(seenKey)==='1')return}catch{}
    const style=document.createElement('style');style.textContent=`#cfmi-reading-reminder{position:fixed;inset:0;z-index:99999;background:#08101dcc;display:flex;align-items:center;justify-content:center;padding:18px;font-family:Arial,Helvetica,sans-serif}#cfmi-reading-reminder .panel{width:min(490px,100%);background:#fffdf8;color:#172238;border-radius:16px;box-shadow:0 24px 80px #0008;overflow:hidden}#cfmi-reading-reminder .top{background:#101827;color:white;padding:22px 24px;display:flex;gap:14px;align-items:center}#cfmi-reading-reminder .top img{width:54px;height:48px;object-fit:contain}#cfmi-reading-reminder .top h2{font:500 24px/1.15 Georgia,serif;margin:0}#cfmi-reading-reminder .body{padding:24px}#cfmi-reading-reminder .eyebrow{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:#946a19;font-weight:800}#cfmi-reading-reminder .reading{font:500 30px/1.2 Georgia,serif;margin:10px 0;color:#101827}#cfmi-reading-reminder p{line-height:1.65;color:#596273;font-size:14px}#cfmi-reading-reminder .progress{font-size:12px;color:#6d7480;margin:15px 0}#cfmi-reading-reminder .actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px}#cfmi-reading-reminder button,#cfmi-reading-reminder a{border:0;border-radius:7px;padding:12px 15px;font-weight:700;font-size:12px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center}#cfmi-reading-reminder .primary{background:#e8ae42;color:#161d29}#cfmi-reading-reminder .secondary{background:#eef0f3;color:#263244}#cfmi-reading-reminder .close{margin-left:auto;background:transparent;color:#fff;font-size:24px;padding:0 5px}#cfmi-reading-reminder .body .quiet{font-size:11px;color:#8b929c}`;document.head.appendChild(style);
    const modal=document.createElement('div');modal.id='cfmi-reading-reminder';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-labelledby','cfmi-reading-title');
    const progress=plan.bookNumber-1;
    modal.innerHTML=`<div class="panel"><div class="top"><img src="assets/open-bible.svg" alt=""><h2 id="cfmi-reading-title">CFMI Bible Reading Plan</h2><button class="close" type="button" aria-label="Close reminder">×</button></div><div class="body"><div class="eyebrow">One chapter a day · Monday to Saturday</div><div class="reading">${plan.isRestDay?'Next reading: ': 'Today’s reading: '}${plan.book} ${plan.chapter}</div><p>${readingLine}</p><div class="progress">Book ${plan.bookNumber} of ${plan.totalBooks} · ${progress} books completed in this cycle</div><div class="actions"><a class="primary" href="bible.html">Open Bible & reading plan →</a><button class="secondary" type="button" data-dismiss>Remind me later</button></div><p class="quiet">The plan follows CFMI’s reading order and advances automatically, with Sundays as rest days.</p></div></div>`;
    function close(){try{localStorage.setItem(seenKey,'1')}catch{}modal.remove()}
    modal.querySelector('.close').addEventListener('click',close);modal.querySelector('[data-dismiss]').addEventListener('click',close);modal.querySelector('a.primary').addEventListener('click',()=>{try{localStorage.setItem(seenKey,'1')}catch{}});modal.addEventListener('click',e=>{if(e.target===modal)close()});document.body.appendChild(modal);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initReminder,{once:true});else initReminder();
})();
