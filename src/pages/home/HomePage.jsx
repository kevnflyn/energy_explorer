import React, { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import ApplicationWrapper from "../../components/ApplicationWrapper"

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

async function fetchScenarios() {
  const response = await fetch("http://localhost:8000/scenarios");
  return await response.json();
}

const HomePage = ({ children }) => {
  const [scenarioSummary, setScenarioSummary] = useState([]);

  useEffect(() => {
    (async function () {
      setScenarioSummary(await fetchScenarios());
    })().catch((error) => console.error("Could not load scenarios", error));
  }, []);
  return (
    <ApplicationWrapper>
      <Typography.Title level={1}>Available scenarios</Typography.Title>
      <Table dataSource={scenarioSummary} pagination={false}>
        <Column
          dataIndex="name"
          key="name"
          render={(value, scenario) => (
            <Link to={routes.scenario.replace(":id", scenario.key)}>
              {value}
            </Link>
          )}
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
    </ApplicationWrapper>
  );
};

export default HomePage;
