import { FormEvent, useState } from "react";
import { useFinanceStore } from "../../store/useFinanceStore";
import { CategoryType } from "../../types/finance";

const defaultColors = {
  income: "#16a34a",
  expense: "#ef4444",
};

export default function CategoriesPage() {
  const categories = useFinanceStore((state) => state.categories);
  const addCategory = useFinanceStore((state) => state.addCategory);
  const removeCategory = useFinanceStore((state) => state.removeCategory);

  const [name, setName] = useState("");
  const [type, setType] = useState<CategoryType>("expense");
  const [color, setColor] = useState(defaultColors.expense);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addCategory({ name, type, color });
    setName("");
    setType("expense");
    setColor(defaultColors.expense);
  };

  return (
    <div className="dashboard-stack">
      <article className="panel">
        <h3>Criar categoria</h3>
        <form className="grid-form categories-form" onSubmit={handleSubmit}>
          <input
            placeholder="Nome da categoria"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <select
            value={type}
            onChange={(event) => {
              const selected = event.target.value as CategoryType;
              setType(selected);
              setColor(defaultColors[selected]);
            }}
          >
            <option value="expense">Despesa</option>
            <option value="income">Receita</option>
          </select>
          <input type="color" value={color} onChange={(event) => setColor(event.target.value)} />
          <button className="solid-button" type="submit">
            Criar categoria
          </button>
        </form>
      </article>

      <article className="panel">
        <h3>Lista de categorias</h3>
        <div className="category-list">
          {categories.map((category) => (
            <div className="category-item" key={category.id}>
              <span className="legend-color" style={{ backgroundColor: category.color }} />
              <strong>{category.name}</strong>
              <small>{category.type === "income" ? "Receita" : "Despesa"}</small>
              <button className="danger-link" onClick={() => removeCategory(category.id)}>
                Excluir
              </button>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
