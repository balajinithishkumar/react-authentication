import { useForm, Controller } from "react-hook-form";
import "./FranchiseRegistration.css";
import axios from "axios";
const roles = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
  { value: "franchise", label: "Franchise Registration" },
];

const FranchiseRegistration = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const datas = {
      Owner_Name: data.ownerName,
      Address_Line_1: data.addressLine1,
      Address_Line_2: data.addressLine2,
      Pin_Code: data.pinCode,
      City: data.city,
      State: data.state,
      Country: data.country,
      Username: data.username,
      Start_Date: data.startDate,
      End_Date: data.endDate,
    };
    console.log(data);
    axios
      .post(
        "https://sheet.best/api/sheets/bd4a591e-9060-4683-8a2b-99a27305b6b1",
        datas
      )
      .then((response) => {
        console.log(response);
      });
  };
  console.log(errors);
  return (
    <div className="container">
      <h1  >Franchise Registration</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="gridContainer">
          {/* Owner Name */}
          <div className="formField">
            <label htmlFor="ownerName">Owner Name</label>
            <Controller
              name="ownerName"
              control={control}
              defaultValue=""
              rules={{
                required: "Owner Name is required",
                minLength: {
                  value: 10,
                  message: "Minimum length is 10 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum length is 20 characters",
                },
              }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="text"
                    id="ownerName"
                    placeholder="Owner Name"
                    className="textField"
                  />
                  {errors.ownerName && (
                    <p className="errorMessage">{errors.ownerName.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Address Line 1 */}
          <div className="formField">
            <label htmlFor="addressLine1">Address Line 1</label>
            <Controller
              name="addressLine1"
              control={control}
              defaultValue=""
              rules={{ required: "Address Line 1 is required" }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="text"
                    id="addressLine1"
                    placeholder="Address Line 1"
                    className="textField"
                  />
                  {errors.addressLine1 && (
                    <p className="errorMessage">
                      {errors.addressLine1.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          {/* Address Line 2 */}
          <div className="formField">
            <label htmlFor="addressLine2">Address Line 2</label>
            <Controller
              name="addressLine2"
              control={control}
              rules={{ required: "Address Line 2 is required" }}
              defaultValue=""
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="text"
                    id="addressLine2"
                    placeholder="Address Line 2"
                    className="textField"
                  />
                  {errors.addressLine2 && (
                    <p className="errorMessage">
                      {errors.addressLine2.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          {/* Pin Code */}
          <div className="formField">
            <label htmlFor="pinCode">Pin Code</label>
            <Controller
              name="pinCode"
              control={control}
              defaultValue=""
              rules={{
                required: "Pin Code is required",
                pattern: {
                  value: /^[0-9]{6}$/, // Example pattern for 6-digit numeric pin code
                  message: "Enter a valid 6-digit pin code",
                },
              }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="text"
                    id="pinCode"
                    placeholder="Pin Code"
                    className="textField"
                  />
                  {errors.pinCode && (
                    <p className="errorMessage">{errors.pinCode.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          {/* City */}
          <div className="formField">
            <label htmlFor="city">City</label>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="text"
                    id="city"
                    placeholder="City"
                    className="textField"
                  />
                  {errors.city && (
                    <p className="errorMessage">{errors.city.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          {/* State */}
          <div className="formField">
            <label htmlFor="state">State</label>
            <Controller
              name="state"
              control={control}
              defaultValue=""
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="text"
                    id="state"
                    placeholder="State"
                    className="textField"
                  />
                  {errors.state && (
                    <p className="errorMessage">{errors.state.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Country */}
          <div className="formField">
            <label htmlFor="country">Country</label>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="text"
                    id="country"
                    placeholder="Country"
                    className="textField"
                  />
                  {errors.country && (
                    <p className="errorMessage">{errors.country.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Username */}
          <div className="formField">
            <label htmlFor="username">Username</label>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="textField"
                  />
                  {errors.username && (
                    <p className="errorMessage">{errors.username.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Start Date */}
          <div className="formField">
            <label htmlFor="startDate">Start Date</label>
            <Controller
              name="startDate"
              control={control}
              defaultValue=""
              rules={{ required: "Start Date is required" }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="date"
                    id="startDate"
                    className="textField"
                  />
                  {errors.startDate && (
                    <p className="errorMessage">{errors.startDate.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          {/* End Date */}
          <div className="formField">
            <label htmlFor="endDate">End Date</label>
            <Controller
              name="endDate"
              control={control}
              defaultValue=""
              rules={{ required: "End Date is required" }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="date"
                    id="endDate"
                    className="textField"
                  />
                  {errors.endDate && (
                    <p className="errorMessage">{errors.endDate.message}</p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FranchiseRegistration;
