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
    if (req.body.id) {
      return res.status(200).json(
        await prisma.baby.findUnique({
          where: { id: req.body.id },
          include: {
            baby_book_example: true,
          },
        })
      );
    }
    if (req.body.sesion_id) {
      return res.status(200).json(
        await prisma.baby.findUnique({
          where: { sesion: req.body.sesion_id },
          include: {
            baby_book_example: true,
          },
        })
      );
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
                  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpeople.com%2Fhealth%2Flizzo-declares-big-girl-summer-has-officially-begun-as-she-shows-off-her-abs-in-a-bikini%2F&psig=AOvVaw1DAlX3w_SFCbQPUorl_80h&ust=1678112222082000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJCm8aj9xP0CFQAAAAAdAAAAABAJ",
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
