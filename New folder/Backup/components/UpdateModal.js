import axios from 'axios';
import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import config from '../config/config'
import { Modal, Input, Form, Select, DatePicker } from 'antd';
const { Option } = Select;

function onChangeDate(date, dateString) {
    console.log(date, dateString);
  }

function UpdateModal(props) {
    const { setShouldOpenUpdateModal, ClientID, incrementRefreshCounter } = props
    const [LastFinancialYearEnd, setLastFinancialYearEnd] = useState(null)
    const [LastAGM, setLastAGM] = useState(null)
    const [LastAR, setLastAR] = useState(null)
    const [IncorporationDate, setIncorporationDate] = useState(null)
    const [CorpSec, setCorpSec] = useState(null)
    const [XBRL, setXBRL] = useState(null)
    const [FinancialReport, setFinancialReport] = useState(null)
    const [Tax, setTax] = useState(null)
    const [NomineeDirector, setNomineeDirector] = useState(null)
    const [BookKeeping, setBookKeeping] = useState(null)
    const [Others, setOthers] = useState(null)
    const [Remarks, setRemarks] = useState(null)
    const [ContactName1, setContactName1] = useState(null)
    const [PhoneNumber1, setPhoneNumber1] = useState(null)
    const [Email1, setEmail1] = useState(null)
    const [ContactName2, setContactName2] = useState(null)
    const [PhoneNumber2, setPhoneNumber2] = useState(null)
    const [Email2, setEmail2] = useState(null)
    const [Status, setStatus] = useState(null)

    const handleSubmit = () => {
        // Only send over the fields which have non-falsy values (user entered a value in the input for that field)
        let data = Object.assign({},
            { ClientID },
            LastFinancialYearEnd && { LastFinancialYearEnd },
            LastAGM && { LastAGM },
            LastAR && { LastAR },
            IncorporationDate && { IncorporationDate },
            CorpSec && { CorpSec },
            XBRL && { XBRL },
            FinancialReport && { FinancialReport },
            Tax && { Tax },
            NomineeDirector && { NomineeDirector },
            BookKeeping && { BookKeeping },
            Others && { Others },
            Remarks && { Remarks },
            ContactName1 && { ContactName1 },
            PhoneNumber1 && { PhoneNumber1 },
            Email1 && { Email1 },
            ContactName2 && { ContactName2 },
            PhoneNumber2 && { PhoneNumber2 },
            Email2 && { Email2 },
            Status && { Status }
        );

        axios.put(`${config.API_URL}/clients`, data)
            .then(response => {
                console.log(response)
                // Close the UpdateModal
                setShouldOpenUpdateModal(false)
                // We need to increment the refresh counter to manually trigger a refresh on the table data
                // When the counter is incremented, a new request will be made to the server with the same query parameters
                incrementRefreshCounter()
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleCancel = () => {
        setShouldOpenUpdateModal(false);
    };

    return (
        <Modal title="Generate Director Registration Forms" visible={true} onOk={handleSubmit} onCancel={handleCancel}>
            <Form
                layout={'vertical'}
            >
                <Form.Item
                    label='Last Financial Year End'>
                    <DatePicker
                        onChange={onChangeDate}
                        onChange={(e) => setLastFinancialYearEnd(e.target.value)}
                        placeholder='Pick a date'
                    />
                </Form.Item>
                <Form.Item
                    label='Last AGM'>
                    <DatePicker
                        onChange={onChangeDate}
                        onChange={(e) => setLastAGM(e.target.value)}
                        placeholder='Pick a date'
                    />
                </Form.Item>
                <Form.Item
                    label='Last AR'>
                    <DatePicker
                        onChange={onChangeDate}
                        onChange={(e) => setLastAR(e.target.value)}
                        placeholder='Pick a date'
                    />
                </Form.Item>
                <Form.Item
                    label='Incorporation Date'>
                    <DatePicker
                        onChange={onChangeDate}
                        onChange={(e) => setIncorporationDate(e.target.value)}
                        placeholder='Pick a date'
                    />
                </Form.Item>
                <Form.Item
                    label='CorpSec'>
                    <Input
                        onChange={(e) => setCorpSec(e.target.value)}
                        type='number'
                        placeholder='CorpSec'
                        size="medium" />
                </Form.Item>
                <Form.Item
                    label='XBRL'>
                    <Input
                        onChange={(e) => setXBRL(e.target.value)}
                        type='number'
                        placeholder='XBRL'
                        size="medium" />
                </Form.Item>
                <Form.Item
                    label='Financial Report'>
                    <Input
                        onChange={(e) => setFinancialReport(e.target.value)}
                        type='number'
                        placeholder='Financial Report'
                        size="medium" />
                </Form.Item>
                <Form.Item
                    label='Tax'>
                    <Input
                        onChange={(e) => setTax(e.target.value)}
                        type='number'
                        placeholder='Tax'
                        size="medium" />
                </Form.Item>
                <Form.Item
                    label='Nominee Director'>
                    <Input
                        onChange={(e) => setNomineeDirector(e.target.value)}
                        type='number'
                        placeholder='Nominee Director'
                        size="medium" />
                </Form.Item>
                <Form.Item
                    label='BookKeeping'>
                    <Input
                        onChange={(e) => setBookKeeping(e.target.value)}
                        type='number'
                        placeholder='BookKeeping'
                        size="medium" />
                </Form.Item>
                <Form.Item
                    label='Others'>
                    <Input
                        onChange={(e) => setOthers(e.target.value)}
                        type='number'
                        placeholder='Others'
                        size="medium" />
                </Form.Item>
                <Form.Item
                    label='Remarks'>
                    <Input
                        onChange={(e) => setRemarks(e.target.value)}
                        type='text'
                        placeholder='Remarks'
                        size="medium" />
                </Form.Item>
                <Form.Item
                    label='Contact Name 1'>
                    <Input
                        onChange={(e) => setContactName1(e.target.value)}
                        type='text'
                        placeholder='Contact Name 1'
                        size="medium" />
                </Form.Item>
                <Form.Item
                    label='Phone Number 1'>
                    <Input
                        onChange={(e) => setPhoneNumber1(e.target.value)}
                        type='text'
                        placeholder='Phone Number 1'
                        size="medium" />
                </Form.Item>
                <Form.Item
                    label='Email 1'>
                    <Input
                        onChange={(e) => setEmail1(e.target.value)}
                        type='text'
                        placeholder='Email1'
                        size="medium" />
                </Form.Item>
                <Form.Item
                    label='Contact Name 2'>
                    <Input
                        onChange={(e) => setContactName2(e.target.value)}
                        type='text'
                        placeholder='Contact Name 2'
                        size="medium" />
                </Form.Item>
                <Form.Item
                    label='Phone Number 2'>
                    <Input
                        onChange={(e) => setPhoneNumber2(e.target.value)}
                        type='text'
                        placeholder='Phone Number 2'
                        size="medium" />
                </Form.Item>
                <Form.Item
                    label='Email 2'>
                    <Input
                        onChange={(e) => setEmail2(e.target.value)}
                        type='text'
                        placeholder='Email 2'
                        size="medium" />
                </Form.Item>
                <Select
                    placeholder='Status'>
                    <Option value="Active">Active</Option>
                    <Option value="Strike-Off">Strike-Off</Option>
                    setSelectedOption={setStatus} 
                    selectedOption={Status}
                </Select>
            </Form>
        </Modal>

        // The outermost div helps to overlay the page with a transparent, darker background
        // <div className='fixed shadow-lg z-20 w-full h-full bg-opacity-25 bg-black top-0 left-0 flex justify-center'>
        //     {/* This div contains the modal content */}
        //     <div className='font-bold flex flex-col absolute top-1/10 rounded-xl bg-white w-130 h-4/5 text-black pt-7 overflow-hidden'>
        //         <div className='flex items-center justify-between px-6'>
        //             <h1 className='text-3xl'>Update Client Record</h1>
        //               {/* X-Button to close the Modal */}
        //             <button className='group rounded hover:bg-gray-100 p-4'
        //                 onClick={() => setShouldOpenUpdateModal(false) }>
        //                 <svg className='w-4 fill-current text-gray-500 group-hover:text-gray-900' viewBox="0 0 47.971 47.971">
        //                     <g>
        //                         <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
        //                             c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
        //                             C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
        //                             s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>
        //                     </g>
        //                 </svg>
        //             </button>
        //         </div>
        //         {/* This div contains all the label and inputs */}
        //         <div className='overflow-y-scroll px-6 mt-7 pb-40'>
        //             <div className='text-lg'>
        //                 <label className=''>Last Financial Year End</label>
        //                 <div className='relative mt-2'>
        //                     <DatePicker
        //                         selected={LastFinancialYearEnd}
        //                         onChange={(date) => setLastFinancialYearEnd(date)}
        //                         placeholderText='Pick a date'
        //                         className='w-full px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'
        //                         popperClassName='z-10'
        //                         wrapperClassName='w-full'
        //                     />
        //                 </div>
        //             </div>
        //             <div className='text-lg mt-7'>
        //                 <label className=''>Last AGM</label>
        //                 <div className='relative mt-2'>
        //                     <DatePicker
        //                         selected={LastAGM}
        //                         onChange={(date) => setLastAGM(date)}
        //                         placeholderText='Pick a date'
        //                         className='w-full px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'
        //                         popperClassName='z-10'
        //                         wrapperClassName='w-full'
        //                     />
        //                 </div>
        //             </div>
        //             <div className='text-lg mt-7'>
        //                 <label className=''>Last AR</label>
        //                 <div className='relative mt-2'>
        //                     <DatePicker
        //                         selected={LastAR}
        //                         onChange={(date) => setLastAR(date)}
        //                         placeholderText='Pick a date'
        //                         className='w-full px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'
        //                         popperClassName='z-10'
        //                         wrapperClassName='w-full'
        //                     />
        //                 </div>
        //             </div>
        //             <div className='text-lg mt-7'>
        //                 <label className=''>Incorporation Date</label>
        //                 <div className='relative mt-2'>
        //                     <DatePicker
        //                         selected={IncorporationDate}
        //                         onChange={(date) => setIncorporationDate(date)}
        //                         placeholderText='Pick a date'
        //                         className='w-full px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'
        //                         popperClassName='z-10'
        //                         wrapperClassName='w-full'
        //                     />
        //                 </div>
        //             </div>
        //             <div className='text-lg mt-7'>
        //                 <label className='block'>CorpSec</label>
        //                 <input onChange={(e) => setCorpSec(e.target.value)} 
        //                     type='number'
        //                     step='0.01'
        //                     min='0'
        //                     placeholder='CorpSec' 
        //                     className='w-full mt-2 px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'/>
        //             </div>
        //             <div className='text-lg mt-7'>
        //                 <label className='block'>XBRL</label>
        //                 <input onChange={(e) => setXBRL(e.target.value)} 
        //                     type='number'
        //                     step='0.01'
        //                     min='0'
        //                     placeholder='XBRL' 
        //                     className='w-full mt-2 px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'/>
        //             </div>
        //             <div className='text-lg mt-7'>
        //                 <label className='block'>Financial Report</label>
        //                 <input onChange={(e) => setFinancialReport(e.target.value)} 
        //                     type='number'
        //                     step='0.01'
        //                     min='0'
        //                     placeholder='Financial Report' 
        //                     className='w-full mt-2 px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'/>
        //             </div>
        //             <div className='text-lg mt-7'>
        //                 <label className='block'>Tax</label>
        //                 <input onChange={(e) => setTax(e.target.value)} 
        //                     type='number'
        //                     step='0.01'
        //                     min='0'
        //                     placeholder='Tax' 
        //                     className='w-full mt-2 px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'/>
        //             </div>
        //             <div className='text-lg mt-7'>
        //                 <label className='block'>Nominee Director</label>
        //                 <input onChange={(e) => setNomineeDirector(e.target.value)} 
        //                     type='number'
        //                     step='0.01'
        //                     min='0'
        //                     placeholder='Nominee Director' 
        //                     className='w-full mt-2 px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'/>
        //             </div>
        //             <div className='text-lg mt-7'>
        //                 <label className='block'>Bookkeeping</label>
        //                 <input onChange={(e) => setBookKeeping(e.target.value)} 
        //                     type='number'
        //                     step='0.01'
        //                     min='0'
        //                     placeholder='Bookkeeping' 
        //                     className='w-full mt-2 px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'/>
        //             </div>
        //             <div className='text-lg mt-7'>
        //                 <label className='block'>Others</label>
        //                 <input onChange={(e) => setOthers(e.target.value)} 
        //                     type='number'
        //                     step='0.01'
        //                     min='0'
        //                     placeholder='Others' 
        //                     className='w-full mt-2 px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'/>
        //             </div>
        //             <div className='text-lg mt-7'>
        //                 <label className='block'>Remarks</label>
        //                 <input onChange={(e) => setRemarks(e.target.value)} 
        //                     type='text'
        //                     placeholder='Remarks' 
        //                     className='w-full mt-2 px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'/>
        //             </div>
        //             <div className='text-lg mt-7'>
        //                 <label className='block'>Contact Name 1</label>
        //                 <input onChange={(e) => setContactName1(e.target.value)} 
        //                     type='text'
        //                     placeholder='Contact Name 1' 
        //                     className='w-full mt-2 px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'/>
        //             </div>
        //             <div className='text-lg mt-7'>
        //                 <label className='block'>Phone Number 1</label>
        //                 <input onChange={(e) => setPhoneNumber1(e.target.value)} 
        //                     type='text'
        //                     placeholder='Phone Number 1' 
        //                     className='w-full mt-2 px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'/>
        //             </div>
        //             <div className='text-lg mt-7'>
        //                 <label className='block'>Email 1</label>
        //                 <input onChange={(e) => setEmail1(e.target.value)} 
        //                     type='text'
        //                     placeholder='Email 1' 
        //                     className='w-full mt-2 px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'/>
        //             </div>
        //             <div className='text-lg mt-7'>
        //                 <label className='block'>Contact Name 2</label>
        //                 <input onChange={(e) => setContactName2(e.target.value)} 
        //                     type='text'
        //                     placeholder='Contact Name 2' 
        //                     className='w-full mt-2 px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'/>
        //             </div>
        //             <div className='text-lg mt-7'>
        //                 <label className='block'>Phone Number 2</label>
        //                 <input onChange={(e) => setPhoneNumber2(e.target.value)} 
        //                     type='text'
        //                     placeholder='Phone Number 2' 
        //                     className='w-full mt-2 px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'/>
        //             </div>
        //             <div className='text-lg mt-7'>
        //                 <label className='block'>Email 2</label>
        //                 <input onChange={(e) => setEmail2(e.target.value)} 
        //                     type='text'
        //                     placeholder='Email 2' 
        //                     className='w-full mt-2 px-3 py-2 rounded border-1 border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-200'/>
        //             </div>
        //             {/* Select Control for choosing Status values */}
        //             <div className='text-lg mt-7'>
        //                 <label className='block'>Status</label>
        //                 <SelectControl options={[ { display: 'Active', value: 'Active' }, { display: 'Strike-Off', value: 'StrikeOff' } ]} 
        //                     setSelectedOption={setStatus} selectedOption={Status} />
        //             </div>
        //         </div>
        //         {/* This div contains the buttons to close or submit the form */}
        //         <div className='flex items-center justify-end border-t-1 border-gray-300 py-6'>
        //             <button className='font-bold text-lg rounded py-2 px-6 border-1 border-gray-400 mr-4 hover:bg-gray-50 hover:shadow'
        //                 onClick={() => setShouldOpenUpdateModal(false) }>Close</button>
        //             <button className='font-bold text-lg rounded py-2 px-4 bg-green-700 text-white mr-8 hover:bg-green-600 hover:shadow'
        //                 onClick={handleSubmit}>Submit</button>
        //         </div>
        //     </div>
        // </div>
    )
}

export default UpdateModal
