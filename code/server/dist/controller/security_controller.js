import argon2 from "argon2";
import jwt from "jsonwebtoken";
import SecurityRepository from "../repository/security_repository.js";
class SecurityController {
    SecurityRepository = new SecurityRepository();
    register = async (req, res) => {
        // argon2 hash le mot de passe que l'utilisateur a rentré
        const hash = await argon2.hash(req.body.password);
        // on remplace l'emplacement du mot de passe qui est en clair par le mot de passe haché
        req.body = { ...req.body, password: hash };
        const result = await this.SecurityRepository.register(req.body);
        if (result instanceof Error) {
            return process.env.NODE_ENV === "dev" ? res.json(result) : res.status(400).json({ status: 400, message: "error" });
            // process.env.NODE_ENV est une variable d'environnement qui permet de savoir si l'application est en mode développement ou en mode production
            // si l'application est en mode développement, on affiche le message d'erreur en clair
            // si l'application est en mode production, on affiche un message d'erreur générique
            // un message d'erreur en clair est un message d'erreur qui contient des informations sur l'erreur tandis qu'un message d'erreur générique est un message d'erreur qui ne contient pas d'informations sur l'erreur
        }
        return res.status(201).json({ status: 201, message: "OK", data: result, });
    };
    login = async (req, res) => {
        // QueryResult est un type de données qui contient les résultats d'une requête SQL
        const user = await this.SecurityRepository.getUserByEmail(req.body);
        if (user instanceof Error) {
            return res.status(400).json({ status: 400, message: "error" });
        }
        ;
        const isPasswordIsValid = await argon2.verify(user.password, req.body.password);
        // argon2 récupère le mot de passe en clair puis le hache puis le compare avec le mot de passe haché stocké dans la base de données
        if (!isPasswordIsValid) {
            return res.status(400).json({ status: 400, message: "error" });
        }
        return res.status(200).json({ status: 200, message: "OK", data: user });
    };
    auth = async (req, res) => {
        const user = await this.SecurityRepository.getUserByEmail(req.body);
        if (user instanceof Error) {
            return res.status(400).json({ status: 400, message: "error" });
        }
        ;
        const isPasswordIsValid = await argon2.verify(user.password, req.body.password);
        if (!isPasswordIsValid) {
            return res.status(400).json({ status: 400, message: "error" });
        }
        const token = jwt.sign({ user: user, }, process.env.SECRET, { expiresIn: "1h" });
        // on créer un token qui contient l'id de l'utilisateur et la date d'expiration du token
        return res.status(200).json({ status: 200, message: "OK", data: user, token: token });
        // on retourne un status 200, un message "OK", les données de l'utilisateur et le token
    };
}
export default SecurityController;
