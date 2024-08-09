
const DBClass = require("./DBClass");


class Category {
    constructor() {
        this.id = 0;
        this.name = "";
        this.db = new DBClass();
    }

    save = () => {
        let sql;
        if (this.id == 0) {
            sql = "INSERT INTO categories(name)";
            sql += "VALUES('" + this.name + "')";
        } else {
            sql = "UPDATE categories SET name = '" + this.name + "' ";
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
        let sql = "SELECT * FROM categories ORDER BY name";
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result)
            }, (err) => {
                reject(err);
            });

        });
    }

    get = () => {
        let sql = "SELECT * FROM categories WHERE id = " + this.id;
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
        let sql = "DELETE FROM categories WHERE id = " + this.id;
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result)
            }, (err) => {
                reject(err);
            });

        });
    }
};

module.exports = Category;