import { STATUS_PUBLICATIONS } from '@prisma/client';
import { z } from 'zod';

export const registrationSFormchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  date: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      return new Date(arg);
    }
  }, z.date().min(new Date(), { message: "A data e hora devem ser futuras" })),
  address: z.string().min(6, 'O endereço precisa estar completo'),
  content: z.string().min(10, 'É necessário ao menos 10 caractéres'),
  status: z.nativeEnum(STATUS_PUBLICATIONS, {
    errorMap: () => ({ message: "Selecione um status válido." }),
  }).optional()
});

export type RegistrationFormSchema = z.infer<typeof registrationSFormchema>;