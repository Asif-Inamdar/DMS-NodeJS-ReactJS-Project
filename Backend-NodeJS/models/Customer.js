const DBClass = require("./DBClass");

class Customer {
    constructor() {
        this.id = 0;
        this.name = "";
        this.email = "";
        this.mobileno = "";
        this.address = "";
        this.utype = "";
        this.db = new DBClass(); // This should now work
    }

    save() {
        let sql;
        if (this.id == 0) {
            sql = "INSERT INTO customers(name, email, mobileno, address, town) VALUES('" + this.name + "','" + this.email + "','" + this.mobileno + "','" + this.address + "','" + this.town + "')";
        } else {
            sql = "UPDATE customers SET name='" + this.name + "', email='" + this.email + "', mobileno='" + this.mobileno + "', address='" + this.address + "', town='" + this.town + "' WHERE id=" + this.id;
        }
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }
    list = () => {
        let sql;
        if (this.id == 0) {
          sql = "SELECT * FROM customers";
        } else {
          sql = "SELECT * FROM customers WHERE id = " + this.id;
        }
    
        return new Promise((resolve, reject) => {
          this.db.query(sql).then((result) => {
            resolve(result);
          }, (err) => {
            reject(err);
          });
        });
      }
    

      delete = () => {
        let sql = "DELETE FROM customers WHERE id = " + this.id;
        return new Promise((resolve, reject) => {
          this.db.query(sql).then((result) => {
            resolve(result);
          }, (err) => {
            reject(err);
          });
        });
      }

}

module.exports = Customer;