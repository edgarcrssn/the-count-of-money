import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import variables from '../../../../styles/variables.module.scss'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cryptocurrency: any
}

export const LineChart = ({ cryptocurrency }: Props) => {
  const priceHistory = cryptocurrency.market_data?.sparkline_7d?.price || []

  const labels = Array.from({ length: priceHistory.length }, (_, index) => index.toString())

  const { bitcoinOrange } = variables

  const data = {
    labels,
    datasets: [
      {
        label: 'Price History',
        data: priceHistory,
        borderColor: bitcoinOrange,
        backgroundColor: bitcoinOrange,
      },
    ],
  }

  return <Line options={options} data={data} />
}
