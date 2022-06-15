import {useState, useContext, useRef, useEffect} from 'react';

import axios from 'axios';

import AuthContext from '../AuthContext';
import FlashMsg from '../FlashMsg';

const Home = () => {
const [authToken, setAuthToken] = useContext(AuthContext);

console.log('authToken en HOME: ' + authToken);

const [usuario, setUsuario] = useState('');
const [password, setPassword] = useState('');
//const [token, setToken] = useState('');

// Usaremos un hook extra para poder darnos cuenta cuando cambia
// cierto valor.
// «useRef» es un hook que nos permite mantener valores entre cada
// vez que el componente vuelve a pintarse.
// La diferencia con «useState» es:
// - useState: cuando cambia, genera un render.
// - useRef: almacena una valor, pero cuando cambia, no genera render.
const mounted = useRef();

useEffect(() => {
  if(!mounted.current) {
    mounted.current = true;
  } else {
    console.log(`REFToken: ${authToken}`);
  }
});

  const hazLogin = () => {
    axios
      .post(
        'https://curso.tgconsulting.online/minipos/api/login',
        {
          username: usuario,
          password: password,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(
        (resp) => {
          console.log(`Login status code: ${resp.status}`);
          console.log(`Login status text: ${resp.statusText}`);

          if( resp.data === 'Bad credentials') {
            console.log(`No está autorizado!`);
          } else {
            console.log(`JWT: ${resp.data}`);
            setAuthToken(resp.data);
          }
        }
      );
  }

  const enviaForma = (evento) => {
    // Detenemos la ejecución de la acción predeterminada para
    // el evento disparo. En esta ocasión el evento es submit.
    evento.preventDefault();

    console.log(`Usuario: *${usuario}*\nPassword: *${password}*`);

    hazLogin();
  }

  return (
    <>
      <h1>Estás en home</h1>

      {
        authToken.length < 1 &&
          <FlashMsg time="5555">
            <h4>¡No está autenticado!</h4>
          </FlashMsg>
            
          
      }
      
      <p>Ingrese para continuar</p>
      
      <form onSubmit={enviaForma}>
        <label>
          Usuario:
          <input 
            onChange={(e) => setUsuario(e.target.value)}
            type="text" />
        </label>

        <label>
          Contraseña:
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password" />
        </label>

        <input type="submit" value="Ingresar" />
      </form>
    </>

    
  );
}

export default Home;