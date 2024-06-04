import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

export const annualReports = async function () {
  window.Webflow ||= [];
  window.Webflow.push(async () => {
    // Global settings
    Chart.defaults.font.family = 'Poppins';

    Chart.defaults.scale.grid.color = 'rgba(0, 0, 0, 0.02)';
    Chart.defaults.backgroundColor = 'red';
    Chart.defaults.font.size = 12;
    Chart.defaults.set('plugins.legend', {
      position: 'bottom',
      align: 'start',
      labels: {
        color: '#a3a3a3',
        weight: 300,
        boxWidth: 16,
        boxHeight: 16,
        // usePointStyle: true,
      },
    });
    Chart.defaults.font.weight = '500';
    Chart.defaults.set('plugins.datalabels', {
      font: {
        weight: 700,
      },
      color: 'white',
    });
    Chart.defaults.maintainAspectRatio = false;

    // Charts
    const chartCompanies = document.querySelector('[data-element="number-of-companies"]');
    const chartValuation = document.querySelector('[data-element="valuation"]');
    const chartFinancing = document.querySelector('[data-element="financing"]');
    const chartRevenue = document.querySelector('[data-element="revenue"]');
    const chartEmployees = document.querySelector('[data-element="employees"]');
    const chartEmployeesGender = document.querySelector('[data-element="employeesGender"]');

    if (
      !chartCompanies ||
      !chartValuation ||
      !chartFinancing ||
      !chartRevenue ||
      !chartEmployees ||
      !chartEmployeesGender
    )
      return;

    const data = await fetchData();

    new Chart(chartCompanies, {
      type: 'bar',
      options: {
        aspectRatio: 1,
        layout: {
          padding: {
            right: 92,
            top: 72,
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
        plugins: {
          datalabels: {
            display: (ctx) => {
              const { data } = ctx.dataset;
              const { dataIndex: index } = ctx;

              return index === data.length - 1 ? 1 : 0;
            },
            align: 'right',
            color: 'black',
            padding: {
              left: 40,
            },
            font: {
              size: 40,
            },
          },
        },
      },
      data: {
        labels: data.map((row) => row.year).sort((a, b) => a - b),
        datasets: [
          {
            label: 'Active companies',
            data: data.map((row) => row.activeCompanies),
            backgroundColor: '#ec1877',
          },
          {
            label: 'Living dead / Changed ideas',
            data: data.map((row) => row.livingDead),
            backgroundColor: 'grey',
          },
          {
            label: 'Discontinued',
            data: data.map((row) => row.discontinued),
            backgroundColor: 'black',
          },
        ],
      },
    });

    new Chart(chartValuation, {
      type: 'line',
      options: {
        aspectRatio: 1.5,
        layout: {
          padding: {
            right: 72,
            top: 72,
          },
        },
        backgroundColor: '#ec1877',
        elements: {
          point: {
            pointStyle: false,
          },
        },
        plugins: {
          datalabels: {
            display: (ctx) => {
              const { data } = ctx.dataset;
              const { dataIndex: index } = ctx;

              return index === data.length - 1 ? 1 : 0;
            },
            color: 'black',
            font: {
              size: 24,
            },
            align: 'top',
            formatter(value, context) {
              return `${value} bn EUR`;
            },
          },
        },
      },

      data: {
        labels: data.map((row) => row.year).sort((a, b) => a - b),
        datasets: [
          {
            label: 'Valuation of Sting companies (bn EUR)',
            data: data.map((row) => row.valuation),
            backgroundColor: '#ec1877',
            borderColor: '#ec1877',
          },
        ],
      },
    });

    new Chart(chartFinancing, {
      type: 'line',
      options: {
        aspectRatio: 1.5,
        layout: {
          padding: {
            right: 72,
          },
        },
        backgroundColor: '#ec1877',
        elements: {
          point: {
            pointStyle: false,
          },
        },
        plugins: {
          datalabels: {
            display: (ctx) => {
              const { data } = ctx.dataset;
              const { dataIndex: index } = ctx;

              return index === data.length - 1 ? 1 : 0;
            },
            color: 'black',
            font: {
              size: 24,
            },
            align: 'top',
            formatter(value, context) {
              return `${value} m EUR`;
            },
          },
        },
      },

      data: {
        labels: data.map((row) => row.year).sort((a, b) => a - b),
        datasets: [
          {
            label: 'Private financing',
            data: data.map((row) => row.financingPrivate),
            backgroundColor: '#ec1877',
            borderColor: '#ec1877',
          },
          {
            label: 'Public financing',
            data: data.map((row) => row.financingPublic),
            backgroundColor: 'black',
            borderColor: 'black',
          },
        ],
      },
    });

    // const revenue = [];
    new Chart(chartRevenue, {
      type: 'bar',
      options: {
        aspectRatio: 1.5,
        layout: {
          padding: {
            right: 72,
            top: 72,
          },
        },
        backgroundColor: '#ec1877',
        elements: {
          point: {
            pointStyle: false,
          },
        },
        plugins: {
          datalabels: {
            display: (ctx) => {
              const { data } = ctx.dataset;
              const { dataIndex: index } = ctx;

              return index === data.length - 1 ? 1 : 0;
            },
            color: 'black',
            font: {
              size: 24,
            },
            align: 'top',
            formatter(value, context) {
              const totalRevenue = +context.chart.data.datasets[0].data[data.length - 1];
              const intRevenue = +context.chart.data.datasets[1].data[data.length - 1];

              if (context.dataset.label === 'International revenue') {
                return `${Math.round((intRevenue / totalRevenue) * 100)}% \n\n\n`;
              }
              return `${value} m EUR`;
            },
          },
        },
      },
      data: {
        labels: data.map((row) => row.year).sort((a, b) => a - b),
        datasets: [
          {
            label: 'Revenue',
            data: data.map((row) => row.revenue),
            borderColor: '#ec1877',
            type: 'line',
          },
          {
            label: 'International revenue',
            data: data.map((row) => row.revenueInt),
            backgroundColor: 'black',
          },
        ],
      },
    });

    new Chart(chartEmployees, {
      type: 'line',
      options: {
        aspectRatio: 1.5,
        layout: {
          padding: {
            right: 72,
            top: 72,
          },
        },
        backgroundColor: '#ec1877',
        elements: {
          point: {
            pointStyle: false,
          },
        },
        plugins: {
          datalabels: {
            display: (ctx) => {
              const { data } = ctx.dataset;
              const { dataIndex: index } = ctx;

              return index === data.length - 1 ? 1 : 0;
            },
            color: 'black',
            font: {
              size: 24,
            },
            align: 'right',

            formatter(value, context) {
              if (context.dataset.label === 'International revenue') {
                return `${Math.round((value / data.pop().revenue) * 100)}%`;
              }
              return `${value}`;
            },
          },
        },
      },
      data: {
        labels: data.map((row) => row.year).sort((a, b) => a - b),
        datasets: [
          {
            label: 'Accepted companies',
            data: data.map((row) => row.acceptedCompanies),
            backgroundColor: 'black',
            borderColor: 'black',
          },
          {
            label: 'Employees in active companies',
            data: data.map((row) => row.employees),
            backgroundColor: '#ec1877',
            borderColor: '#ec1877',
          },
        ],
      },
    });

    new Chart(chartEmployeesGender, {
      type: 'pie',
      options: {
        layout: {
          padding: {
            right: 72,
          },
        },
        backgroundColor: '#ec1877',
        elements: {
          point: {
            pointStyle: false,
          },
        },
        plugins: {
          datalabels: {
            formatter(value, context) {
              const values = context.chart.data.datasets[0].data;
              const sum = values.reduce((total, value) => +total + +value);
              const percValue = Math.round((value / sum) * 100);
              return `${percValue}%`;
            },
            font: {
              size: 20,
            },
          },
        },
      },
      data: {
        // labels: data.map((row) => row.year).sort((a, b) => a - b),
        labels: ['Females', 'Males'],
        datasets: [
          {
            data: [
              data.map((row) => row.employeesFemale).pop(),
              data.map((row) => row.employeesMale).pop(),
            ],
            backgroundColor: '#ec1877',
          },
        ],
      },
    });
  });

  async function fetchData() {
    const res = await fetch('/annual-reports/data');
    const html = await res.text();

    const parser = new DOMParser();
    const page = parser.parseFromString(html, 'text/html');

    const scripts = page.querySelectorAll('script[type="application/json"]');
    const data = [...scripts].map((script) => JSON.parse(script.textContent));

    return data;
  }
};
