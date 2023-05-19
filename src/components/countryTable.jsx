import React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const CountryInfoTable = ({ country }) => {
  if (!country) {
    return <h2>An error occurred while trying to obtain data</h2>;
  }

  return (
    <div>
      <TableContainer component={Paper} className="TableDetails">
        <Table sx={{ width: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell variant="head" align="center" colSpan={2}>
                <h3> {country.name.common}</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableRow
            align="right"
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="right" variant="head">
              Official Name
            </TableCell>
            <TableCell
              style={{
                whiteSpace: "normal",
                wordWrap: "break-word",
              }}
              align="right"
              component="th"
              scope="row"
            >
              {country.name.official}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" align="right">
              Capital
            </TableCell>
            <TableCell
              align="right"
              style={{
                whiteSpace: "normal",
                wordWrap: "break-word",
              }}
            >
              {country.capital.map((capital) => capital)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" align="right">
              Population
            </TableCell>
            <TableCell align="right">{country.population}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" align="right">
              Currency
            </TableCell>
            <TableCell align="right">
              {Object.keys(country.currencies).map((currency) => {
                return <span key={currency}> {currency}</span>;
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" align="right">
              Region
            </TableCell>
            <TableCell align="right">{country.region}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" align="right">
              Languages
            </TableCell>
            <TableCell
              style={{
                whiteSpace: "normal",
                wordWrap: "break-word",
              }}
              align="right"
            >
              {Object.keys(country.languages).map((language) => (
                <span key={language}> {country.languages[language]}</span>
              ))}
              {/* {country.languages[Object.keys(country.languages)[0]]} */}
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CountryInfoTable;
