import React, { useEffect, useState } from "react";
import { DateRangePicker, createStaticRanges } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
  addYears,
} from "date-fns";

const options = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week", value: "thisWeek" },
  { label: "This Month", value: "thisMonth" },
  { label: "Custom Range", value: "custom" },
];

const defineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  startOfLastSevenDay: startOfDay(addDays(new Date(), -7)),
  startOfLastThirtyDay: startOfDay(addDays(new Date(), -30)),
  startOfLastNintyDay: startOfDay(addDays(new Date(), -90)),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  startOfYear: startOfYear(new Date()),
  endOfYear: endOfYear(new Date()),
  startOflastYear: startOfYear(addYears(new Date(), -1)),
  endOflastYear: endOfYear(addYears(new Date(), -1)),
};

const initialState = {
  selection: {
    startDate: new Date(),
    endDate: addDays(new Date(), 30),
    key: "selection",
  },
  compare: {
    startDate: new Date(),
    endDate: addDays(new Date(), 30),
    key: "compare",
  },
};

const sideBarOptions = () => {
  const customDateObjects = [
    {
      label: "Today",
      range: () => ({
        startDate: defineds.startOfToday,
        endDate: defineds.endOfToday,
      }),
    },
    {
      label: "Last 7 Days",
      range: () => ({
        startDate: defineds.startOfLastSevenDay,
        endDate: defineds.endOfToday,
      }),
    },
    {
      label: "Last 30 Days",
      range: () => ({
        startDate: defineds.startOfLastThirtyDay,
        endDate: defineds.endOfToday,
      }),
    },
    {
      label: "Last 90 Days",
      range: () => ({
        startDate: defineds.startOfLastNintyDay,
        endDate: defineds.endOfToday,
      }),
    },
    {
      label: "This Week",
      range: () => ({
        startDate: defineds.startOfWeek,
        endDate: defineds.endOfWeek,
      }),
    },
    {
      label: "Last Week",
      range: () => ({
        startDate: defineds.startOfLastWeek,
        endDate: defineds.endOfLastWeek,
      }),
    },
    {
      label: "This Month",
      range: () => ({
        startDate: defineds.startOfMonth,
        endDate: new Date(),
      }),
    },
    {
      label: "Last Month",
      range: () => ({
        startDate: defineds.startOfLastMonth,
        endDate: defineds.endOfLastMonth,
      }),
    },
    {
      label: "This Year",
      range: () => ({
        startDate: defineds.startOfYear,
        endDate: new Date(),
      }),
    },
    {
      label: "Last Year",
      range: () => ({
        startDate: defineds.startOflastYear,
        endDate: defineds.endOflastYear,
      }),
    },
  ];

  return customDateObjects;
};

// Utility function to determine if a color is light or dark
const getContrastColor = (bgColor) => {
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate brightness (luminance)
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  // If luminance is higher than 186, it's a light color
  return luminance > 186 ? "#000000" : "#FFFFFF";
};

// Component with dynamic colors and pre-set date ranges
const CalendarSelector = ({
  calendarIconColor = "#083E94", // dynamic color prop
  rangeColors = ["#21812CFF", "#1E00FF", "#ff0000"],
  onChangeDateRangeSelect,
  onSubmit,
  defaultSelection,
  dateLabelSelection,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showRangePicker, setShowRangePicker] = useState(false);
  const minDate = new Date();
  const maxDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 10); // 10 years in the past
  const isMobileUi = useMediaQuery("(max-width:600px)");

  const sideBar = sideBarOptions();

  const staticRanges = [...createStaticRanges(sideBar)];

  useEffect(() => {
    if (defaultSelection !== null) {
      setSelectedOption(defaultSelection);
    }
  }, [defaultSelection]);

  const textColor = getContrastColor(rangeColors[0]);

  const handleOptionClick = (event, option) => {
    setAnchorEl(null);
    const selectionOption = options.filter((data) => data.value === option)[0][
      "label"
    ];

    setSelectedOption(selectionOption);
    if (dateLabelSelection != null && dateLabelSelection != undefined) {
      dateLabelSelection(selectionOption);
    }

    switch (option) {
      case "today":
        onChangeDate(new Date(), new Date());
        break;
      case "yesterday":
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        onChangeDate(yesterday, yesterday);
        break;
      case "thisWeek":
        const now = new Date();
        const startOfWeek = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - now.getDay()
        );
        onChangeDate(startOfWeek, now);

        break;
      case "thisMonth":
        const startOfMonth = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        );
        onChangeDate(startOfMonth, new Date());
        break;
      case "custom":
        setShowRangePicker(true);
        break;
      default:
        break;
    }
  };

  const onChangeDate = ({ startDateSelected, endDateSelected }) => {
    // Check if onChangeDateRangeSelect is defined and call it
    onChangeDateRangeSelect?.({
      startDate: startDateSelected,
      endDate: endDateSelected,
    });

    // Check if onSubmit is defined and call it
    onSubmit?.({
      startDate: startDateSelected,
      endDate: endDateSelected,
    });
  };

  const handleCustomRangeSelect = (range) => {
    setStartDate(range.selection.startDate);
    setEndDate(range.selection.endDate);
    onChangeDateRangeSelect({
      startDate: range.selection.startDate,
      endDate: range.selection.endDate,
    });
  };

  return (
    <div>
      <Chip
        avatar={
          <CalendarMonthRoundedIcon style={{ color: calendarIconColor }} />
        }
        label={selectedOption == null ? "Select Date" : selectedOption}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        style={{ borderRadius: 5 }}
      />
      <Dialog open={showRangePicker} onClose={() => setShowRangePicker(false)}>
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderBottomColor: "lightgrey",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ flex: 1 }} variant="h4">
            Select Date
          </Typography>
          <IconButton
            onClick={() => {
              setShowRangePicker(false);
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        {isMobileUi ? (
          <DateRangePicker
            ranges={[{ startDate, endDate, key: "selection" }]}
            onChange={handleCustomRangeSelect}
            direction="horizontal"
            maxDate={maxDate}
            minDate={minDate}
            staticRanges={[]}
            inputRanges={[]}
            rangeColors={rangeColors}
            className="rdrCalendarWrapper"
            color={textColor}
          />
        ) : (
          <DateRangePicker
            ranges={[{ startDate, endDate, key: "selection" }]}
            onChange={handleCustomRangeSelect}
            direction="horizontal"
            maxDate={maxDate}
            minDate={minDate}
            inputRanges={[]}
            staticRanges={staticRanges}
            rangeColors={rangeColors}
            color={textColor}
          />
        )}

        <Button
          variant="contained"
          onClick={() => {
            setShowRangePicker(false);
            onSubmit?.({ startDate: startDate, endDate: endDate });
          }}
        >
          Apply
        </Button>
      </Dialog>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            onClick={(e) => handleOptionClick(e, option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CalendarSelector;
