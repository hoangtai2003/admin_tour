import React from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
const PieChart = ({ statisticalChart }) => {
    const confirm = Number(statisticalChart?.chartPieConfirm)
    const pending = Number(statisticalChart?.chartPiePending)
    const cancel  = Number(statisticalChart?.chartPieCancel)
    const pieChartOptions = {
        chart: {
            type: 'pie',
        },
        title: {
            text: 'Trạng thái các tour du lịch',
        },
        series: [
            {
                name: 'Số lượng',
                colorByPoint: true,
                data: [
                    { name: 'Tiếp nhận', y: pending, color: '#7cb5ec' },
                    { name: 'Đã xác nhận', y: 20, color: '#434348' },
                    { name: 'Đã thanh toán', y: confirm, color: '#90ed7d' },
                    { name: 'Đã kết thúc', y: 10, color: '#f7a35c' },
                    { name: 'Hủy bỏ', y: cancel, color: '#f15c80' },
                ],
            },
        ],
        };
    return (
        <div style={{marginLeft: "20px"}}>
            <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
        </div>
    )
}

export default PieChart
