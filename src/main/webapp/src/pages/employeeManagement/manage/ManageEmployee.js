import {useEffect, useState} from "react";
import axios from "axios";
import {POST} from "../../../util/string";
import {SIZE} from "../../../config";
import Employee from "./employee/Employee";



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
        <div style={{backgroundColor: '#fff', padding: 24}}>
            <div className={'bold font-16 m-b-10'}>
                Employee Management
            </div>

            <div>
                {data.map((item, key) =>
                <Employee item={item} key={key}/>)}
            </div>
        </div>
    );
}
