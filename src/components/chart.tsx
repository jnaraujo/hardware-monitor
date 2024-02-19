import ApexChart from "react-apexcharts";

interface Props {
  data: number[];
  title: string;
}

export function Chart({ data, title }: Props) {
  const options: ApexCharts.ApexOptions = {
    chart: {
      id: title,
      toolbar: {
        show: false,
      },
      animations: {
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      zoom: {
        enabled: false,
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#8b5cf6"],
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: Array.from({ length: data.length }, (_, i) => i.toString()),
      range: 10,
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    yaxis: {
      min: Math.min(...data) - 10,
      max: Math.max(...data) + 10,
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "8px",
        },
      },
      tickAmount: 3,
    },
  };

  return (
    <section className="space-y-1">
      <h2 className="text-sm text-zinc-300">{title}</h2>

      <ApexChart
        options={options}
        series={[
          {
            name: title,
            data: data,
          },
        ]}
        type="line"
        height="100%"
      />
    </section>
  );
}
