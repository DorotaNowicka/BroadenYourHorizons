import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { redirect, useNavigate } from "react-router-dom";

import Button from "./Button";
import continents from "../assets/continents";

const SelectionPage = () => {
  const navigate = useNavigate();
  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");

  const validationSchema = Yup.object().shape({
    continent: Yup.string().required("Continent is required"),
    number: Yup.number()
      .typeError("Number must be a valid number")
      .min(2, "Number must be at least 2")
      .max(10, "Number must be at most 10")
      .required("Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      continent: "",
      number: 2,
    },
    validationSchema,
    onSubmit: (values) => {
      // Do something with the form values

      try {
        // const response = await user.register(this.state.data);
        // auth.loginWithJwt(response.headers["x-auth-token"]);
        // window.location = "/";
        console.log("Form values:", values);
        setSelectedContinent(values.continent);
        setSelectedNumber(values.number);
        navigate("/discover");
      } catch (ex) {
        // if (ex.response && ex.response.status === 400) {
        //   const errors = { ...this.state.errors };
        //   errors.username = ex.response.data;
        //   this.setState({ errors });
        // }
      }
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="continent-selection">
          <h3>Choose continent to explore:</h3>

          {continents.map((continent) => (
            <Button
              key={continent.code}
              type="button"
              onClick={() => formik.setFieldValue("continent", continent.code)}
            >
              {continent.name}
            </Button>
          ))}
          {formik.errors.continent && formik.touched.continent && (
            <div className="error">{formik.errors.continent}</div>
          )}
        </div>
        <div className="amount-selection">
          <h4 style={{ display: "inline-block", marginRight: "1rem" }}>
            How many countries you want to discover?
          </h4>
          <select
            name="number"
            value={formik.values.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {Array.from({ length: 9 }, (_, i) => i + 2).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          {formik.errors.number && formik.touched.number && (
            <div className="error">{formik.errors.number}</div>
          )}
        </div>
        <Button disabled={!(formik.isValid && formik.dirty)} type="submit">
          SEARCH
        </Button>
      </form>
    </div>
  );
};
export default SelectionPage;
