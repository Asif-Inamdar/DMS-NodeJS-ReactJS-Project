const DBClass = require("./DBClass");

class CRoute {
    constructor() {
        this.id = 0;
        this.name = "";
        this.db = new DBClass();
    }

    save = () => {
        let sql;
        if (this.id == 0) {
            sql = "INSERT INTO routes(name)";
            sql += "VALUES('" + this.name + "')";
        } else {
            sql = "UPDATE routes SET name = '" + this.name + "' ";
            sql += "WHERE id = " + this.id;
        }

        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result)
            }, (err) => {
                reject(err);
            });

        });
    }

    list = () => {
        let sql = "SELECT R.*, (SELECT COUNT(*) FROM routecustomers AS RC WHERE RC.routeid = R.id) AS customercount ";
        sql += "FROM routes AS R ORDER BY R.name";
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result)
            }, (err) => {
                reject(err);
            });

        });
    }

    get = () => {
        let sql = "SELECT * FROM routes WHERE id = " + this.id;
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

    delete = () => {
        let sql = "DELETE FROM routes WHERE id = " + this.id;
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result)
            }, (err) => {
                reject(err);
            });

        });
    }

    //routeCustomers Table.

    addCustomer = (routeid, customerid) => {
        let sql = "INSERT INTO routecustomers (routeid, customerid) VALUES (" + routeid + ", " + customerid + ")";
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result)
            }, (err) => {
                reject(err);
            });

        });
    }

    removeCustomer = (routeid, customerid) => {
        let sql = "DELETE FROM routecustomers WHERE routeid = " + routeid + " AND  customerid = " + customerid;
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result)
            }, (err) => {
                reject(err);
            });

        });
    }

    customerList = (routeid) => {
        let sql = "SELECT C.*, IFNULL(RC.id, 0) AS rcid FROM customers AS C LEFT OUTER JOIN routecustomers AS RC ON C.id = RC.customerid ";
        sql += "AND RC.routeid = " + routeid + " ";
        sql += "WHERE C.id NOT IN(SELECT customerid FROM routecustomers AS RC1 WHERE RC1.routeid <> " + routeid + ") ";
        sql += "ORDER BY C.name";
        console.log(sql);

        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result)
            }, (err) => {
                reject(err);
            });

        });
    }
}

module.exports = CRoute;