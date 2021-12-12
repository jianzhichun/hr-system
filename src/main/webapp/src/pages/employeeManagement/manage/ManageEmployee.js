import {useEffect} from "react";
import axios from "axios";
import {POST} from "../../../util/string";
import {SIZE} from "../../../config";

export default function ManageEmployee() {

    useEffect(() => {
        axios({
            method: POST,
            url: '/api/employee/list',
            data: {
                page: 1,
                size: SIZE
            }
        })
    }, []);

    return (
        <div style={{backgroundColor: '#fff', padding: 24}}>
            <div className={'bold font-16 m-b-10'}>
                Employee Management
            </div>


        </div>
    );
}
