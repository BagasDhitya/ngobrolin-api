import { TokenPayload } from "../../helpers/jwt";

declare module "express-serve-static-core" {
    interface Request {
        user?: TokenPayload;
    }
}

export { };
