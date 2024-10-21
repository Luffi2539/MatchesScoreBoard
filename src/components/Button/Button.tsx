import { FunctionComponent } from 'react';
import './Button.css'

interface ButtonProps {
    disabled?: boolean
    className?: string;
    title: string;
    submit?: boolean;
    onClick?: () => void
}

const Button: FunctionComponent<ButtonProps> = ({ disabled, className, title, onClick, submit }) => {
    return <button disabled={disabled} type={submit ? 'submit' : 'button'} className={`button${className ? ` ${className}` : ''}`} onClick={onClick}>{title}</button>
}

export default Button