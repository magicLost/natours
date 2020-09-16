import React from "react";
//import classes from './ScrollableTabs.module.scss';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../TabPanel/TabPanel";
import { Box } from "@material-ui/core";

export interface ITabsDesc {
  label: string;
  icon?: React.FunctionComponent;
}

interface ScrollableTabsProps {
  tabs: ITabsDesc[];
  children?: JSX.Element[];
}

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const getTabs = (tabs: ITabsDesc[]) => {
  return tabs.map((tab, index) => {
    return tab.icon ? (
      <Tab
        key={tab.label + index}
        label={tab.label}
        icon={<tab.icon />}
        {...a11yProps(0)}
      />
    ) : (
      <Tab key={tab.label + index} label={tab.label} {...a11yProps(index)} />
    );
  });
};

const getTabPanels = (
  value: number,
  classes: any,
  children?: JSX.Element[]
) => {
  return React.Children.map(children, (child, index) => {
    return (
      <div
        key={classes.root + index}
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
      >
        {child}
      </div>
    );
  });
};

export default function ScrollableTabs({
  tabs,
  children,
}: ScrollableTabsProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const tabElements = getTabs(tabs);
  const tabPanels = getTabPanels(value, classes, children);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs"
        >
          {tabElements}
        </Tabs>
      </AppBar>

      <Box p={3}>{tabPanels}</Box>
    </div>
  );
}
