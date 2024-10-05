import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import CustomDialog from "components/Common/CustomDialog";

function DynamicAddEditSideDrawer({
  window,
  showDrawer,
  closeDrawer,
  isLoading = false,
  isEdit = false,
  onAddCallback,
  onEditCallback,
  dataValue,
  dataConfig,
  pageLabel,
}) {
  const defaultFormValue = {};
  dataConfig.map(
    (columnData, index) => (defaultFormValue[columnData["id"]] = "")
  );
  const [dataDrawer, setDataDrawer] = useState(defaultFormValue);
  const [isButtonEnable, setButtonEnable] = useState(false);

  useEffect(() => {
    if (dataValue === null || dataValue === undefined) {
      resetForm();
    } else {
      var defaultDataValue = defaultFormValue;
      dataConfig.map((columnData, index) => {
        defaultDataValue[columnData["id"]] = dataValue[columnData["id"]];
        return null;
      });
      setDataDrawer(defaultDataValue);
    }
  }, [dataValue]);

  useEffect(() => {
    let valueCheckFlag = true;
    dataConfig.map((columnData, index) => {
      if (columnData["mandatory"] === true) {
        if (dataDrawer[columnData["id"]].length <= 0) {
          valueCheckFlag = false;
        }
      }
      return null;
    });

    if (valueCheckFlag) {
      setButtonEnable(true);
    } else {
      setButtonEnable(false);
    }
  }, [dataDrawer]);

  const handleInputFiled = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setDataDrawer((prevState) => {
      const newDataDrawer = { ...prevState };
      dataConfig.forEach((columnData) => {
        if (inputName === columnData.id) {
          if (
            columnData.maxLength &&
            inputValue.length < columnData.maxLength
          ) {
            newDataDrawer[columnData.id] = inputValue;
          } else if (!columnData.maxLength) {
            newDataDrawer[columnData.id] = inputValue;
          }
        }
      });
      return newDataDrawer;
    });
  };

  const resetForm = () => {
    setDataDrawer(defaultFormValue);
  };

  const closeDialog = () => {
    resetForm();
    closeDrawer();
  };

  const DynamicConfigForm = () => {
    return (
      <Grid container spacing={5}>
        {dataConfig.map((columnData, index) => {
          let inputProps = {};
          if (columnData["numeric"]) {
            inputProps = { ...inputProps, inputMode: "numeric" };
          }
          if (columnData["maxLines"]) {
            const maxLines = columnData["maxLines"];
            inputProps = {
              ...inputProps,
              rows: maxLines,
              multiline: maxLines > 1,
            };
          }
          return (
            <Grid
              key={columnData["id"]}
              item
              xs={12}
              md={12}
              sx={{ ...columnData["drawerFieldStyle"] }}
            >
              <TextField
                id={columnData["id"]}
                name={columnData["id"]}
                label={"Enter " + columnData["label"]}
                value={dataDrawer[columnData["id"]]}
                onChange={handleInputFiled}
                fullWidth
                {...inputProps}
              />
            </Grid>
          );
        })}
        ;
      </Grid>
    );
  };

  return (
    <CustomDialog
      window={window}
      buttonLabel={isEdit ? "Edit " + pageLabel : "Add " + pageLabel}
      dialogTitle={isEdit ? "Edit " + pageLabel : "Add " + pageLabel}
      showDrawer={showDrawer}
      isLoading={isLoading}
      onClickCallback={() => {
        isEdit ? onEditCallback(dataDrawer) : onAddCallback(dataDrawer);
        resetForm();
      }}
      isButtonEnable={isButtonEnable}
      closeDrawer={closeDialog}
      customFormUi={DynamicConfigForm()}
    />
  );
}

export default DynamicAddEditSideDrawer;
