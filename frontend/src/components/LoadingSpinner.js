import React from 'react'
import './LoadingSpinner.css'

function LoadingSpinner(props) {
    const spinnerSize = 40

    return (
        <svg className={`${props.className} spinner stroke-current text-purple-600`} viewBox={`0 0 ${spinnerSize} ${spinnerSize}`}>
            <circle cx="20" cy="20" r="18" fill="transparent" strokeWidth="4" strokeLinecap="round"
                strokeDasharray={`${3.14 * spinnerSize}`}></circle>
        </svg>
    )
}

LoadingSpinner.defaultProps = {
    className: 'w-10 h-10 spinner stroke-current text-purple-600'
}

export default LoadingSpinner
