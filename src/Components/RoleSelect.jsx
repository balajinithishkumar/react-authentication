import { Controller } from 'react-hook-form';

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'Franchise', label: 'Franchise' },
];

const RoleSelect = ({ control, errors, setSelectedRole }) => {

  return (
    <div className="formField">
      <label className='role_label' htmlFor="role">Role</label>
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
              onChange={(e) => {
                field.onChange(e);
                setSelectedRole(e.target.value); 
              }}
              value={field.value || ''} 
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