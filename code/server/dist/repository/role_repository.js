import MysqlService from "../service/mysql_service.js";
class RoleRepository {
    mySQLService = new MysqlService();
    table = "role";
    selectAll = async () => {
        const connection = await this.mySQLService.connect();
        const query = `SELECT ${this.table}.* FROM ${process.env.MYSQL_DB}.${this.table};`;
        try {
            const results = await connection.execute(query);
            return results.shift();
        }
        catch (error) {
            return error;
        }
    };
    selectOne = async (data) => {
        const connection = await this.mySQLService.connect();
        const query = `SELECT ${this.table}.* FROM ${process.env.MYSQL_DB}.${this.table} WHERE ${this.table}.id = :id;`;
        try {
            const results = await connection.execute(query, data);
            return results.shift().shift();
        }
        catch (error) {
            return error;
        }
    };
}
;
export default RoleRepository;
