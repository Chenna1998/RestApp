import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from 'primereact/chart';
import 'primeflex/primeflex.css'; 
import '../components/hrstat.css'; 
function HRStat() {
  const [countEmployee, setCountEmployee] = useState(0);
  const [countManager, setCountManager] = useState(0);

  useEffect(() => {
    let token = localStorage.getItem('token');
    axios.get('http://localhost:8081/api/hr/stat', {
      headers: {
        'Authorization': 'Basic ' + token
      }
    })
      .then(response => {
        console.log(response.data);
        setCountEmployee(response.data.count_Employees);
        setCountManager(response.data.count_Managers);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const chartData = {
    labels: ['Employees', 'Managers'],
    datasets: [{
      label: 'Count',
      data: [countEmployee, countManager],
      backgroundColor: ['rgba(46, 204, 113, 0.8)', 'rgba(52, 152, 219, 0.8)'],
      borderColor: ['#2ecc71', '#3498db'],
      borderWidth: 1,
      borderRadius: 10, // Rounded bars
      barPercentage: 0.5, // Adjust bar thickness
      hoverBackgroundColor: ['rgba(46, 204, 113, 1)', 'rgba(52, 152, 219, 1)']
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'HR Statistics',
        font: {
          size: 18
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            return `${label}: ${context.raw}`;
          }
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: (value) => value,
        font: {
          size: 12
        },
        color: '#fff'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Role'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Count'
        },
        beginAtZero: true
      }
    }
  };

  return (
    <div className="container stat mt-4 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ width: '40%' }}>
        <div style={{ width: '100%', height: '250px' }}>
          <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default HRStat;