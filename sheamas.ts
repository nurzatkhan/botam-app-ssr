import { z } from "zod";

export const validateShemaBabyCreate = z.object({
    firstname: z.string().nonempty(),
    lastname: z.string().nonempty(),
    surname: z.string().optional(),
    is_boy: z.boolean(),
    face_url: z.string().nonempty(),
  });