// roles.js
const roles = {
    ADMIN: 'admin',
    USER: 'user',
    FRANCHISE: localStorage.getItem("role") === 'Franchise' ? 'Franchise' : null,
  };
  
  export default roles;