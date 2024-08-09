const DBClass = require("./DBClass");

class Routewisecustomers {
    constructor() {
        this.id = 0;
        this.routeid = "";
        this.customerid = "";
        this.db = new DBClass();
    }

    get = () => {
        let sql = "SELECT * FROM routecustomers WHERE id = " + this.id;
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                if (result.length > 0) {
                    resolve(result[0])
                } else {
                    reject("Record not found")
                }
            }, (err) => {
                reject(err);
            });
        });
    }

    list = () => {
        let sql = "SELECT * FROM routecustomers";
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }
}

module.exports = Routewisecustomers;
