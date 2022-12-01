import { Route, Routes, useNavigate } from "react-router-dom";
import { RequireAuthGl } from "../RequireAuth";
import Login from "../components/login/Login";
import Frame from "../components/Frame";
import { MobileFrame } from "../components/MobileFrame";
import * as GestorLogistico from "../components/gl/GestorLogistico";
import * as Motorista from "../components/gl/Motorista";

const MainRoutes = () => {

  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route index path="/" element={<Login />} />

        <Route path="/motorista/dashboard" element={
          <MobileFrame page={<Motorista.DashBoard navigate={navigate} />} />
        } />
        <Route path="/motorista/pedidos" element={
          <MobileFrame page={<Motorista.Pedidos navigate={navigate} />} />
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
            <Frame navigate={navigate} currentTab="Motoristas" page={<GestorLogistico.Motoristas />} />
          </RequireAuthGl>
        } />
      </Routes>
    </>
  )
}

export default MainRoutes;
