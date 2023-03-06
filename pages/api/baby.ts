import { validateShemaBabyCreate } from "@/sheamas";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getBabyData(req, res);
      break;
    case "POST":
      await createBaby(req, res);
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

async function getBabyData(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.query.id && typeof req.query.id === "string") {
      return res.status(200).json(
        await prisma.baby.findUnique({
          where: { id: req.query.id },
          include: {
            baby_book_example: true,
          },
        })
      );
    }
    if (req.query.sesion_id && typeof req.query.sesion_id === "string") {
      const data = await prisma.baby.findUnique({
        where: { sesion: req.query.sesion_id },
        include: {
          baby_book_example: { include: { book_example: true } },
        },
      });
      return res.status(200).json(data);
    }
    return res.status(200).json("sesion_id || id");
  } catch (e) {
    return res.status(500).send(e);
  }
}

async function createBaby(req: NextApiRequest, res: NextApiResponse) {
  try {
    validateShemaBabyCreate.parse(req.body);
  } catch (e) {
    return res.status(400).send(e);
  }
  try {
    const exampleBooks = await prisma.book_example.findMany({
      select: { id: true },
    });
    const baby = await prisma.baby.create({
      data: {
        ...req.body,
        baby_book_example: {
          createMany: {
            data: exampleBooks.map((value) => {
              return {
                book_example_id: value.id,
                cover_url:
                  "https://m.media-amazon.com/images/I/61gONB+s+zS._AC_SX679_.jpg",
              };
            }),
          },
        },
      },
      include: {
        baby_book_example: true,
      },
    });
    res.status(200).json(baby);
  } catch (e) {
    console.log(e);
    return res.status(500).send("prisma");
  }
}
