
const DBClass = require("./DBClass");

class User {
    constructor() {
        this.id = 0;
        this.name = "";
        this.email = "";
        this.mobileno = "";
        this.password = "";
        this.utype = "";
        this.db = new DBClass();
    }

    save = () => {
        let sql;
        if (this.id == 0) {
            sql = "INSERT INTO users(name, email, mobileno, password, utype)";
            sql += "VALUES('" + this.name + "', '" + this.email + "', '" + this.mobileno + "', '" + this.password + "', '" + this.utype + "')";
        } else {
            sql = "UPDATE users SET name = '" + this.name + "', ";
            sql += "email = '" + this.email + "', ";
            sql += "mobileno = '" + this.mobileno + "', ";
            sql += "password = '" + this.password + "', ";
            sql += "utype = '" + this.utype + "'";
            sql += "WHERE id = " + this.id;
        }

        

        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result)
                console.log(result);
            }, (err) => {
                reject(err);
            });

        });
    }

    list = () => {
        let sql = "SELECT * FROM users ORDER BY name";
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result)
            }, (err) => {
                reject(err);
            });

        });
    }

    get = () => {
        let sql = "SELECT * FROM users WHERE id = " + this.id;
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
        let sql = "DELETE FROM users WHERE id = " + this.id;
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result)
            }, (err) => {
                reject(err);
            });

        });
    }

    login = () => {
        let sql = "SELECT * FROM users WHERE email = '" + this.email + "' AND password = '" + this.password + "'";
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                if (result.length > 0) {
                    resolve(result[0])
                } else {
                    reject("Invalid credentials")
                }

            }, (err) => {
                reject(err);
            });

        });
    }
};

module.exports = User;