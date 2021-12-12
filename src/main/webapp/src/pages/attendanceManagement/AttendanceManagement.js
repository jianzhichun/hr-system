import './AttendanceManagement.scss';
import Sider from "antd/es/layout/Sider";
import {Layout, Menu} from "antd";
import {HashRouter, Link} from "react-router-dom";
import {Content} from "antd/es/layout/layout";
import {Route, Switch} from "react-router";
import NewEmployment from "../employmentManagement/new/NewEmployment";
import ManageEmployment from "../employmentManagement/manage/ManageEmployment";
import NewAttendance from "./new/NewAttendance";

export default function AttendanceManagement () {

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
                                <div>

                                </div>
                            </Route>
                            <Route path={'/app/attendance/add'}>
                                <NewAttendance/>
                            </Route>
                            <Route path={'/app/attendance/main'}>
                                <ManageEmployment/>
                            </Route>
                        </Switch>
                    </HashRouter>
                </Content>
            </Layout>
        </Layout>
    );
}
