import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className }) => {
    return (
        <div className={twMerge("bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6", className)}>
            {children}
        </div>
    );
};

export default Card;
