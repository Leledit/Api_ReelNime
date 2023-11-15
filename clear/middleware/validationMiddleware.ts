import { Request, Response, NextFunction } from "express";
import Joi from "joi";
class validationMiddleware {
  private schema: Joi.ObjectSchema<any>;

  constructor(schema: Joi.ObjectSchema<any>) {
    this.schema = schema;
  }
  validatingTheRequestBody = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this.schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errorMessage = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ error: errorMessage });
    }

    next();
  };

  validatingTheRequestQuery = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this.schema.validate(req.query, {
      abortEarly: false,
    });

    if (error) {
      const errorMessage = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ error: errorMessage });
    }

    next();
  };

  validatingTheRequestParams = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this.schema.validate(req.params, {
      abortEarly: false,
    });

    if (error) {
      const errorMessage = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ error: errorMessage });
    }

    next();
  };
}

export default validationMiddleware;
