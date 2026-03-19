import { User } from "../generated/prisma";
import prima from "../dataBase";

class LoginService {
  async Login(email: string) {
    try {
      const user = await prima.user.findUnique({
        where: {
          email: email,
        },
      });

      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Could not fetch user");
    }
  }
}

export { LoginService };
