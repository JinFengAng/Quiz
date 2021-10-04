import { useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import DirectorRegistrationModal from '../components/DirectorRegistrationModal'
import { Table } from 'antd';

function DirectorRegistration() {
    const [status1, setStatus1] = useState(null)
    const [shouldOpenDirectorRegistrationModal, setShouldOpenDirectorRegistrationModal] = useState(false)

    const columns = [
        {
            title: 'Job Name',
            dataIndex: 'JobName',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            render: (text) => <button className='rounded bg-blue-600 text-white py-1 px-4 hover:bg-blue-700'
                onClick={() => { setShouldOpenDirectorRegistrationModal(true) }}>
                Run
                {shouldOpenDirectorRegistrationModal &&
                    <DirectorRegistrationModal setShouldOpenModal={setShouldOpenDirectorRegistrationModal}
                        setStatus={setStatus1} />}
            </button>
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            render: (text) => {
                status1 === 'loading'
                ? <LoadingSpinner className='w-6' />
                : status1 === 'jobSuccess'
                    ? <span className='text-sap_green-300 font-bold'>Job Success</span>
                    : status1 === 'jobFailure' && <span className='text-red-600 font-bold'>Job Failure</span>
            }
        },
    ];

    const data = [
        {
            JobName: 'Director Registration',
        }
    ];

    return (
        <Table dataSource={data} columns={columns}></Table>
        // <div className='pt-14 pb-36 mx-auto w-10/12 min-h-180'>
        //     <table className='border-collapse'>
        //         <thead>
        //             <tr className='bg-blue-50'>
        //                 <th className='border-gray-100 border-1 text-left px-2 py-4 min-w-40'>Job Name</th>
        //                 <th className='border-gray-100 border-1 text-left p-2 min-w-40'>Actions</th>
        //                 <th className='border-gray-100 border-1 text-left p-2 min-w-40'>Status</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {/* Director Resignation */}
        //             <tr >
        //                 <td className='border-gray-100 border-1 pl-2 pr-8 py-4'>Director Registration</td>
        //                 <td className='border-gray-100 border-1 p-2'>
        //                     <button className='rounded bg-blue-600 text-white py-1 px-4 hover:bg-blue-700'
        //                         onClick={() => {
        //                             setShouldOpenDirectorRegistrationModal(true)
        //                         }}>
        //                         Run
        //                     </button>
        //                 </td>
        //                 <td className='border-gray-100 border-1 p-2'>
        //                     {status1 === 'loading'
        //                         ? <LoadingSpinner className='w-6' />
        //                         : status1 === 'jobSuccess'
        //                             ? <span className='text-sap_green-300 font-bold'>Job Success</span>
        //                             : status1 === 'jobFailure' && <span className='text-red-600 font-bold'>Job Failure</span>}
        //                 </td>
        //             </tr>
        //         </tbody>
        //     </table>
            // {shouldOpenDirectorRegistrationModal &&
            //     <DirectorRegistrationModal setShouldOpenModal={setShouldOpenDirectorRegistrationModal}
            //         setStatus={setStatus1} />}
        // </div>
    )
}

export default DirectorRegistration