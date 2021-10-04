import axios from 'axios'
import React, { useState } from 'react'
import { Modal, Input, Form, Select, DatePicker, Space } from 'antd';
import config from '../config/config'
const { Option } = Select;

function onChangeDate(date, dateString) {
    console.log(date, dateString);
  }

function DirectionRegistrationModal(props) {
    const { setShouldOpenModal, setStatus } = props
    const [companyUEN, setCompanyUEN] = useState(null)
    const [directorID, setDirectorID] = useState(null)
    const [personNationality, setPersonNationality] = useState(null)
    const [personAddress, setpersonAddress] = useState(null)
    const [directorIDType, setdirectorIDType] = useState(null)
    const [directorName, setdirectorName] = useState(null)
    const [directorAppointedDate, setdirectorAppointedDate] = useState(new Date())

    const handleCancel = () => {
        setShouldOpenModal(false);
    };

    const handleSubmit = () => {

        setShouldOpenModal(false)
        setStatus('loading')

        let data = Object.assign({},
            { companyUEN },
            { directorID },
            { personNationality },
            { directorIDType },
            { personAddress },
            { directorName },
            { directorAppointedDate }
        );


        axios.post(`${config.API_URL}/scripts/generate-director-registration-forms`, data)
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
        <Modal title="Generate Director Registration Forms" visible={true} onOk={handleSubmit} onCancel={handleCancel}>
            <Form
                layout={'vertical'}
            >
                <Form.Item
                    label='Company UEN'>
                    <Input
                        onChange={(e) => setCompanyUEN(e.target.value)}
                        type='text'
                        placeholder='Company UEN'
                        size="medium"/>
                </Form.Item>
                <Form.Item
                    label='Director ID'>
                    <Input
                        onChange={(e) => setDirectorID(e.target.value)}
                        type='text'
                        placeholder='Director ID'
                        size="medium"/>
                </Form.Item>
                <Form.Item
                    label='Director ID Type'>
                    <Select
                        placeholder='Director  ID Type'
                        onChange={(val) => setdirectorIDType(val)}>
                        <Option value="NRIC">NRIC</Option>
                        <Option value="Passport">Passport</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label='Director Name'>
                    <Input
                        onChange={(e) => setdirectorName(e.target.value)}
                        type='text'
                        placeholder='Director Name'
                        size="medium"/>
                </Form.Item>
                <Form.Item
                    label='Director Nationality'>
                    <Input
                        onChange={(e) => setPersonNationality(e.target.value)}
                        type='text'
                        placeholder='Director Nationality'
                        size="medium"/>
                </Form.Item>
                <Form.Item
                    label='Director Address'>
                    <Input
                        onChange={(e) => setpersonAddress(e.target.value)}
                        type='text'
                        placeholder='Director Name'
                        size="medium"/>
                </Form.Item>
                <Form.Item
                    label='Appointed Date'>
                    <DatePicker 
                        onChange={onChangeDate}
                        onChange={(date) => setdirectorAppointedDate(date)} 
                        placeholder='Appointed Date'
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default DirectionRegistrationModal;
