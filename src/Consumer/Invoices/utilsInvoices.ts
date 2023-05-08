import { ApexOptions } from "apexcharts"

export const optionsLine = (title: string, suffix: string, color: string): ApexOptions => ({
    noData: {
        text: "No data to show...",
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
            color: "blue",
            fontSize: '20px',
        }
    },
    legend: {
        position: "top",
        horizontalAlign: "center",
    },
    chart: {
        id: 'area-datetime',
        type: 'area',
        animations: {
            enabled: true,
            easing: 'easein',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
        },
        toolbar: { show: true, },
    },
    colors: [color],
    stroke: {
        curve: 'smooth',
        width: 2,
        lineCap: 'butt',
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        type: 'datetime',
        tooltip: {
            enabled: false
        },
        labels: {
            show: true,
            datetimeUTC: false,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
            },
        },
    },
    tooltip: {
        enabled: true,
        followCursor: true,
        theme: "light",
        x: {
            show: true,
            format: "dd-MM-yyyy HH:mm"
        },
        y: {
            formatter: function (val: number) { return val + suffix },
            title: { formatter: () => title },
        }
    }
})

export const pieOptions: ApexOptions = {
    noData: {
        text: "You have no data...",
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
            color: "blue",
            fontSize: '12px',
        }
    },
    chart: {
        height: 390,
        type: 'pie',
    },
    labels: ["Organization Cost", "Tax Cost", "Delivery Cost", "Supplier Cost"],
    colors: ["#1984f5", "#00c2f6", "#00cbc8", "#00cbff",],
    tooltip: {
        enabled: true,
        y: { formatter: function (value: number) { return value + " €" }, },
    },
    legend: {
        show: true,
        fontSize: '16px',
        position: 'right',
        labels: {
            useSeriesColors: true,
        },
        formatter: (seriesName: string, opts?: any) => seriesName + " " + opts.w.globals.series[opts.seriesIndex].toFixed(2) + " €",
        itemMargin: { vertical: 3 }
    },
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                show: false
            }
        }
    }]
}

export interface InvoicesProps {
    bills?: any,
    cost: any,
    aggregated?: any,
    filtered?: any
}