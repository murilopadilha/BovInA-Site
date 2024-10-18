import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Home from './routes/Home/Home.jsx'
import CadastrarDoadora from './routes/Cadastro-Animais/Cadastrar-Doadora/CadastrarDoadora.jsx';
import CadastrarReceptora from './routes/Cadastro-Animais/Cadastrar-Receptora/CadastrarReceptora.jsx';
import CadastrarTouro from './routes/Cadastro-Animais/Cadastrar-Touro/CadastrarTouro.jsx';
import DoadorasCadastradas from './routes/Animais-Cadastrados/Doadoras-Cadastradas/DoadorasCadastradas.jsx';
import ReceptorasCadastradas from './routes/Animais-Cadastrados/Receptoras-Cadastradas/ReceptorasCadastradas.jsx';
import TourosCadastrados from './routes/Animais-Cadastrados/Touros-Cadastrados/TourosCadastrados.jsx';
import EditarDoadora from './routes/Animais-Cadastrados/Editar-Doadora/EditarDoadora.jsx';
import EditarReceptora from './routes/Animais-Cadastrados/Editar-Receptora/EditarReceptora.jsx';
import EditarTouro from './routes/Animais-Cadastrados/Editar-Touro/EditarTouro.jsx';
import PIVE from './routes/PIVE/FIVs/Fivs.jsx';
import NovaFiv from './routes/PIVE/NovaFiv/NovaFiv.jsx';
import FIV from './routes/PIVE/FIV/FIV.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "CadastrarDoadora",
    element: <CadastrarDoadora />,
  },
  {
    path: "CadastrarReceptora",
    element: <CadastrarReceptora />,
  },
  {
    path: "CadastrarTouro",
    element: <CadastrarTouro />
  },
  {
    path: "DoadorasCadastradas",
    element: <DoadorasCadastradas />,
  },
  {
    path: "ReceptorasCadastradas",
    element: <ReceptorasCadastradas />,
  },
  {
    path: "TourosCadastrados",
    element: <TourosCadastrados />
  },
  {
    path: "EditarDoadora",
    element: <EditarDoadora />
  },
  {
    path: "EditarReceptora",
    element: <EditarReceptora />
  },
  {
    path: "EditarTouro",
    element: <EditarTouro />
  },
  {
    path: "PIVE",
    element: <PIVE />
  },
  {
    path: "NovaFiv",
    element: <NovaFiv />
  },
  {
    path: "FIV",
    element: <FIV />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
