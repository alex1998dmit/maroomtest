import React, { useEffect, useState, useCallback } from 'react';
import { Slider } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 1,
    label: '1 месяц',
  },
  {
    value: 2,
    label: '2 месяца',
  },
  {
    value: 3,
    label: '3 месяца',
  },
];

const CustomizedSlider = withStyles({
  root: {
    color: '#F57C00',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  markLabel: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '21px',
    color: '#7F8285',
    paddingLeft: '1em',
  },
})(Slider);

const valuetext = (value) => {
  return marks.filter((el) => el.value === value).label;
};

const InstallmentPlanSlider = ({
  defaultValue,
  register,
  unregister,
  setValue,
  name,
}) => {
  const classes = useStyles();

  const [, setCurrentValue] = useState(defaultValue);

  useEffect(() => {
    register({ name });
    return () => unregister(name);
  }, [defaultValue, name, register, setValue, unregister]);

  const handleChange = useCallback(
    (_, value) => {
      setValue(name, value);
      setCurrentValue(value);
    },
    [name, setValue]
  );

  return (
    <div className={classes.root}>
      <CustomizedSlider
        name={name}
        defaultValue={2}
        getAriaValueText={valuetext}
        aria-labelledby="continuous-slider"
        inputRef={register}
        step={1}
        marks={marks}
        min={1}
        max={3}
        onChange={handleChange}
      />
      <div className={classes.margin} />
    </div>
  );
};

export default InstallmentPlanSlider;
