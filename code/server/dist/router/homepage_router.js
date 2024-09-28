import express from "express";
import HomepageController from "../controller/homepage_controller.js";
class HomepageRouter {
    router = express.Router();
    getRoutesList = () => {
        this.router.get("/", new HomepageController().get);
        return this.router;
    };
}
export default HomepageRouter;
