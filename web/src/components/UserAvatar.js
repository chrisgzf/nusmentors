import { Avatar, makeStyles } from "@material-ui/core";
import { deepOrange, deepPurple, indigo, pink } from "@material-ui/core/colors";
import React from "react";
import { getUppercaseOfWords } from "utils/text";

const avatarColors = (theme) => [
  {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  {
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
  },
];

const numColours = 4;

const useStyles = makeStyles((theme) => ({
  avatar: (props) => ({
    backgroundColor: avatarColors(theme)[props.index].backgroundColor,
  }),
}));

export default function UserAvatar({
  photoUrl,
  name,
  index = 0,
  ...otherProps
}) {
  const classes = useStyles({ index: index % numColours });
  return (
    <Avatar src={photoUrl} className={classes.avatar} {...otherProps}>
      {getUppercaseOfWords(name)}
    </Avatar>
  );
}
