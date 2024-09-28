import jwt from "jsonwebtoken";
class AuthorizationMiddleware {
    authorize = (roles) => {
        return (req, res, next) => {
            const token = req.headers.authorization.split(" ")[1];
            try {
                const verifyToken = jwt.verify(token, process.env.SECRET);
            }
            catch (error) {
                return res.status(401).json({ status: 401, message: "Unauthorized" });
            }
            const data = jwt.decode(token);
            if (roles.indexOf(data.user.role.name) === -1) {
                return res.status(401).json({ status: 401, message: "Unauthorized" });
            }
            next();
        };
    };
}
;
export default AuthorizationMiddleware;
// j'ai testé avec un autre code ....
// import type { Request, Response, NextFunction } from 'express'; 
// import jwt, { type JwtPayload } from 'jsonwebtoken';
// import type User from '../model/user.js';
// // Étendre l'interface Request pour inclure la propriété user
// declare global {
//     namespace Express {
//         interface Request {
//             user?: User; // Assurez-vous que User est le bon type
//         }
//     }
// }
// class AuthorizationMiddleware {
//     public authorize = (roles: string[]) => {
//         return (req: Request, res: Response, next: NextFunction) => {
//             const authHeader = req.headers.authorization;
//             if (!authHeader || !authHeader.startsWith('Bearer ')) {
//                 return res.status(401).json({ status: 401, message: "Non autorisé" });
//             }
//             const token = authHeader.split(' ')[1];
//             try {
//                 const decoded = jwt.verify(token, process.env.SECRET as string) as JwtPayload;
//                 const userRole = decoded.user?.role?.name;
//                 if (!userRole || !roles.includes(userRole)) {
//                     return res.status(403).json({ status: 403, message: "Accès refusé" });
//                 }
//                 req.user = decoded.user; // Cette ligne ne devrait plus causer d'erreur
//                 next();
//             } catch (error) {
//                 return res.status(401).json({ status: 401, message: "Token invalide ou expiré" });
//             }
//         };
//     }
// };
// export default AuthorizationMiddleware;
