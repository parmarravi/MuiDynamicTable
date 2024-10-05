import React, { useEffect, useState } from "react";
import MuiDynamicTable from "../../components/Common/MuiDynamicTable";
import feedbackMockData from "../../utils/mock/feedback.json";
import config from "utils/config";
import DynamicAddEditSideDrawer from "components/Common/DynamicAddEditSideDrawer";

function SampleTable1() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [isTableErrorLoading, setIsTableErrorLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const tableConfig = {
    ...config.defaultTableConfig,
    noDataMessage: "No Feedback Given Yet!!",
    title: "Feedback (Add/Edit/Delete)",
    addButtonLabel: "Add Feedback",
    maxRows: 10,
    enablePagination: true,
    isRefresh: true,
    isActionEdit: true,
    isAddButton: true,
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

  const updateAddLogic = (newDataValue) => {
    console.log(newDataValue);

    // Use spread operator to ensure immutability
    let data_values_temp = [...dataList];

    const index = data_values_temp.findIndex(
      (item) => item.id === selectedItem?.id
    );

    if (index === -1) {
      // ADD: Create a new array with the new item appended
      data_values_temp = [...data_values_temp, newDataValue];
    } else {
      // EDIT: Create a new array with the updated item
      data_values_temp = [
        ...data_values_temp.slice(0, index), // items before the updated item
        newDataValue, // the updated item
        ...data_values_temp.slice(index + 1), // items after the updated item
      ];
    }

    setDataList(data_values_temp); // update state with new list
    setSelectedItem(null); // reset selectedItem after updating
  };

  const getValueFromId = (id) => {
    return dataList?.filter((item) => item.id === id);
  };

  const deleteFunc = (items) => {
    const newData = dataList.filter((item) => !items.includes(item.id));
    setDataList(newData);
  };

  return (
    <>
      <MuiDynamicTable
        data={dataList}
        headCells={headCells}
        tableConfig={tableConfig}
        onRefreshCallback={() => {
          fetch();
        }}
        isError={isTableErrorLoading}
        isLoading={isLoading} //is data loading from server?
        onAddClickCallback={() => {
          setSelectedItem(null);
          setIsEdit(false);
          setShowSideDrawer(true);
        }}
        onEditClickCallback={(id) => {
          setSelectedItem(getValueFromId(id)[0]);
          setIsEdit(true);
          setShowSideDrawer(true);
        }}
        onDeleteClickCallback={(items) => {
          deleteFunc(items);
        }}
      />

      <DynamicAddEditSideDrawer
        showDrawer={showSideDrawer}
        closeDrawer={() => {
          setSelectedItem(null);
          setShowSideDrawer(false);
        }}
        isEdit={isEdit}
        dataValue={selectedItem}
        onAddCallback={(newDataDrawer) => {
          updateAddLogic(newDataDrawer);
          setShowSideDrawer(false);
        }}
        onEditCallback={(newDataDrawer) => {
          updateAddLogic(newDataDrawer);
          setShowSideDrawer(false);
        }}
        dataConfig={headCells}
        pageLabel="Feedback"
      />
    </>
  );
}

export default SampleTable1;
