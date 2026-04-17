import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Temperatura from './pages/sensores/Temperatura';
import Umidade from './pages/sensores/Umidade';
import Luminosidade from './pages/sensores/Luminosidade';
import Contador from './pages/sensores/Contador';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={
          <PrivateRoute><Home /></PrivateRoute>
        } />
        <Route path="/sensores/temperatura" element={
          <PrivateRoute><Temperatura /></PrivateRoute>
        } />
        <Route path="/sensores/umidade" element={
          <PrivateRoute><Umidade /></PrivateRoute>
        } />
        <Route path="/sensores/luminosidade" element={
          <PrivateRoute><Luminosidade /></PrivateRoute>
        } />
        <Route path="/sensores/contador" element={
          <PrivateRoute><Contador /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}