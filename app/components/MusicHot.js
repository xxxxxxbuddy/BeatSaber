import Chart from 'chart.js';
import React from 'react';
import { GetPopularity } from '../api';

export default class MusicHot extends React.Component {
    componentDidMount() {
        this.RenderChart();
        this.state = {
            data: [],
            labels: [],
            colors: []
        }
    }

    randomColor(){
        this.r = Math.floor(Math.random()*255);
        this.g = Math.floor(Math.random()*255);
        this.b = Math.floor(Math.random()*255);
        return 'rgba('+ this.r +','+ this.g +','+ this.b +',0.8)';
     }

    RenderChart() {
        GetPopularity().then(res => {
            this.setState({
                data: res.data.result.map(item => item.Popularity),
                labels: res.data.result.map(item => item.MusicName),
                colors: res.data.result.map(item => this.randomColor())
            })
            var ctx = 'MusicHot';
            try {
                var myChart = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: this.state.labels,
                    datasets: [{
                        label: 'MusicPopularity',
                        data: this.state.data,
                        backgroundColor: this.state.colors
                    }]
            
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
                });
            } catch (err) {
                console.log('ERROR:' + err);
            }
        })
  }

    render() {
        return (
            <div>
                <canvas id="MusicHot" width="400" height="300"></canvas>
            </div>
        )
    }
    
}