import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // can store name/email/role etc.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/user', {
          headers: {
            Authorization: `Bearer ${Cookies.get('auth_token')}`
          }
        });
        setUser(res.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    Cookies.set('auth_token', token);
  };

  const logout = async () => {
    try {
      await axios.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${Cookies.get('auth_token')}`
        }
      });
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      Cookies.remove('auth_token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
