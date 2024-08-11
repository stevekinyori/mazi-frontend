/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import { Line as LineChart } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import dayjs from 'dayjs';

import type { ChartData, TooltipItem, LegendItem } from 'chart.js';

export default function Graph({
  data,
  originalData,
  title,
  yLabel,
  xLabel,
  footer,
  stacked,
  footerValue,
  legendLabels,
  multilineLabels,
}: {
  data?: ChartData;
  originalData?: { [key: string]: { [key: string]: string } };
  title: string;
  yLabel: string;
  xLabel?: string;
  footer?: string;
  stacked: boolean;
  footerValue?: (items: any[]) => string;
  legendLabels?: (chart: Chart<'line'>) => LegendItem[];
  multilineLabels?: boolean;
}) {
  const tooltipValue = (tooltipItem: TooltipItem<'line'>) => {
    const key = tooltipItem.dataset.label!.match(/([a-zA-Z]+(?=\s))|([a-zA-Z]+)/)![0].toLowerCase();
    const value = originalData?.[tooltipItem.label]?.[key] ?? '$ 0';

    if (multilineLabels) {
      return [!originalData ? tooltipItem.formattedValue : value, tooltipItem.dataset.label!];
    }

    return `${tooltipItem.dataset.label} ${!originalData ? tooltipItem.formattedValue : value}`;
  };

  const generateCustomLabels = (chart: Chart<'line'>) => {
    if (legendLabels) {
      const labels = legendLabels(chart);

      return labels;
    }

    const defaultLabel = chart.legend?.legendItems?.[0];

    // return default label if it exists
    return defaultLabel ? [defaultLabel] : [];
  };

  return (
    <div className="min-h-[300px]">
      <LineChart
        title={title}
        data={data as any}
        options={{
          interaction: {
            mode: 'index',
          },
          responsive: true,
          maintainAspectRatio: false,
          elements: { point: { radius: 0.5 } },
          scales: {
            x: {
              border: {
                display: true,
                color: '#909399',
              },
              display: true,
              title: {
                display: true,
                text: xLabel ?? 'Month',
              },
              grid: { display: false },
            },
            y: {
              border: { display: false },
              display: true,
              stacked,
              title: {
                display: true,
                text: yLabel,
              },
              min: 0,
              ticks: {
                maxTicksLimit: 5,
                callback: (value) => {
                  const num = Number(value);

                  if (num >= 1e6) {
                    return `${Math.trunc(num / 1e6)}M`;
                  }

                  if (num >= 1e4) {
                    return `${Math.trunc(num / 1e3)}K`;
                  }

                  return value;
                },
              },
              grid: {
                display: true,
                color: '#ffffff',
              },
            },
          },
          plugins: {
            tooltip: {
              enabled: !multilineLabels,
              ...(multilineLabels && {
                external(context) {
                  let tooltipEl = document.getElementById('chartjs-tooltip');

                  const months = {};

                  dayjs.months().forEach((month) => {
                    months[month.substring(0, 3)] = month;
                  });

                  if (!tooltipEl) {
                    tooltipEl = document.createElement('div');
                    tooltipEl.style.borderRadius = '5px';
                    tooltipEl.style.backgroundColor = 'rgba(50, 50, 50, 0.9)';
                    tooltipEl.style.padding = '10px';
                    tooltipEl.style.width = '240px';
                    tooltipEl.style.transition = 'all 300ms ease-in-out';
                    tooltipEl.id = 'chartjs-tooltip';

                    const titleStyle = [
                      'color: #ffffff',
                      'padding: 12px',
                      'font-size: 1.3rem',
                      'font-weight: 600',
                      'border-bottom: 2px solid #ffffff',
                    ];

                    tooltipEl.innerHTML = `
                      <h3 style="${titleStyle.join('; ')};"></h3>
                      <ul style="padding: 12px"></ul>
                      <div style="display: flex; border-top: 2px solid #ffffff; padding: 12px;"></div>
                    `;

                    document.body.appendChild(tooltipEl);
                  }

                  const tooltipModel = context.tooltip;

                  if (tooltipModel.opacity === 0) {
                    tooltipEl.style.opacity = '0';

                    return;
                  }

                  tooltipEl.classList.remove('above', 'below', 'no-transform');

                  if (tooltipModel.yAlign) {
                    tooltipEl.classList.add(tooltipModel.yAlign);
                  } else {
                    tooltipEl.classList.add('no-transform');
                  }

                  if (tooltipModel.body) {
                    const titleLines = tooltipModel.title || [];
                    const bodyLines = tooltipModel.body.map((item) => item.lines);

                    if (titleLines[0]) {
                      const splitted = titleLines[0].split('-');

                      tooltipEl.querySelector('h3')!.innerText = `${months[splitted[0]]} ${splitted[1]}`;
                    }

                    let innerHtml = '';

                    bodyLines.forEach((body, i) => {
                      const colors = tooltipModel.labelColors[i];

                      innerHtml += `
                      <li style="display: flex; margin-top: ${!i ? 0 : 16}px;">
                        <div style="border-radius: 2px; width: 5px; background-color: ${colors.backgroundColor}"></div>
                        <div style="color: #ffffff; margin-left: 8px">
                          <p style="font-weight: bold;">${body[0]}</p>
                          <p>${body[1]}</p>
                        </div>
                      </li>
                    `;
                    });

                    tooltipEl.getElementsByTagName('ul').item(0)!.innerHTML = innerHtml;
                  }

                  if (tooltipModel.footer) {
                    tooltipEl.lastElementChild!.innerHTML = `
                      <div style="border-radius: 2px; width: 5px; background-color: #da5a4c"></div>
                      <div style="color: #ffffff; margin-left: 8px">
                        <p style="font-weight: bold;">${tooltipModel.footer[1]}</p>
                        <p>${tooltipModel.footer[2]}</p>
                      </div>
                    `;
                  } else {
                    tooltipEl.getElementsByTagName('div').item(1)!.style.display = 'none';
                  }

                  const rect = context.chart.canvas.getBoundingClientRect();

                  let left = rect.left + tooltipModel.caretX - tooltipEl.offsetWidth / 2;

                  if (left + tooltipEl.offsetWidth > rect.left + rect.width) {
                    left -= left + tooltipEl.offsetWidth - (rect.left + rect.width);
                  }

                  let top = rect.top + tooltipModel.caretY - tooltipEl.offsetHeight;

                  if (top < 0) {
                    top = rect.top + tooltipModel.caretY;
                  }

                  tooltipEl.style.opacity = '1';
                  tooltipEl.style.position = 'absolute';
                  tooltipEl.style.left = `${left}px`;
                  tooltipEl.style.top = `${top}px`;
                  tooltipEl.style.pointerEvents = 'none';
                },
              }),
              callbacks: {
                footer: (tooltipItems) => {
                  let value: string[] = [];

                  if (footer) {
                    value = [footer, footerValue!(tooltipItems)];
                  }

                  if (multilineLabels) {
                    return value.reverse();
                  }

                  return value.join(' ');
                },
                labelPointStyle: () => {
                  return {
                    pointStyle: 'circle',
                    rotation: 0,
                  };
                },
                afterTitle: () => {
                  return `--------------------------------------------`;
                },
                beforeFooter: () => {
                  return footer ? `---------------------------------------` : '';
                },
                label: tooltipValue,
              },
              titleFont: {
                size: 16,
                weight: 'bold',
              },
              titleMarginBottom: 12,
              usePointStyle: true,
              footerMarginTop: 12,
              footerFont: {
                size: 18,
                weight: 'bold',
              },
              padding: 12,
              bodyFont: {
                size: 16,
              },
              bodySpacing: 8,
              displayColors: true,
              boxPadding: 8,
            },
            legend: {
              reverse: true,
              onClick: () => {},
              labels: {
                generateLabels: generateCustomLabels,
              },
            },
          },
        }}
        plugins={[
          {
            id: 'increase-legend-spacing',
            beforeInit(chart) {
              const originalFit = (chart.legend as any).fit;

              // eslint-disable-next-line no-param-reassign
              (chart.legend as any).fit = function fit() {
                originalFit.bind(chart.legend)();
                this.height += 40;
              };
            },
          },
          {
            id: 'chart-legend-style',
            afterUpdate(chart: Chart) {
              // eslint-disable-next-line no-param-reassign
              chart.legend!.legendItems = chart.legend!.legendItems!.map((item) => ({
                ...item,
                strokeStyle: item.fillStyle,
                borderRadius: 1,
              }));
            },
          },
        ]}
      />
    </div>
  );
}
