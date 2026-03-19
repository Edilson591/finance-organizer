import { FormEvent, useMemo, useState } from "react";
import { useFinanceStore } from "../../store/useFinanceStore";
import { CategoryType } from "../../types/finance";

const initialForm = {
  title: "",
  amount: "",
  type: "expense" as CategoryType,
  categoryId: "",
  date: new Date().toISOString().slice(0, 10),
  notes: "",
};

function currency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function TransactionsPage() {
  const categories = useFinanceStore((state) => state.categories);
  const transactions = useFinanceStore((state) => state.transactions);
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  const removeTransaction = useFinanceStore((state) => state.removeTransaction);

  const [formData, setFormData] = useState(initialForm);

  const filteredCategories = useMemo(
    () => categories.filter((category) => category.type === formData.type),
    [categories, formData.type]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.categoryId) return;

    addTransaction({
      title: formData.title,
      amount: Number(formData.amount),
      type: formData.type,
      categoryId: formData.categoryId,
      date: formData.date,
      notes: formData.notes || undefined,
    });

    setFormData(initialForm);
  };

  return (
    <div className="dashboard-stack">
      <article className="panel">
        <h3>Adicionar transacao</h3>

        <form className="grid-form" onSubmit={handleSubmit}>
          <input
            placeholder="Titulo"
            required
            value={formData.title}
            onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
          />
          <input
            placeholder="Valor"
            type="number"
            min="0.01"
            step="0.01"
            required
            value={formData.amount}
            onChange={(event) => setFormData((prev) => ({ ...prev, amount: event.target.value }))}
          />
          <select
            value={formData.type}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                type: event.target.value as CategoryType,
                categoryId: "",
              }))
            }
          >
            <option value="income">Entrada</option>
            <option value="expense">Saida</option>
          </select>
          <select
            required
            value={formData.categoryId}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, categoryId: event.target.value }))
            }
          >
            <option value="">Selecione a categoria</option>
            {filteredCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(event) => setFormData((prev) => ({ ...prev, date: event.target.value }))}
          />
          <input
            placeholder="Observacoes"
            value={formData.notes}
            onChange={(event) => setFormData((prev) => ({ ...prev, notes: event.target.value }))}
          />
          <button className="solid-button" type="submit">
            Adicionar transacao
          </button>
        </form>
      </article>

      <article className="panel">
        <h3>Historico de transacoes</h3>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Tipo</th>
                <th>Categoria</th>
                <th>Data</th>
                <th>Valor</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                const category = categories.find((entry) => entry.id === transaction.categoryId);
                return (
                  <tr key={transaction.id}>
                    <td>{transaction.title}</td>
                    <td>{transaction.type === "income" ? "Entrada" : "Saida"}</td>
                    <td>{category?.name || "Categoria removida"}</td>
                    <td>{transaction.date}</td>
                    <td>{currency(transaction.amount)}</td>
                    <td>
                      <button
                        className="danger-link"
                        onClick={() => removeTransaction(transaction.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}
