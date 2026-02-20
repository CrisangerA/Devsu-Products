import z from 'zod';

export const ProductSchema = z
  .object({
    id: z.string().min(1, { message: 'ID es requerido' }),
    name: z.string().min(1, { message: 'Nombre es requerido' }),
    description: z.string().min(1, { message: 'Descripción es requerida' }),
    logo: z.string().min(1, { message: 'Logo es requerido' }),
    releaseDate: z
      .date({ error: 'Fecha de liberación es requerida' })
      .min(1, { message: 'Fecha de liberación es requerida' }),
    revisionDate: z
      .date({ error: 'Fecha de revisión es requerida' })
      .min(1, { message: 'Fecha de revisión es requerida' }),
  })
  .required({
    id: true,
    name: true,
    description: true,
    logo: true,
    releaseDate: true,
    revisionDate: true,
  });
export type RegisterUserSchemaType = z.infer<typeof ProductSchema>;
