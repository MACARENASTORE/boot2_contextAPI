import { FaMoon, FaSun } from 'react-icons/fa';
import { useContext } from 'react';
import { Context } from '../context/Context';


export const DarkMode = () => {

  const { isDarkMode, toggleDarkMode } = useContext(Context);

  // Método que se ejecute al hacer clic en el ícono
  const handleClick = () => {
    toggleDarkMode();
    localStorage.setItem('dark-mode', !isDarkMode);
  };


  return (
    <button onClick={handleClick} className='dark-mode-button'>
      {isDarkMode ? (
        <FaSun className="dark-mode-icon dark-mode-icon-sun"/>
      ) : (
        <FaMoon className="dark-mode-icon dark-mode-icon-moon"/>
      ) }
    </button>
  );
};
