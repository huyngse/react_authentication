import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import LinkPage from "./pages/LinkPage";
import Unauthorized from "./pages/Unauthorized";
import Editor from "./pages/Editor";
import Admin from "./pages/Admin";
import Lounge from "./pages/Lounge";
import Missing from "./pages/Missing";
import Home from "./pages/Home";
import RequireAuth from "./features/auth/components/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/linkpage" element={<LinkPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["editor"]} />}>
            <Route path="/editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["admin", "editor"]} />}>
            <Route path="/lounge" element={<Lounge />} />
          </Route>

          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
