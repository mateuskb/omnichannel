import type { Route } from "./+types/home";
import UserForm from "~/components/userForm";
import { useForm } from "react-hook-form";
import { userFormSchema, type UserFormSchema } from "~/schema/users";
import { zodResolver } from "@hookform/resolvers/zod";

'use client';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Listagem de usuários" },
    { name: "Listagem de usuários", content: "Listagem de usuários!" },
  ];
}

export default function Home() {
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
  });
  return <UserForm form={form}/>;
}
