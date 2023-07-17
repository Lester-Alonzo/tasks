import styles from './warp.module.css'
type Props = {
    children: React.ReactNode;
    Zindex?: number | string;
}
export function WrapButton({ children, Zindex }: Props) {
    return (
        <div className={styles.modal_wrap} style={{zIndex:`${Zindex || 'inherit'}`}} draggable="false">
            {children}
        </div>
    )
}