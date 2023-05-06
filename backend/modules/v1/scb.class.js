const unirest = require("unirest");
const moment = require("moment-timezone");
let tls = require("tls");

class ScbClass {
  constructor(account, device_id, pin) {
    this.account = account;
    this.device_id = device_id;
    this.pin = pin;
  }
  async login() {
    let respone = await unirest
      .post("https://fasteasy.scbeasy.com:8443/v3/login/preloadandresumecheck")
      .headers({
        "Accept-Language": "th",
        "user-agent": "Android/9;FastEasy/3.62.0/6573",
        "Content-Type": "application/json; charset=UTF-8",
      })
      .send({
        deviceId: this.device_id,
        jailbreak: "0",
        isLoadGeneralConsent: "1",
        tilesVersion: "60",
        userMode: "INDIVIDUAL",
      })
      .then((response) => {
        return response;
      });
    if (respone.body.status.code == 1000) {
      this.auth = respone.headers["api-auth"];

      let preAuth = await unirest
        .post("https://fasteasy.scbeasy.com/isprint/soap/preAuth")
        .headers({
          "Accept-Language": "th",
          "user-agent": "Android/9;FastEasy/3.62.0/6573",
          "Content-Type": "application/json; charset=UTF-8",
          "Api-Auth": this.auth,
        })
        .send({ loginModuleId: "PseudoFE" })
        .then((response) => {
          return response;
        });

      preAuth = preAuth.body;

      let encrypt = await unirest
        .post("https://hashpin.me-spin.com/pin/encrypt")
        .headers({
          "Accept-Language": "th",
          "user-agent": "Android/9;FastEasy/3.62.0/6573",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        })
        .send({
          Sid: preAuth.e2ee.pseudoSid,
          ServerRandom: preAuth.e2ee.pseudoRandom,
          pubKey: preAuth.e2ee.pseudoPubKey,
          pin: this.pin,
          hashType: preAuth.e2ee.pseudoOaepHashAlgo,
        })
        .then((response) => {
          return response;
        });
      console.log({
        deviceId: this.device_id,
        pseudoPin: encrypt.body,
        pseudoSid: preAuth.e2ee.pseudoSid,
      });
      let LoginScb = await unirest
        .post("https://fasteasy.scbeasy.com/v1/fasteasy-login")
        .headers({
          "Accept-Language": "th",
          "user-agent": "Android/9;FastEasy/3.62.0/6573",
          "Accept-Encoding": "gzip",
          "scb-channel": "APP",
          "Content-Type": "application/json; charset=UTF-8",
          "Api-Auth": this.auth,
        })
        .send({
          deviceId: this.device_id,
          pseudoPin: encrypt.body,
          pseudoSid: preAuth.e2ee.pseudoSid,
        })
        .then((response) => {
          return response;
        });

      if (LoginScb.body.status.code == 1000) {
        this.auth = LoginScb.headers["api-auth"];
        // console.log(LoginScb.body);
        return LoginScb;
      }
    }
  }
  async getTransaction(
    startDate = null,
    endDate = null,
    pageSize = 5,
    pageNumber = 1
  ) {
    moment.locale("th");
    if (startDate == null || endDate == null) {
      startDate = moment().tz("Asia/Bangkok").format("Y-MM-DD");
      endDate = moment().tz("Asia/Bangkok").add(1, "days").format("Y-MM-DD");
    }
    startDate = "2022-12-01";

    let transection = await unirest
      .post("https://fasteasy.scbeasy.com/v2/deposits/casa/transactions")
      .headers({
        "Accept-Language": "th",
        "user-agent": "Android/9;FastEasy/3.62.0/6573",
        "Content-Type": "application/json; charset=UTF-8",
        "Api-Auth": this.auth,
      })
      .send({
        accountNo: this.account,
        startDate: startDate,
        endDate: endDate,
        pageSize: pageSize,
        pageNumber: pageNumber,
        productType: "2",
      })
      .then((response) => {
        return response.body;
      });

    let Statements = [];

    if (transection.status.code == 1000) {
      return transection.data.txnList;
    }
    return transection;
  }
  async getBalance() {
    try {
      let response = await unirest
        .post("https://fasteasy.scbeasy.com/v2/deposits/summary")
        .headers({
          "Accept-Language": "th",
          "user-agent": "Android/9;FastEasy/3.62.0/6573",
          "Content-Type": "application/json; charset=UTF-8",
          "Api-Auth": this.auth,
        })
        .send({
          depositList: [
            {
              accountNo: this.account,
            },
          ],
          numberRecentTxn: 2,
          tilesVersion: 26,
        })
        .then((response) => {
          return response.body;
        });

      return response;
    } catch (error) {
      return 0;
    }
  }
  async verifyBankAccount(bankAccNo, bankCode) {
    const transferType = bankCode === "014" ? "3RD" : "ORFT";
    let response = await unirest
      .post("https://fasteasy.scbeasy.com/v2/transfer/verification")
      .headers({
        "Accept-Language": "th",
        "user-agent": "Android/9;FastEasy/3.62.0/6573",
        "Content-Type": "application/json; charset=UTF-8",
        "Api-Auth": this.auth,
      })
      .send({
        accountFrom: this.account,
        accountFromType: "0",
        accountTo: bankAccNo,
        accountToBankCode: bankCode,
        amount: 1,
        annotation: "Verify Account",
        transferType,
      })
      .then((response) => {
        return response.body;
      });
    return response;
  }
  async confirmTransfer(bankAccNo, bankCode, amount) {
    const transferType = bankCode === "014" ? "3RD" : "ORFT";
    let response = await unirest
      .post("https://fasteasy.scbeasy.com/v2/transfer/verification")
      .headers({
        "Accept-Language": "th",
        "user-agent": "Android/9;FastEasy/3.62.0/6573",
        "Content-Type": "application/json; charset=UTF-8",
        "Api-Auth": this.auth,
      })
      .send({
        accountFrom: this.account,
        accountFromType: "0",
        accountTo: bankAccNo,
        accountToBankCode: bankCode,
        amount,
        annotation: "Verify Account",
        transferType,
      })
      .then((response) => {
        return response.body;
      });
    let responsex = await unirest
      .post("https://fasteasy.scbeasy.com/v3/transfer/confirmation")
      .headers({
        "Accept-Language": "th",
        "user-agent": "Android/9;FastEasy/3.62.0/6573",
        "Content-Type": "application/json; charset=UTF-8",
        "Api-Auth": this.auth,
      })
      .send(response.data)
      .then((response) => {
        return response.body;
      });
    return responsex;
  }
}

module.exports = ScbClass;
