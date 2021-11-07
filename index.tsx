import * as React from "react";
import * as ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

// adapaters
import ReduxStoreProvider from "./uiAdapters/ReduxStoreProvider";
import useSignUpAction from "./uiAdapters/useSignUpAction";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4 {
    letter-spacing: 0.3px;
  }
`;
const Index = () => {
  const { signUp } = useSignUpAction();

  const signUpHandler = () => {
    signUp({
      firstName: "abc",
      lastName: "def",
      email: "ohno@gmail.com",
      password: "abc",
    });
  };
  return <div onClick={signUpHandler}>Sign Up</div>;
};

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ReduxStoreProvider>
        <Index />
      </ReduxStoreProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
