'use client';

import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ZoneChart({ data }: { data: { green: number; yellow: number; red: number } }) {
  const chartOptions: any = {
    chart: {
      type: 'donut',
      fontFamily: 'Inter, sans-serif',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      }
    },
    labels: ['Green Zone', 'Yellow Zone', 'Red Zone'],
    colors: ['#008378', '#b05e3d', '#ba1a1a'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontWeight: 500,
              color: '#586377'
            },
            value: {
              show: true,
              fontSize: '32px',
              fontWeight: 700,
              color: '#191c1e',
              formatter: function (val: string) {
                return val;
              }
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              fontSize: '16px',
              fontWeight: 600,
              color: '#191c1e'
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 0
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      markers: {
        radius: 12
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: function (val: number) {
          return val + " users"
        }
      }
    }
  };

  const series = [data.green, data.yellow, data.red];

  return (
    <div className="w-full flex justify-center items-center py-4">
      {(data.green === 0 && data.yellow === 0 && data.red === 0) ? (
        <div className="flex flex-col items-center justify-center text-on-surface-variant h-[300px]">
          <span className="material-symbols-outlined text-[48px] mb-2 opacity-50">pie_chart</span>
          <p>No data available</p>
        </div>
      ) : (
        <div className="w-full max-w-[350px]">
          <ReactApexChart options={chartOptions} series={series} type="donut" height={320} />
        </div>
      )}
    </div>
  );
}
