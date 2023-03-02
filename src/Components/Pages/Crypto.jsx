import { useState, useEffect } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Select,
  FormControl,
  MenuItem,
  Box,
  FormHelperText,
  Container,
} from "@mui/material";

import Pagination from "../Pagination";

const COINGEKO_API_URL = "https://api.coingecko.com/api/v3/";
const RowsPerPageList = [10, 25, 50, 100];

export const Crypto = () => {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [monetaryUnit, setMonetaryUnit] = useState("usd");
  const [units, setUnits] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setPage(0);
  };

  const handleMonetaryUnitChange = (event) => {
    setMonetaryUnit(event.target.value);
    setPage(0);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchCryptos = async () => {
      let params = {
        vs_currency: monetaryUnit,
        order: "market_cap_desc",
        // per_page: rowsPerPage,
        per_page: 250,

        page: page + 1,
        price_change_percentage: "1h,24h,7d",
      };

      if (selectedCategory !== "all") {
        params.category = selectedCategory;
      }
      axios
        .get(`${COINGEKO_API_URL}coins/markets`, {
          params,
        })
        .then((res) => {
          setCryptos(res.data);
          // let total = res.headers['X-Total-Count'];

          // console.log(":im ddd",res,res.data,total)
        });
    };
    fetchCryptos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, monetaryUnit]);

  useEffect(() => {
    const fetchCategories = async () => {
      const url = `${COINGEKO_API_URL}coins/categories`;
      const response = await axios.get(url);
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchUnits = async () => {
      const url = `${COINGEKO_API_URL}simple/supported_vs_currencies`;
      const response = await axios.get(url);
      setUnits(response.data);
    };

    fetchUnits();
  }, []);

  const handleBackButtonClick = () => {
    setPage(page - 1);
  };

  const handleNextButtonClick = () => {
    setPage(page + 1);
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "right", gap: "5px" }} p={2}>
        <FormControl>
          <Select value={selectedCategory} onChange={handleCategoryChange}>
            <MenuItem value="all">All</MenuItem>
            {categories
              ?.sort((a, b) => a.name.localeCompare(b.name))
              ?.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
          </Select>
          <FormHelperText>Category</FormHelperText>
        </FormControl>

        <FormControl>
          <Select value={monetaryUnit} onChange={handleMonetaryUnitChange}>
            {units?.sort()?.map((unit) => (
              <MenuItem key={unit} value={unit}>
                {unit.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Unit</FormHelperText>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Coin name</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Price ({monetaryUnit.toUpperCase()})
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                1h
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                24h
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                7d
              </TableCell>

              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                24h Volume
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Market Cap ({monetaryUnit.toUpperCase()})
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((crypto) => (
                <TableRow key={crypto.id}>
                  <TableCell component="th" scope="row">
                    {crypto.name}
                  </TableCell>
                  <TableCell align="right">
                    {crypto.current_price.toLocaleString()}
                  </TableCell>

                  <TableCell
                    align="right"
                    style={{
                      color:
                        crypto.price_change_percentage_1h_in_currency > 0
                          ? "green"
                          : crypto.price_change_percentage_1h_in_currency
                          ? "red"
                          : "",
                    }}
                  >
                    {crypto?.price_change_percentage_1h_in_currency ? (
                      <>
                        {" "}
                        {crypto?.price_change_percentage_1h_in_currency?.toFixed(
                          1
                        )}
                        %
                      </>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color:
                        crypto.price_change_percentage_24h_in_currency > 0
                          ? "green"
                          : crypto.price_change_percentage_24h_in_currency
                          ? "red"
                          : "",
                    }}
                  >
                    {crypto?.price_change_percentage_24h_in_currency ? (
                      <>
                        {" "}
                        {crypto?.price_change_percentage_24h_in_currency?.toFixed(
                          1
                        )}
                        %
                      </>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color:
                        crypto.price_change_percentage_7d_in_currency > 0
                          ? "green"
                          : crypto.price_change_percentage_7d_in_currency
                          ? "red"
                          : "",
                    }}
                  >
                    {crypto?.price_change_percentage_7d_in_currency ? (
                      <>
                        {" "}
                        {crypto?.price_change_percentage_7d_in_currency?.toFixed(
                          1
                        )}
                        %
                      </>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {crypto?.total_volume?.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    {crypto.market_cap?.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        RowsPerPageList={RowsPerPageList}
        count={cryptos.length}
        itemsPerPage={rowsPerPage}
        handleBackButtonClick={handleBackButtonClick}
        handleNextButtonClick={handleNextButtonClick}
        page={page}
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
    </Container>
  );
};
