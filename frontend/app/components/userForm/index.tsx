import { Box, Button, TextField } from "@mui/material";
import { Controller, type UseFormReturn } from "react-hook-form";
import { type FC, useCallback, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import type { UserFormInterface } from "~/interface/user.interface";
import { getAddressFromZipCode } from "~/utils/cep";
import { objectToAddress, type AddressInterface } from "~/interface/address.interface";
import axios from "axios";
import type { KeyedMutator } from "swr";

const UserForm: FC<{
    mutateTable: KeyedMutator<any>;
    form: UseFormReturn<{
        name: string;
        email: string;
        zipCode: string;
        id?: string;
    }, any, undefined>;
}> = ({ form, mutateTable }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [address, setAddress] = useState<AddressInterface>();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = form;

    const onSubmit = useCallback(
        async (data: UserFormInterface) => {
            setIsSubmitting(true);

            try {
                const id = data.id;
                
                if (id) {
                    await axios.put(
                        `${import.meta.env.VITE_REACT_APP_API_URL}/user/${data.id}`,
                        data,
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    toast.success("Usuário atualizado com sucesso!");
                } else {
                    await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/user`, data);
                    toast.success("Usuário criado com sucesso!");
                }

                form.reset({
                    id: "",
                    name: "",
                    email: "",
                    zipCode: "",
                });

                mutateTable();
            } catch (error: any) {
                toast.error("Erro ao atualizar usuário: " + error?.response?.data?.message);
            } finally {
                setIsSubmitting(false);
            }
        },
        [form, mutateTable]
    );

    const updateAddress = async (zipCode: string) => {
        let addresObj = await getAddressFromZipCode(zipCode);
        let address: AddressInterface = objectToAddress(addresObj);
        setAddress(address);
    }


    return (
        <>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Box mb={2}>
                    <h2 className="mb-4 text-xl font-semibold text-gray-700">
                        Criar usuário
                    </h2>
                </Box>
                <input type="hidden" {...register("id")} />
                <Box mb={2}>
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </Box>

                <Box mb={2}>
                    <Controller
                        name="zipCode"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="zipCode"
                                label="CEP"
                                variant="outlined"
                                fullWidth
                                error={!!errors.zipCode}
                                helperText={errors.zipCode?.message}
                                onChange={(e: any) => {
                                    let value = e.target.value.replace(/\D/g, '');
                                    if (value.length > 5) {
                                        value = value.replace(/^(\d{5})(\d{3})$/, '$1-$2');
                                    }
                                    field.onChange(value);
                                    if (value.length === 9) {
                                        updateAddress(value);
                                    } else {
                                        setAddress(undefined);
                                    }
                                }}
                                value={field.value || ""}
                            />
                        )}
                    />
                    <Box mt={2}>
                        <TextField
                            id="address"
                            label="Endereço"
                            variant="outlined"
                            fullWidth
                            value={address?.logradouro ?? ""}
                            disabled
                        />
                    </Box>

                    <Box mt={2}>
                        <TextField
                            id="neighborhood"
                            label="Bairro"
                            variant="outlined"
                            fullWidth
                            value={address?.bairro ?? ""}
                            disabled
                        />
                    </Box>

                    <Box mt={2}>
                        <TextField
                            id="city"
                            label="Cidade"
                            variant="outlined"
                            fullWidth
                            value={address?.localidade ?? ""}
                            disabled
                        />
                    </Box>

                    <Box mt={3}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Enviando..." : "Enviar"}
                        </Button>
                    </Box>
                </Box>
            </form>
        </>
    );
};

export default UserForm