import mysql from "mysql2/promise";
// permet de faire la connexion mais pas la transaction !
class MysqlService {
    connect = async () => {
        const connection = mysql.createPool({
            host: process.env.MYSQL_HOST,
            database: process.env.MYSQL_DB,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            namedPlaceholders: true
        });
        return connection;
    };
}
export default MysqlService;
