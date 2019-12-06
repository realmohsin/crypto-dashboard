export default historicalPrices => {
  return {
    chart: {
      animation: false
    },
    title: {
      text: ''
    },
    yAxis: {
      title: {
        text: 'Price'
      }
    },
    xAxis: { type: 'datetime' },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: true
        },
        pointStart: 2010,
        animation: false
      }
    },

    series: historicalPrices,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }
      ]
    }
  }
}
