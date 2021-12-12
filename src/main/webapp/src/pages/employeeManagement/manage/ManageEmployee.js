import {useEffect, useState} from "react";
import axios from "axios";
import {POST} from "../../../util/string";
import {SIZE} from "../../../config";
import Employee from "./employee/Employee";
import './ManageEmployee.scss';



export default function ManageEmployee() {

    const [data, setData] = useState([]);
    const columns = ["Name", "Age", ]

    useEffect(() => {
        axios({
            method: POST,
            url: '/api/employee/list',
            data: {
                page: 1,
                size: SIZE
            }
        }).then(response => {
            if (response.data.code === 0) {
                setData(response.data.data);
            }
        })
    }, []);

    return (
        <div className={'manage-employee'}>
            <div className={'bold font-16 m-b-10'}>
                Employee Management
            </div>

            <div className={'header'}>
                <div className={'items'}>
                    <div className={'name'}>
                        Name
                    </div>
                    <div className={'email'}>
                        Email
                    </div>
                    <div className={'age'}>
                        Age
                    </div>
                    <div className={'enrol'}>
                        Enrol
                    </div>
                    <div className={'resign'}>
                        Resign
                    </div>
                    <div className={'contact'}>
                        Contact
                    </div>
                    <div className={'address'}>
                        Address
                    </div>
                    <div className={'gender'}>
                        Gender
                    </div>

                </div>
                <div>Actions</div>

            </div>

            <div>
                {data.map((item, key) =>
                <Employee item={item} key={key}/>)}
            </div>
        </div>
    );
}
