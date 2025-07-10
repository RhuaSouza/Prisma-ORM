import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [passwordView, setPasswordView] = useState<boolean>(true);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/loginUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login realizado:", data);
        navigate("/perfil", { state: { usuario: data.usuario } });
      } else {
        alert("E-mail ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <main className="main-container">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu e-mail"
              maxLength={70}
            />
          </div>

          <div className="input-group password-group">
            <label htmlFor="password">Senha</label>
            <div className="password-inline">
              <input
                type={passwordView ? "password" : "text"}
                id="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                placeholder="Digite sua senha"
                maxLength={20}
              />
              <button
                type="button"
                onClick={() => setPasswordView(!passwordView)}
                aria-label="Toggle password visibility"
              >
                {passwordView ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                    fill="#007bff"
                  >
                    <path d="M12 5c-7 0-12 7-12 7s5 7 12 7 12-7 12-7-5-7-12-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                    fill="#007bff"
                  >
                    <path d="M12 6a9.77 9.77 0 016.09 2.1l1.41-1.41A11.85 11.85 0 0012 4a11.85 11.85 0 00-7.5 2.69l1.41 1.41A9.77 9.77 0 0112 6zm0 12a9.77 9.77 0 01-6.09-2.1l-1.41 1.41A11.85 11.85 0 0012 20a11.85 11.85 0 007.5-2.69l-1.41-1.41A9.77 9.77 0 0112 18zm0-10a4 4 0 014 4c0 .73-.21 1.41-.57 2l1.43 1.43A5.97 5.97 0 0018 12a6 6 0 00-6-6c-1.1 0-2.13.3-3.03.82l1.43 1.43A3.96 3.96 0 0112 8zm0 8a4 4 0 01-4-4c0-.73.21-1.41.57-2L7.14 8.57A5.97 5.97 0 006 12a6 6 0 006 6c1.1 0 2.13-.3 3.03-.82l-1.43-1.43c-.59.36-1.27.57-2 .57z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit">Entrar</button>
          <p className="login">
            Não possui conta?{" "}
            <Link id="a" to={"/"}>
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
