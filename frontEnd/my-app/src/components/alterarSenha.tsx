import React, { useEffect, useState } from "react";
import "./alterarSenha.css";
import InputSenha from "./inputSenha";
interface User {
  id: number;
  nome: string | null;
  email: string;
  senha: string;
  fotoUrl: string | null;
}
function AlterarSenha({
  userId,
  userData,
  onPasswordChanged,
}: {
  userId: number;
  userData: User;
  onPasswordChanged: () => void;
}) {
  const [senhaAtual, setSenhaAtual] = useState<string>("");
  const [novaSenha, setNovaSenha] = useState<string>("");
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  async function handleTrocarSenha() {
    if (novaSenha === "" || senhaAtual === "" || confirmarSenha === "") {
      alert("Preencha os espaços!");
      return;
    }
    if (senhaAtual.trim() !== userData.senha.trim()) {
      alert("Senha atual incorreta!");
      return;
    }

    if (novaSenha.trim() === confirmarSenha.trim()) {
      try {
        const response = await fetch(
          `http://localhost:5000/atualizarUsuario/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome: userData.nome,
              senha: confirmarSenha.trim(),
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        alert("Senha alterada com sucesso!");
        onPasswordChanged();

        setSenhaAtual("");
        setConfirmarSenha("");
        setNovaSenha("");
        return;
      } catch (error) {
        console.error("Erro ao trocar senha:", error);
      }
    } else {
      alert("As senhas não coincidem!");
      return;
    }
  }

  useEffect(() => {
    console.log(userData.senha);
  }, [confirmarSenha]);
  return (
    <div className="alterar-senha-container">
      <InputSenha
        setSenha={setSenhaAtual}
        senha={senhaAtual}
        textPlaceholder="Senha atual"
      />
      <InputSenha
        setSenha={setNovaSenha}
        senha={novaSenha}
        textPlaceholder="Senha nova"
      />
      <InputSenha
        setSenha={setConfirmarSenha}
        senha={confirmarSenha}
        textPlaceholder="Confirmar senha"
      />
      <button onClick={handleTrocarSenha}>Atualizar Senha</button>
    </div>
  );
}

export default AlterarSenha;
