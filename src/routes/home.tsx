import { useRef } from "react";
import { Chart } from "../components/chart";
import { useSensors } from "../hooks/useSensors";

export function Home() {
  const sensors = useSensors();
  const cpuTempRef = useRef<number[]>([]);
  const motherboardTempRef = useRef<number[]>([]);
  const cpuUsageRef = useRef<number[]>([]);
  const cpuPowerRef = useRef<number[]>([]);
  const gpuTempRef = useRef<number[]>([]);

  if (sensors.data) {
    const cpuTemp = sensors.data.cpu.sensors.temperature;
    const motherboardTemp = sensors.data.motherboard.sensors.temperature ?? [];
    const motherboardTempMean =
      motherboardTemp.reduce((a, b) => a + b, 0) / motherboardTemp.length;
    const cpuUsage = sensors.data.cpu.sensors.usage;
    const cpuPower = sensors.data.cpu.sensors.power;
    const gpuTemp = sensors.data.gpu.sensors.temperature;

    cpuTempRef.current.push(cpuTemp);
    motherboardTempRef.current.push(motherboardTempMean);
    cpuUsageRef.current.push(cpuUsage);
    cpuPowerRef.current.push(cpuPower);
    gpuTempRef.current.push(gpuTemp);
  }

  return (
    <main className="min-h-[100svh] bg-zinc-950 text-zinc-50">
      <section className="grid h-[100svh] grid-cols-3 grid-rows-2 gap-4 p-4">
        <Chart data={cpuTempRef.current} title="CPU Temperature" />
        <Chart
          data={motherboardTempRef.current}
          title="Motherboard Temperature"
        />
        <Chart data={cpuUsageRef.current} title="CPU Usage" />
        <Chart data={cpuPowerRef.current} title="CPU Power" />
        <Chart data={gpuTempRef.current} title="GPU Temperature" />
      </section>
    </main>
  );
}
