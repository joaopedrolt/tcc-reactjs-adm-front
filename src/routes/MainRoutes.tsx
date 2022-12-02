import { Route, Routes, useNavigate } from "react-router-dom";
import { RequireAuthGl, RequireAuthMotorista } from "../RequireAuth";
import Login from "../components/login/Login";
import Frame from "../components/Frame";
import { MobileFrame } from "../components/MobileFrame";
import * as GestorLogistico from "../components/roles/GestorLogistico";
import * as Motorista from "../components/roles/Motorista";
import { Navigate } from 'react-router-dom'
import IssueOrder from "../components/IssueOrder";

const MainRoutes = () => {

  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route index path="/" element={<Login />} />

        <Route index path="/emitirpedido" element={<IssueOrder navigate={navigate} />} />

        <Route path="/motorista/dashboard" element={
          <RequireAuthMotorista>
            <MobileFrame page={<Motorista.DashBoard navigate={navigate} />} />
          </RequireAuthMotorista>
        } />
        <Route path="/motorista/pedidos" element={
          <RequireAuthMotorista>
            <MobileFrame page={<Motorista.Pedidos navigate={navigate} />} />
          </RequireAuthMotorista>
        } />

        <Route path="/gl/dashboard" element={
          <RequireAuthGl>
            <Frame navigate={navigate} currentTab="DashBoard" page={<GestorLogistico.DashBoard />} />
          </RequireAuthGl>
        } />
        <Route path="/gl/pedidos" element={
          <RequireAuthGl>
            <Frame navigate={navigate} currentTab="Pedidos" page={<GestorLogistico.Pedidos navigate={navigate} />} />
          </RequireAuthGl>
        } />
        <Route path="/gl/pedidos/:id" element={
          <RequireAuthGl>
            <Frame navigate={navigate} currentTab="Pedidos" page={<GestorLogistico.AcompanharPedidos navigate={navigate} />} />
          </RequireAuthGl>
        } />
        <Route path="/gl/garagem" element={
          <RequireAuthGl>
            <Frame navigate={navigate} currentTab="Garagem" page={<GestorLogistico.Transportes navigate={navigate} />} />
          </RequireAuthGl>
        } />
        <Route path="/gl/garagem/add" element={
          <RequireAuthGl>
            <Frame navigate={navigate} currentTab="Garagem" page={<GestorLogistico.AdicionarTransporte navigate={navigate} />} />
          </RequireAuthGl>
        } />
        <Route path="/gl/motoristas" element={
          <RequireAuthGl>
            <Frame navigate={navigate} currentTab="Motoristas" page={<GestorLogistico.Motoristas navigate={navigate} />} />
          </RequireAuthGl>
        } />
        <Route path="/gl/motoristas/add" element={
          <RequireAuthGl>
            <Frame navigate={navigate} currentTab="Motoristas" page={<GestorLogistico.AdicionarMotorista navigate={navigate} />} />
          </RequireAuthGl>
        } />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  )
}

export default MainRoutes;
