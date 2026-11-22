/* Cyberpunk visual layer: digital rain in the hero + glitch headline. Decorative only. */
(function(){
 var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 var h1=document.querySelector('.hero h1');
 if(h1&&!reduce)h1.classList.add('glitch');
 var hero=document.querySelector('.hero');
 var canvas=document.querySelector('.hero-rain');
 if(!hero||!canvas||reduce)return;
 var ctx=canvas.getContext('2d');
 var chars='01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ<>/\\{}[]=+*#';
 var size=16,cols,drops,w,h,running=true,last=0;
 function resize(){
  var r=hero.getBoundingClientRect();
  w=canvas.width=Math.ceil(r.width);h=canvas.height=Math.ceil(r.height);
  cols=Math.ceil(w/size);
  drops=Array.from({length:cols},function(){return Math.random()*-40;});
 }
 function frame(t){
  if(running&&t-last>60){
   last=t;
   ctx.fillStyle='rgba(6,5,13,.14)';ctx.fillRect(0,0,w,h);
   ctx.font=size+'px "Share Tech Mono",monospace';
   for(var i=0;i<cols;i++){
    var ch=chars.charAt(Math.floor(Math.random()*chars.length));
    ctx.fillStyle=Math.random()>.97?'#ff2bd6':'#00f0ff';
    ctx.fillText(ch,i*size,drops[i]*size);
    if(drops[i]*size>h&&Math.random()>.975)drops[i]=0;
    drops[i]++;
   }
  }
  requestAnimationFrame(frame);
 }
 resize();
 window.addEventListener('resize',resize);
 if('IntersectionObserver' in window){
  new IntersectionObserver(function(e){running=e[0].isIntersecting;}).observe(hero);
 }
 document.addEventListener('visibilitychange',function(){running=!document.hidden;});
 requestAnimationFrame(frame);
})();
