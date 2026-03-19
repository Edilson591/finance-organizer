type EmailTemplateProps = {
  name: string;
  code: string;
  link?: string;
};

export default function resetPasswordTemplate({
  name,
  code,
  link,
}: EmailTemplateProps) {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Recuperação de senha</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    .header {
      background-color: #0f766e;
      color: #ffffff;
      padding: 24px;
      text-align: center;
    }
    .content {
      padding: 32px;
      color: #333333;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 16px;
    }
    .code {
      font-size: 28px;
      letter-spacing: 6px;
      font-weight: bold;
      text-align: center;
      color: #0f766e;
      margin: 24px 0;
    }
    .button {
      display: inline-block;
      margin-top: 24px;
      padding: 14px 28px;
      background-color: #0f766e;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
    }
    .footer {
      background-color: #f4f6f8;
      text-align: center;
      padding: 16px;
      font-size: 12px;
      color: #666666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Finance Organizer</h1>
    </div>

    <div class="content">
      <p>Olá <strong>${name}</strong> 👋</p>

      <p>
        Recebemos uma solicitação para redefinir sua senha.
        Use o código abaixo para continuar:
      </p>

      <div class="code">${code}</div>

      ${
        link
          ? `<p style="text-align:center">
               <a href="${link}" class="button">Redefinir senha</a>
             </p>`
          : ''
      }

      <p>
        Se você não solicitou essa ação, pode ignorar este email com segurança.
      </p>
    </div>

    <div class="footer">
      © 2026 Finance Organizer — Todos os direitos reservados
    </div>
  </div>
</body>
</html>
`;
}
