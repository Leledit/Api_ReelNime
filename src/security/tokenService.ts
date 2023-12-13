import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

class TokenService {
  private secret: string;
  private optionsStandard: SignOptions & VerifyOptions;

  constructor(secret: string) {
    this.secret = secret;

    // Opções padrão para assinatura e verificação de tokens
    this.optionsStandard = {
      expiresIn: "1h",
      algorithm: "HS256",
    };
  }

  gerarToken(
    payload: Record<string, any>,
    opcoesAdicionais?: SignOptions
  ): string {
    const opcoes = { ...this.optionsStandard, ...opcoesAdicionais };
    return jwt.sign(payload, this.secret, opcoes);
  }

  verificarToken(token: string): Record<string, any> | null {
    try {
      const decoded = jwt.verify(token, this.secret, this.optionsStandard);
      return decoded as Record<string, any>;
    } catch (error: any) {
      console.error("Erro na verificação do token:", error.message);
      return null;
    }
  }
}

export default TokenService;
