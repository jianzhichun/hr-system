import './Home.scss';
import {Button} from "antd";
import {Link} from "react-router-dom";
import { SmileTwoTone, BuildTwoTone, DollarTwoTone, CheckCircleTwoTone } from '@ant-design/icons';


const ICON_STYLE = {fontSize: 48};

export default function Home() {
    return (
        <div className={'home'}>
            <div className={'section'}>
                <div className={'bold font-24 m-b-10'}>Hi, there!</div>
                <span>Welcome to HR system. You could manage everything in one site!</span>
                <div className={'icons'}>
                    <SmileTwoTone style={ICON_STYLE}/>
                    <BuildTwoTone twoToneColor="#eb2f96" style={ICON_STYLE}/>
                    <DollarTwoTone twoToneColor="rgb(228, 178, 50)" style={ICON_STYLE}/>
                    <CheckCircleTwoTone twoToneColor="#52c41a" style={ICON_STYLE}/>
                </div>
                <div>
                    <Button type={'primary'}>
                        <Link to={'/login'}>Login</Link>
                    </Button>
                    <Button type={'link'}>
                        <Link to={'/sign-up'}>Sign up</Link>
                    </Button>
                </div>
            </div>

            <div className={'section'}>
                <div className={'bold font-24 m-b-10'}>Employee Management</div>
                <span>
                    HR System makes employee management easy.
                </span>
            </div>

            <div className={'section'}>
                <div className={'bold font-24 m-b-10'}>Attendance Management</div>
                <span>
                    HR System makes attendance management easy.
                </span>
            </div>

            <div className={'section'}>
                <div className={'bold font-24 m-b-10'}>Salary Management</div>
                <span>
                    HR System makes salary management easy.
                </span>
            </div>

            <div className={'section'}>
                <div className={'bold font-24 m-b-10'}>Employment Management</div>
                <span>
                    HR System makes employment management easy.
                </span>
            </div>
        </div>
    );
}