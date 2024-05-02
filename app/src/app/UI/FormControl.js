import React from 'react';

export default function FormControl ({children, className, ...divProps}) {
    return (<div className={`${className} mb-4 flex flex-row space-x-2`} {...divProps}>
        {children}
    </div>)

}