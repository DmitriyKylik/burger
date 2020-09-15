import React from 'react';
import { useField } from 'formik';

import Select from 'react-select';
import classes from './Input.scss';

export const Input = (props) => {
  const [field, meta] = useField(props);
  return (
    <div className={classes.inputContainer}>
      <input className={`${classes.input} ${meta.error && meta.touched ? classes.invalid : null}`} {...field} {...props}/>
      {meta.touched && meta.error ? (
        <div className={classes.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const CustomSelect = (props) => {

  const [field, meta, helpers] = useField(props.name);

  const { setValue, setTouched, setError } = helpers;

  const setFieldProps = (selectedOption) => {
    setValue(selectedOption.value);
    setError(null);
  }

  const customStyles =  {
    control: (provided, state) => ({
      ...provided,
      borderColor: '#e4e8ea',
      borderBottom: state.isFocused ? 'none' : '1px solid #e4e8ea',
      boxShadow: state.isFocused ? '0 0 12px 0 rgba(0, 0, 0, 0.3)' : null,
      borderRadius: state.isFocused && state.selectProps.menuIsOpen ? '15px 15px 0 0' : '15px',
      '&:hover:active': {
        boxShadow: state.isFocused ? '0 0 12px 0 rgba(0, 0, 0, 0.3)' : null,
      },
      '&:hover': {
        cursor: 'pointer',
        boxShadow: state.isFocused ? '0 0 12px 0 rgba(0, 0, 0, 0.3)' : null,
      }
    }),
    option: (provided, state) => ({
      ...provided,
      textAlign: 'left',
      transition: 'all 0.3s ease-out',
      backgroundColor: '#fff',
      color: '#111',
      '&:hover': {
        backgroundColor: '#826459',
        color: '#fff',
      }
    }),
    menu: (provided, state) => ({
      ...provided,
      marginTop: 0,
      borderRadius: '0 0 15px 15px',
      overflow: 'hidden',
      borderTop: state.isFocused ? 'none' : '1px solid #e4e8ea',
      boxShadow: state.selectProps.menuIsOpen ? '0 9px 12px 0 rgba(0, 0, 0, 0.3)' : null,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      padding: '4px 8px'
    }),
    singleValue: (provided, state) => ({
      color: '#111',
    }),
    placeholder: (provided, state) => ({
      color: 'rgb(117, 117, 117)',
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: 0,
    })
  };

  return (
    <div className={classes.inputContainer}>
      <Select
        styles={customStyles}
        {...props}
        onBlur={setTouched}
        onChange={selectedOption => setFieldProps(selectedOption)} />
      {meta.touched && meta.error ? (
        <div className={classes.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};
