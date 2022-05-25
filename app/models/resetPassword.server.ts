import type { ResetPassword } from "@prisma/client";
import { prisma } from "~/db.server";
import { v4 as uuid } from "uuid";

export async function getResetPasswordToken(
  email: ResetPassword["email"]
): Promise<string> {
  const token = await prisma.resetPassword.findUnique({ where: { email } });

  const newToken = uuid();
  if (token) {
    prisma.resetPassword.update({
      where: {
        email,
      },
      data: {
        token: newToken,
      },
    });
  } else {
    prisma.resetPassword.create({
      data: {
        email,
        token: newToken,
      },
    });
  }
  return newToken;
}


export async function deleteToken(email: ResetPassword["email"]) {
  return prisma.resetPassword.delete({ where: { email } });
}
