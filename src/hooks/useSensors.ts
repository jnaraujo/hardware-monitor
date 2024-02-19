import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../@types/api-response";
import { env } from "../env";

export function useSensors() {
  return useQuery({
    queryKey: ["sensors"],
    queryFn: async ({ signal }) => {
      return await fetchSensors({ signal });
    },
    refetchOnWindowFocus: true,
    refetchInterval: 500,
  });
}

async function fetchSensors({ signal }: { signal: AbortSignal }) {
  const response = await fetch(`${env.VITE_API_URL}/data.json`, {
    signal,
  });
  const data = (await response.json()) as ApiResponse;

  const devices = data.Children[0];
  const motherBoard = devices.Children[0];
  const motherBoardTemperature = motherBoard.Children[0].Children.find(
    (v) => v.Text === "Temperatures",
  )
    ?.Children.slice(0, 2)
    .map((v) => textTemperatureToNumber(v.Value));
  const fans = motherBoard.Children[0].Children.find((v) => v.Text === "Fans")
    ?.Children.map((v) => textRPMToNumber(v.Value))
    .filter(Boolean);

  const cpuTemperature = textTemperatureToNumber(
    devices.Children[1].Children.find((v) => v.Text === "Temperatures")
      ?.Children[0].Value ?? "0°C",
  );
  const cpuUsage = textPercentageToNumber(
    devices.Children[1].Children.find((v) => v.Text === "Load")?.Children.find(
      (s) => s.Text === "CPU Total",
    )?.Value ?? "0%",
  );

  const cpuPower = textPowerToNumber(
    devices.Children[1].Children.find(
      (v) => v.Text === "Powers",
    )?.Children.find((s) => s.Text === "Package")?.Value ?? "0W",
  );

  const gpuTemperature = textTemperatureToNumber(
    devices.Children[3].Children.find((v) => v.Text === "Temperatures")
      ?.Children[0].Value ?? "0°C",
  );

  return {
    motherboard: {
      name: motherBoard.Text,
      sensors: {
        temperature: motherBoardTemperature,
        fans,
      },
    },
    cpu: {
      name: devices.Children[1].Text,
      sensors: {
        temperature: cpuTemperature,
        usage: cpuUsage,
        power: cpuPower,
      },
    },
    gpu: {
      name: devices.Children[3].Text,
      sensors: {
        temperature: gpuTemperature,
      },
    },
  };
}

function textRPMToNumber(text: string) {
  return Number(text.replace("RPM", ""));
}

function textPowerToNumber(text: string) {
  return Number(text.replace("W", "").replace(",", "."));
}

function textPercentageToNumber(text: string) {
  return Number(text.replace("%", "").replace(",", "."));
}

function textTemperatureToNumber(text: string) {
  return Number(text.replace("°C", "").replace(",", "."));
}
