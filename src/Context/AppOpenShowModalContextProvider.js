import React, { useState } from "react";
import AppOpenShowModalContext from "./AppOpenShowModalContext";

const AppOpenShowModalContextProvider = ({ children }) => {
  const [showUserNameEntryBox, setShowUserNameEntryBox] = useState(false);
  const [showUserWelcomeBox, setShowUserWelcomeBox] = useState(false);

  const contextValues = {
    showUserNameEntryBox,
    setShowUserNameEntryBox,
    showUserWelcomeBox,
    setShowUserWelcomeBox,
  };

  return (
    <AppOpenShowModalContext.Provider value={contextValues}>
      {children}
    </AppOpenShowModalContext.Provider>
  );
};

export default AppOpenShowModalContextProvider;
