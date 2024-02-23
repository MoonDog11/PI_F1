
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './f1_finale.png';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de inicio de sesión
    // ...

    // Redirige al usuario a /home en caso de éxito
    window.location.href = '/home';
  };

  return (
    <form className="login-form">
      <img src={Logo} alt="Logo" className="form-logo" /> {/* Agrega el logo aquí */}
      <label>
        USERNAME:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        PASSWORD:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <Link to="/home">
        <button type="button" onClick={handleLogin} className="custom-button">
          SIGN IN
        </button>
      </Link>
      <br />
      <Link to="/register">
        <button className="custom-button">REGISTER</button>
      </Link>
    </form>
  );
};

export default LoginForm;