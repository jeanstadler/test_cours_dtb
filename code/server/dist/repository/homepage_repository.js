import MysqlService from "../service/mysql_service.js";
class HomepageRepository {
    mySQLService = new MysqlService();
    table = "cours";
    selectAll = async () => {
        // console.log("oui repository");
        const connection = await this.mySQLService.connect();
        const query = `SELECT ${this.table}.* FROM ${process.env.MYSQL_DB}.${this.table};`;
        try {
            const results = await connection.execute(query);
            return results.shift();
        }
        catch (error) {
            // console.log("oui erreur");
            return error;
        }
    };
}
export default HomepageRepository;
