document.querySelectorAll("video").forEach(video=>video.addEventListener("play",()=>document.querySelectorAll("video").forEach(other=>{if(other!==video)other.pause()})));

(()=>{
const video=document.getElementById('intro-video'), sound=document.querySelector('.sound-toggle'), motion=document.querySelector('.motion-toggle');
let scrolled=false,visible=false,timer=null,started=false;
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function cancel(){clearTimeout(timer);timer=null}
function schedule(){if(started||!scrolled||!visible||timer||document.hidden||reduce)return;timer=setTimeout(async()=>{timer=null;if(!visible||document.hidden)return;try{video.muted=true;await video.play();started=true;motion.hidden=false}catch{motion.hidden=false;motion.textContent='Iniciar vídeo';motion.setAttribute('aria-label','Iniciar vídeo')}},3000)}
window.addEventListener('scroll',()=>{scrolled=true;schedule()},{passive:true});
new IntersectionObserver(entries=>{visible=entries[0].intersectionRatio>=.5;if(visible)schedule();else{cancel();if(!video.paused)video.pause()}},{threshold:[0,.5]}).observe(video);
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancel();video.pause()}else schedule()});
sound.addEventListener('click',async()=>{video.muted=!video.muted;if(video.paused){try{await video.play();started=true;motion.hidden=false}catch{}}sound.textContent=video.muted?'Ativar som':'Silenciar'});
motion.addEventListener('click',()=>{started=true;cancel();if(video.paused)video.play().catch(()=>{});else video.pause()});
video.addEventListener('play',()=>{motion.hidden=false;motion.textContent='Pausar';motion.setAttribute('aria-label','Pausar vídeo')});
video.addEventListener('pause',()=>{motion.textContent='Continuar';motion.setAttribute('aria-label','Continuar vídeo')});
if(reduce){motion.hidden=false;motion.textContent='Iniciar vídeo';motion.setAttribute('aria-label','Iniciar vídeo')}
})();
