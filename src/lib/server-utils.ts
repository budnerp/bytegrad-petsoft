import "server-only";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Pet } from "@prisma/client";

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
}

export async function getUserByEmail(email: string) {
  const user = await prisma?.user.findUnique({
    where: { email },
  });
  return user;
}

export async function getPetsByUserId(userId: Pet["userId"]) {
  const pets = await prisma?.pet.findMany({
    where: {
      userId,
    },
  });
  return pets;
}
