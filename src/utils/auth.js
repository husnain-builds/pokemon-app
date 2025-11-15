// Get token from localStorage
export const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // returns true if token exists
  };
  