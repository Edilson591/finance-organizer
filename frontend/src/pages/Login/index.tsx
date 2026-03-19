import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuth } from "../../hooks/userAuth";

type LoginForm = {
  email: string;
  password: string;
};

type ApiError = {
  message?: string;
};

export default function Login() {
  const { loginMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const errorMessage =
    (loginMutation.error as AxiosError<ApiError> | null)?.response?.data?.message ??
    "Nao foi possivel entrar.";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <section className="auth-screen">
      <div className="auth-shell">
        <article className="auth-brand">
          <p className="auth-badge">Finance Organizer</p>
          <h1>
            Controle suas financas com um fluxo seguro e pratico.
          </h1>
          <p>
            Acompanhe entradas e saidas, organize categorias e mantenha tudo no mesmo painel.
          </p>
        </article>

        <article className="auth-panel">
          <h2>Entrar</h2>
          <p>Use seu email e senha para acessar.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="voce@empresa.com"
            />

            <label htmlFor="password">Senha</label>
            <div className="password-field">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, password: event.target.value }))
                }
                placeholder="Digite sua senha"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="ghost-button"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            {loginMutation.isError && <span className="form-error">{errorMessage}</span>}

            <button type="submit" className="solid-button" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="auth-links">
            <Link to="/forgot-password">Esqueci minha senha</Link>
            <Link to="/register">Criar conta</Link>
          </div>
        </article>
      </div>
    </section>
  );
}
