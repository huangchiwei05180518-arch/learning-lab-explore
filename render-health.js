// Presentation state only: does not request GPU permission or force a restore.
export function watchRenderHealth(canvas, {isLost, onUnavailable, onRestored}) {
  let ready=false, failed=false, suspended=false;
  canvas.addEventListener('webglcontextlost', event=>{
    event.preventDefault();
    suspended=true;
    onUnavailable('context-lost');
  });
  canvas.addEventListener('webglcontextrestored', ()=>{
    if(!ready || failed || isLost()) return;
    suspended=false;
    onRestored();
  });
  return {
    ready(){ready=true;},
    fail(reason='initialization-failed'){failed=true;suspended=true;onUnavailable(reason);},
    canRender(){return ready&&!failed&&!suspended&&!isLost();}
  };
}
