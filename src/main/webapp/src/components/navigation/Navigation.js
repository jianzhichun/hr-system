import {RedEnvelopeOutlined, TableOutlined, TeamOutlined, UsergroupAddOutlined} from "@ant-design/icons";
import {Menu} from "antd";
import './Navigation.scss';
import {Link} from "react-router-dom";


export default function NavigationBar(props) {
    return (
        <div className={'header'}>
            <Menu defaultSelectedKeys={['1']}
                  theme={'dark'}
                  mode={'horizontal'}>
                <Menu.Item key="1" icon={<TeamOutlined/>}>
                    <Link to={'/app/employee-management'}>
                        员工管理
                    </Link>
                </Menu.Item>
                {/*<Link to={'/app/attendance-management'}>*/}
                <Menu.Item key="2" icon={<TableOutlined/>}>
                    考勤管理
                </Menu.Item>
                {/*</Link>*/}
                {/*<Link to={'/app/salary-management'}>*/}
                <Menu.Item key="3" icon={<RedEnvelopeOutlined/>}>
                    薪资管理
                </Menu.Item>
                {/*</Link>*/}
                {/*<Link to={'/app/employment-management'}>*/}
                <Menu.Item key="4" icon={<UsergroupAddOutlined/>}>
                    招聘管理
                </Menu.Item>
                {/*</Link>*/}
            </Menu>

            {props.user !== null &&
            <div className={'account'}>
                {props.user.name}
            </div>}
            {/*</HashRouter>*/}
        </div>
    );
}
