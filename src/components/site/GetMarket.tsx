"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

interface FinancialData {
  id: string;
  name: string;
  value: number;
  change: number;
  previousValue: number;
}

export default function Component() {
  const [data, setData] = useState<FinancialData[]>([
    {
      id: "dolar",
      name: "DOLAR",
      value: 34.54,
      change: 0.25,
      previousValue: 34.17,
    },
    {
      id: "euro",
      name: "EURO",
      value: 36.02,
      change: 0.31,
      previousValue: 36.04,
    },
    {
      id: "sterlin",
      name: "STERLİN",
      value: 43.28,
      change: -0.18,
      previousValue: 43.69,
    },
    {
      id: "bitcoin",
      name: "BITCOIN",
      value: 3405255.75,
      change: 52.4,
      previousValue: 3405256.87,
    },
    {
      id: "bist",
      name: "BIST 100",
      value: 9450.75,
      change: 40.1,
      previousValue: 9385.55,
    },
    {
      id: "gold",
      name: "GRAM ALTIN",
      value: 3008.32,
      change: 40.43,
      previousValue: 2806.08,
    },
    {
      id: "silver",
      name: "GÜMÜŞ",
      value: 34.22,
      change: 0.54,
      previousValue: 33.49,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((currentData) =>
        currentData.map((item) => {
          const changeAmount = (Math.random() - 0.5) * 0.02;
          const newValue = item.value + changeAmount;

          return {
            ...item,
            previousValue: item.value,
            value: newValue,
            change:
              ((newValue - item.previousValue) / item.previousValue) * 100,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#1c1c1c] text-white overflow-hidden py-2">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {data.map((item) => (
          <div key={item.id} className="inline-flex items-center mx-4">
            <span className="font-medium mr-2">{item.name}</span>
            <span className="tabular-nums">
              {item.value.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <div
              className={`ml-2 flex items-center ${
                item.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.change >= 0 ? (
                <ArrowUp className="w-3 h-3" />
              ) : (
                <ArrowDown className="w-3 h-3" />
              )}
              <span className="ml-1 text-sm">
                %{Math.abs(item.change).toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        {data.map((item) => (
          <div
            key={`${item.id}-duplicate`}
            className="inline-flex items-center mx-4"
          >
            <span className="font-medium mr-2">{item.name}</span>
            <span className="tabular-nums">
              {item.value.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <div
              className={`ml-2 flex items-center ${
                item.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.change >= 0 ? (
                <ArrowUp className="w-3 h-3" />
              ) : (
                <ArrowDown className="w-3 h-3" />
              )}
              <span className="ml-1 text-sm">
                %{Math.abs(item.change).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
