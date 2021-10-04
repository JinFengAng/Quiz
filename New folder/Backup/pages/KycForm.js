import axios from 'axios'
import React, { useState } from 'react'
import 'antd/dist/antd.css';
import './KycForm.css'
import config from '../config/config'
import MediaQuery from 'react-responsive'
import { Form, Input, Space, Tooltip, Typography, Button, Card, List, IconText, Avatar, Row, Col, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, MinusOutlined, UserOutlined } from '@ant-design/icons';

const sampleData = [
    {
        'link': "www.test.com",
        'title': 'test',
        'neg': 0.1,
        'neu': 0.66,
        'pos': 0.98,
        'compound': 0.99,
    },
    {
        'link': "www.test2.com",
        'title': 'test',
        'neg': 0.2,
        'neu': 0.66,
        'pos': 0.98,
        'compound': 0.99,
    },
    {
        'link': "www.test3.com",
        'title': 'test',
        'neg': 0.99,
        'neu': 0.66,
        'pos': 0.01,
        'compound': 0.99,
    }
];

const layout = {
    labelCol: {
        span: 2,
    },
    wrapperCol: {
        span: 2,
    },
};

const KYCForm = () => {

    const [KYCdata, setKYCdata] = useState(null);

    function handleSubmit(e) {
        // Enter
        // Quick hack
        // setKYCdata(sampleData);
        // return null;
        //e.preventDefault();
        axios.post(`${config.API_URL}/scripts/query-kyc`, {
            Customer: e['Customer']
        })
            .then(function (response) {
                console.log(response);
                setKYCdata(response.data.results);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className='pb-32 mx-auto'>
            <Form onFinish={handleSubmit} style={{ padding: '20px 20px' }} name="complex-form" labelCol={{ span: 2 }} wrapperCol={{
                span: 8
            }}>
                <Form.Item label="Customer" >
                    <Space>
                        <Form.Item
                            name="Customer"
                            noStyle
                            rules={[{ required: true, message: 'Customer name is required' }]}
                        >
                            <Input style={{ width: 160 }} placeholder="Please input customer name" />
                        </Form.Item>
                        <Tooltip title="Please input query for KYC">
                            <Typography.Link href="#API">Need Help?</Typography.Link>
                        </Tooltip>
                    </Space>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form >
            {KYCdata !== null && KYCdata.length === 0 &&
                <h2 >
                    No data found.
                </h2>
            }

            {KYCdata !== null && KYCdata.length > 0 &&
                <MediaQuery maxWidth={1023}>
                <List
                    style={{ padding: '20px 20px' }}
                    grid={{ gutter: [16, { xs: 8, sm: 16, md: 24, lg: 32 }], column: [3, { xs: 1, sm: 1 }], }}
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={KYCdata}
                    renderItem={item => (
                        <List.Item
                        key={item.link}
                        >
                            <Row gutter={8} style={{ padding: '0 0 20px 0' }}>
                                <Col span={8}>
                                    <Card>
                                        <Statistic
                                            title="Positive"
                                            value={item.sentiment_scores.pos}
                                            precision={2}
                                            valueStyle={{ color: '#3f8600' }}
                                            prefix={<ArrowUpOutlined />}
                                        />
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card>
                                        <Statistic
                                            title="Negative"
                                            value={item.sentiment_scores.neg}
                                            precision={2}
                                            valueStyle={{ color: '#cf1322' }}
                                            prefix={<ArrowDownOutlined />}
                                        />
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card>
                                        <Statistic
                                            title="Neutral"
                                            value={item.sentiment_scores.neu}
                                            precision={2}
                                            valueStyle={{ color: '#FFA500' }}
                                            prefix={<MinusOutlined />}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                            <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined />} />}
                                title={<a href="item.link">{item.title}</a>}
                                description={item.link}
                            />

                        </List.Item>
                    )}
                    />
                    </MediaQuery>
                }
            {KYCdata !== null && KYCdata.length > 0 &&
                <MediaQuery minWidth={1024}>
                <List
                style={{ padding: '20px 20px' }}
                grid={{ gutter: 16, column: 3 }}
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={KYCdata}
                    renderItem={item => (
                        <List.Item
                        key={item.link}
                        >
                            <Row gutter={8} style={{ padding: '0 0 20px 0' }}>
                                <Col span={8}>
                                    <Card>
                                        <Statistic
                                            title="Positive"
                                            value={item.sentiment_scores.pos}
                                            precision={2}
                                            valueStyle={{ color: '#3f8600' }}
                                            prefix={<ArrowUpOutlined />}
                                        />
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card>
                                        <Statistic
                                            title="Negative"
                                            value={item.sentiment_scores.neg}
                                            precision={2}
                                            valueStyle={{ color: '#cf1322' }}
                                            prefix={<ArrowDownOutlined />}
                                        />
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card>
                                        <Statistic
                                            title="Neutral"
                                            value={item.sentiment_scores.neu}
                                            precision={2}
                                            valueStyle={{ color: '#FFA500' }}
                                            prefix={<MinusOutlined />}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                            <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined />} />}
                                title={<a href="item.link">{item.title}</a>}
                                description={item.link}
                            />

                        </List.Item>
                    )}
                    />
                    </MediaQuery>
                }
        </div >
    )
};

export default KYCForm