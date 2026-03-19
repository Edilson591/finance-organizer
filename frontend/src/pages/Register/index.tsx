import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuth } from "../../hooks/userAuth";

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  cpf: string;
  cnpj: string;
};

type ApiError = {
  message?: string;
};

export default function Register() {
  const { registerMutation } = useAuth();
  const [formData, setFormData] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    cpf: "",
    cnpj: "",
  });

  const errorMessage =
    (registerMutation.error as AxiosError<ApiError> | null)?.response?.data?.message ??
    "Nao foi possivel criar a conta.";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    registerMutation.mutate({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      cpf: formData.cpf || null,
      cnpj: formData.cnpj || null,
    });
  };

  return (
    <section className="auth-screen">
      <div className="auth-shell single-panel">
        <article className="auth-panel">
          <h2>Criar conta</h2>
          <p>Cadastre os dados para acessar o dashboard.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Nome de usuario</label>
            <input
              id="username"
              type="text"
              required
              value={formData.username}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, username: event.target.value }))
              }
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
            />

            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              minLength={6}
              required
              value={formData.password}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, password: event.target.value }))
              }
            />

            <label htmlFor="cpf">CPF (opcional)</label>
            <input
              id="cpf"
              type="text"
              value={formData.cpf}
              onChange={(event) => setFormData((prev) => ({ ...prev, cpf: event.target.value }))}
            />

            <label htmlFor="cnpj">CNPJ (opcional)</label>
            <input
              id="cnpj"
              type="text"
              value={formData.cnpj}
              onChange={(event) => setFormData((prev) => ({ ...prev, cnpj: event.target.value }))}
            />

            {registerMutation.isError && <span className="form-error">{errorMessage}</span>}

            <button type="submit" className="solid-button" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? "Criando..." : "Criar conta"}
            </button>
          </form>

          <div className="auth-links">
            <Link to="/login">Voltar para login</Link>
          </div>
        </article>
      </div>
    </section>
  );
}
