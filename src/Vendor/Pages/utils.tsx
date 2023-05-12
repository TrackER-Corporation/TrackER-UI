import { ApexOptions } from "apexcharts";

export const electricOptions = [
    {
        value: "Photovoltaic Solar Power",
        label: "Photovoltaic Solar Power",
    },
    {
        value: "Concentrating Solar Power",
        label: "Concentrating Solar Power",
    },
];

export const geoOptions = [
    {
        value: "Flash steam",
        label: "Flash steam",
    },
    {
        value: "Dry steam",
        label: "Dry steam",
    },
    {
        value: "Binary ORC",
        label: "Binary ORC",
    },
];

export const windOptions = [
    {
        value: "Horizontal-axis turbines",
        label: "Horizontal-axis turbines",
    },
    {
        value: "Vertical-axis turbines",
        label: "Vertical-axis turbines",
    },
];

export const waterOptions = [
    {
        value: "Hydroelectric Francis turbine",
        label: "Hydroelectric Francis turbine",
    },
    {
        value: "Hydroelectric Pelton turbine",
        label: "Hydroelectric Pelton turbine",
    },
    {
        value: "Hydroelectric Kaplan turbine",
        label: "Hydroelectric Kaplan turbine",
    },
];

export const optionsBar: ApexOptions = {
    chart: {
        type: 'bar',
        toolbar: { show: false, },
    },
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: true,
        },
    },
    tooltip: {
        enabled: true,
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ["Earnings", "Cost"],
    }
}

export const optionsLine: ApexOptions = {
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
    colors: ['#00E396'],
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
            formatter: function (val: number) {
                return val + "€"
            },
            title: {
                formatter: () => {
                    return "Total Usage"
                },
            },
        }
    }

}


export const columns = (
    setVisible: (arg: boolean) => void,
    setBuildingId: (arg: any) => void
) => [
        {
            title: "#",
            dataIndex: 'index',
            valueType: 'index',
            key: 'index',
            width: 10,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            initialValue: 'all',
            filters: true,
            onFilter: true,
            valueType: 'select',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            initialValue: 'all',
            filters: true,
            onFilter: true,
            valueType: 'select',
            width: 300,
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            key: 'option',
            valueType: 'option',
            render: (_: any, data: any) =>
                <a onClick={() => {
                    setVisible(true)
                    setBuildingId(data._id)
                }} key="1" >
                    See Details
                </a>
        },
    ];

export const options = (labels: Array<any>, metricCubic: boolean, unit:Array<string>): ApexOptions => ({
        chart: {
            height: 390,
            type: 'polarArea',
        },
        labels: labels,
        colors: ["#1984f5", "#00c2f6", "#00cbc8",],
        tooltip: {
            enabled: true,
            y: {
                formatter: function (value: any) {
                    return metricCubic ? (value * 0.0454249414 / 1000).toFixed(2) + " " + unit[0] : value + " " + unit[1]
                },
            },

        },
        legend: {
            show: true,
            fontSize: '16px',
            position: 'right',
            labels: {
                useSeriesColors: true,
            },
            formatter: function (seriesName: string, opts: any) {
                return seriesName + " " +
                    metricCubic ? (opts.w.globals.series[opts.seriesIndex] * 0.0454249414 / 1000).toFixed(2) + " " + unit[0] : opts.w.globals.series[opts.seriesIndex] + " " + unit[1]
            },
            itemMargin: {
                vertical: 3
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    show: false
                }
            }
        }]
    })