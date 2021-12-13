import './AttendanceManagement.scss';
import Sider from "antd/es/layout/Sider";
import {Layout, Menu} from "antd";
import {HashRouter, Link} from "react-router-dom";
import {Content} from "antd/es/layout/layout";
import {Route, Switch} from "react-router";
import NewAttendance from "./new/NewAttendance";
import ManageAttendance from "./manage/ManageAttendance";
import {useEffect} from "react";

export default function AttendanceManagement (props) {

    useEffect(() => {
        props.loadUser();
    }, []);

    return (
        <Layout style={{minHeight: 400}}>
            <Sider width={200}
                   theme={'light'}
                   className={'site-layout-background'}>
                <Menu>
                    <Menu.Item>
                        <Link to={'/app/attendance/add'}>
                            Add new
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={'/app/attendance/main'}>
                            Manage
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content className={'site-layout-background'} style={{padding: '24px'}}>
                    <HashRouter>
                        <Switch>
                            <Route path={'/app/attendance/'} exact={true}>
                                <div style={{backgroundColor: '#fff', padding: 24}}>
                                    Please click on the sider to get started.
                                </div>
                            </Route>
                            <Route path={'/app/attendance/add'}>
                                <NewAttendance/>
                            </Route>
                            <Route path={'/app/attendance/main'}>
                                <ManageAttendance/>
                            </Route>
                        </Switch>
                    </HashRouter>
                </Content>
            </Layout>
        </Layout>
    );
}
