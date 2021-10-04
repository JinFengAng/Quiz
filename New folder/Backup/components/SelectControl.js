import React, { useEffect, useRef, useState } from 'react'

function SelectControl(props) {
    const { options, selectedOption, setSelectedOption } = props
    const [shouldShowOptions, setShouldShowOptions] = useState(false)
    const selectedOptionDisplayValue = options.find(option => option.value === selectedOption)?.display

    // For detecting clicks outside a react component: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
    const optionsDivRef = useRef(null)
    // For detecting clicks on the button to open select control options
    const buttonRef = useRef(null)
    
    useEffect(() => {
        // Set shouldShowOptions to false whenever a click occurs outside the button
        function handleClickOutside(event) {
            // If a click is detected outside of the options div, we will close the options menu
            // However, if that click occurred on the select control button, 
            // we will not do anything the button already toggles the shouldShowOptions boolean
            if (optionsDivRef.current && !optionsDivRef.current.contains(event.target) && !buttonRef.current.contains(event.target))
                setShouldShowOptions(false)
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            // Remove the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [optionsDivRef, buttonRef])

    return (
        <div className='relative'>
            <button ref={buttonRef} className='flex items-center justify-between w-full mt-2 pl-3 pr-4 py-2 rounded border-1 
                border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'
                onClick={() => setShouldShowOptions(!shouldShowOptions) }>
                { selectedOption
                    ? <span>{ selectedOptionDisplayValue }</span>
                    : <span className='text-gray-400'>Select an item</span>
                }
                {/* Downward arrow SVG */}
                <svg className='w-3 fill-current text-gray-700' viewBox="0 0 451.847 451.847">
                    <g>
                    <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
            c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
            c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/>
                    </g>
                </svg>
            </button>
            { shouldShowOptions 
                ? <div ref={optionsDivRef} className='absolute w-full rounded bg-gray-50 shadow py-2'>
                    <ul>
                        <li className='font-normal text-gray-400 px-4 py-1 hover:bg-cornflower_blue-500 hover:text-white hover:cursor-pointer' 
                            key={0}
                            onClick={() => {
                                setSelectedOption(null)
                                setShouldShowOptions(false)
                            }}>  
                            Select an item
                        </li>
                        {options.map((option, index) => (
                            <li className='font-normal px-4 py-1 hover:bg-cornflower_blue-500 hover:text-white hover:cursor-pointer' 
                                key={index + 1}
                                onClick={() => {
                                    setSelectedOption(option.value)
                                    setShouldShowOptions(false)
                                }}>
                                    {option.display}
                            </li>
                        ))}
                    </ul>
                </div>
                : null
            }
        </div>
    )
}

export default SelectControl
