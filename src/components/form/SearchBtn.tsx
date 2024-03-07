"use client";
import "client-only";

import Button from "@mui/material/Button";
import type { SubmitHandler } from "react-hook-form";
import type { SearchFormData } from "./SearchForm";

export default function SearchButton(props: { formID: string }) {
  return (
    <Button
      id="Search"
      fullWidth
      variant="contained"
      color="secondary"
      form={props.formID}
      type="submit"
      aria-describedby="search submit button">
      Search
    </Button>
  );
}
