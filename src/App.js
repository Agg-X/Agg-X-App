import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";

// importing MyRouts where we located all of our theme
import MyRouts from "./routers/routes";

delete theme.styles.global;

function App() {
  return (
    <div>
      <ChakraProvider theme={theme} resetCSS={false}>
        <MyRouts />
      </ChakraProvider>
    </div>
  );
}

export default App;
