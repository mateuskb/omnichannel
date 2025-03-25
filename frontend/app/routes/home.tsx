import type { Route } from "./+types/home";
import UserForm from "~/components/userForm";
import { useForm } from "react-hook-form";
import { userFormSchema, type UserFormSchema } from "~/schema/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@mui/material";
import UserTable from "~/components/userTable";

'use client';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Listagem de usuários" },
    { name: "Listagem de usuários", content: "Listagem de usuários!" },
  ];
}

export default function Home() {
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
  });
  return <Container maxWidth="md" className={'mt-4'}>
    <UserForm form={form} />
    <UserTable data={[]} populateForm={function (values?: { name: string; email: string; zipCode: string; id?: string; } | { name?: string | undefined; email?: string | undefined; zipCode?: string | undefined; id?: string | undefined; } | ((formValues: { name: string; email: string; zipCode: string; id?: string; }) => { name: string; email: string; zipCode: string; id?: string; }) | undefined, keepStateOptions?: Partial<{ keepDirtyValues: boolean; keepErrors: boolean; keepDirty: boolean; keepValues: boolean; keepDefaultValues: boolean; keepIsSubmitted: boolean; keepIsSubmitSuccessful: boolean; keepTouched: boolean; keepIsValidating: boolean; keepIsValid: boolean; keepSubmitCount: boolean; }> | undefined): void {
      throw new Error("Function not implemented.");
    } } />
  </Container>
}
