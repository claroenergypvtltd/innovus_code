import React, { Component, PureComponent } from 'react';
import {
    PieChart, Pie, Sector, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    BarChart, Bar, ComposedChart, Area
} from 'recharts';
import { ColorCodes } from '../constants/ColorCodes'

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

/******************************* DASHBOARD **********************************/
export function ReactBarChartDash(props) {
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
        <div className="d-flex justify-content-center">
            <BarChart
                width={450}
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

/***************************** REPORT1-Customer Onboard ******************************/
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
        <div className="d-flex justify-content-center">
            <BarChart
                width={900}
                height={500}
                data={reactbarChartdata}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 25,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" label={{ value: props.xAxisLabel, offset: 5, position: "bottom" }} />
                <YAxis label={{ value: props.yAxisLabel, angle: -90, position: 'center' }} />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
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
            <div className="d-flex justify-content-center">
                <ComposedChart width={800} height={500} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 25, }}>
                    <XAxis dataKey="name" label={{ value: this.props.chartName, position: 'bottom', offset: 8 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <CartesianGrid stroke="#f5f5f5" />
                    {/* <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
                    <Bar dataKey={this.props.barKey} barSize={20} fill="#413ea0" onClick={this.sendData} />
                    <Line type="monotone" dataKey={this.props.lineKey} stroke="#ff7300" label={this.props.percentageLabel && <CustomizedLabel />} />
                </ComposedChart>
                <label class="d-flex justify-content-center">{this.props.chartName}</label>
            </div>
        )
    }
}
class CustomizedLabel extends PureComponent {
    render() {
        const {
            x, y, stroke, value,
        } = this.props;

        return <text x={x} y={y} dy={-8} fill='orange' fontSize={15} textAnchor="middle">{value + '%'}</text>;
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
        let value = this.props && this.props.label;
        let yAxis = this.props && this.props.yAxis

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
        let colorCodesData = ColorCodes;
        let colorCount = 0
        this.props.barChartData && this.props.barChartData.map(item => {
            if (item && item.region) {
                item.colorCode = colorCodesData[colorCount];
                colorCount = colorCount + 1
            }
        })
        return (
            <div>
                <LineChart
                    width={600}
                    height={400}
                    data={reactbarChartdata}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 25,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" label={{ value: value, position: 'bottom', offset: 5 }} />
                    {/* <XAxis dataKey="name" /> */}
                    <YAxis dataKey='amount' label={{ value: yAxis, position: 'insideLeft', angle: -90 }} />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />

                    {this.props.barChartData && this.props.barChartData.map((item, index) => (
                        (item && item.region) &&
                        <Line type="monotone" dataKey={item.region} stroke={item.colorCode} activeDot={{ r: 8 }} />
                    ))}
                </LineChart>
            </div>
        );
    }
}
