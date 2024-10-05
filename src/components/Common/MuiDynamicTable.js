import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useTheme } from "@mui/system";
import {
  Box,
  Button,
  Paper,
  Typography,
  Checkbox,
  IconButton,
  Toolbar,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Card,
  CardContent,
  useMediaQuery,
  Skeleton,
  Grid,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteDialogConfirmation from "components/Dialogs/DeleteDialogConfirmation";
import { useState } from "react";
import config from "../../utils/config";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import CalendarSelector from "./CalendarSelector";
import TableLoading from "components/Loading/TableLoading";
import ServerError from "components/ServerError/ServerError";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    isActions,
    isViewOnly,
  } = props;
  const theme = useTheme();

  const createSortHandler = (property) => {
    onRequestSort(property);
  };

  const tableHeadBg = theme.palette.secondary.light;
  const tableLabelColor = theme.palette.secondary.dark;

  return (
    <TableHead style={{ backgroundColor: tableHeadBg }}>
      <TableRow>
        <TableCell padding={"checkbox"}>
          {!isViewOnly && (
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all data",
              }}
            />
          )}
        </TableCell>

        {headCells.map((headCell, index) => {
          const tableHeadCellConfig = headCell.headCellStyle;
          return (
            <TableCell
              key={headCell.id}
              align={index === 0 ? "left" : "left"}
              padding={index === 0 ? "none" : "normal"}
              sx={{ ...tableHeadCellConfig, whiteSpace: "nowrap" }}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={() => {
                  createSortHandler(headCell.id);
                }}
                sx={{
                  fontWeight: 700,
                  color: tableLabelColor,
                  whiteSpace: "unset",
                }}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : (
                  <></>
                )}
              </TableSortLabel>
            </TableCell>
          );
        })}
        {isActions && (
          <TableCell
            align={"left"}
            padding={"normal"}
            sx={{ fontWeight: 700, color: tableLabelColor }}
          >
            Actions
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const {
    numSelected,
    title,
    isFilter,
    filterMenus,
    onFilterOptionCallback,
    isAddButton,
    addButtonLabel = "Add",
    onAddCallback,
    onDeleteCallback,
    enableSearch,
    handleSearchChange,
    isRefreshButton,
    onRefreshCallback,
    filterSelected,
    setSelectedFilter,
    setSearchTerm,
    searchTerm,
    showFilterSelectedLabel,
    isCalendar,
    defaultSelection,
    calendarIconColor,
    rangeColors,
    dateHandler,
    dateLabelSelection,
    onSubmitDate,
    minSearchCharacters,
    customActions,
    onActionCallback,
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchError, setSearchError] = React.useState(false);

  const handleSearchChangeInternal = (e) => {
    setSearchTerm(e.target.value);
    handleSearchChange(e.target.value);
  };

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (searchTerm.length === 0) {
      setSearchError(false);
    } else if (searchTerm.length <= minSearchCharacters) {
      setSearchError(true);
    } else {
      setSearchError(false);
    }
  }, [searchTerm]);

  const enableFilterSection =
    isRefreshButton || isCalendar || isFilter || isAddButton;
  const enableSearchSection = enableSearch;
  const enableTitle = title.length > 1;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.secondary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Grid container rowSpacing={1}>
          <Grid
            display={enableTitle ? "flex" : "none"}
            item
            xs={enableTitle ? 6 : 0}
            lg={enableTitle ? 6 : 0}
          >
            <Typography variant="h4" id="tableTitle" component="div">
              {title}
            </Typography>
          </Grid>

          <Grid
            item
            display={enableSearchSection ? "flex" : "none"}
            xs={enableSearchSection ? 12 : 0}
            md={enableSearchSection ? 8 : 0}
            lg={enableSearchSection ? 6 : 0}
          >
            <TextField
              error={searchError}
              label={searchError ? "Error" : "Search"}
              value={searchTerm}
              placeholder="Search..."
              onChange={handleSearchChangeInternal}
              variant="outlined"
              sx={{ width: "100%" }}
              helperText={
                searchError
                  ? `Enter Minimum ${minSearchCharacters} Characters`
                  : ""
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton disabled>
                      <SearchIcon color="secondary" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid
            item
            display={enableFilterSection ? "flex" : "none"}
            justifyContent={"end"}
            alignItems={"center"}
            xs={enableSearchSection ? 12 : enableTitle ? 6 : 12}
            md={
              enableSearchSection ? (enableTitle ? 12 : 8) : enableTitle ? 6 : 8
            }
            sm={
              enableSearchSection
                ? enableTitle
                  ? 12
                  : 12
                : enableTitle
                ? 6
                : 12
            }
            lg={
              enableSearchSection
                ? enableTitle
                  ? 12
                  : 6
                : enableTitle
                ? 6
                : 12
            }
          >
            {isRefreshButton ? (
              <IconButton onClick={onRefreshCallback}>
                <RefreshIcon color="secondary" />
              </IconButton>
            ) : (
              <></>
            )}

            {isCalendar && (
              <CalendarSelector
                onChangeDateRangeSelect={dateHandler}
                defaultSelection={defaultSelection}
                calendarIconColor={calendarIconColor}
                rangeColors={rangeColors}
                onSubmit={onSubmitDate}
                dateLabelSelection={dateLabelSelection}
              />
            )}

            {isFilter ? (
              <>
                <Tooltip title="Filter list">
                  <IconButton onClick={handleClick}>
                    {showFilterSelectedLabel ? (
                      <Chip
                        avatar={<FilterListIcon />}
                        label={
                          filterSelected === null ? "" : filterSelected?.label
                        }
                      />
                    ) : (
                      <FilterListIcon />
                    )}
                  </IconButton>
                </Tooltip>

                <Menu
                  id="filter-menu"
                  aria-labelledby="filter-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {filterMenus.map((data) => {
                    return (
                      <MenuItem
                        key={data.id}
                        sx={{
                          backgroundColor:
                            filterSelected?.id === data.id
                              ? (theme) =>
                                  alpha(
                                    theme.palette.primary.main,
                                    theme.palette.action.activatedOpacity
                                  )
                              : "transparent",
                        }}
                        onClick={() => {
                          handleClose();
                          setSelectedFilter(data);
                          onFilterOptionCallback(data);
                        }}
                      >
                        {data.label}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </>
            ) : (
              <></>
            )}

            {isAddButton ? (
              <div
                style={{
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  display: "flex",
                }}
              >
                <Tooltip title={addButtonLabel}>
                  <Button
                    variant="contained"
                    sx={{ minWidth: "fit-content" }}
                    onClick={onAddCallback}
                  >
                    {addButtonLabel}
                  </Button>
                </Tooltip>
              </div>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      )}

      {numSelected > 0 ? (
        customActions.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {customActions.map((data) => {
              return data?.icon === null || data?.icon === undefined ? (
                <Button
                  key={data?.id}
                  variant="contained"
                  style={{ ...data.style }}
                  onClick={() => {
                    onActionCallback(data.id);
                  }}
                >
                  {data?.label}
                </Button>
              ) : (
                <Tooltip key={data?.id} title={data?.label}>
                  <IconButton
                    style={{ ...data.style }}
                    onClick={onDeleteCallback}
                  >
                    {data?.icon}
                  </IconButton>
                </Tooltip>
              );
            })}
          </Box>
        ) : (
          <Tooltip title="Delete">
            <IconButton onClick={onDeleteCallback}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )
      ) : (
        <>
          {/* {isAddButton ? (
                        <div
                            style={{
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end',
                                display: 'flex'
                            }}
                        >
                            <Tooltip title={addButtonLabel}>
                                <Button variant="contained" sx={{ minWidth: 'fit-content' }} onClick={onAddCallback}>
                                    {addButtonLabel}
                                </Button>
                            </Tooltip>
                        </div>
                    ) : (
                        <></>
                    )} */}
        </>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string,
  isFilter: PropTypes.bool,
  isAddButton: PropTypes.bool,
  addButtonLabel: PropTypes.string,
  onAddClickCallback: PropTypes.func,
  enableSearch: PropTypes.bool,
  handleSearchChange: PropTypes.func,
  onRefreshCallback: PropTypes.func,
  onFilterOptionCallback: PropTypes.func,
  filterMenus: PropTypes.array,
  filterSelected: PropTypes.any,
  setSelectedFilter: PropTypes.any,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.any,
  showFilterSelectedLabel: PropTypes.bool,
  isCalendar: PropTypes.bool,
  dateHandler: PropTypes.func,
  minSearchCharacters: PropTypes.number,
  onActionCallback: PropTypes.func,
  customActions: PropTypes.array,
  defaultSelection: PropTypes.object,
  calendarIconColor: PropTypes.string,
  rangeColors: PropTypes.array,
  dateLabelSelection: PropTypes.func,
  onSubmitDate: PropTypes.func,
};

const MuiDynamicTable = (props) => {
  const {
    data,
    headCells,
    tableConfig,
    customToolbar,
    isLoading = false,
    isError = false,
    onRetryCallback,
    onAddClickCallback,
    onEditClickCallback,
    onDeleteClickCallback,
    handleSearchChange,
    handleRowClick,
    handleSingleRowClick,
    onRefreshCallback,
    onFilterOptionCallback,
    dateHandlerCallback,
    defaultSelection,
    calendarIconColor,
    rangeColors,
    dateLabelSelection,
    onSubmitDate,
    externalPaginationRender,
    onActionCallback,
  } = props;

  const [tableUiConfig, setTableUiConfig] = React.useState(
    config.defaultTableConfig
  );
  const [order, setOrder] = React.useState(
    config.defaultTableConfig.orderDefault
  );
  const [orderBy, setOrderBy] = React.useState(
    config.defaultTableConfig.orderByDefault
  );
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    config.defaultTableConfig.maxRows
  );
  const isMobileUi = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(min-width:600px) and (max-width: 991px)");
  const [isDeleteDialogShow, setDeleteDialogShow] = useState(false);
  const [keyList, setKeyList] = useState([]);
  const [filterSelected, setSelectedFilter] = React.useState(
    tableConfig?.defaultFilter
  );
  const [searchTerm, setSearchTerm] = React.useState(""); // local search term state

  useEffect(() => {
    const configUpdate = { ...config.defaultTableConfig, ...tableConfig };
    setTableUiConfig(configUpdate);
    setSelectedFilter(configUpdate?.defaultFilter);
    setKeyList(headCells.map((headCell) => headCell.id));
  }, []);

  useEffect(() => {
    setTableUiConfig((val) => ({ ...val, ...tableConfig }));
  }, [tableConfig]);

  useEffect(() => {
    setKeyList(headCells.map((headCell) => headCell.id));
  }, [headCells]);

  useEffect(() => {
    setSelected([]);
  }, [data]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const extractValue = (row, dataKeys) => {
    var result = {};
    dataKeys.forEach((key) => {
      const keys = key.split(".");
      let value = row;
      keys.forEach((key) => {
        value = value ? value[key] : undefined;
      });
      if (dataKeys.length > 1) {
        result[key] = value;
      } else {
        result = value;
      }
    });
    return result;
  };

  // Filter data based on local search when handleSearchChange is not provided
  const filteredData = React.useMemo(() => {
    if (!tableConfig?.enableSearch || handleSearchChange) return data;

    return data.filter((row) =>
      tableConfig.searchKeys.some((key) => {
        const value = extractValue(row, [key]);
        return (
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  }, [data, searchTerm, tableConfig, handleSearchChange]);

  const TableBodyContent = (row, isItemSelected, labelId) => {
    return (
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        onClick={() => {
          if (handleRowClick) handleRowClick(row);
        }}
      >
        <TableCell padding="checkbox">
          {!tableUiConfig.viewOnly && (
            <Checkbox
              color="primary"
              onChange={() => handleClick(row.id)}
              checked={isItemSelected}
              inputProps={{
                "aria-labelledby": labelId,
              }}
            />
          )}
        </TableCell>

        {keyList.map((key, index) => {
          const tableCellConfig = headCells.filter((data) => data.id === key);

          if (tableCellConfig[0] === null || tableCellConfig[0] === undefined) {
            return <></>;
          }
          // const value = tableCellConfig[0].data_key ? row[tableCellConfig[0].data_key] : row[key];
          const value = tableCellConfig[0].data_key
            ? extractValue(row, tableCellConfig[0].data_key)
            : row[key];

          return (
            <TableCell
              id={index === 0 ? labelId : key}
              padding={index === 0 ? "none" : "normal"}
              align={
                index === 0
                  ? "left"
                  : value === null || value === undefined
                  ? "center"
                  : "left"
              }
              key={key}
              onClick={() => {
                if (handleSingleRowClick) handleSingleRowClick(key, row);
              }}
              sx={{
                ...tableCellConfig[0].tableCellStyle,
                overflowWrap: "break-word",
                wordBreak: "break-word",
                cursor:
                  handleSingleRowClick !== null ||
                  handleSingleRowClick !== undefined
                    ? "pointer"
                    : "auto",
              }}
            >
              {tableCellConfig[0]?.export_render
                ? tableCellConfig[0]?.export_render(value)
                : value === null || value === undefined
                ? "-"
                : value}
            </TableCell>
          );
        })}

        {tableUiConfig.isActionEdit && (
          <TableCell padding="checkbox" align="center">
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  onEditClickCallback(row.id);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
        )}
      </TableRow>
    );
  };

  return (
    <Box
      sx={{
        width: isMobileUi ? "100%" : isTablet ? "100%" : "90%",
        border: 0.5,
        borderColor: "lightgrey",
      }}
    >
      <Paper sx={{ width: "100%" }}>
        <>
          {customToolbar ? (
            customToolbar
          ) : (
            <EnhancedTableToolbar
              numSelected={selected.length}
              title={tableUiConfig.title}
              isFilter={tableUiConfig.isFilterMenu}
              isAddButton={tableUiConfig.isAddButton}
              addButtonLabel={tableUiConfig.addButtonLabel}
              onAddCallback={onAddClickCallback}
              filterMenus={tableUiConfig.filterMenus}
              handleSearchChange={
                handleSearchChange
                  ? handleSearchChange
                  : (value) => setSearchTerm(value) // Local search handler
              }
              enableSearch={tableUiConfig.enableSearch}
              isRefreshButton={tableUiConfig.isRefresh}
              onRefreshCallback={onRefreshCallback}
              onFilterOptionCallback={onFilterOptionCallback}
              filterSelected={filterSelected}
              setSelectedFilter={setSelectedFilter}
              showFilterSelectedLabel={tableUiConfig.showFilterSelectedLabel}
              searchTerm={searchTerm}
              minSearchCharacters={tableUiConfig.minSearchCharacters}
              setSearchTerm={setSearchTerm}
              isCalendar={tableUiConfig.isCalendar}
              defaultSelection={defaultSelection}
              calendarIconColor={calendarIconColor}
              rangeColors={rangeColors}
              dateLabelSelection={dateLabelSelection}
              onSubmitDate={onSubmitDate}
              dateHandler={dateHandlerCallback}
              onDeleteCallback={() => {
                setDeleteDialogShow(true);
              }}
              customActions={tableUiConfig.customActions}
              onActionCallback={(buttonId) => {
                onActionCallback(selected, buttonId);
              }}
            />
          )}

          {isLoading ? (
            <TableLoading />
          ) : filteredData.length > 0 ? (
            <TableContainer sx={{ border: 0.5, borderColor: "black" }}>
              {isError ? (
                <ServerError onCallback={onRetryCallback} />
              ) : (
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={tableUiConfig.isTableDense ? "small" : "medium"}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={filteredData.length}
                    headCells={headCells}
                    isActions={tableUiConfig.isActionEdit}
                    isViewOnly={tableUiConfig.viewOnly}
                  />

                  <TableBody>
                    {tableUiConfig.enablePagination
                      ? stableSort(filteredData, getComparator(order, orderBy))
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return TableBodyContent(
                              row,
                              isItemSelected,
                              labelId
                            );
                          })
                      : stableSort(
                          filteredData,
                          getComparator(order, orderBy)
                        ).map((row, index) => {
                          const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;
                          return TableBodyContent(row, isItemSelected, labelId);
                        })}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          ) : (
            <Card variant="outlined">
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={"images/illustration_404.svg"}
                  alt="no-data-logo"
                  width={100}
                />
                <Typography
                  variant="h4"
                  fontWeight={400}
                  sx={{
                    mt: 2,
                    fontSize: "1.3rem",
                    textAlign: "center",
                  }}
                >
                  {isError
                    ? "Something went wrong. Please try again later."
                    : tableUiConfig.noDataMessage}
                </Typography>
                {isError && (
                  <Button
                    sx={{ mt: 2 }}
                    variant="outlined"
                    onClick={onRetryCallback}
                  >
                    Retry
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {tableConfig.enableExternalPagination &&
            externalPaginationRender !== undefined &&
            externalPaginationRender()}

          {tableUiConfig.enablePagination && (
            <TablePagination
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              sx={{
                visibility: tableUiConfig.enablePagination
                  ? "visible"
                  : "hidden",
              }}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </>
      </Paper>

      {
        <DeleteDialogConfirmation
          deleteCallback={() => {
            onDeleteClickCallback(selected);
            setDeleteDialogShow(false);
          }}
          cancelCallback={() => {
            setDeleteDialogShow(false);
          }}
          showDeleteConfirmation={isDeleteDialogShow}
        />
      }
    </Box>
  );
};

export default MuiDynamicTable;
