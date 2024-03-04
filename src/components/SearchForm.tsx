"use client";

import { Form, useForm, Controller, SubmitHandler } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

export interface IFormInputs extends SpotifySearchReq {
  TextField: string;
}
export interface SearchFormData extends SpotifySearchReq {
  TextField: string;
}

export default function SearchForm() {
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm<SearchFormData>({
    defaultValues: {
      track: "song",
      artist: "artist",
      album: "album",
      genre: "genre",
      year: "2024",
      hipster: false,
      new: false,
      recent: false,
    },
  });

  // const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  return (
    <Box
      component={Form}
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      // react-hook-form props
      action="/api/spotify/search" // Send post request with the FormData
      // encType={'application/json'} you can also switch to json object
      // onSubmit={() => {}} // function to be called before the request
      onSuccess={() => {
        console.log("Your application is updated.");
      }}
      onError={() => {
        console.error("Submission has failed.");
      }}
      control={control}
      validateStatus={(status) => status === 200}
      // headers={{ "accessToken": "xxx", "Content-Type": "application/json" }}
    >
      <Controller
        name="MyCheckbox"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Checkbox {...field} />}
      />
      <Controller
        name="trackInput"
        control={control}
        rules={{ required: false }}
        render={({ field }) => {
          return (
            <TextField
              id="track"
              label="song name"
              variant="filled"
              placeholder="song"
              helperText="name of the track (doesn't work with 'that song that goes uhn tiss uhn tiss uhn tiss' ... wait... that one it kinda does)"
              {...field}
            />
          );
        }}
      />
      <TextField
        id="artistInput"
        label="artist"
        variant="filled"
        placeholder="artist"
        helperText="name of the performer of the music"
        {...register("track", { required: false })}
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
            helperText="returns only the lowest 10% popular albums"
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
      />

      {/* <input {...register("track", { required: false })} />
      <input {...register("artist", { required: false })} />
      <input {...register("album", { required: false })} />
      <input {...register("genre", { required: false })} />
      <input {...register("year", { required: false })} />
      <input {...register("hipster", { required: false })} />
      <input {...register("new", { required: false })} />
      <input {...register("recent", { required: false })} /> */}

      <Button component={() => <input type="submit" />}>Submit</Button>
    </Box>
  );
}
