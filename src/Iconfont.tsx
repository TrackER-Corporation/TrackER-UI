import { createFromIconfontCN } from '@ant-design/icons';

const CreateIconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_3378177_orth234lbl.js',
});


interface IconFontProps {
    type: string;
    style?: React.CSSProperties
    className?: string
    onClick?: () => void
}
const IconFont = ({ type, style, className = "", onClick }: IconFontProps) =>
    <CreateIconFont onClick={onClick} style={style} type={type} className={className} />

export default IconFont;