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
import {Menu} from "antd";
import {RedEnvelopeOutlined, TableOutlined, TeamOutlined, UsergroupAddOutlined} from "@ant-design/icons";
import AttendanceManagement from "./pages/attendanceManagement/AttendanceManagement";
import SalaryManagement from "./pages/salaryManagement/SalaryManagement";
import EmploymentManagement from "./pages/employmentManagement/EmploymentManagement";
import Home from "./pages/home/Home";


function App() {

    const [user, setUser] = useState({name: 'Ross'});  // set to null when in production

    useEffect(() => {
        document.title = 'Welcome to HR system';
    }, []);

    return (
        <div className="App">
            <Router>
                <Route path={"/"} exact={true}>
                    <Home/>
                </Route>

                <Route path={'/login'} exact={true}>
                    <Login/>
                </Route>

                <Route path={'/sign-up'}>
                    <SignUp/>
                </Route>

                <Route path={'/app'}>
                    <Layout>
                        <Header>
                            <Menu defaultSelectedKeys={['1']}
                                  theme={'dark'}
                                  mode={'horizontal'}>
                                <Menu.Item key="1" icon={<TeamOutlined/>}>
                                    <Link to={'/app/employee/'}>
                                        员工管理
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<TableOutlined/>}>
                                    <Link to={'/app/attendance/'}>
                                        考勤管理
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3" icon={<RedEnvelopeOutlined/>}>
                                    <Link to={'/app/salary/'}>
                                        薪资管理
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="4" icon={<UsergroupAddOutlined/>}>
                                    <Link to={'/app/employment/'}>
                                        招聘管理
                                    </Link>
                                </Menu.Item>
                            </Menu>

                            {user !== null &&
                            <div className={'account'}>
                                {user.name}
                            </div>}
                        </Header>

                        <Layout>
                            <Switch>
                                <Route exact={true} path={'/app/employee/*'}>
                                    <EmployeeManagement/>
                                </Route>
                                <Route exact={true} path={'/app/attendance/*'}>
                                    <AttendanceManagement/>
                                </Route>
                                <Route exact={true} path={'/app/salary/*'}>
                                    <SalaryManagement/>
                                </Route>
                                <Route exact={true} path={'/app/employment/*'}>
                                    <EmploymentManagement/>
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
