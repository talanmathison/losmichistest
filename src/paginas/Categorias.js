import {useEffect, useContext, useState} from 'react';
import  {Navigate}  from 'react-router-dom';

import axios from "axios";

import AuthContext from '../AuthContext';

//import SearchBox from '../SearchBox';
import {SearchBox} from '../SearchBox';

const Categorias = () => {
  const [authToken, setAuthToken] = useContext(AuthContext);
  const [categorias, setCategorias] = useState([]);
  const [tmpCats, setTmpCats] = useState([]);
  

  console.log(`El authToken en Categorias es: ${authToken}`);

  const getCategorias = () => {
    axios
      .get(
        'https://curso.tgconsulting.online/minipos/api/categoria',
        {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      )
      .then(
        (resp) => {
          console.log(`Tenemos ${resp.data.length} categorías.`);

          setCategorias(resp.data);
          setTmpCats(resp.data);
        }
      )
      .catch(
        (error) => {
          console.log('Error obteniendo categorías: ' + error);
        }
      );
  }

  useEffect(() => {
    getCategorias();
  }, []);

  if(authToken.length < 1) {
    return(
      <Navigate to="/" />
    );
  }

  const search = (ev) => {
    let val = ev.toLowerCase();

    console.log('Search term: ' + val);

    let res = categorias.filter((cat) => 
      cat.nombre.toLowerCase().search(val) >= 0
    );

    setTmpCats(res);
  }

  return (
    <>
    <h3>Categorías disponibles</h3>

    {/* <input type="text" placeholder='Buscar' onChange={search} /> */}

    <SearchBox fnregresa={search} />

    {
      tmpCats.length > 0 &&
        // for(int i=0; i<tmpCats.length; i++) {
        //   let cat = tmpCats[i];
        //   let idx = i;

        //   return <li id={cat.idcategoria}
        //               key={idx}>
        //           {cat.nombre}
        //           </li>
        // }
        tmpCats.map((cat,idx) => {
          return <li id={cat.idcategoria}
                      key={idx}>
                  {cat.nombre}
                  </li>
        })
    }
    </>
  );
}

export default Categorias;