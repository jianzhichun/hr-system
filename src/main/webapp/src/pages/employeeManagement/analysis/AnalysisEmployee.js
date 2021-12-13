import React, { useEffect, useState } from 'react';
import axios from "axios";
import { GET } from "../../../util/string";
import ReactECharts from 'echarts-for-react';


export default function AnalysisEmployee() {

    const [option1, setOption1] = useState();

    useEffect(() => {
        axios({
            method: GET,
            url: '/api/employee/countByGender'
        }).then(({ data: { data } }) => {
            setOption1({
                title: {
                    text: 'Count By Gender'
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
                    data: data.map(i => i.GENDER)
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: data.map(i => i.COUNT),
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

    return (option1 && <ReactECharts
        option={option1}
        style={{ height: 400 }}
    />) || <></>;
}
