import {useEffect, useState} from "react";
import axios from "axios";
import {POST} from "../../../util/string";
import {SIZE} from "../../../config";
import Employee from "./employee/Employee";
import './ManageEmployee.scss';


export default function ManageEmployee() {

    const [data, setData] = useState([]);
    const columns = ["Name", "Age",]

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

            {/* Specify data here */}
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

            {/* Put data here */}
            <div>
                {data.map((item, key) =>
                    <Employee item={item} key={key}/>)}
            </div>

            {/*<div className={'item-page'}>*/}
            {/*    <div className={'button' + (this.state.currentPage === 1 ? ' disabled' : '')}*/}
            {/*         onClick={async () => {*/}
            {/*             if (this.props.loadingItems) {*/}
            {/*                 return;*/}
            {/*             }*/}
            {/*             if (this.state.currentPage === 1) {*/}
            {/*                 return;*/}
            {/*             }*/}
            {/*             await this.setState({currentPage: this.state.currentPage - 1});*/}
            {/*             this.props.listItems(this.state.selectedSubject.sid, this.state.currentPage);*/}
            {/*         }}>上一页*/}
            {/*    </div>*/}
            {/*    <div className={'m-r-10'}>{this.state.currentPage}</div>*/}
            {/*    <div*/}
            {/*        className={'button' + (this.state.currentPage === (Math.ceil(this.state.numberOfItems / SIZE)) ? ' disabled' : '')}*/}
            {/*        onClick={async () => {*/}
            {/*            if (this.props.loadingItems) {*/}
            {/*                return;*/}
            {/*            }*/}
            {/*            if (this.state.currentPage === Math.ceil(this.state.numberOfItems / SIZE)) {*/}
            {/*                return;*/}
            {/*            }*/}
            {/*            await this.setState({currentPage: this.state.currentPage + 1});*/}
            {/*            this.props.listItems(this.state.selectedSubject.sid, this.state.currentPage);*/}
            {/*        }}>下一页*/}
            {/*    </div>*/}
            {/*    <div className={'m-r-20'}>*/}
            {/*        共 {Math.ceil(this.state.numberOfItems / SIZE)} 页*/}
            {/*    </div>*/}
            {/*    <input id={'item-page-input'} placeholder={'页码'}/>*/}
            {/*    <div className={'button'}*/}
            {/*         onClick={() => {*/}
            {/*             if (this.props.loadingItems) {*/}
            {/*                 return;*/}
            {/*             }*/}
            {/*             let input = $('#item-page-input').val().trim();*/}
            {/*             if (input.length === 0) {*/}
            {/*                 this.props.enqueueSnackbar("请输入页码", {variant: 'error'});*/}
            {/*                 return;*/}
            {/*             }*/}
            {/*             let page = parseInt(input);*/}
            {/*             if (isNaN(page)) {*/}
            {/*                 this.props.enqueueSnackbar("请输入正确的页码", {variant: 'error'});*/}
            {/*                 return;*/}
            {/*             }*/}
            {/*             if (page < 1 || page > Math.ceil(this.state.numberOfItems / SIZE)) {*/}
            {/*                 this.props.enqueueSnackbar("输入的页码超出范围", {variant: 'error'});*/}
            {/*                 return;*/}
            {/*             }*/}
            {/*             this.setState({currentPage: page});*/}
            {/*             this.props.listItems(this.state.selectedSubject.sid, page);*/}
            {/*         }}>跳转*/}
            {/*    </div>*/}
            {/*</div>*/}


        </div>
    );
}
