import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
const root=path.resolve(import.meta.dirname,"..");
const candidates=JSON.parse(fs.readFileSync(path.join(root,"content","photo-refresh-candidates.json"),"utf8"));
const images=JSON.parse(fs.readFileSync(path.join(root,"content","images.json"),"utf8"));
const publicDir=path.join(root,"public","images");
const outDir=path.join(root,"docs","photo-review");
fs.mkdirSync(outDir,{recursive:true});
const groups=["priority-1","priority-2","priority-3","priority-4"];
const cardW=420,imageH=230,labelH=112,cardH=imageH+labelH,cols=3;
function esc(v){return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;");}
function shortSource(url){try{const u=new URL(url);return u.hostname+u.pathname;}catch{return String(url||"No source recorded");}}
function tileSvg(item,asset){
 const status=item.status==="candidate"?"CANDIDATE":item.status.toUpperCase();
 const title="#"+item.slot+" · "+item.title;
 const credit=asset?.credit?asset.credit+" · "+(asset.license||""):"No photo candidate";
 const source=shortSource(asset?.source),note=item.note||"";
 return Buffer.from(`<svg width="${cardW}" height="${labelH}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f4f0e8"/><text x="14" y="24" font-size="13" font-family="Arial" font-weight="bold" fill="#8c4b38">${esc(status)}</text><text x="14" y="46" font-size="15" font-family="Arial" font-weight="bold" fill="#262626">${esc(title.slice(0,54))}</text><text x="14" y="66" font-size="12" font-family="Arial" fill="#383838">${esc(credit.slice(0,56))}</text><text x="14" y="84" font-size="10" font-family="Arial" fill="#383838">${esc(source.slice(0,64))}</text><text x="14" y="102" font-size="10" font-family="Arial" fill="#8c4b38">${esc(note.slice(0,68))}</text></svg>`);
}
for(const group of groups){
 const items=candidates.filter(x=>x.group===group).sort((a,b)=>a.slot-b.slot),cards=[];
 for(const item of items){
  const asset=item.id?images[item.id]:null;
  const possible=item.id?[path.join(publicDir,item.id+"-640.webp"),...(asset?.src?[path.join(root,"public",asset.src.replace(/^\//,""))]:[])]:[];
  let photo=null;
  for(const filename of possible){if(fs.existsSync(filename)){photo=await sharp(filename).rotate().resize(cardW,imageH,{fit:"cover",position:"attention"}).jpeg({quality:82}).toBuffer();break;}}
  const background=photo||await sharp({create:{width:cardW,height:imageH,channels:3,background:"#ddd6ca"}}).jpeg().toBuffer();
  cards.push(await sharp({create:{width:cardW,height:cardH,channels:3,background:"#f4f0e8"}}).composite([{input:background,top:0,left:0},{input:tileSvg(item,asset),top:imageH,left:0}]).jpeg({quality:86}).toBuffer());
 }
 const rows=Math.ceil(cards.length/cols),composites=cards.map((input,i)=>({input,left:(i%cols)*cardW,top:Math.floor(i/cols)*cardH}));
 const out=await sharp({create:{width:cols*cardW,height:rows*cardH,channels:3,background:"#f4f0e8"}}).composite(composites).jpeg({quality:88}).toBuffer();
 fs.writeFileSync(path.join(outDir,group+".jpg"),out);
 console.log(group+": "+items.length+" labelled tiles -> docs/photo-review/"+group+".jpg");
}
