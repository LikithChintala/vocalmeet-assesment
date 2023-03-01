import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Pages/Home";
import { Provider } from "react-redux";
import { store } from "./store/configure-store";
import { Todos } from "./Components/Pages/todo/todo-list";
import { CodeValidator } from "./Components/Pages/code-validator";
import { Crypto } from "./Components/Pages/Crypto";
import { FormValidator } from "./Components/Pages/Form-validator";

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "3rem"
    }
  },
  palette: {
    type: "light"
  }
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/todos" element={<Todos/>} />
              <Route exact path="/code-validator" element={<CodeValidator/>} />
              <Route exact path="/crypto" element={<Crypto/>} />
              <Route exact path="/form-validator" element={<FormValidator/>} />
            </Routes>
          </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
