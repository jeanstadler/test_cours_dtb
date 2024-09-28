import http from "node:http";
import express from "express";
import HomepageRouter from "../router/homepage_router.js";
import UserRouter from "../router/user_router.js";
import SecurityRouter from "../router/security_router.js";
class Server {
    app = express();
    router = express.Router();
    constructor() {
        this.router.use(express.json());
        // this.router.use(cors({origin:process.env.ORIGINS?.split(",")}));
        this.app.use(this.router);
        this.routersList();
    }
    routersList = () => {
        this.router.use("/", new HomepageRouter().getRoutesList());
        this.router.use("/user", new UserRouter().getRouterList());
        this.router.use("/", new SecurityRouter().getRoutesList());
    };
    createServer = () => {
        return http.createServer(this.app);
    };
}
export default Server;
