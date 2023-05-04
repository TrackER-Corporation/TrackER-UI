import { RingProgress } from '@ant-design/plots';

const RingKpi = ({ color, value = 0.60, label = "" }: any) => {
    const config = {
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
    };
    return <RingProgress {...config} />;
};

export default RingKpi
