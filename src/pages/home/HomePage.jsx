import React, { useState } from "react";
import { Table, Typography } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import StatCircle from "../../components/StatCircle";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

const { Column } = Table;

function showCircle(value) {
  return <StatCircle>{value}</StatCircle>;
}

function toPercentage(render) {
  return (value) => render((value * 100).toFixed(0) + "%");
}

const HomePage = ({ children }) => {
  const [scenarioSummary, setScenarioSummary] = useState(() => [
    { key: "Scenario 1", co2: 145, cost: 33.6, domestic: 0.56 },
    { key: "Scenario 2", co2: 133, cost: 55.78, domestic: 0.98 },
  ]);
  return (
    <main>
      <Typography.Title level={1}>Available scenarios</Typography.Title>
      <Table dataSource={scenarioSummary} pagination={false}>
        <Column
          dataIndex="key"
          key="key"
          render={(value) => <Link to={routes.detail}>{value}</Link>}
        />
        <Column title="CO2" dataIndex="co2" key="co2" render={showCircle} />
        <Column title="Cost" dataIndex="cost" key="cost" render={showCircle} />
        <Column
          title="Domestic"
          dataIndex="domestic"
          key="domestic"
          render={toPercentage(showCircle)}
        />
      </Table>
    </main>
  );
};

export default HomePage;
