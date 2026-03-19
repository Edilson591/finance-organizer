import { FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuth } from "../../hooks/userAuth";
import { getTimeRemaining } from "../../utils/getTimeRemaining";
import { useNavigate } from "react-router-dom";

type ApiError = {
  message?: string;
};

export default function ForgotPassword() {
  const { forgotPasswordMutation } = useAuth();
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(getTimeRemaining(100) ?? 0);
  const navigate = useNavigate();

  const errorMessage =
    (forgotPasswordMutation.error as AxiosError<ApiError> | null)?.response
      ?.data?.message ?? "Nao foi possivel enviar o codigo.";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          localStorage.setItem("forgotPasswordStart", Date.now().toString());
          setCountdown(100);

          // localStorage.setItem("forgotPasswordTime", Date.now());
        },
      },
    );
  };

  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      const remaining = getTimeRemaining(100);
      if (!remaining) return;
      setCountdown(remaining);

      if (remaining <= 1) {
        setCountdown(0);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [getTimeRemaining, countdown]);

  return (
    <section className="auth-screen">
      <div className="auth-shell single-panel">
        <article className="auth-panel">
          <h2>Esqueci minha senha</h2>
          <p>Informe seu email para receber o codigo de recuperacao.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            {forgotPasswordMutation.isError && (
              <span className="form-error">{errorMessage}</span>
            )}
            {forgotPasswordMutation.isSuccess && (
              <span className="form-success">
                {forgotPasswordMutation.data.message}
              </span>
            )}

            <button
              type="submit"
              className="solid-button"
              disabled={forgotPasswordMutation.isPending || countdown > 0}
            >
              {forgotPasswordMutation.isPending
                ? "Enviando..."
                : countdown > 0
                  ? `Enviar novamente em ${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, "0")}`
                  : "Enviar codigo"}
            </button>
          </form>

          <div className="auth-links">
            <Link to="/reset-password">
              Ja recebeu o codigo? Redefinir senha
            </Link>
            <Link to="/login">Voltar para login</Link>
          </div>
        </article>
      </div>
    </section>
  );
}
