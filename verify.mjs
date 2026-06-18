import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900} });
const errs=[];
p.on('console', m=>{ if(m.type()==='error') errs.push(m.text()); });
p.on('pageerror', e=>errs.push('PAGEERR: '+e.message));
await p.goto('file:///sessions/epic-quirky-turing/mnt/outputs/single/index.html', {waitUntil:'networkidle'});
await p.waitForTimeout(900);
const txt = await p.evaluate(()=>document.body.innerText.slice(0,60));
const bg = await p.evaluate(()=>getComputedStyle(document.body).backgroundColor);
await p.screenshot({path:'/sessions/epic-quirky-turing/mnt/outputs/single-light.png', fullPage:false});
// toggle dark
await p.locator('button[title*="Dark Mode"]').click().catch(()=>{});
await p.waitForTimeout(500);
await p.screenshot({path:'/sessions/epic-quirky-turing/mnt/outputs/single-dark.png', fullPage:false});
await b.close();
console.log('RENDERED_TEXT:', JSON.stringify(txt));
console.log('BODY_BG:', bg);
console.log('ERRORS:', errs.length? errs.slice(0,5): 'none');
