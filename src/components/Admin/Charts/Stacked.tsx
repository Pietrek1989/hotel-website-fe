import React, { FC } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

import { stackedCustomSeries, stackedPrimaryYAxis } from "../data/adminData.js";

interface SeriesItem {
  dataSource: { x: string; y: number }[];
  xName: string;
  yName: string;
  name: string;
  type: "StackingColumn";
  background: string;
}

interface StackedProps {
  width: string;
  height: string;
}

const Stacked: FC<StackedProps> = ({ width, height }) => {
  return (
    <ChartComponent
      id="charts"
      // primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      width={width}
      height={height}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={"#fff"}
      legendSettings={{ background: "white" }}
    >
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {stackedCustomSeries.map((item: any, index: number) => (
          <SeriesDirective key={index} {...(item as SeriesItem)} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Stacked;
