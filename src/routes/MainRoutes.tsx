import { Route, Routes, useNavigate } from "react-router-dom";
import RequireAuth from "../RequireAuth";
import Login from "../components/login/Login";
import Frame from "../components/Frame";
import * as GestorLogistico from "../components/gl/GestorLogistico";

const MainRoutes = () => {

  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/gl/dashboard" element={
          <RequireAuth>
            <Frame navigate={navigate} currentTab="DashBoard" page={<GestorLogistico.DashBoard />} />
          </RequireAuth>
        } />
        <Route path="/gl/pedidos" element={
          <RequireAuth>
            <Frame navigate={navigate} currentTab="Pedidos" page={<GestorLogistico.Pedidos navigate={navigate} />} />
          </RequireAuth>
        } />
        <Route path="/gl/pedidos/:id" element={
          <RequireAuth>
            <Frame navigate={navigate} currentTab="Pedidos" page={<GestorLogistico.AcompanharPedidos />} />
          </RequireAuth>
        } />
        <Route path="/gl/garagem" element={
          <RequireAuth>
            <Frame navigate={navigate} currentTab="Garagem" page={<GestorLogistico.Transportes navigate={navigate} />} />
          </RequireAuth>
        } />
        <Route path="/gl/garagem/add" element={
          <RequireAuth>
            <Frame navigate={navigate} currentTab="Garagem" page={<GestorLogistico.AdicionarTransporte />} />
          </RequireAuth>
        } />
        <Route path="/gl/motoristas" element={
          <RequireAuth>
            <Frame navigate={navigate} currentTab="Motoristas" page={<GestorLogistico.Motoristas />} />
          </RequireAuth>
        } />
      </Routes>
    </>
  )
}

export default MainRoutes;
