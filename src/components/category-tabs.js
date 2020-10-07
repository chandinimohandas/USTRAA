import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './../styles/category-tabs.css';
import ProductCard from './product-card';
import { Button, Grid } from '@material-ui/core';
import CategoryChangeDropdown from './category-change-dropdown';

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
  const [showLess, setShowLess] = useState(true);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const response = await fetch("https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob");
        const data = await response.json();
        setTitle(data["heading"]);
        setCategories([...data["category_list"], ...[{
          "category_id": "111",
          "category_name": "View All",
          "category_image": "https://image.freepik.com/free-vector/lines-grey-background_1053-300.jpg"
        }]]);
        setProductList(data["product_list"]["products"]);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }
    fetchInitialData();
  }, []);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const response = await fetch("https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=" + value);
        const data = await response.json();
        setProductList(data["products"]);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }
    if (value !== '111') { fetchInitialData(); }
    setShowLess(true);
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getTabStyle = url => {
    return {
      backgroundImage: `url(${url})`,
      backgroundSize: '100% 100%',
      marginRight: '1rem',
      borderRadius: '0.3rem',
      marginBottom: '0.5rem'
    }
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
            {categories && categories.map((category, index) => {
              return <Tab
                key={category["category_id"]}
                value={category["category_id"]}
                label={category["category_name"]}
                style={getTabStyle(category["category_image"])}
                {...a11yProps(index)} />
            })}
          </Tabs>
        </AppBar>
        <React.Fragment>
          <Grid container spacing={4} direction="row" alignItems="center">
            {productList && productList.slice(0, showLess ? 3 : productList.length).map((product) => {
              return <Grid key={product["id"]} item xs={12} sm={6} md={4}>
                <ProductCard
                  image={product["image_urls"]["x300"]}
                  name={product["name"]}
                  rating={product["rating"]}
                  weight={product["weight"]}
                  weightUnit={product["weight_unit"]}
                  price={product["price"]}
                  finalPrice={product["final_price"]}
                  inStock={product["is_in_stock"]} />
              </Grid>
            })}
            <Grid container spacing={1} direction="row" justify="center" alignItems="center">
              <Grid item xs={6} sm={6} md={6}>
                <CategoryChangeDropdown
                  value={value}
                  categoryList={categories}
                  setCategoryList={setValue} />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Button
                  className={'view-more-button'}
                  onClick={() => { setShowLess(!showLess) }}>
                  {showLess ? '[+] View More' : '[-] View Less'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
    );
  }
}
