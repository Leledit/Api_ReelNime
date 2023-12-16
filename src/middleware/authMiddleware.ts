import { NextFunction, Request, Response } from "express";
import TokenService from "../security/tokenService.ts";

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  //const token = req.header("Authorization");
  const token = req.headers['authorization']
  //
  const tokenService = new TokenService(process.env.TOLKEN_SECRET_KEY || "");

  if (!token)
    return res
      .status(401)
      .json({ message: "Acesso negado. Token não fornecido." });

    const resullt = tokenService.verificarToken(token);

    if(resullt === null){
        return res.status(403).json({ message: 'Falha na autenticação do token.' });
    }
    
    if(resullt.papel !== 'admin'){
        return res.status(403).json({ message: 'Acesso bloqueado' });
    }
    
    next();
}

export default authenticateToken

