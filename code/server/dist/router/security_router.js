import express from "express";
import SecurityController from "../controller/security_controller.js";
class SecurityRouter {
    router = express.Router();
    getRoutesList = () => {
        this.router.post("/register", new SecurityController().register);
        this.router.post("/login", new SecurityController().login);
        this.router.post("/auth", new SecurityController().auth);
        return this.router;
    };
}
export default SecurityRouter;
