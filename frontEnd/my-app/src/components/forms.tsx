import React, { useState, useRef, useEffect } from "react";
import "./forms.css";
interface User {
  id: number;
  nome: string | null;
  email: string;
  senha: string;
  fotoUrl: string | null;
}
function Forms({
  usuarioData,
  setPreview,
  setUser,
}: {
  usuarioData: User;
  setUser: (user: User) => void;
  setPreview: (url: string) => void;
}) {
  const [inputNameUser, setName] = useState<string>("");
  const inputref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUser(usuarioData);
  }, [usuarioData]);

  async function AtualizarPerfil() {
    if (inputNameUser == "") {
      alert("Preencha o espaço para atualizar o nome de usuário!");
      return;
    } else {
      try {
        const response = await fetch(
          `http://localhost:5000/atualizarUsuario/${usuarioData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome: inputNameUser,
              senha: usuarioData.senha,
            }),
          }
        );
        const data = await response.json();
        setName("");
        console.log("Resposta da API:", data);
        if (response.ok) {
          setUser(data);
        } else {
          return console.log("Erro ao atualizar");
        }
      } catch (error) {
        console.log("Erro ao trocar nome", error);
      }
    }
  }

  function HandleFileChange() {
    inputref.current?.click();
  }

  async function GetPhotoProfile(e: React.ChangeEvent<HTMLInputElement>) {
    const imagemEscolhida = e.target.files?.[0];
    if (!imagemEscolhida) return;
    const previewUrl = URL.createObjectURL(imagemEscolhida);
    setPreview(previewUrl);
    const formData = new FormData();
    formData.append("foto", imagemEscolhida);
    formData.append("userId", String(usuarioData.id));

    try {
      const response = await fetch("http://localhost:5000/foto_perfil", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Resposta da API:", data);

      if (response.ok) {
        alert("Foto enviada com sucesso!");
        setPreview(`http://localhost:5000${data.photoUrl}`);
      } else {
        console.log("Erro ao enviar a foto");
      }
    } catch (error: any) {
      console.log(`erro ao fazer upload: ${error}`);
      alert("Erro ao enviar foto");
    }
  }
  return (
    <>
      <div className="editing-perfil">
        <input
          type="text"
          placeholder="Nome de usuário"
          id="inputName"
          onChange={(e) => setName(e.target.value)}
          value={inputNameUser}
        />
        <button onClick={() => AtualizarPerfil()}>Enviar</button>
        <input
          type="file"
          style={{ display: "none" }}
          ref={inputref}
          onChange={GetPhotoProfile}
        />
        <button onClick={HandleFileChange}>
          Escolher Foto
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
          </svg>
        </button>
      </div>
    </>
  );
}

export default Forms;
