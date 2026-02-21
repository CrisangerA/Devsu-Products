import z from 'zod';

export const ProductSchema = z
  .object({
    id: z
      .string()
      .min(3, { message: 'ID debe tener mínimo 3 caracteres' })
      .max(10, { message: 'ID debe tener máximo 10 caracteres' }),
    name: z
      .string()
      .min(5, { message: 'Nombre debe tener mínimo 5 caracteres' })
      .max(100, { message: 'Nombre debe tener máximo 20 caracteres' }),
    description: z
      .string()
      .min(10, { message: 'Descripción debe tener mínimo 10 caracteres' })
      .max(200, { message: 'Descripción debe tener máximo 200 caracteres' }),
    logo: z.string().min(1, { message: 'Logo es requerido' }),
    releaseDate: z
      .date({ message: 'Fecha de liberación es requerida' })
      .min(new Date(), {
        message: 'Fecha de liberación debe ser igual o mayor a la fecha actual',
      }),
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
