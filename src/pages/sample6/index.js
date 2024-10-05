import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import feedbackMockData from "../../utils/mock/feedback.json";
import { utcTime } from "../../utils/miscellaneous";
import config from "utils/config";
import MuiDynamicTable from "../../components/Common/MuiDynamicTable";

function SampleTable1() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [isTableErrorLoading, setIsTableErrorLoading] = useState(false);

  const tableConfig = {
    ...config.defaultTableConfig,
    noDataMessage: "No Feedback Given Yet!!",
    title: "Feedback",
    maxRows: 10,
    enablePagination: true,
    isRefresh: true,
    isCalendar: true,
  };

  const headCells = [
    {
      id: "name",
      numeric: true,
      disablePadding: false,
      label: "User",
    },
    {
      id: "subject",
      numeric: false,
      disablePadding: false,
      label: "Subject",
    },
    {
      id: "feedback",
      numeric: false,
      disablePadding: false,
      label: "Feedback",
    },
    {
      id: "crdate",
      numeric: false,
      disablePadding: false,
      label: "Created At",
      tableCellStyle: { width: "150px" },
      export_render: (value) => <Typography>{utcTime(value)}</Typography>,
    },
  ];

  const fetch = () => {
    setIsLoading(true);
    // Simulating a data fetch with a timeout
    setTimeout(() => {
      setDataList(feedbackMockData); // Set your data here
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetch(); // Call the fetch function when the component mounts
  }, []);

  return (
    <MuiDynamicTable
      data={dataList}
      headCells={headCells}
      tableConfig={tableConfig}
      onRefreshCallback={() => {
        fetch();
      }}
      isError={isTableErrorLoading}
      isLoading={isLoading} //is data loading from server?
      dateHandlerCallback={(value) => {
        console.log(value);
      }}
      calendarIconColor={"#066411FF"}
      rangeColors={["#A9C1ACFF", "#1E00FF", "#ff0000"]}
    />
  );
}

export default SampleTable1;
