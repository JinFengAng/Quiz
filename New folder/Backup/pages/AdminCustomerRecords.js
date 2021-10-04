import React, { useState, useMemo, useRef, useCallback } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'
import { useAsyncDebounce } from 'react-table'
import config from '../config/config'
import Table from '../components/Table';
import ButtonMenu from '../components/ButtonMenu'
import UpdateModal from '../components/UpdateModal'
import CreateModal from '../components/CreateModal'

function AdminCustomerRecords() {
    // State for filtering the table
    const [LastAGMFrom, setLastAGMFrom] = useState(null)
    const [LastAGMTo, setLastAGMTo] = useState(null)
    const [LastARFrom, setLastARFrom] = useState(null)
    const [LastARTo, setLastARTo] = useState(null)
    const [LastFinancialYearEndFrom, setLastFinancialYearEndFrom] = useState(null)
    const [LastFinancialYearEndTo, setLastFinancialYearEndTo] = useState(null)
    const [IncorporationDateFrom, setIncorporationDateFrom] = useState(null)
    const [IncorporationDateTo, setIncorporationDateTo] = useState(null)
    const [CompanyName, setCompanyName] = useState(null)
    const [CompanyRegistrationNumber, setCompanyRegistrationNumber] = useState(null)

    // general state that the table requires
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [rowCount, setRowCount] = useState(1);
    const fetchIdRef = useRef(0);
    const [refreshCounter, setRefreshCounter] = useState(0);
    const incrementRefreshCounter = () => setRefreshCounter(refreshCounter + 1)

    // The table row with this index should have its button menu open
    const [openMenuRowIndex, setOpenMenuRowIndex] = useState(null);
    // Boolean representing whether the UpdateModal should be rendered
    const [shouldOpenUpdateModal, setShouldOpenUpdateModal] = useState(false);
    // Boolean representing the client ID of client to be updated (passed as prop to UpdateModal)
    const [updateModalClientID, setUpdateModalClientID] = useState(false);
    // Boolean representing whether the CreateModal should be rendered
    const [shouldOpenCreateModal, setShouldOpenCreateModal] = useState(false);

    const columns = useMemo(
        () => [
            {
                Header: "Client ID",
                accessor: "ClientID"
            },
            {
                Header: "Company Name",
                accessor: "CompanyName"
            },
            {
                Header: "Company Registration Number",
                accessor: "CompanyRegistrationNumber"
            },
            {
                Header: "Last FYE",
                accessor: "LastFinancialYearEnd",
                // Cell method will provide the cell value; we use it to render a custom component / transform the data 
                Cell: ({ cell: { value } }) => value ? new Date(value).toLocaleDateString('en-GB') : null
            },
            {
                Header: "Last AGM",
                accessor: "LastAGM",
                // Cell method will provide the cell value; we use it to render a custom component/ transform the data 
                Cell: ({ cell: { value } }) => value ? new Date(value).toLocaleDateString('en-GB') : null
            },
            {
                Header: "Last AR",
                accessor: "LastAR",
                // Cell method will provide the cell value; we use it to render a custom component/ transform the data 
                Cell: ({ cell: { value } }) => value ? new Date(value).toLocaleDateString('en-GB') : null
            },
            {
                Header: "Incorporation Date",
                accessor: "IncorporationDate",
                // Cell method will provide the cell value; we use it to render a custom component/ transform the data 
                Cell: ({ cell: { value } }) => value ? new Date(value).toLocaleDateString('en-GB') : null
            },
            {
                Header: "Reminder 1",
                accessor: "Reminder1",
                // Cell method will provide the cell value; we use it to render a custom component / transform the data 
                Cell: ({ cell: { value } }) => value ? new Date(value).toLocaleDateString('en-GB') : null
            },
            {
                Header: "Reminder 2",
                accessor: "Reminder2",
                // Cell method will provide the cell value; we use it to render a custom component / transform the data 
                Cell: ({ cell: { value } }) => value ? new Date(value).toLocaleDateString('en-GB') : null
            },
            {
                Header: "Reminder 3",
                accessor: "Reminder3",
                // Cell method will provide the cell value; we use it to render a custom component / transform the data 
                Cell: ({ cell: { value } }) => value ? new Date(value).toLocaleDateString('en-GB') : null
            },
            {
                Header: "Reminder Flag",
                accessor: "ReminderFlag"
            },
            {
                Header: "CorpSec",
                accessor: "CorpSec"
            },
            {
                Header: "XBRL",
                accessor: "XBRL"
            },
            {
                Header: "Financial Report",
                accessor: "FinancialReport"
            },
            {
                Header: "Tax",
                accessor: "Tax"
            },
            {
                Header: "NomineeDirector",
                accessor: "NomineeDirector"
            },
            {
                Header: "BookKeeping",
                accessor: "BookKeeping"
            },
            {
                Header: "Others",
                accessor: "Others"
            },
            {
                Header: "Remarks",
                accessor: "Remarks"
            },
            {
                Header: "Contact Name 1",
                accessor: "ContactName1"
            },
            {
                Header: "Phone Number 1",
                accessor: "PhoneNumber1"
            },
            {
                Header: "Email 1",
                accessor: "Email1"
            },
            {
                Header: "Contact Name 2",
                accessor: "ContactName2"
            },
            {
                Header: "Phone Number 2",
                accessor: "PhoneNumber2"
            },
            {
                Header: "Email 2",
                accessor: "Email2"
            },
            {
                Header: "Status",
                accessor: "Status"
            },
            {
                // This 'Actions' column allows us to perform update and delete actions on table data
                Header: "Actions",
                Cell: ({ row }) => (
                    <ButtonMenu shouldOpenMenu={row.index === openMenuRowIndex} setOpenMenuRowIndex={setOpenMenuRowIndex} rowIndex={row.index}
                        setShouldOpenUpdateModal={setShouldOpenUpdateModal} ClientID={row.original.ClientID} setUpdateModalClientID={setUpdateModalClientID}
                        key={row.index} incrementRefreshCounter={incrementRefreshCounter} />
                )
            }
        ],
        [openMenuRowIndex, incrementRefreshCounter]
    );

    const fetchData = useCallback(({ pageSize, pageIndex, sortBy, CompanyName, CompanyRegistrationNumber, IncorporationDateFrom,
        IncorporationDateTo, LastAGMFrom, LastAGMTo, LastARFrom, LastARTo, LastFinancialYearEndFrom, LastFinancialYearEndTo }) => {
        // This will get called when the table needs new data

        // Give this fetch an ID
        const fetchId = ++fetchIdRef.current;

        // Set the loading state
        setLoading(true);

        // Fetch the data from the server
        axios.get(`${config.API_URL}/clients?page=${pageIndex}&size=${pageSize}
${sortBy.length > 0 ? `&sortBy=${sortBy[0].id}&sortDesc=${sortBy[0].desc ? 'true' : 'false'}` : ''}
${CompanyName ? `&CompanyName=${CompanyName}` : ''}
${CompanyRegistrationNumber ? `&CompanyRegistrationNumber=${CompanyRegistrationNumber}` : ''}
${IncorporationDateFrom ? `&IncorporationDateFrom=${IncorporationDateFrom.toJSON()}` : ''}
${IncorporationDateTo ? `&IncorporationDateTo=${IncorporationDateTo.toJSON()}` : ''}
${LastAGMFrom ? `&LastAGMFrom=${LastAGMFrom.toJSON()}` : ''}
${LastAGMTo ? `&LastAGMTo=${LastAGMTo.toJSON()}` : ''}
${LastARFrom ? `&LastARFrom=${LastARFrom.toJSON()}` : ''}
${LastARTo ? `&LastARTo=${LastARTo.toJSON()}` : ''}
${LastFinancialYearEndFrom ? `&LastFinancialYearEndFrom=${LastFinancialYearEndFrom.toJSON()}` : ''}
${LastFinancialYearEndTo ? `&LastFinancialYearEndTo=${LastFinancialYearEndTo.toJSON()}` : ''}
`)
            .then(response => {
                if (fetchId === fetchIdRef.current) {
                    console.log(response.data.clients)
                    setData(response.data.clients)
                    setPageCount(response.data.pageCount)
                    setRowCount(response.data.rowCount)
                }
            })
            .catch(err => {
                console.log(err)
            })
            .then(() => {
                setLoading(false)
            })

    }, []);

    // Debounce our fetchData call for 300ms
    const onFetchDataDebounce = useAsyncDebounce(fetchData, 300)

    // These are props to be passed to Table component that contain information on
    // what needs to be filtered (table searching feature)
    const filterProps = {
        CompanyName, CompanyRegistrationNumber, IncorporationDateFrom,
        IncorporationDateTo, LastAGMFrom, LastAGMTo, LastARFrom, LastARTo, LastFinancialYearEndFrom, LastFinancialYearEndTo
    }

    return (
        <div className='pt-14 pb-36 mx-auto w-10/12'>
            <h1 className='font-bold text-3xl'>Customer Records</h1>
            <hr className='mt-5'></hr>
            <h2 className='mt-11 font-bold text-2xl'>Clerkly Customer Records</h2>

            <div className='mt-11 px-2'>
                <div className='mt-7 w-full flex flex-wrap'>
                    <div className='w-3/12 mr-6'>
                        <label className='block font-bold w-11/12'>Company Registration <br />Number:</label>
                        <input onChange={(e) => setCompanyRegistrationNumber(e.target.value)} placeholder='Company Registration Num' className='w-11/12 mt-2 bg-gray-100 pl-2 rounded focus:outline-none focus:bg-white border-2 focus:border-blue-500' type='text' />
                    </div>
                    <div className='w-3/12 mr-6'>
                        <label className='block font-bold w-11/12'>Company Name:<br /><br /></label>
                        <input onChange={(e) => setCompanyName(e.target.value)} placeholder='Company Name' className='mt-2 w-11/12 bg-gray-100 pl-2 rounded focus:outline-none focus:bg-white border-2 focus:border-blue-500' type='text' />
                    </div>
                    <div className='w-3/12 mr-6'>
                        <label className='block font-bold w-11/12'>Last FYE:<br /><br /></label>
                        <div className='relative mt-2'>
                            <DatePicker
                                selected={LastFinancialYearEndFrom}
                                onChange={(date) => setLastFinancialYearEndFrom(date)}
                                placeholderText='From'
                                className='w-full bg-gray-100 pl-2 rounded focus:outline-none focus:bg-white border-2 focus:border-blue-500'
                                popperClassName='z-10'
                                wrapperClassName='w-11/12'
                            />
                        </div>
                        <div className='relative mt-2'>
                            <DatePicker
                                selected={LastFinancialYearEndTo}
                                onChange={(date) => setLastFinancialYearEndTo(date)}
                                placeholderText='To'
                                className='w-full bg-gray-100 pl-2 rounded focus:outline-none focus:bg-white border-2 focus:border-blue-500'
                                popperClassName='z-10'
                                wrapperClassName='w-11/12'
                            />
                        </div>
                    </div>
                    <div className='w-3/12 mr-6 mt-10'>
                        <label className='block font-bold'>Last AGM:</label>
                        <div className='relative mt-2'>
                            <DatePicker
                                selected={LastAGMFrom}
                                onChange={(date) => setLastAGMFrom(date)}
                                placeholderText='From'
                                className='w-full bg-gray-100 pl-2 rounded focus:outline-none focus:bg-white border-2 focus:border-blue-500'
                                popperClassName='z-10'
                                wrapperClassName='w-11/12'
                            />
                        </div>
                        <div className='relative mt-2'>
                            <DatePicker
                                selected={LastAGMTo}
                                onChange={(date) => setLastAGMTo(date)}
                                placeholderText='To'
                                className='w-full bg-gray-100 pl-2 rounded focus:outline-none focus:bg-white border-2 focus:border-blue-500'
                                popperClassName='z-10'
                                wrapperClassName='w-11/12'
                            />
                        </div>
                    </div>
                    <div className='w-3/12 mr-6 mt-10'>
                        <label className='font-bold'>Last AR:</label>
                        <div className='relative mt-2'>
                            <DatePicker
                                selected={LastARFrom}
                                onChange={(date) => setLastARFrom(date)}
                                placeholderText='From'
                                className='w-full bg-gray-100 pl-2 rounded focus:outline-none focus:bg-white border-2 focus:border-blue-500'
                                popperClassName='z-10'
                                wrapperClassName='w-11/12'
                            />
                        </div>
                        <div className='relative mt-2'>
                            <DatePicker
                                selected={LastARTo}
                                onChange={(date) => setLastARTo(date)}
                                placeholderText='To'
                                className='w-full bg-gray-100 pl-2 rounded focus:outline-none focus:bg-white border-2 focus:border-blue-500'
                                popperClassName='z-10'
                                wrapperClassName='w-11/12'
                            />
                        </div>
                    </div>
                    <div className='w-3/12 mr-6 mt-10'>
                        <label className='font-bold'>Incorporation Date:</label>
                        <div className='relative mt-2'>
                            <DatePicker
                                selected={IncorporationDateFrom}
                                onChange={(date) => setIncorporationDateFrom(date)}
                                placeholderText='From'
                                className='w-full bg-gray-100 pl-2 rounded focus:outline-none focus:bg-white border-2 focus:border-blue-500'
                                popperClassName='z-10'
                                wrapperClassName='w-11/12'
                            />
                        </div>
                        <div className='relative mt-2'>
                            <DatePicker
                                selected={IncorporationDateTo}
                                onChange={(date) => setIncorporationDateTo(date)}
                                placeholderText='To'
                                className='w-full bg-gray-100 pl-2 rounded focus:outline-none focus:bg-white border-2 focus:border-blue-500'
                                popperClassName='z-10'
                                wrapperClassName='w-11/12'
                            />
                        </div>
                    </div>
                    {/* <div>
                        <label className='block font-bold'>Person-in-Charge:<br /><br /></label>
                        <input onChange={(e) => setPersonInCharge(e.target.value)} placeholder='Person-in-Charge' className='mt-2 w-56 bg-gray-100 pl-2 rounded focus:outline-none focus:bg-white border-2 focus:border-blue-500' type='text'/>
                    </div>
                    <div>
                        <label className='block font-bold'>Person-in-Charge <br />Handphone:</label>
                        <input onChange={(e) => setPersonInChargeHandphone(e.target.value)} placeholder='PIC Handphone' className='mt-2 w-56 bg-gray-100 pl-2 rounded focus:outline-none focus:bg-white border-2 focus:border-blue-500' type='text'/>
                    </div>
                    <div>
                        <label className='block font-bold'>Person-in-Charge Email:<br /><br /></label>
                        <input onChange={(e) => setPersonInChargeEmail(e.target.value)} placeholder='PIC Email' className='mt-2 w-56 bg-gray-100 pl-2 rounded focus:outline-none focus:bg-white border-2 focus:border-blue-500' type='text'/>
                    </div>
                    <div>
                        <label className='block font-bold'>Remarks:<br /><br /></label>
                        <input placeholder='Remarks' className='mt-2 w-56 bg-gray-100 pl-2 rounded focus:outline-none focus:bg-white border-2 focus:border-blue-500' type='text'/>
                    </div> */}
                </div>
                <button className='mt-10 px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white'>Clear Filters</button>
            </div>

            {/* Container with buttons such as for exporting CSV and creating a new Client */}
            <div className='flex justify-end mt-10'>
                {/* Button to export CSV (Download Client data as CSV file) */}
                <button className='flex items-center group rounded-xl font-bold text-sm 
                    px-3 py-2 border-green-700 border-2 text-green-700 hover:bg-green-700 hover:text-white mr-4'
                    onClick={() => {
                        axios.get(`${config.API_URL}/clients/read_csv`)
                            .then(request => {
                                const blob = new Blob([request.data.csvString], { type: 'text/csv' })
                                const url = URL.createObjectURL(blob)
                                const link = document.createElement('a')
                                link.href = url
                                link.download = 'Client Records.csv'
                                link.click()
                                link.remove()
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }}>
                    <svg className='w-4 fill-current text-green-700 group-hover:text-white mr-2' viewBox="0 0 512 512">
                        <path d="m409.785156 278.5-153.785156 153.785156-153.785156-153.785156 28.285156-28.285156 105.5 
                            105.5v-355.714844h40v355.714844l105.5-105.5zm102.214844 193.5h-512v40h512zm0 0" />
                    </svg>
                    <span>Export CSV</span>
                </button>
                {/* Button to create a new Client Record */}
                <button className='flex items-center group rounded-xl font-bold text-sm
                    px-3 py-2 border-purple-700 border-2 text-purple-700 hover:bg-purple-700 hover:text-white'
                    onClick={() => setShouldOpenCreateModal(true)}>
                    <svg className='w-3 fill-current text-purple-700 group-hover:text-white mr-2' viewBox="0 0 459.325 459.325">
                        <g>
                            <path d="M459.319,229.668c0,22.201-17.992,40.193-40.205,40.193H269.85v149.271c0,22.207-17.998,40.199-40.196,40.193
                            c-11.101,0-21.149-4.492-28.416-11.763c-7.276-7.281-11.774-17.324-11.769-28.419l-0.006-149.288H40.181
                            c-11.094,0-21.134-4.492-28.416-11.774c-7.264-7.264-11.759-17.312-11.759-28.413C0,207.471,17.992,189.475,40.202,189.475h149.267
                            V40.202C189.469,17.998,207.471,0,229.671,0c22.192,0.006,40.178,17.986,40.19,40.187v149.288h149.282
                                C441.339,189.487,459.308,207.471,459.319,229.668z" />
                        </g>
                    </svg>
                    <span>New Client</span>
                </button>
            </div>
            {/* The data table for presenting Client data */}
            <Table
                columns={columns}
                data={data}
                onFetchDataDebounce={onFetchDataDebounce}
                loading={loading}
                pageCount={pageCount}
                rowCount={rowCount}
                {...filterProps}
                openMenuRowIndex={openMenuRowIndex}
                refreshCounter={refreshCounter}
            />
            {/* Modal for updating Client data */}
            {shouldOpenUpdateModal
                ? <UpdateModal setShouldOpenUpdateModal={setShouldOpenUpdateModal} ClientID={updateModalClientID}
                    incrementRefreshCounter={incrementRefreshCounter} />
                : null
            }
            {/* Modal for creating a new Client record */}
            {shouldOpenCreateModal
                ? <CreateModal setShouldOpenCreateModal={setShouldOpenCreateModal} />
                : null
            }
        </div>
    )
}

export default AdminCustomerRecords
