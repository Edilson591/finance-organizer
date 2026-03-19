import { FormEvent, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuth } from "../../hooks/userAuth";

type ApiError = {
  message?: string;
};

export default function ResetPassword() {
  const { resetPasswordMutation, getUsers } = useAuth();
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const codeFromUrl = searchParams.get("code");
    if (codeFromUrl) {
      setCode(codeFromUrl);
    }
  }, [searchParams]);

  const errorMessage =
    (resetPasswordMutation.error as AxiosError<ApiError> | null)?.response?.data?.message ??
    "Nao foi possivel redefinir a senha.";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(getUsers)
    resetPasswordMutation.mutate({ code, password });
  };

  return (
    <section className="auth-screen">
      <div className="auth-shell single-panel">
        <article className="auth-panel">
          <h2>Redefinir senha</h2>
          <p>Digite o codigo enviado e a nova senha.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="code">Codigo</label>
            <input
              id="code"
              type="text"
              required
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />

            <label htmlFor="password">Nova senha</label>
            <input
              id="password"
              type="password"
              minLength={6}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            {resetPasswordMutation.isError && <span className="form-error">{errorMessage}</span>}
            {resetPasswordMutation.isSuccess && (
              <span className="form-success">Senha alterada com sucesso. Redirecionando...</span>
            )}

            <button
              type="submit"
              className="solid-button"
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending ? "Salvando..." : "Atualizar senha"}
            </button>
          </form>

          <div className="auth-links">
            <Link to="/forgot-password">Nao recebeu o codigo?</Link>
            <Link to="/login">Voltar para login</Link>
          </div>
        </article>
      </div>
    </section>
  );
}
