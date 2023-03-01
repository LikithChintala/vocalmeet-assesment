import React from "react";
import { Box, FormControl, MenuItem, Select, IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { styled } from "@mui/styles";

const TablePaginationDisplayedRows = styled("p", {
  name: "MuiTablePagination",
  slot: "DisplayedRows",
  overridesResolver: (props, styles) => styles.displayedRows,
})(({ theme }) => ({
  ...theme.typography.body2,
  flexShrink: 0,
}));

const Pagination = ({
  itemsPerPage,
  handleRowsPerPageChange,
  count,
  RowsPerPageList,
  rowsPerPage,
  page,
  handleBackButtonClick,
  handleNextButtonClick,
}) => {
  const defaultLabelDisplayedRows = ({ from, to, count }) => {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  };

  const getLabelDisplayedRowsTo = () => {
    if (count === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? count
      : Math.min(count, (page + 1) * rowsPerPage);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      Rows per page :
      <FormControl variant="standard" sx={{ marginLeft: "5px" }}>
        <Select value={itemsPerPage} onChange={handleRowsPerPageChange}>
          {RowsPerPageList.map((rowsCount) => (
            <MenuItem key={rowsCount} value={rowsCount}>
              {rowsCount}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: "flex" }}>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          color="inherit"
        >
          <KeyboardArrowLeft />
        </IconButton>

        <TablePaginationDisplayedRows>
          {defaultLabelDisplayedRows({
            from: count === 0 ? 0 : page * rowsPerPage + 1,
            to: getLabelDisplayedRowsTo(),
            count: count === -1 ? -1 : count,
            page,
          })}
        </TablePaginationDisplayedRows>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={
            count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false
          }
          color="inherit"
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Pagination;
