import React from "react";

const CountryInfoTable = ({ country }) => {
  const renderTableRow = (label, value) => {
    return (
      <tr key={label}>
        <td>{label}</td>
        <td>{value}</td>
      </tr>
    );
  };

  const renderNestedObject = (obj) => {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === "object") {
        return renderTableRow(key, renderNestedObject(value));
      } else {
        return renderTableRow(key, value);
      }
    });
  };

  if (!country) {
    return null;
  }

  return (
    <table>
      <tbody>
        {Object.entries(country).map(([key, value]) => {
          if (typeof value === "object") {
            return renderNestedObject(value);
          } else {
            return renderTableRow(key, value);
          }
        })}
      </tbody>
    </table>
  );
};

export default CountryInfoTable;
