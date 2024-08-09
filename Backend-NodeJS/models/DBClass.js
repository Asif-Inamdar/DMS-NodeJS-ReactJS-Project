let mysql = require("mysql");

class DBClass{
    constructor(){
        this.con = mysql.createConnection({
            host:process.env.SERVER_NAME,
            user:process.env.USER_NAME,
            password:process.env.PASSWORD,
            database:process.env.DB_NAME
        });
    }

    query(sql){
        return new Promise((resolve, reject)=>{
            this.con.query(sql, (err, result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
        });

        });
    }
};

module.exports = DBClass;