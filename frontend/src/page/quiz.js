import React, { useState } from 'react';
import axios from 'axios';
import { Input, Form, Radio, Space, Button } from 'antd';
import 'antd/dist/antd.css';
const url = 'http://localhost:5000/posts';

function Quiz() {
    const [postData, setPostData] = useState({
        username: '', 
        Q1: '', 
        Q2: '', 
        Q3: '', 
        Q4: '', 
        Q5: '', 
        Q6: '', 
        Q7: '', 
        Q8: '', 
        Q9: '', 
        Q10: '', 
        Q11: '', 
        Q12: '', 
        Q13: '', 
        Q14: '', 
        Q15: '', 
        Q16: '', 
        Q17: '', 
        Q18: '', 
        Q19: '', 
        Q20: '', 
    })
    
    const handleSubmit = (e) => {
        axios.post(url, postData); 
    }
    
    return (
        <div className='pb-32 mx-auto'>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={handleSubmit}
                autoComplete="off"
                layout={'vertical'}
                style={{ padding: '20px 20px' }}>
                <Form.Item
                    label='Your Username'
                    name='username'
                    rules={[{ required: true, message: "Please enter your username" }]}>
                    <Input
                        type='text'
                        placeholder='Your Username'
                        size="medium"
                        style={{ width: '25%' }} 
                        value = {postData.username}
                        onChange={(e) => setPostData({...postData, username: e.target.value})}/>
                </Form.Item>
                <Form.Item
                    label='1)	Point out the correct statement'
                    name='Q1'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q1}
                        onChange={(e) => setPostData({...postData, Q1: e.target.value})}>  
                        <Space direction="vertical">
                            <Radio value={'a'}>a)	The choice of an appropriate metric will influence the shape of the clusters</Radio>
                            <Radio value={'b'}>b)	Hierarchical clustering is also called HCA</Radio>
                            <Radio value={'c'}>c)	In general, the merges and splits are determined in a greedy manner</Radio>
                            <Radio value={'D'}>d)	All of the mentioned</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='2)	Which of that following is finally produced by Hierarchical Clustering'
                    name='Q2'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q2}
                        onChange={(e) => setPostData({...postData, Q2: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'a'}>a)	Final estimate of cluster centroids</Radio>
                            <Radio value={'B'}>b)	Tree showing how close things are to each other</Radio>
                            <Radio value={'c'}>c)	Assignment of each point to cluster</Radio>
                            <Radio value={'d'}>d)	All of the mentioned</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='3)	Which of the following is required by K-means clustering?'
                    name='Q3'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q3}
                        onChange={(e) => setPostData({...postData, Q3: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'a'}>a)	Defined distance metric</Radio>
                            <Radio value={'b'}>b)	Number of clusters</Radio>
                            <Radio value={'c'}>c)	Initial guess as to cluster centroids</Radio>
                            <Radio value={'D'}>d)	All of the mentioned</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='4)	Point out the wrong statement'
                    name='Q4'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q4}
                        onChange={(e) => setPostData({...postData, Q4: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'a'}>a)	k-means clustering is a method of vector quantization</Radio>
                            <Radio value={'b'}>b)	k-means clustering aims to partition n observations into k clusters</Radio>
                            <Radio value={'C'}>c)	k-nearest neighbour is same as k-means</Radio>
                            <Radio value={'d'}>d)	None of the mentioned </Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='5)	Which of the following combination is incorrect?'
                    name='Q5'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q5}
                        onChange={(e) => setPostData({...postData, Q5: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'a'}>a)	Continuous – Euclidean distance</Radio>
                            <Radio value={'b'}>b)	Continuous – correlation similarity</Radio>
                            <Radio value={'c'}>c)	Binary – Manhattan distance</Radio>
                            <Radio value={'D'}>d)	None of the mentioned</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='6)	Hierarchical clustering should be primarily used for exploration'
                    name='Q6'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q6}
                        onChange={(e) => setPostData({...postData, Q6: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'A'}>True</Radio>
                            <Radio value={'b'}>False</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='7)	Which of the following function is used for k-means clustering'
                    name='Q7'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q7}
                        onChange={(e) => setPostData({...postData, Q7: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'A'}>a)	k-means</Radio>
                            <Radio value={'b'}>b)	k-mean</Radio>
                            <Radio value={'c'}>c)	heatmap</Radio>
                            <Radio value={'d'}>d)	none of the mentioned</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='8)	Which of the following clustering requires merging approach?'
                    name='Q8'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q8}
                        onChange={(e) => setPostData({...postData, Q8: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'a'}>a)	Partitional</Radio>
                            <Radio value={'B'}>b)	Hierarchical</Radio>
                            <Radio value={'c'}>c)	Naive Bayes</Radio>
                            <Radio value={'d'}>d)	None of the mentioned </Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='9)	K-means is not deterministic and it also consists of number of iterations'
                    name='Q9'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q9}
                        onChange={(e) => setPostData({...postData, Q9: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'A'}>a)	True</Radio>
                            <Radio value={'b'}>b)	False</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='10)	How do we perform Bayesian classification when some features are missing?'
                    name='Q10'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q10}
                        onChange={(e) => setPostData({...postData, Q10: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'a'}>a)	We assuming the missing values as the mean of all values.</Radio>
                            <Radio value={'b'}>b)	We ignore the missing features</Radio>
                            <Radio value={'C'}>c)	We integrate the posteriors probabilities over the missing features</Radio>
                            <Radio value={'d'}>d)	Drop the features completely</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='11)	Which of the following statement is False in the case of the KNN Algorithm?'
                    name='Q11'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q11}
                        onChange={(e) => setPostData({...postData, Q11: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'a'}>a)	For a very large value of K, points from other classes may be included in the neighbourhood</Radio>
                            <Radio value={'b'}>b)	For the very small value of K, the algorithm is very sensitive noise</Radio>
                            <Radio value={'C'}>c)	KNN is used only for classification problem statements</Radio>
                            <Radio value={'d'}>d)	KNN is a lazy learner</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='12)	Which of the following statement is TRUE?'
                    name='Q12'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q12}
                        onChange={(e) => setPostData({...postData, Q12: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'a'}>a)	Outliers should be identified and removed always from a dataset</Radio>
                            <Radio value={'b'}>b)	Outlier can never be present in the testing dataset</Radio>
                            <Radio value={'c'}>c)	Outliers is a data point that is significantly close to other data points</Radio>
                            <Radio value={'D'}>d)	The nature of our business problem determines how outliers are used</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='13)	The robotic arm will be able to paint every corner in the automotive parts while minimizing the quantity of paint wasted in the process. Which learning technique is used in this problem?'
                    name='Q13'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q13}
                        onChange={(e) => setPostData({...postData, Q13: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'a'}>a)	Supervised learning</Radio>
                            <Radio value={'b'}>b)	Unsupervised learning</Radio>
                            <Radio value={'C'}>c)	Reinforcement learning</Radio>
                            <Radio value={'d'}>d)	Both A and B</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='14)	Which one of the following statements is TRUE for a Decision Tree'
                    name='Q14'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q14}
                        onChange={(e) => setPostData({...postData, Q14: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'a'}>a)	Decision tree is only suitable for the classification problem statement.</Radio>
                            <Radio value={'B'}>b)	In a decision tree, the entropy of a node decreases as we go down a decision tree.</Radio>
                            <Radio value={'c'}>c)	In a decision tree, entropy determines purity.</Radio>
                            <Radio value={'d'}>d)	Decision tree can only be used for only numeric valued and continuous attributes.</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='15)	How do you choose the right node while constructing a decision tree?'
                    name='Q15'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q15}
                        onChange={(e) => setPostData({...postData, Q15: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'a'}>a)	An attribute having high entropy</Radio>
                            <Radio value={'b'}>b)	An attribute having high entropy and information gain</Radio>
                            <Radio value={'c'}>c)	An attribute having the lowest information gain.</Radio>
                            <Radio value={'D'}>d)	An attribute having the highest information gain</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='16)	What kind of distance metric(s) are suitable for categorical variables to find the closest neighbours?'
                    name='Q16'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q16}
                        onChange={(e) => setPostData({...postData, Q16: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'a'}>a)	Euclidean distance</Radio>
                            <Radio value={'b'}>b)	Manhattan distance.</Radio>
                            <Radio value={'c'}>c)	Minkowski distance.</Radio>
                            <Radio value={'D'}>d)	Hamming distance.</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='17)	Which of the following is most important language for Data Science?'
                    name='Q17'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q17}
                        onChange={(e) => setPostData({...postData, Q17: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'a'}>a)	Java</Radio>
                            <Radio value={'b'}>b)	Ruby</Radio>
                            <Radio value={'C'}>c)	R</Radio>
                            <Radio value={'d'}>d)	Python</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='18)	Which of the following approach should be used to ask Data Analysis question'
                    name='Q18'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q18}
                        onChange={(e) => setPostData({...postData, Q18: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'A'}>a)	Data Cleansing </Radio>
                            <Radio value={'b'}>b)	Data Integration</Radio>
                            <Radio value={'c'}>c)	Data Replication</Radio>
                            <Radio value={'d'}>d)	All of the Mentioned</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='19)	Which is the correct statement:'
                    name='Q19'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q19}
                        onChange={(e) => setPostData({...postData, Q19: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'A'}>a)	Data mining</Radio>
                            <Radio value={'b'}>b)	Big Data</Radio>
                            <Radio value={'c'}>c)	Data wrangling</Radio>
                            <Radio value={'d'}>d)	Machine Learning</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='20)	Which of the following uses data on some object to predict values for other object'
                    name='Q20'
                    rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group 
                        value = {postData.Q20}
                        onChange={(e) => setPostData({...postData, Q20: e.target.value})}>
                        <Space direction="vertical">
                            <Radio value={'a'}>a)	Fast</Radio>
                            <Radio value={'b'}>b)	Accuracy</Radio>
                            <Radio value={'c'}>c)	Scalable</Radio>
                            <Radio value={'D'}>d)	All of the Mentioned</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default Quiz