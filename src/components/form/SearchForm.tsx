"use client";

import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import type {
  SpotifySearchReq,
  SpotifySearchQueryFilters,
  SpotifySearchFilterTag,
} from "~/types/search";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { LightTooltip } from "./StyledTooltip";

export interface SearchFormData {
  keywords: string;
  artist?: string;
  album?: string;
  genre?: string;
  year?: number;
  recent?: boolean;
  hipster?: SpotifySearchFilterTag.hipster | boolean;
  newRelease?: SpotifySearchFilterTag.new | boolean;
}
export interface IFormInputs
  extends SpotifySearchQueryFilters,
    SpotifySearchReq {}

export default function SearchForm() {
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm<SearchFormData>({
    defaultValues: {
      // TextField: "I Gotsta Get Paid",
      keywords: "",
      artist: "",
      album: "",
      genre: "",
      year: 2024,
      hipster: false,
      newRelease: false,
      recent: false,
    },
  });

  const onSubmit: SubmitHandler<SearchFormData> = async (formData) => {
    console.log("onSubmit fn");
    const options = {
      method: "POST",
      // mode: "cors", // no-cors, *cors, same-origin
      /**
       * cache: "no-cache", default, no-cache, reload, force-cache,
       * only-if-cached
       */
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(formData), // body data type must match "Content-Type" header
    };
    const res = await fetch("/api/spotify/search", options);
    const body = await res.json();
    console.log("");
    console.log("");
    console.log("");
    console.log("data submitted");
    console.log(formData);
    console.log("");
    console.log("");
    console.log("response body");
    console.log(body);
    console.log("");
    console.log("");
    console.log("");
  };

  return (
    <Grid container spacing={6}>
      <Box
        component="form"
        id="searchForm"
        paddingBottom="3rem"
        width="100vw"
        noValidate
        onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} width="100%">
          <Grid xs={12}>
            <LightTooltip title="Does not work with 'that song that goes uhn tiss uhn tiss uhn tiss'.   Wait... that kinda does.">
              <Typography
                fontSize=".75rem"
                fontWeight="light"
                paddingLeft=".5rem">
                Song Name
              </Typography>
            </LightTooltip>
          </Grid>
          <Grid xs={12}>
            <Controller
              name="keywords"
              control={control}
              rules={{ required: false }}
              render={({ field }) => {
                return (
                  <TextField
                    id="keywordsInput"
                    label="keywords to search"
                    variant="filled"
                    fullWidth
                    {...field}
                  />
                );
              }}
            />
          </Grid>
        </Grid>
        <Grid xs={12} component={FormControl}>
          <Button
            id="Search"
            fullWidth
            variant="contained"
            color="secondary"
            form="searchForm"
            type="submit"
            aria-describedby="my-helper-text">
            Search
          </Button>
        </Grid>
      </Box>
    </Grid>

    /* <TextField
        id="artistInput"
        label="artist"
        variant="filled"
        placeholder="artist"
        helperText="name of the performer of the music"
        {...register("artist", { required: false })}
      />
      <TextField
        id="albumInput"
        label="album"
        variant="filled"
        placeholder="album"
        helperText="collection of songs released together"
        {...register("album", { required: false })}
      />
      <TextField
        id="genreInput"
        label="genre"
        variant="outlined"
        placeholder="genre"
        helperText="type of music"
        {...register("genre", { required: false })}
      />
      <TextField
        id="yearInput"
        label="year"
        variant="outlined"
        placeholder="year"
        helperText="year (probably something at least in the C.E. range)"
        {...register("year", { required: false })}
      />

      <FormControlLabel
        control={
          <Checkbox
            id="hipster"
            inputProps={{ "aria-label": "hipster checkbox" }}
            sx={{
              "color": "secondary",
              "&.Mui-checked": {
                color: "primary",
              },
              "& .MuiSvgIcon-root": { fontSize: 28 },
            }}
            {...register("hipster", { required: false })}
          />
        }
        label="hipster filter"
      /> */
  );
}
