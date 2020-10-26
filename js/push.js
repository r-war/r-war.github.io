const webPush = require('web-push');

const vapidKeys = {
    "publicKey":"BEhlf0Ua_onpnCW7oSzE-Vi75bc180soHnPWT9osQx9eqyU2Cu5c46SDy84xMW2ZqIKWfQR3X67d8pDSX441gnI",
    "privateKey":"X00fOSlbt5VlvbE1d2zPE2CxBSvUK4DUVShCGwMMzUg"
}

webPush.setVapidDetails(
    'mailto:rivwar25@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fbl5lSyZWC4:APA91bFfPz80PJIXijHniHnPxMkX6aO5-rObccuT93km4P-IO4PdcXQ9NpRjGDsTerFaFfpLylEDZ6cG-FV-t8zTm5HHQVhMeYPYzaPebvhl0Ir-TgHu4d5ti4fIqan4dkSLm6XEER_v",
    "keys": {
        "p256dh": "BF+w9HM3iMym1/rWhFL80lTqae8mffnPduO0g23iNOvJpBU4G35sESKnUsNJaF+L7Ioc4mhhMYyxo/mq7OuXEoA=",
        "auth": "DSwFPZb9oS/0zbS3Tn/E8g=="
    }
};

let payload = "Hello World!";

let options = {
    gcmAPIKey : "1067193912412",
    TTL : 60
}

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)