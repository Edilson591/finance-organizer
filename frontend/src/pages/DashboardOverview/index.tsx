import { useMemo } from "react";
import { useFinanceStore } from "../../store/useFinanceStore";

function currency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function DashboardOverview() {
  const categories = useFinanceStore((state) => state.categories);
  const totals = useFinanceStore((state) => state.totals);
  const totalsByCategory = useFinanceStore((state) => state.totalsByCategory);
  const monthlySeries = useFinanceStore((state) => state.monthlySeries);

  const maxMonthly = useMemo(() => {
    const max = monthlySeries.reduce((acc, item) => {
      const highest = Math.max(item.income, item.expense);
      return highest > acc ? highest : acc;
    }, 0);

    return max || 1;
  }, [monthlySeries]);

  return (
    <div className="dashboard-stack">
      <div className="dashboard-cards">
        <article>
          <h3>Saldo</h3>
          <p>{currency(totals.balance)}</p>
          <span>Diferenca entre entradas e saidas</span>
        </article>
        <article>
          <h3>Entradas</h3>
          <p>{currency(totals.income)}</p>
          <span>Total de receitas registradas</span>
        </article>
        <article>
          <h3>Saidas</h3>
          <p>{currency(totals.expense)}</p>
          <span>Total de despesas registradas</span>
        </article>
      </div>

      <section className="dashboard-panels">
        <article className="panel">
          <h3>Receitas x despesas por mes</h3>
          <div className="bar-chart">
            {monthlySeries.length === 0 && <p>Sem dados para o grafico.</p>}
            {monthlySeries.map((item) => (
              <div className="bar-group" key={item.month}>
                <div className="bars">
                  <span
                    className="bar income"
                    style={{ height: `${(item.income / maxMonthly) * 100}%` }}
                    title={`Entradas: ${currency(item.income)}`}
                  />
                  <span
                    className="bar expense"
                    style={{ height: `${(item.expense / maxMonthly) * 100}%` }}
                    title={`Saidas: ${currency(item.expense)}`}
                  />
                </div>
                <small>{item.month}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <h3>Distribuicao por categoria</h3>
          <div className="donut-list">
            {totalsByCategory.length === 0 && <p>Sem dados para categorias.</p>}
            {totalsByCategory.map((item) => {
              const category = categories.find((entry) => entry.id === item.categoryId);
              const amount = currency(item.amount);

              return (
                <div className="legend-row" key={item.categoryId}>
                  <span
                    className="legend-color"
                    style={{ backgroundColor: category?.color || "#64748b" }}
                  />
                  <strong>{category?.name || "Categoria removida"}</strong>
                  <span>{amount}</span>
                </div>
              );
            })}
          </div>
        </article>
      </section>
    </div>
  );
}
