import mysql from "mysql"

export const  db = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"Y@d@v2001",
    database:"blog"

})