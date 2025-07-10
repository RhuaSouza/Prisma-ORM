import "./perfil.css";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Forms from "../../components/forms";
import AlterarSenha from "../../components/alterarSenha";
function Profile() {
  interface User {
    id: number;
    nome: string | null;
    email: string;
    senha: string;
    fotoUrl: string | null;
  }
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario } = location.state || {};
  const [user, setUser] = useState<User>(usuario);
  const [editingPefil, setEditingPerfil] = useState<boolean>(false);
  const [newSenha, setNewSenha] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  const getDataUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/buscarUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.email,
        }),
      });

      const data = await response.json();
      setUser(data);
      setPreview(`http://localhost:5000${data.fotoUrl}`);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataUser();
  }, []);

  function SairPerfil() {
    navigate("/");
  }

  const EditarPerfil = () => {
    setEditingPerfil(!editingPefil);
  };

  const ShowNewSenha = () => {
    setNewSenha(!newSenha);
  };
  return (
    <main className="profile-main">
      <section className="profile-card">
        <section className="profile-avatar">
          {preview && (
            <>
              <img src={preview} className="foto-Perfil" />
            </>
          )}
        </section>
        <h2>{user.nome}</h2>
        <p className="email">{user.email}</p>

        <section className="profile-actions">
          <button onClick={() => EditarPerfil()}>Editar Perfil</button>
          <button onClick={() => ShowNewSenha()}>Alterar Senha</button>

          <button className="logout" onClick={() => SairPerfil()}>
            Sair
          </button>
        </section>
      </section>
      <section className="container_forms">
        <section className="formsTop">
          {editingPefil && (
            <>
              <Forms
                usuarioData={user}
                setPreview={setPreview}
                setUser={setUser}
              />
            </>
          )}
        </section>
        <section className="formsBottom">
          {newSenha && (
            <>
              <AlterarSenha
                userId={user.id}
                userData={user}
                onPasswordChanged={() => {
                  getDataUser();
                }}
              />
            </>
          )}
        </section>
      </section>
    </main>
  );
}

export default Profile;
