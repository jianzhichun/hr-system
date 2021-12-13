import React, { useEffect, useState } from 'react';
import axios from "axios";
import { GET } from "../../../util/string";
import ReactECharts from 'echarts-for-react';


export default function AnalysisManagement() {

    const [option1, setOption1] = useState();

    useEffect(() => {
        axios({
            method: GET,
            url: '/api/employment/countByJobAndStatus'
        }).then(({ data: { data } }) => {
            setOption1({
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                  left: 'center',
                  top: 'bottom'
                },
                toolbox: {
                  show: true,
                  feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                  }
                },
                series: [
                    {
                        name: 'Count Of Job Offer On Department',
                        type: 'pie',
                        radius: [20, 140],
                        center: ['75%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                          borderRadius: 5
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        data: data.job.map(i => ({ value: i.COUNT, name: i.JOB }))
                    },
                    {
                        name: 'Count Of Job Offer On Status',
                        type: 'pie',
                        radius: [20, 140],
                        center: ['25%', '50%'],
                        roseType: 'radius',
                        itemStyle: {
                            borderRadius: 5
                        },
                        label: {
                            show: false
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        data: data.status.map(i => ({ value: i.COUNT, name: i.STATUS }))
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
