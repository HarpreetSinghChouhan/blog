'use client'
import { Box } from "@mui/material";
import { tabpanelv, useTab } from "./context/TabContext";
// import {  tabpanelv, useTab } from "./context/TabContext";

export default function Admin() {
  const { tabvalue } = useTab();

  return (
    <Box p={2}>
      {tabpanelv.map((tab) =>
        tab.id === tabvalue ? (
          <Box key={tab.id}>{tab.value}</Box>
        ) : null
      )}
    </Box>
  );
}