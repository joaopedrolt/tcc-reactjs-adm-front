import { Route, Routes } from "react-router-dom";
import RequireAuth from "../RequireAuth";
import Login from "../components/login/Login";
import Frame from "../components/Frame";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/gl/:slug" element={
          <RequireAuth>
            <Frame />
          </RequireAuth>
        } />
      </Routes>
    </>
  )
}

export default MainRoutes;
