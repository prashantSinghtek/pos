"use client"
import React, { useEffect } from "react";
import Dashboardcard from "./Component/Dashboardcard";
import Dashboardcard2 from "./Component/Dashboardcard2";
import Chart from "../Components/Chart";
import CardPrototype from "../Components/CardPrototype";
import Table from "../Components/Table";

function page() {
  const header = [
    "Image",
    "Ref. No.",
    "Party Name ",
    "Date",
    "Payment",
    "Amount",
    "Balance Due",
  ];


  // const listData = useSelector(selectPartiesList)
  return (
    <div className="mr-5">
      <div className="flex mt-5 gap-5">
        <Dashboardcard
          image={"/dashboardcard1.png"}
          title={"Total Sales"}
          number={"₹307144"}
        />
        <Dashboardcard
          image={"/dashboardcard1.png"}
          title={"Total Purchase"}
          number={"₹307144"}
        />
        <Dashboardcard
          image={"/dashboardcard1.png"}
          title={"Total Expense"}
          number={"₹307144"}
        />
        <Dashboardcard
          image={"/dashboardcard1.png"}
          title={"Total revenue"}
          number={"₹307144"}
        />
      </div>
      <div className="mt-5 flex gap-5">
        <Dashboardcard2
          image={"/dashboardcard1.png"}
          title={"Cash In Hand"}
          number={"+100"}
          colour={"bg-orange-100"}
        />
        <Dashboardcard2
          image={"/Group2.png"}
          title={"Cash At bank"}
          number={"+100"}
          colour={"bg-blue-100"}
        />
        <Dashboardcard2
          image={"/Group3.png"}
          title={"Total Available Stock"}
          number={"+100"}
          colour={"bg-gray-300"}
        />
        <Dashboardcard2
          image={"/Group4.png"}
          title={"Total Liability"}
          number={"+100"}
          colour={"bg-green-100"}
        />
      </div>
      <div className="flex gap-5 w-full mt-5">
        <div className="w-[70%]">
          <CardPrototype>
          <div>
            Purchase & Sales
          </div>
            <Chart
              option={{
                series: [
                  {
                    name: "series1",
                    data: [31, 40, 28, 51, 42, 109, 100],
                  },
                  {
                    name: "series2",
                    data: [11, 32, 45, 32, 34, 52, 41],
                  },
                ],
                labels: [
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                ],
                colors: ["#319EDC", "#F78C10"],
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "smooth",
                },
                // xaxis: {
                //   type: 'datetime',
                //   categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
                // },
              }}
              type="area"
              height={400}
            />
          </CardPrototype>
        </div>
        <div className="w-[30%]">
          <CardPrototype>
            <div className="border-b border-gray-300 pb-3">
              Recent Product
            </div>
            
          </CardPrototype>
        </div>
      </div>
      <div className="mt-5">
        <CardPrototype>

        <div>
          Purchase
        </div>
        <div>
          <Table headerData={header}/>

        </div>
        </CardPrototype>

      </div>
    </div>
  );
}

export default page;
