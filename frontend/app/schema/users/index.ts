import { z } from "zod";

const userFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nome é obrigatório" })
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, { message: "Nome não pode conter números" }),
  email: z
    .string()
    .email({ message: "Email inválido" })
    .min(1, { message: "Email é obrigatório" }),
  zipCode: z
    .string({ message: "CEP é obrigatório" })
    .length(9, "CEP deve conter 8 caracteres")
    .regex(/^\d{5}-\d{3}$/, "CEP deve estar no formato XXXXX-XXX"),
  id: z.string().optional(),
});

export type UserFormSchema = z.infer<typeof userFormSchema>;

export {
  userFormSchema
}