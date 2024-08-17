import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/redux.hook";
import { setControlled } from "../../redux/modules/app";
import { ControlledForm } from "../../types/item.types";
import { useYupValidationResolver } from "../../utils/validation.utils";
import { countries } from "../../constants/countries.data";

export const ControlledFormPage = () => {
  const dispatch = useAppDispatch();
  const resolver = useYupValidationResolver();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ControlledForm>({
    resolver,
  });

  const onSubmit = (data: ControlledForm) => {
    dispatch(setControlled(data));
  };

  return (
    <div>
      <h1>React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register("name")} />
          {errors.name && <div>{errors.name.message}</div>}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input type="number" id="age" {...register("age")} />
          {errors.age && <div>{errors.age.message}</div>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && <div>{errors.email.message}</div>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && <div>{errors.password.message}</div>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" {...register("confirm")} />
          {errors.confirm && <div>{errors.confirm.message}</div>}
        </div>
        <div>
          <label>Gender</label>
          <div>
            <label>
              <input type="radio" {...register("gender")} value="male" />
              Male
            </label>
            <label>
              <input type="radio" {...register("gender")} value="female" />
              Female
            </label>
            {errors.gender && <div>{errors.gender.message}</div>}
          </div>
        </div>
        <div>
          <label>
            <input type="checkbox" {...register("acceptTerms")} />I agree to the Terms and
            Conditions
          </label>
          {errors.acceptTerms && <div>{errors.acceptTerms.message}</div>}
        </div>
        <div>
          <label htmlFor="picture">Picture</label>
          <input type="file" id="picture" {...register("image")} />
          {errors.image && <div>{errors.image.message}</div>}
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <select id="country" {...register("country")}>
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.label} value={country.value}>
                {country.value}
              </option>
            ))}
          </select>
          {errors.country && <div>{errors.country.message}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
