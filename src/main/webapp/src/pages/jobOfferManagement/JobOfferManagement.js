import './JobOfferManagement.scss';
import {Layout, Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import {HashRouter, Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import NewJobOffer from "./new/NewJobOffer";
import ManageJobOffer from "./manage/ManageJobOffer";
import {useEffect} from "react";

export default function JobOfferManagement(props) {
    
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
                        <Link to={'/app/joboffer/add'}>
                            Add new
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={'/app/joboffer/main'}>
                            Manage
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content className={'site-layout-background'} style={{padding: '24px'}}>
                    <HashRouter>
                        <Switch>
                            <Route path={'/app/joboffer/'} exact={true}>
                                <div>
                                    
                                </div>
                            </Route>
                            <Route path={'/app/joboffer/add'}>
                                <NewJobOffer/>
                            </Route>
                            <Route path={'/app/joboffer/main'}>
                                <ManageJobOffer/>
                            </Route>
                        </Switch>
                    </HashRouter>
                </Content>
            </Layout>
        </Layout>
    );
}
