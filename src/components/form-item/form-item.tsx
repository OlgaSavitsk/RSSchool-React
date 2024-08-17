import classes from "./index.module.css";
import { UncontrolledForm } from "../../types/item.types";

type FormItemComponentProps<T extends UncontrolledForm> = {
    name: string,
    label: string,
    type: string,
    value: T[keyof T],
    formErrors: T[keyof T],
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export const FormItemComponent = <T extends UncontrolledForm>(
    { name, type, value, formErrors, label, handleChange
    }: FormItemComponentProps<T>) => {
    return (
        <div className={classes.item}>
            <label className={classes.label} htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value as string}
                onChange={handleChange}
                className={classes.input}
                autoComplete={name}
            />
            {formErrors && <div className={classes.error}>{formErrors as string}</div>}
        </div>
    );
};