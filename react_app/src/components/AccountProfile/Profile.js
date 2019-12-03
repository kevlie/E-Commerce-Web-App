import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AccountProfile from "./AccountProfile";
import AccountOrders from "./AccountOrders";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import LocalMallIcon from "@material-ui/icons/LocalMall";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 500
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    marginRight: 320,
    color: "#000"
  },
  tab: {
    marginBottom: 40,
    fontSize: 18,
    fontFamily: "Righteous"
  }
}));

export default function Profile() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab
          icon={<PersonPinIcon />}
          label="Account Profile"
          className={classes.tab}
          {...a11yProps(0)}
        />
        <Tab
          icon={<LocalMallIcon />}
          className={classes.tab}
          label="Orders"
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AccountProfile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AccountOrders />
      </TabPanel>
    </div>
  );
}
