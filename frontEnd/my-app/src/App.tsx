import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/login";
import Profile from "./pages/perfil/perfil";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/Login", element: <Login /> },
  { path: "/Perfil", element: <Profile /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
