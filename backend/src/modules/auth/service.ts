import { findUserByEmail } from "./repository";
import { verifyPassword } from "../../lib/password";
import { signToken } from "../../lib/token";
import { UnauthorizedError } from "../../domain/errors";

export async function login(email: string, password: string) {
    const user = await findUserByEmail(email);
    if (!user || !user.isActive) {
        throw new UnauthorizedError("Invalid email or password");
    }
    const passwordOk = await verifyPassword(password, user.passwordHash);
    if (!passwordOk) {
        throw new UnauthorizedError("Invalid email or password");
    }
    const token = signToken({sub: user.id,email: user.email,role: user.role});
    return {token,user: {id: user.id,email: user.email,name: user.name,role: user.role}};
}