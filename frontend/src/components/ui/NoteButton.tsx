import React from 'react';
import styles from './NoteButton.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const NoteButton: React.FC<ButtonProps> = ({ children, className, ...props }) => {
    return (
        <button
            className={`${styles.button} ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    );
};