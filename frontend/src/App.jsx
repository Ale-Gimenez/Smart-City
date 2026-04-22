import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Login         from './pages/Login';
import Home          from './pages/Home';

// Sensores - visualização
import Temperatura   from './pages/sensores/Temperatura';
import Umidade       from './pages/sensores/Umidade';
import Luminosidade  from './pages/sensores/Luminosidade';
import Contador      from './pages/sensores/Contador';

// CRUD
import CrudSensores          from './pages/crud/Sensores';
import CrudMicrocontroladores from './pages/crud/Microcontroladores';
import CrudAmbientes         from './pages/crud/Ambientes';
import CrudLocais            from './pages/crud/Locais';
import CrudResponsaveis      from './pages/crud/Responsaveis';
import CrudUsuarios          from './pages/crud/Usuarios';
import CrudHistoricos        from './pages/crud/Historicos';

const P = ({ children }) => <PrivateRoute>{children}</PrivateRoute>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/"     element={<Navigate to="/home" />} />

        {/* Dashboard */}
        <Route path="/home" element={<P><Home /></P>} />

        {/* Visualização por tipo de sensor */}
        <Route path="/sensores/temperatura"  element={<P><Temperatura /></P>} />
        <Route path="/sensores/umidade"      element={<P><Umidade /></P>} />
        <Route path="/sensores/luminosidade" element={<P><Luminosidade /></P>} />
        <Route path="/sensores/contador"     element={<P><Contador /></P>} />

        {/* CRUD completo */}
        <Route path="/crud/sensores"           element={<P><CrudSensores /></P>} />
        <Route path="/crud/microcontroladores" element={<P><CrudMicrocontroladores /></P>} />
        <Route path="/crud/ambientes"          element={<P><CrudAmbientes /></P>} />
        <Route path="/crud/locais"             element={<P><CrudLocais /></P>} />
        <Route path="/crud/responsaveis"       element={<P><CrudResponsaveis /></P>} />
        <Route path="/crud/usuarios"           element={<P><CrudUsuarios /></P>} />
        <Route path="/crud/historicos"         element={<P><CrudHistoricos /></P>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}
