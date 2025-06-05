import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  CategoryScale,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

// Função de contagem
const contarOcorrencias = (array, campo) => {
  const contagem = {};
  array.forEach((item) => {
    const valor =
      campo === "tipoDoRegistro" ? item[campo] : item.conteudoLaudo?.[campo];
    if (valor) {
      contagem[valor] = (contagem[valor] || 0) + 1;
    }
  });
  return contagem;
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const Barchart = () => {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/bancoodonto")
      .then((res) => res.json())
      .then((data) => {
        setRegistros(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando gráficos...</p>;
  if (!registros.length) return <p>Nenhum dado encontrado.</p>;

  const tipoRegistroCount = contarOcorrencias(registros, "tipoDoRegistro");
  const denticaoCount = contarOcorrencias(registros, "tipoDenticao");
  const caracteristicasCount = contarOcorrencias(registros, "caracteristicasEspecificas");

  const barData = {
    labels: Object.keys(tipoRegistroCount),
    datasets: [
      {
        label: "Tipo de Registro",
        data: Object.values(tipoRegistroCount),
        backgroundColor: ["rgba(255,99,132,0.6)", "rgba(54,162,235,0.6)"],
      },
    ],
  };

  const pieData = {
    labels: Object.keys(denticaoCount),
    datasets: [
      {
        label: "Tipo de Dentição",
        data: Object.values(denticaoCount),
        backgroundColor: [
          "rgba(255, 205, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  const lineData = {
    labels: Object.keys(caracteristicasCount),
    datasets: [
      {
        label: "Características Específicas",
        data: Object.values(caracteristicasCount),
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div style={{ background: "#f8f9fa", padding: "2rem", borderRadius: "1rem" }}>
      <h2>Gráfico de Colunas: Tipo de Registro</h2>
      <Bar data={barData} options={chartOptions} />

      <h2 style={{ marginTop: "2rem" }}>Gráfico de Pizza: Tipo de Dentição</h2>
      <Pie data={pieData} options={chartOptions} />

      <h2 style={{ marginTop: "2rem" }}>Gráfico de Linha: Características Específicas</h2>
      <Line data={lineData} options={chartOptions} />
    </div>
  );
};

export default Barchart;
