import { jwt } from "jsonwebtoken";

const verifyToken = (req, res, next) =>{
    const token = req.headers.authorization?.split("")[1];
    if(!token) return res.status(403).json({message: "Accès refusé"});

    jwt.verify(token, process.env.JWT_SECRET, (err,decoded) =>{
        if (err) return res.status(401).json({message: "Token invalide"});
        req.user = decoded;
        next();
    });
};

export default {verifyToken};