import type { ResetPassword } from "@prisma/client";
import { prisma } from "~/db.server";
import { v4 as uuid } from "uuid";

export async function getResetPasswordToken(
  email: ResetPassword["email"]
): Promise<string> {
  const token = await prisma.resetPassword.findUnique({ where: { email } });

  const newToken = uuid();
  if (token) {
    await prisma.resetPassword.update({
      where: {
        email,
      },
      data: {
        token: newToken,
      },
    });
  } else {
    await prisma.resetPassword.create({
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

export async function isTokenValid(
  token: ResetPassword["token"]
): Promise<boolean> {
  const resetPassword = await prisma.resetPassword.findUnique({
    where: { token },
  });

  return resetPassword ? true : false;
}

export async function getEmailByToken(
  token: ResetPassword["token"]
): Promise<string | undefined> {
  const resetPassword = await prisma.resetPassword.findUnique({
    where: { token },
  });

  return resetPassword?.email;
}
