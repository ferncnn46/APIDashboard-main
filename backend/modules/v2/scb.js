const axios = require("axios")

async function preload(deviceId) {
    let resp = await axios.post('https://fasteasy.scbeasy.com/v3/login/preloadandresumecheck', {
        "isLoadGeneralConsent": "1",
        "deviceId": deviceId,
        "jailbreak": "0",
        "tilesVersion": "60",
        "userMode": "INDIVIDUAL"
    }, {
        headers: {
            'Accept-Language': 'th',
            'scb-channel': 'APP',
            'User-Agent': 'Android/10;FastEasy/3.64.0/6739',
            'Content-Type': 'application/json; charset=UTF-8',
            'Host': 'fasteasy.scbeasy.com',
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            'Connection': 'close'
        }
    })
    return resp.headers['api-auth'];
}

async function scanBill(apiAuth, barcode) {
    let resp = await axios.post('https://fasteasy.scbeasy.com/v7/payments/bill/scan', {
        "tilesVersion": "60",
        "barcode": barcode
    }, {
        headers: {
            'Accept-Language': 'th',
            'scb-channel': 'app',
            'User-Agent': 'Android/10;FastEasy/3.64.0/6739',
            'Host': 'fasteasy.scbeasy.com:8443',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'Api-Auth': apiAuth,
            'Content-Type': 'application/json; charset=UTF-8'
        }
    });

    return resp.data.data;
}

module.exports = {
    scanBill,
    preload
}