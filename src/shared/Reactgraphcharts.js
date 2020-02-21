import React, { Component } from 'react';
import {
    PieChart, Pie, Sector, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ComposedChart, Area

} from 'recharts';

// const lineChartdata = [
//     {
//         name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//     },
//     {
//         name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//     },
//     {
//         name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//     },
//     {
//         name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//     },
//     {
//         name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//     },
//     {
//         name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//     },
//     {
//         name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//     },
// ];
const barChartdata =
    [
        {
            name: 'Page A', uv: 4000, pv: 2400, amt: 5000,
        },
        {
            name: 'Page B', uv: 3000, pv: 1398, amt: 6500,
        },
        {
            name: 'Page C', uv: 2000, pv: 3800, amt: 2290,
        },
        {
            name: 'Page D', uv: 2780, pv: 3300, amt: 2000,
        },
        {
            name: 'Page E', uv: 1890, pv: 1500, amt: 2181,
        },
        {
            name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
        },
        {
            name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
        },
    ];


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//     cx, cy, midAngle, innerRadius, outerRadius, percent, index,
// }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//         <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//             {`${(percent * 100).toFixed(0)}%`}
//         </text>
//     );
// };


export function ReactBarChart(props) {
    const reactbarChartdata = props.barChartData ? props.barChartData :
        [
            {
                name: 'Page A', uv: 4000, pv: 2400, amt: 5000,
            },
            {
                name: 'Page B', uv: 3000, pv: 1398, amt: 6500,
            },
            {
                name: 'Page C', uv: 2000, pv: 3800, amt: 2290,
            },
        ];

    return (
        <div>
            <BarChart
                width={500}
                height={400}
                data={reactbarChartdata}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Users" fill="#8884d8" />
                {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
            </BarChart></div>
    )
}

export class ReactBarLineChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            getBarChart: true
        }
    }
    sendData = (Data) => {
        this.props.parentCallback(this.state.getBarChart, Data);
    }
    render() {
        const data = this.props.barChartData ? this.props.barChartData : [

        ]
        return (
            <div>
                <ComposedChart width={500} height={450} data={data}>
                    <XAxis dataKey="name" label={{ value: this.props.chartName, position: 'bottom', offset: 8 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <CartesianGrid stroke="#f5f5f5" />
                    {/* <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
                    <Bar dataKey={this.props.barKey} barSize={20} fill="#413ea0" onClick={this.sendData} />
                    <Line type="monotone" dataKey={this.props.lineKey} stroke="#ff7300" />
                </ComposedChart>
            </div>
        )
    }
}

export function ReactPieChart(props) {
    const PieChartdata = [
        { name: 'RETAILERS', value: parseInt(props.userdata.retailerCount) },
        { name: 'FARMERS', value: parseInt(props.userdata.farmerCount) }
    ];
    return (
        <div>
            <PieChart width={400} height={400}>
                <Pie
                    data={PieChartdata}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={PieChartdata.name}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {
                        PieChartdata.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip />
            </PieChart>
        </div>)
}


export class LineGraphView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            getBarChart: true
        }
    }

    render() {
        let value = this.props && this.props.label
        let data = this.props.Data
        const reactbarChartdata = this.props.barChartData ? this.props.barChartData :
            [
                {
                    name: 'Page A', uv: 4000, pv: 2400, amt: 5000,
                },
                {
                    name: 'Page B', uv: 3000, pv: 1398, amt: 6500,
                },
                {
                    name: 'Page C', uv: 2000, pv: 3800, amt: 2290,
                },
            ];
        return (
            <div>
                <LineChart
                    width={500}
                    height={400}
                    data={reactbarChartdata}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" label={{ value: value, position: 'bottom', offset: 5 }} />
                    <YAxis dataKey='amount' />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    {this.props.barChartData && this.props.barChartData.map((item) => (
                        (item && item.region) &&
                        <Line type="monotone" dataKey={item.region} stroke="#8884d8" activeDot={{ r: 8 }} />

                    ))}
                </LineChart>
            </div>
        );
    }
}

export class LineChartView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            getBarChart: true
        }
    }

    render() {
        let value = this.props && this.props.label
        let data = this.props.Data
        const reactbarChartdata = this.props.barChartData ? this.props.barChartData :
            [
                {
                    name: 'Page A', uv: 4000, pv: 2400, amt: 5000,
                },
                {
                    name: 'Page B', uv: 3000, pv: 1398, amt: 6500,
                },
                {
                    name: 'Page C', uv: 2000, pv: 3800, amt: 2290,
                },
            ];
        return (
            <div>
                <LineChart
                    width={500}
                    height={400}
                    data={reactbarChartdata}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" label={{ value: value, position: 'bottom', offset: 5 }} />
                    <YAxis dataKey="orderValue" />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    {/* {this.props.barChartData && this.props.barChartData.map((item) => (
    <Line type="monotone" dataKey={item.region} stroke="#8884d8" activeDot={{ r: 8 }} />
    ))} */}
                    <Line type="monotone" dataKey={data} stroke="#8884d8" activeDot={{ r: 8 }} />
                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
            </div>
        );
    }
}