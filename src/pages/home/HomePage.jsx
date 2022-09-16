import React, { useState } from "react";
import { Table, Typography } from "antd";

const { Column } = Table;

const HomePage = ({ children }) => {
  const [scenarioSummary, setScenarioSummary] = useState(() => [
    { key: "Scenario 1", co2: 145, cost: 33.6, domestic: 0.56 },
    { key: "Scenario 2", co2: 133, cost: 55.78, domestic: 0.98 },
  ]);
  return (
    <main>
      <Typography.Title level={1}>Available scenarios</Typography.Title>
      <Table dataSource={scenarioSummary} pagination={false}>
        <Column dataIndex="key" key="key" />
        <Column title="CO2" dataIndex="co2" key="co2" />
        <Column title="Cost" dataIndex="cost" key="cost" />
        <Column title="Domestic" dataIndex="domestic" key="domestic" />
      </Table>
    </main>
  );
};

export default HomePage;
