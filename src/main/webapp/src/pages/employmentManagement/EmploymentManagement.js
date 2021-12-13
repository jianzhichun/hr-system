import './EmploymentManagement.scss';
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { HashRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import NewEmployment from "./new/NewEmployment";
import ManageEmployment from "./manage/ManageEmployment";
import { useEffect } from "react";

export default function EmploymentManagement(props) {

    useEffect(() => {
        props.loadUser();
    }, []);

    return (
        <Layout style={{ minHeight: 400 }}>
            <Sider width={200}
                theme={'light'}
                className={'site-layout-background'}>
                <Menu>
                    <Menu.Item>
                        <Link to={'/app/employment/add'}>
                            Add new
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={'/app/employment/main'}>
                            Manage
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content className={'site-layout-background'} style={{ padding: '24px' }}>
                    <HashRouter>
                        <Switch>
                            <Route path={'/app/employment/'} exact={true}>
                                <div style={{ backgroundColor: '#fff', padding: 24 }}>
                                    Please click on the sider to get started.
                                </div>
                            </Route>
                            <Route path={'/app/employment/add'}>
                                <NewEmployment />
                            </Route>
                            <Route path={'/app/employment/main'}>
                                <ManageEmployment />
                            </Route>
                        </Switch>
                    </HashRouter>
                </Content>
            </Layout>
        </Layout>
    );
}
