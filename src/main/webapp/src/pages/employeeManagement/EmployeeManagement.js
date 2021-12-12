import './EmployeeManagement.scss';
import {Layout, Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import {HashRouter, Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import NewEmployee from "./new/NewEmployee";
import ManageEmployee from "./manage/ManageEmployee";
import {useEffect} from "react";

export default function EmployeeManagement(props) {

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
                        <Link to={'/app/employee/add'}>
                            Add new
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={'/app/employee/main'}>
                            Manage
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content className={'site-layout-background'} style={{padding: '24px'}}>
                    <HashRouter>
                        <Switch>
                            <Route path={'/app/employee/'} exact={true}>
                                <div>
                                    
                                </div>
                            </Route>
                            <Route path={'/app/employee/add'}>
                                <NewEmployee/>
                            </Route>
                            <Route path={'/app/employee/main'}>
                                <ManageEmployee/>
                            </Route>
                        </Switch>
                    </HashRouter>
                </Content>
            </Layout>
        </Layout>
    );
}
