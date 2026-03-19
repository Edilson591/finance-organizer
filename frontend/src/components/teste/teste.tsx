import React, { useCallback, useState } from "react";

interface userCard {
  users: { id: number; nome: string };
  onSelectionar: (id: number) => void;
}

const UsersCards = React.memo(({ users, onSelectionar }: userCard) => {
  console.log("renderizou");
  return (
    <div style={{ border: "1px solid #ccc", margin: 5, padding: 10 }}>
      <p>{users.nome}</p>
      <button onClick={() => onSelectionar(users.id)}>Selecionar</button>
    </div>
  );
});

export default function TesteList() {
  const [selectionar, setSelectionar] = useState<number>();
  const usuarios = [
    { id: 1, nome: "Edilson" },
    { id: 2, nome: "Luciano" },
    { id: 3, nome: "Maria" },
  ];

  const select = useCallback((id: number) => {
    setSelectionar(id);
  }, []);
  return (
    <div>
      <h2>Usuário Selecionado: {selectionar || "Nenhum"}</h2>
      {usuarios.map((user) => (
        <UsersCards key={user.id} onSelectionar={select} users={user} />
      ))}
    </div>
  );
}
