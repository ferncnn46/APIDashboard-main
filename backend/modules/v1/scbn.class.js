const axios = require("axios");
const moment = require("moment-timezone");
var qs = require("qs");

class ScbApp {

  constructor(account, device_id, pin, auth = "") {
    this.account = account;
    this.device_id = device_id;
    this.pin = pin;
    this.auth = auth;

    //========= SETUP =========
    axios.defaults.baseURL = "https://fasteasy.scbeasy.com";
    axios.defaults.headers.common = {
      "Accept-Language": "th",
      "User-Agent": "Android/9;FastEasy/3.62.0/6573",
      "Content-Type": "application/json; charset=UTF-8",
      "Api-Auth": this.auth,
    };
  }

  async login() {
    let resPreload = await axios.post(
      "https://fasteasy.scbeasy.com:8443/v3/login/preloadandresumecheck",
      {
        deviceId: this.device_id,
        jailbreak: "0",
        isLoadGeneralConsent: "1",
        tilesVersion: "60",
        userMode: "INDIVIDUAL",
      }
    );
    if (resPreload.data.status.code !== 1000) return;

    let resPreAuth = await axios.post(
      "/isprint/soap/preAuth",
      {
        loginModuleId: "PseudoFE",
      },
      {
        headers: {
          "Api-Auth": resPreload.headers["api-auth"],
        },
      }
    );
    resPreAuth = resPreAuth.data;
    let { data } = await axios.post(
      "https://hashpin.me-spin.com/pin/encrypt",
      qs.stringify({
        Sid: resPreAuth.e2ee.pseudoSid,
        ServerRandom: resPreAuth.e2ee.pseudoRandom,
        pubKey: resPreAuth.e2ee.pseudoPubKey,
        pin: this.pin,
        hashType: resPreAuth.e2ee.pseudoOaepHashAlgo,
      }),
      {
        headers: {
          "Accept-Encoding": "gzip",
        },
      }
    );

    let resLogin = await axios.post(
      "/v1/fasteasy-login",
      {
        deviceId: this.device_id,
        pseudoPin: data,
        pseudoSid: resPreAuth.e2ee.pseudoSid,
      },
      {
        headers: {
          "Api-Auth": resPreload.headers["api-auth"],
        },
      }
    );
    if (resLogin.data.status.code == 1000) {
      this.auth = resLogin.headers["api-auth"];
      axios.defaults.headers.common = {
        "Accept-Language": "th",
        "User-Agent": "Android/9;FastEasy/3.62.0/6573",
        "Content-Type": "application/json; charset=UTF-8",
        "Api-Auth": this.auth,
      };
      return this.auth;
    }
  }

  async getTransaction() {
    let startDate = moment().tz("Asia/Bangkok").format("Y-MM-DD");
    let endDate = moment().tz("Asia/Bangkok").add(1, "days").format("Y-MM-DD");
    let { data } = await axios.post("/v2/deposits/casa/transactions", {
      accountNo: this.account,
      startDate: startDate,
      endDate: endDate,
      pageSize: 10,
      pageNumber: 1,
      productType: "2",
    });

    if (data.status.code == 1000) return data.data.txnList;
    return data;
  }

  async getBalance() {
    let { data } = await axios.post("/v2/deposits/summary", {
      depositList: [
        {
          accountNo: this.account,
        },
      ],
      numberRecentTxn: 2,
      tilesVersion: 26,
    });
    if (data.status.code == 1000) return data.depositList[0].availableBalance;
    return data;
  }

  async verifyBankAccount(bankAccNo, bankCode, amount) {
    const transferType = bankCode === "014" ? "3RD" : "ORFT";
    let { data } = await axios.post("/v2/transfer/verification", {
      accountFrom: this.account,
      accountFromType: "0",
      accountTo: bankAccNo,
      accountToBankCode: bankCode,
      amount,
      annotation: "",
      transferType,
    });
    return data;
  }

  async confirmTransfer(bankAccNo, bankCode, amount) {
    const transferType = bankCode === "014" ? "3RD" : "ORFT";
    let resVerify = await axios.post("/v2/transfer/verification", {
      accountFrom: this.account,
      accountFromType: "0",
      accountTo: bankAccNo,
      accountToBankCode: bankCode,
      amount,
      annotation: "",
      transferType,
    });
    let { data } = await axios.post(
      "/v3/transfer/confirmation",
      resVerify.data.data
    );
    return data;
  }

  async qrScan(barcode) {
    let { data } = await axios.post("/v7/payments/bill/scan", {
      barcode,
      tilesVersion: 41,
    });
    return data;
  }

}

module.exports = ScbApp;
