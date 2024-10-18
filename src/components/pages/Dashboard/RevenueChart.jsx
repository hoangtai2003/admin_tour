import React from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
const RevenueChart = ({ statisticalChart }) => {
    const categories = statisticalChart?.chartLineRevenue?.map(revenue => revenue.booking_day)
    const dataRevenue = statisticalChart?.chartLineRevenue?.map(revenue => Number(revenue.total_price))
    const revenueChartOptions = {
        chart: {
            type: 'line',
        },
        title: {
            text: 'Thống kê Doanh thu trong tháng',
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            title: {
                text: 'Tiền',
            },
        },
        tooltip: {
            shared: true,
            valueSuffix: ' VND',
        },
        series: [
            {
                name: 'Doanh thu',
                data: dataRevenue,
                color: '#7cb5ec',
            },
        ],
    };
    return (
        <div style={{ width: '100%', marginTop: "50px" }}>
            <HighchartsReact highcharts={Highcharts} options={revenueChartOptions} />
        </div>
    )
}

export default RevenueChart
