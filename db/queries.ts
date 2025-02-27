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

export const getFoldersFromUser = async (user_id: number) => {
  const folders = await prisma.folder.findMany({ where: { userId: user_id } });
  return folders;
};

export const createFolderForUser = async (user_id: number, name: string) => {
  const newFolder = await prisma.folder.create({
    data: {
      name: name,
      userId: user_id,
    },
  });
};

export const updateFolder = async (
  folderName: string,
  newFolderName: string
) => {
  const updatedFolder = await prisma.folder.update({
    where: { name: folderName },
    data: { name: newFolderName },
  });
};
