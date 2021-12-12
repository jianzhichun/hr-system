import './App.scss';
import './css/font.scss';
import './css/margin.scss';
import './css/display.scss';
import 'antd/dist/antd.css';
import {HashRouter as Router, Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import EmployeeManagement from "./pages/employeeManagement/EmployeeManagement";
import Layout, {Header} from "antd/es/layout/layout";
import {useEffect, useState} from "react";
import {Dropdown, Menu} from "antd";
import {RedEnvelopeOutlined, SmileTwoTone, TableOutlined, TeamOutlined, UsergroupAddOutlined, CodepenOutlined} from "@ant-design/icons";
import {DownOutlined} from '@ant-design/icons';
import AttendanceManagement from "./pages/attendanceManagement/AttendanceManagement";
import SalaryManagement from "./pages/salaryManagement/SalaryManagement";
import EmploymentManagement from "./pages/employmentManagement/EmploymentManagement";
import JobOfferManagement from "./pages/jobOfferManagement/JobOfferManagement";
import Home from "./pages/home/Home";
import axios from "axios";
import {GET} from "./util/string";
import Profile from "./pages/profile/Profile";


function App() {

    const [user, setUser] = useState(null);  // set to null when in production

    const APP_HOME_STYLE = {
        width: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        height: 400
    }

    function loadUser() {
        axios({
            method: GET,
            url: '/api/account/me'
        }).then(({data: {code, message, data}}) => {
            if (code === 0) {
                setUser(data);
            } else {
                window.location.hash = '/login'
            }
        }).catch(e => {
            window.location.hash = '/login';
        })
    }

    function logout() {
        axios({
            method: GET,
            url: '/api/account/logout'
        }).then(() => {
            setUser(null);
            window.location.hash = '/login';
        })
    }

    useEffect(() => {
        document.title = 'Welcome to HR system';
        axios({
            method: GET,
            url: '/api/account/me'
        }).then(({data: {code, message, data}}) => {
            if (code === 0) {
                setUser(data);
            }
        })
    }, []);

    const menu = (
        <Menu>
            <Menu.Item>
                <Link to={'/app/profile/'}>Profile</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <span className={'red-text'} onClick={logout}>Log out</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="App">
            <Router>
                <Route path={"/"} exact={true}>
                    <Home/>
                </Route>

                <Route path={'/login'} exact={true}>
                    <Login loadUser={loadUser}/>
                </Route>

                <Route path={'/sign-up'}>
                    <SignUp/>
                </Route>

                <Route path={'/app'}>
                    <Layout>
                        <Header>
                            <Menu theme={'dark'}
                                  style={{width: 800}}
                                  mode={'horizontal'}>
                                <Menu.Item key="1" icon={<TeamOutlined/>}>
                                    <Link to={'/app/employee/'}>
                                        Employees
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<TableOutlined/>}>
                                    <Link to={'/app/attendance/'}>
                                        Attendance
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3" icon={<RedEnvelopeOutlined/>}>
                                    <Link to={'/app/salary/'}>
                                        Salary
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="4" icon={<CodepenOutlined/>}>
                                    <Link to={'/app/jobOffer/'}>
                                        Job Offer
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="5" icon={<UsergroupAddOutlined/>}>
                                    <Link to={'/app/employment/'}>
                                        Employment
                                    </Link>
                                </Menu.Item>
                            </Menu>

                            {user !== null &&
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    {user.name} <DownOutlined/>
                                </a>
                            </Dropdown>}
                        </Header>


                            <Layout>
                                <Switch>
                                    <Route exact={true} path={'/app/'}>
                                        <div style={APP_HOME_STYLE}>
                                            <SmileTwoTone style={{fontSize: 48}} twoToneColor="rgb(228, 200, 100)"/>
                                            <div className={'bold font-24'}>
                                                Welcome!
                                            </div>
                                            <span>
                                            Click on the navigation bar to get started.
                                        </span>
                                        </div>
                                    </Route>
                                    <Route exact={true} path={'/app/employee/*'}>
                                        <EmployeeManagement loadUser={loadUser}/>
                                    </Route>
                                    <Route exact={true} path={'/app/attendance/*'}>
                                        <AttendanceManagement/>
                                    </Route>
                                    <Route exact={true} path={'/app/salary/*'}>
                                        <SalaryManagement loadUser={loadUser}/>
                                    </Route>
                                    <Route exact={true} path={'/app/joboffer/*'}>
                                        <JobOfferManagement loadUser={loadUser}/>
                                    </Route>
                                    <Route exact={true} path={'/app/employment/*'}>
                                        <EmploymentManagement loadUser={loadUser}/>
                                    </Route>
                                    <Route exact={true} path={'/app/profile/*'}>
                                        <Profile/>
                                    </Route>
                                </Switch>
                            </Layout>
                    </Layout>


                </Route>
            </Router>


        </div>
);
}

export default App;
