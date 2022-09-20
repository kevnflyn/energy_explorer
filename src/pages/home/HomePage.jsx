import React, { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import ApplicationWrapper from "../../components/ApplicationWrapper";

import StatCircle from "../../components/StatCircle";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import { API_HOST } from "../../config";
import scenarioTitles from "../../scenarioTitleMap.json";

const { Column } = Table;

function showCircle(value) {
  return <StatCircle>{value}</StatCircle>;
}

function toPercentage(render) {
  return (value) => render((value * 100).toFixed(0) + "%");
}

function withUnit(unit, render) {
  const formatter = new Intl.NumberFormat();
  return (value) => render(`${formatter.format(value)} ${unit}`);
}

async function fetchScenarios() {
  const response = await fetch(`${API_HOST}/scenarios`);
  return (await response.json()).map((scenario) => ({
    ...scenario,
    cost: Math.round(scenario.cost),
  }));
}

const HomePage = () => {
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
              {scenarioTitles[value] ?? value}
            </Link>
          )}
        />
        <Column
          title="CO2"
          dataIndex="co2"
          key="co2"
          render={withUnit("MtCO2", showCircle)}
        />
        <Column
          title="Cost"
          dataIndex="cost"
          key="cost"
          render={withUnit("M.CHF", showCircle)}
        />
        <Column
          title="Domestic Electricity Production"
          dataIndex="domestic"
          key="domestic"
          render={toPercentage(showCircle)}
        />
      </Table>
    </ApplicationWrapper>
  );
};

export default HomePage;
