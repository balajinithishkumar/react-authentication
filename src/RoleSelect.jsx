// RoleSelect.jsx
import { Controller } from 'react-hook-form';

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'franchise', label: 'Franchise' },
];

const RoleSelect = ({ control, errors }) => {

  return (
    <div className="formField">
      <label  className='role_label' htmlFor="role">Role</label>
      <Controller
        name="role"
        control={control}
        defaultValue=""
        rules={{ required: 'Role is required' }}
        render={({ field }) => (
          <div>
            <select
              {...field}
              id="role"
              className={`textField ${errors.role ? 'error' : ''}`}
            >
              <option value="">Select Role</option>
              {roles.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="error">{errors.role.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default RoleSelect;