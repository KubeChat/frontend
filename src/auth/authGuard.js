import { getInstance } from "./authWrapper";
import Router from '../router'; 

export const authGuard = (to, from, next) => {
  const authService = getInstance();

  const fn = () => {
    if (authService.isAuthenticated) {
      return next();
    }

    Router.push({name: 'login'})
  };

  
  if (!authService.loading) {
    return fn();
  }

  authService.$watch("loading", loading => {
    if (loading === false) {
      return fn();
    }
  });
};
