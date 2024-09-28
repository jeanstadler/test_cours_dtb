import MysqlService from "../service/mysql_service.js";
class UserRepository {
    mySQLService = new MysqlService();
    table = "user";
    selectAll = async () => {
        // public selectAll = async (): Promise<QueryResult | unknown> => {
        const connection = await this.mySQLService.connect();
        const query = `SELECT ${this.table}.* FROM ${process.env.MYSQL_DB}.${this.table};`;
        try {
            const result = await connection.execute(query);
            return result.shift();
        }
        catch (error) {
            return error;
        }
    };
    selectOne = async (data) => {
        const connection = await this.mySQLService.connect();
        const query = `SELECT ${this.table}.* FROM ${process.env.MYSQL_DB}.${this.table} WHERE ${this.table}.id = :id;`;
        try {
            const result = await connection.execute(query, data);
            return result.shift();
        }
        catch (error) {
            return error;
        }
    };
    create = async (data) => {
        const connection = await this.mySQLService.connect();
        const transaction = await connection.getConnection();
        try {
            await transaction.beginTransaction();
            const query = `INSERT INTO ${process.env.MYSQL_DB}.${this.table} VALUE (NULL, :firstname, :email, :password, :role_id);`;
            const results = await connection.execute(query, data);
            await transaction.commit();
            return results;
        }
        catch (error) {
            await transaction.rollback();
            return error;
        }
    };
}
export default UserRepository;
