import { useState } from "react";
import * as Yup from "yup";
import { UncontrolledForm } from "../types/item.types";
import { validationSchema } from "../utils/validation.utils";
import { useNavigate } from "react-router-dom";
import { setUncontrolled } from "../redux/modules/app";
import { useAppDispatch } from "./redux.hook";

export const useCustomForm = (initialData: UncontrolledForm) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<UncontrolledForm>(initialData);
    const [formErrors, setFormErrors] = useState<Partial<UncontrolledForm>>({});

    const validateField = async (name: string, value: any) => {
        const updatedFormData = { ...formData, [name]: value };
        const validationResult = validationSchema.validate(updatedFormData, { abortEarly: false });

        try {
            await validationResult;
            setFormErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[name as keyof UncontrolledForm];
                return newErrors;
            });
        } catch (error: unknown) {

            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [name as keyof UncontrolledForm]: error instanceof Yup.ValidationError && error.inner
                    .find((err) => err.path === name)?.message,
            }));

        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: type === 'checkbox' ? checked : value,
        }));
        validateField(name, type === 'checkbox' ? checked : value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationResult = validationSchema.validate(formData, { abortEarly: false });

        validationResult
            .then((validData) => {
                dispatch(setUncontrolled(validData as UncontrolledForm));
                navigate("/");
            })
            .catch((error) => {
                setFormErrors(
                    error.inner.reduce(
                        (
                            acc: { [key in keyof UncontrolledForm]?: string },
                            err: { path: string; message: string | undefined },
                        ) => ({
                            ...acc,
                            [err.path as keyof UncontrolledForm]: err.message,
                        }),
                        {}
                    )
                );
            });
    };

    const hasFormErrors = Object.values(formErrors).filter(Boolean).length > 0;

    return { formData, setFormData, formErrors, setFormErrors, handleChange, handleSubmit, hasFormErrors };
};