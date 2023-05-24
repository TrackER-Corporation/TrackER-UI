import { createFromIconfontCN } from '@ant-design/icons';

const CreateIconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_3378177_vnmju0hodkj.js',
});


interface IconFontProps {
    type: string;
    style?: React.CSSProperties
    className?: string
    onClick?: () => void
}
const IconFont = ({ type, style, className = "", onClick, ...props }: IconFontProps) =>
    <CreateIconFont {...props} onClick={onClick} style={style} type={type} className={className} />

export default IconFont;