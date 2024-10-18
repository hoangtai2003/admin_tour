import React from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
const LineChart = ({ statisticalChart }) => {
    const categories = statisticalChart.chartLine?.map(statistical => statistical.booking_day)
    const totalAdults = statisticalChart.chartLine?.map(statistical => Number(statistical.total_adults))
    const totalChildren = statisticalChart.chartLine?.map(statistical => Number(statistical.total_children))
    const totalToddler = statisticalChart.chartLine?.map(statistical => Number(statistical.total_toddler))
    const totalBaby = statisticalChart.chartLine?.map(statistical => Number(statistical.total_baby))
    const lineChartOptions = {
        chart: {
            type: 'line',
        },
        title: {
            text: 'Thống kê lượng khách hàng đặt tour trong tháng',
        },
        xAxis: {
            categories: categories,
        },
        yAxis: {
            title: {
                text: 'Số lượng khách hàng',
            },
        },
        tooltip: {
            shared: true,
            valueSuffix: '',
        },
        series: [
            {
                name: 'Tổng số người lớn',
                data: totalAdults,
                color: '#7cb5ec',
            },
            {
                name: 'Tổng số trẻ em',
                data: totalChildren,
                color: '#434348',
            },
            {
                name: 'Tổng số trẻ nhỏ',
                data: totalToddler,
                color: '#f45b5b',
            },
            {
                name: 'Tổng số em bé',
                data: totalBaby,
                color: '#91e8e1',
            },
        ],
    };
    return (
        <div style={{ width: '58%' }}>
            <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />
        </div>
    )
}

export default LineChart
