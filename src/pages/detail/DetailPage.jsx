import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Radio, Space, Typography } from "antd";

import ApplicationWrapper from "../../components/ApplicationWrapper";
import BackButton from "../../components/BackButton";
import ScenariosSankyChart from "./ScenariosSankyChart";
import scenarioTitles from "../../scenarioTitleMap.json";
import getSankyChartData from "./getSankyChartData.js";
import { routes } from "../../routes";

import styles from "./DetailPage.module.css";
import PieChart, { formatImportsPieChart } from "../../components/PieChart";
import PolarChart, {
  formatWinterSummerComparison,
} from "../../components/PolarChart";

const timesOfYear = [
  {
    label: "Winter",
    value: "winterValue",
  },
  {
    label: "Summer",
    value: "summerValue",
  },
  {
    label: "Year",
    value: "yearValue",
  },
];

const DetailPage = () => {
  const [timeOfYear, setTimeOfYear] = useState("yearValue");
  const [scenarioData, setScenarioData] = useState(null);
  const { id } = useParams();

  const onChangeRadio = useCallback(({ target }) => {
    setTimeOfYear(target.value);
  }, []);

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        // ToDo: we need to fetch from this API at some point :)
        const response = await fetch(`http://localhost:8000/scenarios/${id}`);
        // const response = await fetch(`../../../data/scenario_${id}.json`, {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // })
        const scenario = await response.json();
        setScenarioData(scenario);
      } catch (error) {
        console.warn(error);
      }
    };
    fetchScenario();
  }, []);

  if (scenarioData === null) {
    return null;
  }

  return (
    <ApplicationWrapper>
      <BackButton href={routes.home} />
      <br />
      <br />
      <div className={styles.container}>
        <Space className={styles.container} direction="vertical" size="large">
          <Space direction="vertical" size="middle">
            <Typography.Title level={1}>
              {scenarioTitles[scenarioData.name]} (GWh)
            </Typography.Title>
          </Space>
          <Radio.Group size="large" value={timeOfYear} onChange={onChangeRadio}>
            {timesOfYear.map(({ value, label }) => (
              <Radio.Button key={value} value={value}>
                {label}
              </Radio.Button>
            ))}
          </Radio.Group>
          <Typography.Title level={2}>Energy use</Typography.Title>
          <ScenariosSankyChart
            scenario={getSankyChartData(scenarioData, timeOfYear)}
            timeOfYear={timeOfYear}
            id={id}
          />
          <Typography.Title level={2}>Composition of imports</Typography.Title>
          <PieChart
            scenario={formatImportsPieChart(scenarioData, timeOfYear)}
          />
          <Typography.Title level={2}>
            Winter-Summer Energy Mix
          </Typography.Title>
          <PolarChart scenario={formatWinterSummerComparison(scenarioData)} />
        </Space>
      </div>
    </ApplicationWrapper>
  );
};

export default DetailPage;
