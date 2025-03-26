import type { Route } from "./+types/home";
import UserForm from "~/components/userForm";
import { useForm } from "react-hook-form";
import { userFormSchema, type UserFormSchema } from "~/schema/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@mui/material";
import UserTable from "~/components/userTable";
import axios from "axios";
import useSWR from "swr";
import 'react-toastify/dist/ReactToastify.css';


'use client';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Listagem de usuários" },
    { name: "Listagem de usuários", content: "Listagem de usuários!" },
  ];
}

export default function Home() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, mutate } = useSWR(`${import.meta.env.VITE_REACT_APP_API_URL}/user`, fetcher);

  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
  });
  return <Container maxWidth="md" className={'mt-4'}>
    <UserForm form={form} mutateTable={mutate} />
    <UserTable data={data} populateForm={form.reset} />
  </Container>
}
