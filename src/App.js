import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PostHome from "./pages/PostHome";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import PageNotFount from "./pages/PageNotFount";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Cuestionario from "./pages/Cuestionario";
import PostGeneral from "./pages/PostGeneral";
import Resultados from "./pages/Resultados";
import { useState, useEffect } from "react";
import axios from "axios";
import "./estilos/navar.css";

let date = "Cuestionario";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({
            ...authState,
            status: false,
          });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    
    window.location.reload(true);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/"> LOGO </Link>
                  
                </>
              ) : (
                <>
                  <Link to="/home"> LOGO</Link>
                  <Link to="/PostHome">BLOG</Link>
                  <Link to="/createpost">CREAR BLOG</Link>
                </>
                 )}
            </div>
            <div className="loggedInContainer">
              {authState.status && (
                <Link to={`profile/${authState.id}`}>Perfil</Link>
              )}
              {!authState.status && <Link to="/PostGeneral">BLOG</Link>}
              {!authState.status && <Link to="/login">INICIAR SESSION</Link>}
              {!authState.status && <Link to="/registration">Crear Cuenta</Link>}
              {authState.status && <Link to="/cuestionario">{date}</Link>}
              
              {authState.status && (
                <button onClick={logout} to="/">
                  SALIR
                </button>
              )}
            </div>
          </div>
          <Routes>
            <Route path="/" exact element={<Index />} />
            <Route path="/home" exact element={<Home />} />
            <Route path="/PostHome" exact element={<PostHome />} />
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/registration" exact element={<Registration />} />
            <Route path="/profile/:id" exact element={<Profile />} />
            <Route path="/cuestionario" exact element={<Cuestionario />} />
            <Route path="/ChangePassword" exact element={<ChangePassword />} />
            <Route path="/PostGeneral" exact element={<PostGeneral />} />
            <Route path="/resultados/:id" exact element={<Resultados />} />
            <Route path="*" exact element={<PageNotFount />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
