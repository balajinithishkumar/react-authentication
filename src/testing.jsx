import { useForm } from 'react-hook-form';
export default function Testing() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("Email", {
            required: "Email is required",
            minLength: { value: 15, message: "Email must be at least 15 characters long" },
            maxLength: { value: 67, message: "Email cannot exceed 67 characters" },
            pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email is not valid" }
          })}
        />
        {errors.Email && <p>{errors.Email.message}</p>}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            maxLength: { value: 14, message: "Password cannot exceed 14 characters" }
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      
      <input type="submit" />
    </form>
  );
}
