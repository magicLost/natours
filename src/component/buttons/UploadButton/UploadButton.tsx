import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  input: {
    display: "none",
  },
  userPhoto: {
    borderRadius: "50%",
  },
  label: {
    textTransform: "none",
  },
});

export default function UploadButton({ register, photo, isDisabled }: any) {
  const classes = useStyles();

  return (
    <>
      <input
        accept="image/*"
        name="photo"
        className={classes.input}
        id="contained-button-file"
        type="file"
        ref={register}
      />
      <label htmlFor="contained-button-file">
        <Button
          classes={{
            label: classes.label,
          }}
          variant="text"
          color="primary"
          component="span"
          disabled={isDisabled}
          startIcon={
            <img
              className={classes.userPhoto}
              src={`/images/users/${photo}`}
              height={"60px"}
              alt={`Your photo for avatar`}
            />
          }
        >
          &nbsp;Выбрать новое фото.
        </Button>
      </label>
    </>
  );
}
