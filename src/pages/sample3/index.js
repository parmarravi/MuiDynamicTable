import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import feedbackMockData from "../../utils/mock/feedback.json";
import { utcTime } from "../../utils/miscellaneous";
import config from "utils/config";
import MuiDynamicTable from "../../components/Common/MuiDynamicTable";

function SampleTable3() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [isTableErrorLoading, setIsTableErrorLoading] = useState(false);

  const tableConfig = {
    ...config.defaultTableConfig,
    noDataMessage: "No Feedback Given Yet!!",
    title: "Feedback (Search Local)",
    maxRows: 10,
    enablePagination: true,
    isRefresh: true,
    enableSearch: true,
    searchKeys: ["name", "subject"],
    minSearchCharacters: 0,
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
    />
  );
}

export default SampleTable3;
