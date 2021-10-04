import axios from 'axios'
import React, { useState } from 'react'
import config from '../config/config'

function ShareCertModuleModal(props) {
    const { setShouldOpenModal, setStatus } = props
    const [companyUEN, setCompanyUEN] = useState(null)
    const [directorID, setDirectorID] = useState(null)

    const handleSubmit = () => {

        setShouldOpenModal(false)
        setStatus('loading')

        let data = Object.assign({},
            { companyUEN },
            { directorID }
        );

        axios.post(`${config.API_URL}/scripts/NOT_IMPLEMENTED`, data)
            .then(response => {
                console.log(response)
                setStatus('jobSuccess')
                // Close the Modal
                setShouldOpenModal(false)
            })
            .catch(error => {
                console.log(error)
                setStatus('jobFailure')
            })
    }

    return (
        // The outermost div helps to overlay the page with a transparent, darker background
        <div className='fixed shadow-lg z-20 w-full h-full bg-opacity-25 bg-black top-0 left-0 flex justify-center'>
            {/* This div contains the modal content */}
            <div className='font-bold flex flex-col absolute top-1/10 rounded-xl bg-white w-130 h-3/5 text-black pt-7 overflow-hidden'>
                <div className='flex items-center justify-between px-6'>
                    <h1 className='text-3xl leading-normal'>Generate Director Resignation Forms</h1>
                    {/* X-Button to close the Modal */}
                    <button className='group rounded hover:bg-gray-100 p-4'
                        onClick={() => setShouldOpenModal(false)}>
                        <svg className='w-4 fill-current text-gray-500 group-hover:text-gray-900' viewBox="0 0 47.971 47.971">
                            <g>
                                <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
                                    c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
                                    C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
                                    s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>
                            </g>
                        </svg>
                    </button>
                </div>
                {/* This div contains all the label and inputs */}
                <div className='overflow-y-auto px-6 mt-7 pb-28'>
                    <div className='text-lg'>
                        <label className='block'>Company UEN</label>
                        <input onChange={(e) => setCompanyUEN(e.target.value)}
                            type='text'
                            placeholder='Company UEN'
                            className='w-full mt-2 px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200' />
                    </div>
                    <div className='text-lg mt-7'>
                        <label className='block'>Director ID</label>
                        <input onChange={(e) => setDirectorID(e.target.value)}
                            type='text'
                            placeholder='Director ID'
                            className='w-full mt-2 px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200' />
                    </div>
                </div>
                {/* This div contains the buttons to close or submit the form */}
                <div className='flex items-center justify-end border-t-1 border-gray-300 py-6'>
                    <button className='font-bold text-lg rounded py-2 px-6 border-1 border-gray-400 mr-4 hover:bg-gray-50 hover:shadow'
                        onClick={() => setShouldOpenModal(false)}>Close</button>
                    <button className='font-bold text-lg rounded py-2 px-4 bg-green-700 text-white mr-8 hover:bg-green-600 hover:shadow'
                        onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default ShareCertModuleModal
