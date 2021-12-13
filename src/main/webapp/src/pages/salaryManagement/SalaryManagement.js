import './SalaryManagement.scss';
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { HashRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import NewSalary from "./new/NewSalary";
import ManageSalary from "./manage/ManageSalary";
import AnalysisSalary from "./analysis/AnalysisSalary";
import { useEffect } from "react";

export default function SalaryManagement(props) {

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
                        <Link to={'/app/salary/add'}>
                            Add new
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={'/app/salary/main'}>
                            Manage
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={'/app/salary/analysis'}>
                            Analysis
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content className={'site-layout-background'} style={{ padding: '24px' }}>
                    <HashRouter>
                        <Switch>
                            <Route path={'/app/salary/'} exact={true}>
                                <div style={{ backgroundColor: '#fff', padding: 24 }}>
                                    Please click on the sider to get started.
                                </div>
                            </Route>
                            <Route path={'/app/salary/add'}>
                                <NewSalary />
                            </Route>
                            <Route path={'/app/salary/main'}>
                                <ManageSalary />
                            </Route>
                            <Route path={'/app/salary/analysis'}>
                                <AnalysisSalary />
                            </Route>
                        </Switch>
                    </HashRouter>
                </Content>
            </Layout>
        </Layout>
    );
}
