import { Button, Checkbox, Typography } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodo,
  selectCount,
  selectTodos,
  updateTodo,
} from "../../../store/todo-reducer";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  todos: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clsBtn: {
    backgroundColor: "lightgray !important",
    color: "black !important",
  },
}));

export const Todo = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { todos } = useSelector((state) => ({
    count: selectCount(state),
    todos: selectTodos(state),
  }));
  return (
    <>
      {todos.length === 0 && (
        <div style={{ padding: 16 }}>
          <Typography variant="subtitle2">No TODOs added as of now.</Typography>
        </div>
      )}
      {todos.map((item) => (
        <div key={item.key} className={classes.todos}>
          <div>
            <Checkbox
              checked={item.isCompleted}
              color="primary"
              onChange={() => {
                dispatch(updateTodo({ key: item.key }));
              }}
              inputProps={{ "aria-label": "secondary checkbox" }}
            />

            <span className="lead">
              {item.isCompleted ? <s> {item.label}</s> : item.label}
            </span>
          </div>
          <Button
            onClick={() => {
              dispatch(deleteTodo({ key: item.key }));
            }}
            variant="contained"
            className={classes.clsBtn}
            size="small"
          >
            x
          </Button>
        </div>
      ))}
    </>
  );
};
