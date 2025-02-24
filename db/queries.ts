import prisma from "./prisma";

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
};

export const createUser = async (username: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
};
