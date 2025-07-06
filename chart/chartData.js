import { firstLetterCaps } from "../utils/helpers.js"

export const getChartData = (data)=>{
            
        createChart(data)
    }

export function createChart(data,currentChart){

        const ctx = document.getElementById("myChart")

        //get rid of potential memory leaks
        if(currentChart){
            currentChart.destroy()
            console.log("chart destroyed")
        }

        const {stats} = data

        stats.map(i=> console.log(i))

       currentChart = new Chart(ctx, {
            type: 'bar',
            data: {
            labels: stats.map(i=>  firstLetterCaps(i.stat.name)),
            datasets: [{
                label: 'Base Stats of Pokemon',
                data: stats.map(entry=> entry.base_stat),
                backgroundColor: '#3B4CCA',
                borderWidth: 1,
                borderRadius: 20
            }]
            },
            options: {
            indexAxis: "y",
            responsive: true,
            aspectRatio: 1,
            //create resposiveness
            maintainAspectRatio: false,
            scales: {
                y: {
                beginAtZero: true
                }
            }
            }
        });

    }