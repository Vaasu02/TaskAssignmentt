import React from 'react';

const Input = ({ label, className, ...props }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && <label className="font-bold border-l-4 border-black pl-2">{label}</label>}
            <input
                className={`w-full p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-yellow-50 ${className}`}
                {...props}
            />
        </div>
    );
};

export default Input;
