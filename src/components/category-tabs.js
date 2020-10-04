import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './../styles/category-tabs.css';
import ProductCard from './product-card';
import {Grid} from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = useState('185');
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    async function fetchInitialData(){
        try{   
          const response = await fetch("https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob");
          const data =  await response.json();
          console.log(data["category_list"]);
          console.log(data["product_list"]["products"]);
          setTitle(data["heading"]);
          setCategories(data["category_list"]);
          setProductList(data["product_list"]["products"]); 
        } catch(error){
            console.error(error);
            setError(error);
        }
  }
  fetchInitialData();
  },[]);

  useEffect(() => {
    async function fetchInitialData(){
        try{ 
          const response = await fetch("https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=" + value);
          const data =  await response.json();
          console.log(data["products"]);
          setProductList(data["products"]);
        } catch(error){
            console.error(error);
            setError(error);
        }
  }
  fetchInitialData();
  },[value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getTabStyle = url =>{
    return {backgroundImage:`url(${url})`, backgroundSize:'100% 100%', marginRight:'1rem', borderRadius:'0.3rem', marginBottom:'0.5rem'}
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
        <div className={classes.root}>
        {title && <h1>{title}</h1>}
        <AppBar position="static" color="transparent">
            <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            >
            {/* <Tab style={{backgroundImage:'url("https://d1ebdenobygu5e.cloudfront.net/media/catalog/product/gallery/resized/300/300-x-180_BLANK_2_1.png")'}} label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
            <Tab label="Item Four" {...a11yProps(3)} />
            <Tab label="Item Five" {...a11yProps(4)} />
            <Tab label="Item Six" {...a11yProps(5)} />
            <Tab label="Item Seven" {...a11yProps(6)} /> */}
            {categories && categories.map((item, index)=> {return <Tab key={item['category_name']} value={item["category_id"]} label={item['category_name']} style={getTabStyle(item['category_image'])} {...a11yProps(index)} />})}
            </Tabs>
        </AppBar>
        <React.Fragment>
          <Grid container spacing={4}>
            {productList && productList.map((product)=>{return <Grid key={product["id"]} item xs={12} sm={6} md={4}>
              <ProductCard image={product["image_urls"]["x300"]} name={product["name"]} rating={product["rating"]} weight={product["weight"]} weightUnit={product["weight_unit"]} price={product["price"]} finalPrice={product["final_price"]} inStock={product["is_in_stock"]}/>
          </Grid>})}
            </Grid>
          </React.Fragment>
        {/* <TabPanel value={value} index={0} children=
        {}> 
        </TabPanel>
        <TabPanel value={value} index={1}>
            Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
            Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
            Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
            Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
            Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
            Item Seven
        </TabPanel> */}
        </div>
    );
    }
}
