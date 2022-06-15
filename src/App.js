import {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './paginas/Layout';
import Home from './paginas/Home';
import Categorias from './paginas/Categorias';
import E404 from './paginas/E404';

import AuthContext from "./AuthContext";

function App() {
  const [authToken, setAuthToken] = useState('');

  return (
    <AuthContext.Provider value={[authToken, setAuthToken]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route index element={<Home />} />
            <Route path="/categorias" element={<Categorias />} />

            <Route path="*" element={<E404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
