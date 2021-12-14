import React, { useEffect, useState } from 'react';
import axios from "axios";
import { GET } from "../../../util/string";
import ReactECharts from 'echarts-for-react';


export default function AnalysisEmployee() {

    const [gender, setGender] = useState();
    const [departmentAndLevel, setDepartmentAndLevel] = useState();
    const [category, setCategory] = useState();

    useEffect(() => {
        axios({
            method: GET,
            url: '/api/employee/countByGender'
        }).then(({ data: { data } }) => {
            setCategory(data.map(i => i.GENDER))
            setGender({
                name: 'Count By Gender',
                type: 'pie',
                radius: [20, 140],
                center: ['25%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 5
                },
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: data.map(i => ({ value: i.COUNT, name: i.GENDER }))
            })
        })
        axios({
            method: GET,
            url: '/api/employee/countByDepartmentAndLevel'
        }).then(({ data: { data } }) => {
            setDepartmentAndLevel({
                name: 'Count By Department And Position',
                type: 'pie',
                radius: [20, 140],
                center: ['75%', '50%'],
                z: 100,
                roseType: 'radius',
                itemStyle: {
                    borderRadius: 5
                },
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: data.map(i => ({ value: i.COUNT, name: `${i.department.name} (${i.position.name})` }))
            })
        })
    }, [])

    return (gender && <ReactECharts
        option={{
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
            series: [gender, departmentAndLevel]
        }}
        style={{ height: 400 }}
    />) || <></>;
}
