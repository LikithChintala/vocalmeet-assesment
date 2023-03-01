import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, selectCount } from "../../../store/todo-reducer";
import { Todo } from "./todo";
import { makeStyles, styled } from "@mui/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => ({
  todos: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  newTodo: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

export const Todos = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { count } = useSelector((state) => ({
    count: selectCount(state),
  }));
  const [text, setText] = useState("");

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={6} md={6}>
        <Item>
          <Box p={5} textAlign="center">
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              THINGS TO DO:
            </Typography>
            <Divider />
            <Todo />
            <Divider />
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              DONE: {count}
            </Typography>
            <div className={classes.newTodo}>
              <TextField
                style={{ width: "70%" }}
                id="outlined-basic"
                label=""
                variant="outlined"
                size="small"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  dispatch(
                    addTodo({ label: text, key: nanoid(), isCompleted: false })
                  );
                  setText("");
                }}
                disabled={text.length === 0}
              >
                Add TODO
              </Button>
            </div>
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
};
