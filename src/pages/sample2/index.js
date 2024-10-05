import React, { useEffect, useState } from "react";
import MuiDynamicTable from "../../components/Common/MuiDynamicTable";
import { Typography } from "@mui/material";
import feedbackMockData from "../../utils/mock/feedback.json";
import { utcTime } from "../../utils/miscellaneous";
import config from "utils/config";

function SampleTable1() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [isTableErrorLoading, setIsTableErrorLoading] = useState(false);

  const tableConfig = {
    ...config.defaultTableConfig,
    noDataMessage: "No Feedback Given Yet!!",
    title: "Feedback( Multi Select Mode)",
    maxRows: 10,
    enablePagination: true,
    isRefresh: true,
    viewOnly: false,
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

  const deleteFunc = (items) => {
    const newData = dataList.filter((item) => !items.includes(item.id));
    setDataList(newData);
  };

  return (
    <MuiDynamicTable
      data={dataList}
      headCells={headCells}
      tableConfig={tableConfig}
      onRefreshCallback={() => {
        fetch();
      }}
      onDeleteClickCallback={(items) => {
        deleteFunc(items);
      }}
      isError={isTableErrorLoading}
      isLoading={isLoading} //is data loading from server?
    />
  );
}

export default SampleTable1;
