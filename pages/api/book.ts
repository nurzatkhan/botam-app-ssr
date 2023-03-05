import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export type Data = {
  name: string;
};
const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getBook(req, res);
      break;
    case "POST":
      res.status(200).json({ name: "POST" });
      break;
    case "PUT":
      res.status(200).json({ name: "PUT" });
      break;
    case "DELETE":
      res.status(200).json({ name: "DELETE" });
      break;
    default:
      res.status(404).json({ name: "method not exist" });
  }
}

async function getBook(req: NextApiRequest, res: NextApiResponse) {
  const book = await prisma.baby.findUnique({
    where: { sesion: req.body.sesion_id },
    include: {
      baby_book_example: {
        include: {
          book_example: true,
        },
      },
    },
  });
  res.status(200).json(book);
}
