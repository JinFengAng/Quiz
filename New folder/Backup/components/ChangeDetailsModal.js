import axios from 'axios'
import React, { useState } from 'react'
import { Modal, Input, Form} from 'antd';
import config from '../config/config'

function ChangeDetailsModal(props) {
    const { setShouldOpenModal, setStatus } = props
    const [companyUEN, setCompanyUEN] = useState(null)
    const [directorID, setDirectorID] = useState(null)

    const handleCancel = () => {
        setShouldOpenModal(false);
    };

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
            </Form>
        </Modal>   
    )
}

export default ChangeDetailsModal
