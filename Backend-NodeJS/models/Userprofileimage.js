
const DBClass = require("./DBClass");

class Userprofileimage {

    constructor() {
        this.id = 0;
        this.imagepath = "";
         
        this.db = new DBClass();
    }

    save = () => {
        let sql;
        if (this.id === 0) {
            sql = "INSERT INTO userprofileimage (userprofileimage) VALUES ('" + this.imagepath + "')";
        } else {
            sql = "UPDATE userprofileimage SET userprofileimage = '" + this.imagepath + "' WHERE id = " + this.id;
        }
    
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    

    list = () => {
        let sql = "SELECT * FROM userprofileimage ORDER BY name";
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result)
            }, (err) => {
                reject(err);
            });

        });
    }

    get = () => {
        let sql = "SELECT * FROM userprofileimage WHERE id = " + this.id;
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
        let sql = "DELETE FROM userprofileimage WHERE id = " + this.id;
        return new Promise((resolve, reject) => {
            this.db.query(sql).then((result) => {
                resolve(result)
            }, (err) => {
                reject(err);
            });

        });
    }



};

module.exports = Userprofileimage;