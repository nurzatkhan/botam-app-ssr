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
  console.log("req.query.id", req.query.id);
  console.log("req.query.baby_id", req.query.baby_id);

  if (
    typeof req.query.id === "string" &&
    req.query.id &&
    req.query.baby_id &&
    typeof req.query.baby_id === "string"
  ) {
    const baby = await prisma.baby.findUnique({
      where: { id: req.query.baby_id },
    });
    const book = await prisma.book_example.findUnique({
      where: { id: req.query.id },
      include: {
        baby_book_example: {
          where: {
            baby_id: req.query.baby_id,
          },
        },
      },
    });
    let content = book?.content || "";
    const contentArg: { [x: string]: string } = {
      ["firstname"]: baby?.firstname || "вы не задали имя",
    };
    const sheckTheTemplateForArgument = content.match(/\{{(.*?)\}}/g) || [];
    sheckTheTemplateForArgument.forEach((value) => {
      const inStr = contentArg[value.replace(/[{}]/gi, "")] || "";
      content = content.replace(value, inStr);
    });

    res.status(200).json({
      bookName: book?.name,
      content: content,
      coverUrl: book?.baby_book_example[0].cover_url,
    });
  }
}
