import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
        minWidth: 160,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width: '100%',
    },
}));

export default function CategoryChangeDropdown(props) {
    const { value, categoryList, setCategoryList } = props;
    const classes = useStyles();

    const handleChange = (event) => {
        setCategoryList(event.target.value);
    };

    return (
        <React.Fragment>
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={value}
                    onChange={handleChange}
                    autoWidth
                >
                    {categoryList && categoryList.map((category) => {
                        return <MenuItem
                            key={category["category_id"]}
                            value={category["category_id"]}>
                            {category['category_name'].toUpperCase()}
                        </MenuItem>
                    })}
                </Select>
            </FormControl>
        </React.Fragment>
    );
}

CategoryChangeDropdown.propTypes = {
    value: PropTypes.string,
    categoryList: PropTypes.array,
    setCategoryList: PropTypes.func
};
