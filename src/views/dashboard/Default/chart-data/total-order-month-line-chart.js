// ===========================|| DASHBOARD - TOTAL ORDER MONTH CHART ||=========================== //

const chartData = {
    type: 'line',
    height: 200,
    options: {
        chart: {
            sparkline: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#fff'],
        fill: {
            type: 'solid',
            opacity: 1
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: false
            },
            x: {
                show: true
            },
            y: {
                title: 'Total Order'
            },
            marker: {
                show: false
            }
        }
    },
    // series: [
    //     {
    //         data: [
    //             {
    //                 x: 'apple',
    //                 y: 76
    //             },
    //             {
    //                 x: 'noway',
    //                 y: 23
    //             }
    //         ]
    //     }
    // ],
    xaxis: {
        type: 'category',
        crosshairs: {
            width: 1
        }
    }
};

export default chartData;
