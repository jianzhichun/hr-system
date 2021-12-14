import React, { useEffect, useState } from 'react';
import axios from "axios";
import { GET } from "../../../util/string";
import ReactECharts from 'echarts-for-react';


export default function AnalysisSalary() {

    const [option, setOption] = useState();
    const [option1, setOption1] = useState();
    useEffect(() => {
        axios({
            method: GET,
            url: '/api/salary/amountSumByDevelopment'
        }).then(({ data: { data } }) => {
            setOption({
                title: {
                    text: 'Sum Of Departments'
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: data.map(i => i.DEPARTMENT_NAME)
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: data.map(i => i.SUM),
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }
                ]
            })
        })
    }, [])

    useEffect(() => {
        axios({
            method: GET,
            url: '/api/salary/amountAvgByDevelopment'
        }).then(({ data: { data } }) => {
            setOption1({
                title: {
                    text: 'Avg Of Departments'
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: data.map(i => i.DEPARTMENT_NAME)
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: data.map(i => i.SUM),
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }
                ]
            })
        })
    }, [])

    return (option && option1 && <div>
        <ReactECharts
            option={option}
            style={{ height: 400 }}
        />
        <ReactECharts
            option={option1}
            style={{ height: 400 }}
        />
    </div>) || <></>;
}
