import React, { useState } from 'react'
import axios from 'axios'
import config from '../config/config'

function ButtonMenu(props) {
    const { rowIndex, shouldOpenMenu, setOpenMenuRowIndex, setShouldOpenUpdateModal, ClientID, setUpdateModalClientID, incrementRefreshCounter } = props

    console.log('Rerendering', rowIndex)

    const handleDeleteButtonClick = () => {
        // Only send over the ClientID of this table row data (the client we want to delete)
        console.log('Client ID of ButtonMenu', ClientID)

        // Set ClientID as a query parameter indicating which record to delete
        axios.delete(`${config.API_URL}/clients`, { params: { ClientID } })
            .then(response => {
                console.log(response)
                // We need to increment the refresh counter to manually trigger a refresh on the table data
                // When the counter is incremented, a new request will be made to the server with the same query parameters
                incrementRefreshCounter()
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className='justify-center flex relative'>
            {/* Button to open the actions menu */}
            <button className='hover:bg-purple-200 h-8 w-8 items-center justify-center flex rounded-full' onClick={() => setOpenMenuRowIndex(rowIndex) }>
                <svg className='h-4' viewBox="0 0 29.96 122.88">
                    <path fillRule="evenodd"
                        d="M15,0A15,15,0,1,1,0,15,15,15,0,0,1,15,0Zm0,92.93a15,15,0,1,1-15,15,15,15,0,0,1,15-15Zm0-46.47a15,15,0,1,1-15,15,15,15,0,0,1,15-15Z"/>
                </svg>
            </button>
            {/* Check whether the current row's button menu should be open or not */}
            { shouldOpenMenu
                ? <div className='shadow-md rounded absolute top-0 right-0'> 
                    <div className='relative bg-white py-2 px-2 w-28'>
                        {/* X-Button to close the menu */}
                        <button className='absolute -top-2 -right-3 rounded-full w-6 h-6 flex items-center 
                                        justify-center shadow bg-white group hover:bg-gray-400' 
                            onClick={() => setOpenMenuRowIndex(null) }>
                            <svg className='w-2 fill-current text-gray-700 group-hover:text-white' viewBox="0 0 47.971 47.971">
                                <g>
                                    <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
                                        c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
                                        C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
                                        s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>
                                </g>
                            </svg>
                        </button>
                        <ul>
                            <li>
                                <button className='font-bold text-black w-full text-left hover:bg-purple-100 py-1 px-2 rounded'
                                    onClick={() => { 
                                        setShouldOpenUpdateModal(true)
                                        setOpenMenuRowIndex(null)
                                        setUpdateModalClientID(ClientID)
                                    }}>
                                    Update
                                </button>
                            </li>
                            <li className='mt-2'>
                                <button className='font-bold text-red-500 w-full text-left hover:bg-purple-100 py-1 px-2 rounded'
                                    onClick={handleDeleteButtonClick}>
                                    Delete
                                </button>
                            </li>
                        </ul>
                    </div>
                </div> 
                : null
            }
        </div>
    )
}

const areEqual = (prevProps, nextProps) => {
    if (prevProps.rowIndex !== nextProps.rowIndex || prevProps.shouldOpenMenu !== nextProps.shouldOpenMenu) {
        console.log('different, rerender')
        return false
    }
    console.log(prevProps.rowIndex, prevProps.shouldOpenMenu)
    console.log('same, dont rerender')
    return true
}
  
export default React.memo(ButtonMenu, areEqual)


