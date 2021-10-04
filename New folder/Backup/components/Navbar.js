import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, RightSquareFilled, UserAddOutlined, HomeOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class Navbar extends React.Component {
    state = {
        current: 'home',
    };

    handleClick = e => {
        this.setState({ current: e.key });
    };

    render() {
        const { current } = this.state;
        return (
            <Menu theme="dark" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" >
                <Menu.Item key="home" icon={<HomeOutlined />} >
                    <a href='/admin/'>
                        Home
                    </a>
                </Menu.Item>
                <Menu.Item key="Customer records" icon={<MailOutlined />}>
                    <a href='/admin/customer_records'>
                        Records
                    </a>
                </Menu.Item>
                {/* <Menu.Item key="app" disabled icon={<SettingOutlined />}>
                    Navigation TwoSettingOutlined
                </Menu.Item> */}
                <SubMenu key="SubMenu" icon={<AppstoreOutlined />} title="Services">
                    <Menu.Item key="setting:1">
                        <a href='/admin/annual-return-reminder'>
                            Annual Return Reminder
                        </a>
                    </Menu.Item>
                    <Menu.Item key="setting:2">
                        <a href='/admin/director-registration'>
                            Director Registration
                        </a>
                    </Menu.Item>
                    <Menu.Item key="setting:3">
                        <a href='/admin/director-resignation'>
                            Director Resignation
                        </a>
                    </Menu.Item>
                    <Menu.Item key="setting:4">
                        <a href='/admin/director-forms'>
                            General Forms
                        </a>
                    </Menu.Item>
                    <Menu.Item key="setting:5">
                        <a href='/admin/change-details'>
                            Change of Details
                        </a>
                    </Menu.Item>
                    <Menu.Item key="setting:6">
                        <a href='/admin/share-certificate'>
                            Change of Shareholding
                        </a>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="admin" icon={<RightSquareFilled />}>
                    <a href='/admin/profile'>
                        Administration
                    </a>
                </Menu.Item>
                <Menu.Item key="kyc" icon={<UserAddOutlined />}>
                    <a href='/admin/kyc'>
                        Know Your Customer
                    </a>
                </Menu.Item>
                <Menu.Item key="logout">
                    <a href='/admin/logout' >
                        Logout
                    </a>
                </Menu.Item>
            </Menu >
        );
    }
}

export default Navbar
