
const DBClass = require("./DBClass");


class Product {
    constructor() {
        this.id = 0;
        this.name = "";
        this.categoryid = 0;
        this.unitid = 0;
        this.description = "";
        this.gstpercent = 0;
        this.imagepath = "";
         
        this.db = new DBClass();
    }

    save = () => {
        let sql;
        if (this.id == 0) {
            sql = "INSERT INTO products(name, categoryid, unitid, description, gstpercent, imagepath)";
            sql += "VALUES('" + this.name + "', " + this.categoryid + ", "+ this.unitid +",";
            sql += "'" + this.description + "', " + this.gstpercent + ", '"+ this.imagepath +"')";    
        } else {
            sql = "UPDATE poducts SET name = '" + this.name + "', ";
            sql += "categoryid = " + this.categoryid + ",";
            sql += "unitid = " + this.unitid + ",";
            sql += "description = '" + this.description + "',";
            sql += "gstpercent = " + this.gstpercent + "";
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
        let sql = "SELECT * FROM products ORDER BY name";
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result)
            }, (err) => {
                reject(err);
            });

        });
    }

    get = () => {
        let sql = "SELECT * FROM products WHERE id = " + this.id;
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                if(result.length > 0){
                    resolve(result[0])
                }else{
                    reject("Record not found")
                } 
                
            }, (err) => {
                reject(err);
            });

        });
    }

    delete = () => {
        let sql = "DELETE FROM products WHERE id = " + this.id;
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result)
            }, (err) => {
                reject(err);
            });

        });
    }
};

module.exports = Product;