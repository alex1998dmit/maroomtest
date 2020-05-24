import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InstallmentSlider from './includes/Slider';
import QuestionSVG from './public/icons/question.svg';
import apartamentActions from '../../store/actions/apartament';
import CircularProgress from '@material-ui/core/CircularProgress';

const defaultCalculatorParams = {
  'electricity': 20,
  'hot_water': 20,
  'cold_water': 20,
  'deposit': 1,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    backgroundColor: 'white',
    borderRadius: '14px',
    padding: '2em',
  },
  typographyOne: {
    fontWeight: '600',
    fontSize: '24px',
    lineHeight: '37px',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.005em',
  },
  typographySecond: {
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '24px',
  },
  typographySecondGrey: {
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#7F8285',
    textAlign: 'right',
  },
  labelText: {
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '18px',
    color: '#7F8285',
  },
  resultPaymentText: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '27px',
    color: 'black',
  },
  arrivalDateBox: {
    witdh: '100%',
    border: '1px solid red !important',
  },
  arrivalDateInput: {
    width: '100%',
    borderRadius: '12px',
  },
  counterInput: {
    borderRadius: '12px',
  },
  paymentResultBlock: {
    display: 'flex',
    alignItems: 'center',
    borderRight: '1px solid #EAECEF',
    '& .left-side': {
      width: '80%',
      paddingLeft: '1em',
    },
    '& .right-side': {
      width: '20%',
    },
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: '#EAECEF !important',
    borderRadius: '12px',
  },
  margin: {
    height: theme.spacing(3),
  },
  noMargin: {
    margin: 0,
  },
  noPadding: {
    padding: 0,
  },
}));

const marks = [
  {
    value: 1,
    label: 'нет',
  },
  {
    value: 2,
    label: '2 месяцы',
  },
  {
    value: 3,
    label: '3 месяцы',
  },
];

const Calculator = ({ isLoading, sendData }) => {
  const { register, handleSubmit, unregister, setValue } = useForm();
  const classes = useStyles();
  const formHandler = async (data) => {
    let dates = data['arrival_date'].split('.').reverse();
    dates = [new Date().getFullYear(), ...dates];
    data['arrival_date'] = dates.join('-');
    data['deposit'] = data['deposit'] || defaultCalculatorParams['deposit'];
    data['apartment_id'] = 3;
    await sendData(data);
  };
  return (
    <Box className="calculator-container">
      <form action="" onSubmit={handleSubmit(formHandler)}>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Typography variant="h1" className={classes.typographyOne}>
              Калькулятор
            </Typography>
            <div className={classes.margin} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.arrivalDateInput}
              label="Дата заезда"
              inputRef={register}
              name="arrival_date"
              multiline
              rowsMax={4}
              defaultValue="13.04"
              variant="outlined"
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
              required
            />
            <div className={classes.margin} />
          </Grid>
          {/* Слайдер */}
          <Grid item xs={6}>
            <Typography variant="h2" className={classes.typographySecond}>
              Рассрочка платежа
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h2" className={classes.typographySecondGrey}>
              +20 000 ₽ / месяц{' '}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <InstallmentSlider
              defaultValue={defaultCalculatorParams['deposit']}
              marks={marks}
              register={register}
              unregister={unregister}
              setValue={setValue}
              name="deposit"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h2" className={classes.typographySecond}>
              Коммунальные
            </Typography>
            <div className={classes.margin} />
          </Grid>
          <Grid item xs={6}></Grid>
          {/* Счетчики */}
          <Grid item xs={4}>
            <TextField
              className={classes.counterInput}
              label="Холодная вода"
              type="number"
              inputRef={register}
              name="cold_water"
              defaultValue={defaultCalculatorParams['cold_water']}
              variant="outlined"
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="hot_water"
              type="number"
              className={classes.counterInput}
              label="Горячая вода"
              defaultValue={defaultCalculatorParams['hot_water']}
              variant="outlined"
              inputRef={register}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              className={classes.counterInput}
              name="electricity"
              type="number"
              label="Электричество"
              inputRef={register}
              defaultValue={defaultCalculatorParams['electricity']}
              variant="outlined"
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
              required
            />
            <div className={classes.margin} />
          </Grid>
          <Grid item xs={12}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Button variant="contained" color="primary" type="submit">
                Отправить данные
              </Button>
            )}
            <div className={classes.margin} />
          </Grid>
          {/* Результат */}
          <Grid item xs={4} className={classes.paymentResultBlock}>
            <Box className="left-side">
              <p className={`${classes.labelText} ${classes.noMargin}`}>
                13 Апр • 1 платеж{' '}
              </p>
              <p className={`${classes.resultPaymentText} ${classes.noMargin}`}>
                60 300 ₽
              </p>
            </Box>
            <Box className="right-side">
              <img src={QuestionSVG} alt="" />
            </Box>
          </Grid>
          <Grid item xs={4} className={classes.paymentResultBlock}>
            <Box className="left-side">
              <p className={`${classes.labelText} ${classes.noMargin}`}>
                13 Апр • 1 платеж{' '}
              </p>
              <p className={`${classes.resultPaymentText} ${classes.noMargin}`}>
                60 300 ₽
              </p>
            </Box>
            <Box className="right-side">
              <img src={QuestionSVG} alt="" />
            </Box>
          </Grid>
          <Grid item xs={4} className={classes.paymentResultBlock}>
            <Box className="left-side">
              <p className={`${classes.labelText} ${classes.noMargin}`}>
                13 Апр • 1 платеж{' '}
              </p>
              <p className={`${classes.resultPaymentText} ${classes.noMargin}`}>
                60 300 ₽
              </p>
            </Box>
            <Box className="right-side">
              <img src={QuestionSVG} alt="" />
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

const mapStateToProps = (state) => {
  const { isLoading } = state.apartament;
  return {
    isLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  sendData: (data) => dispatch(apartamentActions.sendCreds(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
