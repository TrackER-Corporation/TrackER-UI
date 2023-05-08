import { RingProgress } from '@ant-design/plots';

const config = (value: number, color: string, label = "") => ({
    animation: {
        appear: {
            animation: 'wave-in',
            duration: 3000,
        },
    },
    height: 120,
    width: 120,
    autoFit: false,
    percent: value,
    color: [color, '#E8EDF3'],
    innerRadius: 0.85,
    radius: 0.98,
    statistic: {
        title: {
            style: {
                color: '#363636',
                fontSize: '12px',
                lineHeight: '14px',
            },
            formatter: () => label,
        },
    },
});

interface RingKpi {
    color?: string,
    value: number,
    label?: string
}

const RingKpi = ({ color = "#000000", value = 0, label = "" }: RingKpi) =>
    <RingProgress {...config(value, color, label)} />;

export default RingKpi
