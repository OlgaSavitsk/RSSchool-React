import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/redux.hook";
import { setControlled } from "../../redux/modules/app";
import { ControlledForm } from "../../types/item.types";
import { useYupValidationResolver } from "../../utils/validation.utils";
import { countries } from "../../constants/countries.data";
import classes from "./index.module.css";
import { useNavigate } from "react-router-dom";

const defaultForm = {
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

export const ControlledFormPage = () => {
  const dispatch = useAppDispatch();
  const resolver = useYupValidationResolver();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ControlledForm>({
    defaultValues: defaultForm,
    resolver,
  });

  const onSubmit = (data: ControlledForm) => {
    const file = data.image?.[0] as unknown as File;
    let updatedData = { ...data }
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updatedData = { ...data, image: reader.result as string }
        dispatch(setControlled(updatedData));
      };
      reader.readAsDataURL(file);
    } else {
      dispatch(setControlled(updatedData));     
    }
    navigate('/')
  };

  return (
    <div className={classes.wrapper}>
      <h3>React Hook Form</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div className={classes.part}>
          <div className={classes.content}>
            <div className={classes.item}>
              <label className={classes.label} htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className={classes.input}
                autoComplete="name"
                {...register("name")}
              />
              {errors.name && <div className={classes.error}>{errors.name.message}</div>}
            </div>
            <div className={classes.item}>
              <label className={classes.label} htmlFor="age">
                Age
              </label>
              <input
                className={classes.input}
                type="number"
                autoComplete="age"
                defaultValue={0}
                {...register("age")}
              />
              {errors.age && <div className={classes.error}>{errors.age.message}</div>}
            </div>
            <div className={classes.item}>
              <label className={classes.label} htmlFor="email">
                Email
              </label>
              <input
                className={classes.input}
                type="email"
                id="email"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && <div className={classes.error}>{errors.email.message}</div>}
            </div>
            <div className={classes.item}>
              <label className={classes.label} htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={classes.input}
                {...register("password")}
              />
              {errors.password && <div className={classes.error}>{errors.password.message}</div>}
            </div>
            <div className={classes.item}>
              <label className={classes.label} htmlFor="confirm">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm"
                className={classes.input}
                {...register("confirm")}
              />
              {errors.confirm && <div className={classes.error}>{errors.confirm.message}</div>}
            </div>
          </div>
          <div className={classes.content}>
            <div className={classes.item}>
              <label className={classes.label}>Gender</label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="male"
                    {...register("gender")}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="female"
                    {...register("gender")}
                  />
                  Female
                </label>
              </div>
              {errors.gender && <div className={classes.error}>{errors.gender.message}</div>}
            </div>
            <div className={classes.item}>
              <label className={classes.label}>
                <input
                  type="checkbox"
                  {...register("acceptTerms")}
                />
                I agree to the Terms and Conditions
              </label>
              {errors.acceptTerms && <div className={classes.error}>{errors.acceptTerms.message}</div>}
            </div>
            <div className={classes.item}>
              <label className={classes.label} htmlFor="image">
                Picture
              </label>
              <input
                type="file"
                id="image"
                {...register("image")} />
              {errors.image && <div className={classes.error}>{errors.image.message}</div>}
            </div>
            <div className={classes.item}>
              <label className={classes.label} htmlFor="country">
                Country
              </label>
              <select className={classes.input} id="country" {...register("country")}>
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.label} value={country.value}>
                    {country.value}
                  </option>
                ))}
              </select>
              {errors.country && <div className={classes.error}>{errors.country.message}</div>}
            </div>
          </div>
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
