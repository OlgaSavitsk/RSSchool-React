import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";

import { UncontrolledForm } from "../../types/item.types";
import { appSelector, setUncontrolled } from "../../redux/modules/app";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validationSchema } from "../../utils/validation.utils";
import classes from "./index.module.css";

export const UncontrolledFormPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { countries } = useAppSelector(appSelector);
  const [formData, setFormData] = useState<UncontrolledForm>({
    name: "",
    age: 0,
    email: "",
    password: "",
    confirm: "",
    gender: "",
    acceptTerms: false,
    image: null,
    country: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<UncontrolledForm>>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationResult = validationSchema.validate(formData, { abortEarly: false });
    setFormErrors({});

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
            ) => {
              acc[err.path as keyof UncontrolledForm] = err.message;
              return acc;
            },
            {},
          ),
        );
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={classes.wrapper}>
      <h3>Uncontrolled Form</h3>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.part}>
          <div className={classes.content}>
            <div className={classes.item}>
              <label className={classes.label} htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={classes.input}
                autoComplete="name"
              />
              {formErrors.name && <div>{formErrors.name}</div>}
            </div>
            <div className={classes.item}>
              <label className={classes.label} htmlFor="age">
                Age
              </label>
              <input
                className={classes.input}
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                autoComplete="age"
              />
              {formErrors.age && <div>{formErrors.age}</div>}
            </div>
            <div className={classes.item}>
              <label className={classes.label} htmlFor="email">
                Email
              </label>
              <input
                className={classes.input}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {formErrors.email && <div>{formErrors.email}</div>}
            </div>
            <div className={classes.item}>
              <label className={classes.label} htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={classes.input}
              />
              {formErrors.password && <div>{formErrors.password}</div>}
            </div>
            <div className={classes.item}>
              <label className={classes.label} htmlFor="confirm">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                value={formData.confirm}
                onChange={handleChange}
                className={classes.input}
              />
              {formErrors.confirm && <div>{formErrors.confirm}</div>}
            </div>
          </div>
          <div className={classes.content}>
            <div className={classes.item}>
              <label className={classes.label}>Gender</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
              </div>
              {formErrors.gender && <div>{formErrors.gender}</div>}
            </div>
            <div className={classes.item}>
              <label className={classes.label}>
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                />
                I agree to the Terms and Conditions
              </label>
              {formErrors.acceptTerms && <div>{formErrors.acceptTerms}</div>}
            </div>
            <div className={classes.item}>
              <label className={classes.label} htmlFor="image">
                Picture
              </label>
              <input type="file" id="image" name="image" onChange={handleImageUpload} />
              {formErrors.image && <div>{formErrors.image}</div>}
            </div>
            <div className={classes.item}>
              <label className={classes.label} htmlFor="country">
                Country
              </label>
              <select id="country" name="country" value={formData.country} onChange={handleChange}>
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.label} value={country.value}>
                    {country.value}
                  </option>
                ))}
              </select>
              {formErrors.country && <div>{formErrors.country}</div>}
            </div>
          </div>
        </div>
        <button type="submit" disabled={Object.keys(formErrors).length > 0}>
          Submit
        </button>
      </form>
    </div>
  );
};
