import React, { useState } from "react";
import "./App.css";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { CalendarView } from "./components/CalendarView";
import { TaskView } from "./components/TaskView";

function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabClick = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <div className="App">
      <Box width="100%">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabIndex} onChange={handleTabClick}>
            <Tab label="Calendar" />
            <Tab label="Tasks" />
          </Tabs>
        </Box>
        <CalendarView hidden={tabIndex !== 0} />
        <TaskView hidden={tabIndex !== 1} />
      </Box>
    </div>
  );
}

export default App;
