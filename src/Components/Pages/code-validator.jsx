import { Box, Button, TextField, Typography, Paper, Grid } from "@mui/material";
import React, { useState } from "react";
import { makeStyles, styled } from "@mui/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const useStyles = makeStyles((theme) => ({
  newItem: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "baseline",
  },
}));

function validateCode(code) {
  const openingChars = "<[{(";
  const closingChars = ">]})";
  const charMap = new Map();
  let rootCharCount = 0;
  const stack = [];

  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    if (openingChars.includes(char)) {
      stack.push(char);
    } else if (closingChars.includes(char)) {
      const top = stack.pop();
      if (!top || openingChars.indexOf(top) !== closingChars.indexOf(char)) {
        return false;
      }
      if (stack.length === 0) {
        rootCharCount++;
      }
    }
    charMap.set(char, (charMap.get(char) || 0) + 1);
  }

  return stack.length === 0 && rootCharCount === 1;
}

export const CodeValidator = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [showText, setShowText] = useState(false);
  const classes = useStyles();
  const onChange = (e) => {
    setShowText(false);
    const newValue = e.target.value;
    setText(newValue);
    if (newValue.match(/^[<>(){}[\]]*$/)) {
      setError("");
    } else {
      setError("Enter valid characters <,>,(,),{,},[,]");
    }
  };
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={6} md={6}>
        <Item>
          <Box p={5} textAlign="center">
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              CodeValidator
            </Typography>
            <div className={classes.newItem}>
              <TextField
                style={{ width: "70%" }}
                id="outlined-basic"
                label=""
                variant="outlined"
                size="small"
                value={text}
                onChange={onChange}
                helperText={error}
                error={!!error}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  // console.log("vas", validateCode(text), text);
                  setIsValid(validateCode(text));
                  setShowText(true);
                }}
                disabled={text.length === 0 || error.length !== 0}
              >
                Validate
              </Button>
            </div>
            {showText && (
              <div>
                Entered text is
                {isValid ? (
                  <Typography sx={{ fontWeight: "bold", color: "green" }}>
                    Valid
                  </Typography>
                ) : (
                  <Typography sx={{ fontWeight: "bold", color: "red" }}>
                    InValid
                  </Typography>
                )}
              </div>
            )}
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
};
