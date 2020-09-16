import React from "react";
//import classes from './SettingsSection.module.scss';
import { makeStyles } from "@material-ui/core/styles";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import EditProfileForm from "../../../../forms/EditProfileForm/EditProfileForm";
import ChangePasswordForm from "../../../../forms/ChangePasswordForm/ChangePasswordForm";

interface SettingsSectionProps {}

export const heading: CSSProperties = {
  color: "transparent",
  backgroundImage: "linear-gradient(to right, #7dd56f, #28b487)",
  textTransform: "uppercase",
  textAlign: "center",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
};

const useStyles = makeStyles({
  root: {
    display: "block",
  },
  heading,
  form: {
    maxWidth: "500px",
    minWidth: "350px",
    paddingTop: "20px",
    paddingBottom: "20px",
    margin: "auto",
  },
});

const SettingsSection = ({}: SettingsSectionProps) => {
  const classes = useStyles();
  console.log("[RENDER] SettingsSection");
  return (
    <>
      <section>
        <h3 className={classes.heading}>Изменить ваши данные</h3>
        <div className={classes.form}>
          <EditProfileForm
            url={"http://localhost:3000/update-user"}
            userData={{
              name: "Anna Ignatina",
              photo: "/user-3.jpg",
              email: "anna@mail.ru",
            }}
          />
        </div>
      </section>
      <section>
        <h3 className={classes.heading}>Изменить пароль</h3>
        <div className={classes.form}>
          <ChangePasswordForm url={"http://localhost:3000/change-password"} />
        </div>
      </section>
    </>
  );
};

export default SettingsSection;
