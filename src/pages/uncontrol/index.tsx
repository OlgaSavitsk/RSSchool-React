import { useAppSelector } from "../../hooks/redux.hook";

import { appSelector } from "../../redux/modules/app";
import classes from "./index.module.css";
import { useCustomForm } from "../../hooks/use-uncontrolled";
import { FormItemComponent } from "../../components/form-item/form-item";

export const UncontrolledFormPage = () => {
  const { countries } = useAppSelector(appSelector);
  const {
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    handleChange,
    handleSubmit,
    hasFormErrors
  } = useCustomForm(
    {
      name: "",
      age: 0,
      email: "",
      password: "",
      confirm: "",
      gender: "",
      acceptTerms: false,
      image: null,
      country: "",
    }
  );

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
      if (formErrors.image) {
        setFormErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors.image;
          return newErrors;
        });
      }
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={classes.wrapper}>
      <h3>Uncontrolled Form</h3>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.part}>
          <div className={classes.content}>
            <FormItemComponent label="Name" name="name" type="text" value={formData.name} formErrors={formErrors.name} handleChange={handleChange} />

            <FormItemComponent label="Age" name="age" type="number" value={formData.age} formErrors={formErrors.age} handleChange={handleChange} />

            <FormItemComponent label="Email" name="email" type="email" value={formData.email} formErrors={formErrors.email} handleChange={handleChange} />

            <FormItemComponent label="Password" name="password" type="password" value={formData.password} formErrors={formErrors.password} handleChange={handleChange} />

            <FormItemComponent label="Confirm Password" name="confirm" type="password" value={formData.confirm} formErrors={formErrors.confirm} handleChange={handleChange} />

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
              {formErrors.gender && <div className={classes.error}>{formErrors.gender}</div>}
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
              {formErrors.acceptTerms && <div className={classes.error}>{formErrors.acceptTerms}</div>}
            </div>
            <div className={classes.item}>
              <label className={classes.label} htmlFor="image">
                Picture
              </label>
              <input type="file" id="image" name="image" onChange={handleImageUpload} />
              {formErrors.image && <div className={classes.error}>{formErrors.image}</div>}
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
              {formErrors.country && <div className={classes.error}>{formErrors.country}</div>}
            </div>
          </div>
        </div>
        <button type="submit" disabled={hasFormErrors}>
          Submit
        </button>
      </form>
    </div>
  );
};
