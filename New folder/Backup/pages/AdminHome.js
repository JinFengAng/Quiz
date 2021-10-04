import axios from 'axios'
import React from 'react'
import config from '../config/config'
import acra from '../images/acra.svg'
import enterprise from '../images/enterprisesg.svg'
import imda from '../images/imda.svg'
import isca from '../images/isca.svg'
import mom from '../images/mom.svg'
import quickbook from '../images/quickbook.png'

function AdminHome() {

    return (
        <div className='pb-32 mx-auto'>
            <div className='bg-work-bg bg-cover h-120 pt-28 text-center'>
                <h1 className='text-7xl font-semibold text-white'>Clerkly</h1>
                <p className='mt-20 text-2xl text-white'>10 YEARS OF RELIABLE Corporate Secretarial Service Solutions</p>
                <p className='mt-7 text-2xl text-white'>All-day efficient handling of your company’s administrative affairs at just a call away</p>
            </div>
            <div className='mt-16'>
                <div className='flex justify-between items-center w-9/12 mx-auto'>
                    <div className='w-2/6 flex justify-center'>
                        <img className='h-20 object-contain' src={acra} alt='Acra' />   
                    </div>
                    <div className='w-2/6 flex justify-center'>
                        <img className='h-44 object-contain' src={enterprise} alt='EnterpriseSG' />
                    </div>
                    <div className='w-2/6 flex justify-center'>
                        <img className='h-20 object-contain' src={imda} alt='Imda' />
                    </div>
                </div>
                <div className='flex justify-between items-center w-9/12 mx-auto mt-4'>
                    <div className='w-2/6 flex justify-center'>
                    <img className='h-20 object-contain' src={isca} alt='Isca' />
                    </div>
                    <div className='w-2/6 flex justify-center'>
                    <img className='h-20 object-contain' src={mom} alt='Ministry of Management' />
                    </div>
                    <div className='w-2/6 flex justify-center'>
                    <img className='h-20 object-contain' src={quickbook} alt='Quickbook' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHome
