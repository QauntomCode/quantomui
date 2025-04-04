
export function register() {

  let isPApp= isProgressiveApp()
  if(!isPApp){
     //alert("not progressive app")
    return;
  }
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    });
  }
}


export const isProgressiveApp=()=>{
  if(window?.globalConfig?.IsNotProgressiveApp){
     return false;
  }
  return true;
}
