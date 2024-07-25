import './styles/App.css'
import { AppRouter } from './routing/AppRouter'
import { Context } from './context/Context'
import { useEffect, useState } from 'react';

function App() {

  // Inicializa el estado con el valor del localStorage si existe
  const [user, setUser] = useState(() => {
    // Obtiene el objeto de usuario almacenado en localStorage
    const storedUser = localStorage.getItem("user");
    // Si existe, parsea el JSON y lo establece como el estado inicial, si no existe, inicializa el estado como un objeto vacío
    return storedUser ? JSON.parse(storedUser) : {};
  });

  // Inicializa el estado del modo oscuro con el valor de localStorage si existe
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const darkMode = JSON.parse(localStorage.getItem('darkMode'));
    return darkMode || false;
  });

  // Este useEffect se ejecuta cada vez que cambia el estado `user` y guarda el estado `user` actualizado en localStorage
  useEffect(() => {
    // Convierte el estado `user` a una cadena JSON y lo almacena en localStorage
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]); // El efecto se ejecuta cada vez que el estado `user` cambia

  // Este useEffect se ejecuta cada vez que cambia el estado `isDarkMode`
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

   // Función para alternar el modo oscuro
   const toggleDarkMode = () => {
    // Alterna el valor del modo oscuro
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <Context.Provider value={{
      user,
      setUser,
      isDarkMode,
      toggleDarkMode
    }}>
      <div className='App'>
          <AppRouter />
      </div>
    </Context.Provider>
  )
}

export default App
