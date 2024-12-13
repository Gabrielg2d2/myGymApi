import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";

type ICreateUserUseCase = {
  name: string;
  email: string;
  password: string;
};

export async function createUserUseCase({
  name,
  email,
  password,
}: ICreateUserUseCase) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    throw new Error("E-mail already exists");
  }

  const password_hash = await hash(password, 6);

  const usersRepository = new UsersRepository();

  await usersRepository.create({
    name,
    email,
    password_hash,
  });
}
