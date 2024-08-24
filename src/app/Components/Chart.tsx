"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const seriesData = [{
  name: 'XYZ MOTORS',
  data: [
    [new Date("2024-02-01").getTime(), 3000000],
    [new Date("2024-02-02").getTime(), 3500000],
    [new Date("2024-02-03").getTime(), 3200000],
    [new Date("2024-02-04").getTime(), 4000000],
    [new Date("2024-02-05").getTime(), 3800000],
    // Add more data points as needed
  ],
}];

const colorOptions = ["#8B4513", "#A0522D", "#CD853F", "#D2691E", "#B8860B", "#FF4500", "#FFA500", "#FF8C00", "#8B8000"];

const defaultOption: ApexOptions = {
  chart: {
    type: 'area',
    stacked: false,
    height: 400,
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true
    },
    toolbar: {
      autoSelected: 'zoom'
    }
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 0,
  },
  title: {
    // text: 'Stock Price Movement',
    align: 'left'
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 90, 100]
    },
  },
  yaxis: {
    labels: {
      formatter: function (val: number) {
        return (val / 1000000).toFixed(0);
      },
    },
    title: {
      text: 'Price'
    },
  },
  xaxis: {
    type: 'datetime',
  },
  tooltip: {
    shared: false,
    y: {
      formatter: function (val: number) {
        return (val / 1000000).toFixed(0)
      }
    }
  },
  series: seriesData,
  colors: ["#A1C6F8"], // Add your desired color for the area chart
  // colors: colorOptions
};




const Chart = ({
  option = defaultOption,
  type = "area",
  height = 270,

}: {
  option?: ApexOptions;
  height?: number;
  type?: "line" | "area" | "donut" | "bar";
  colors?: any[]
  
 
}) => {
  

  return (
    <ApexChart
    type={type}
    options={option}
    series={option.series}
    height={height}
    
    width="100%"
    className="w-full"
    colors={colorOptions}
      
  />
  );
};

export default Chart;