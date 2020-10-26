
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("/service-worker.js", {scope: '/'})
        .then(function(reg) {
            console.log("Pendaftaran ServiceWorker berhasil "+reg.scope);
        })
        .catch(function() {
            console.log("Pendaftaran ServiceWorker gagal");
        });

        if('Notification' in window){
            Notification.requestPermission().then(result =>{
                if(result == 'denied'){
                    console.log("tidak diizinkan")
                    return ;
                }else if (result == "default"){
                    console.log("user tutup window")
                    return;
                }
                if(('PushManager' in window)){
                    navigator.serviceWorker.ready.then(()=>{
                        navigator.serviceWorker.getRegistration().then(reg =>{
                            reg.pushManager.subscribe({
                                userVisibleOnly : true,
                                applicationServerKey : urlBase64ToUintArray('BEhlf0Ua_onpnCW7oSzE-Vi75bc180soHnPWT9osQx9eqyU2Cu5c46SDy84xMW2ZqIKWfQR3X67d8pDSX441gnI'
        )                        }).then(subscribe =>{
                                console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                                    null, new Uint8Array(subscribe.getKey('p256dh')))));
                                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                                    null, new Uint8Array(subscribe.getKey('auth')))));
                            }).catch(e=>{
                                console.log(e.message);
                            })
                        })
                    })
                }
            })
        }
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

function urlBase64ToUintArray (base64string) {
    const padding = '='.repeat((4 - base64string.length % 4) % 4);
    const base64 = (base64string +padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for(let i =0 ;i  < rawData.length; i++){
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
