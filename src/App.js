import React, { useState, useEffect } from "react";
import "./App.css";
import HideAppBar from "./components/AppBar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 290,
    cursor: "pointer",
    marginTop: 20,
    borderRadius: 12,
    boxShadow: "0 10px 45px rgba(0,0,0,.08), 0 5px 10px rgba(0,0,0,.05)",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    maxWidth: 1000,
    boxShadow: theme.shadows[5],
    outline: "none",
  },
  modalCard: {
    width: 400,
    boxShadow: "0 10px 45px rgba(0,0,0,.08), 0 5px 10px rgba(0,0,0,.05)",
  },
}));

function App() {
  const [moscow, setMoscow] = useState({
    datasm: [],
    datafm: [],
    tempm: [],
    skym: [],
    iconm: "",
    timem: "",
  });

  const { datasm, tempm, skym, iconm, timem } = moscow;

  const getWeatherMoscow = async () => {
    const api = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=moscow&appid=62029f0d3701271a5e50142b280915f0
`
    );
    const forecastapi = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=moscow&units=metric&appid=62029f0d3701271a5e50142b280915f0`
    );

    const datafore = await forecastapi.json();
    const data = await api.json();
    setMoscow({
      ...moscow,
      datasm: data,
      datafm: datafore.list,
      tempm: data.main.temp,
      skym: data.weather[0].description,
      iconm: data.weather[0].icon,
    });
  };

  const [london, setLondon] = useState({
    datasl: [],
    datafl: [],
    templ: [],
    skyl: [],
    icon: "",
    timel: "",
  });

  const { datasl, datafl, templ, skyl, iconl, timel } = london;

  const getWeatherLondon = async () => {
    const api = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=london&appid=62029f0d3701271a5e50142b280915f0
`
    );
    const forecastapi = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=london&units=metric&appid=62029f0d3701271a5e50142b280915f0`
    );
    const data = await api.json();
    const datafore = await forecastapi.json();

    setLondon({
      ...london,
      datasl: data,
      datafl: datafore.list,
      templ: data.main.temp,
      skyl: data.weather[0].description,
      iconl: data.weather[0].icon,
    });
  };

  const [paris, setParis] = useState({
    datasp: [],
    datafp: [],
    temp: [],
    sky: [],
    icon: "",
    time: "",
  });

  const { datasp, datafp, temp, sky, icon, time } = paris;

  useEffect(() => {
    getWeatherParis();
    getWeatherMoscow();
    getWeatherLondon();
  }, []);

  const getWeatherParis = async () => {
    const api = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=paris&appid=62029f0d3701271a5e50142b280915f0
`
    );
    const forecastapi = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=paris&units=metric&appid=62029f0d3701271a5e50142b280915f0`
    );

    const data = await api.json();
    const datafore = await forecastapi.json();
    setParis({
      ...paris,
      datasp: data,
      datafp: datafore.list,
      temp: data.main.temp,
      sky: data.weather[0].description,
      icon: data.weather[0].icon,
      time: data.dt,
    });
  };

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openTwo, setOpenTwo] = React.useState(false);
  const [openThr, setOpenThr] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenTwo = () => {
    setOpenTwo(true);
  };

  const handleCloseTwo = () => {
    setOpenTwo(false);
  };

  const handleOpenThr = () => {
    setOpenThr(true);
  };

  const handlCloseThr = () => {
    setOpenThr(false);
  };

  const cels = Math.round(temp - 273.16);
  const celsl = Math.round(templ - 273.16);
  const celsm = Math.round(tempm - 273.16);

  const timeCity = (times) => {
    let a = new Date(times * 1000);
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time =
      "🗓" +
      date +
      " " +
      month +
      " " +
      year +
      "🕓" +
      " " +
      hour +
      ":" +
      min +
      "0";
    return time;
  };

  return (
    <div className="App">
      <header className="App-header">
        <HideAppBar />
      </header>

      <div className="Layout">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={7}
        >
          <Grid item>
            <Card className={classes.root} onClick={handleOpen}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Current weather in
                </Typography>
                <Typography variant="h5" component="h2">
                  {paris.datasp.name}
                </Typography>

                <img
                  src={`http://openweathermap.org/img/w/${icon}.png`}
                  alt="icon"
                  width="60"
                  height="50"
                />
                <Typography>Temperature: {cels}℃</Typography>
                <Typography>Description: {sky}</Typography>
              </CardContent>
            </Card>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <Card className={classes.modalCard} onClick={handleOpen}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        More weather information{" "}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {paris.datasp.name}
                      </Typography>
                      <Typography>
                        <Grid container direction="row" spacing={2}>
                          {paris.datafp.slice(0, 4).map((item) => (
                            <Grid item>
                              <div
                                style={{
                                  marginTop: 20,
                                  marginLeft: 15,
                                  borderRadius: 12,
                                  width: 150,
                                  boxShadow:
                                    "0 10px 45px rgba(0,0,0,.08), 0 5px 10px rgba(0,0,0,.05)",
                                  textAlign: "center",
                                }}
                              >
                                <br />
                                <Typography variant="h6" gutterBottom>
                                  {timeCity(item.dt)}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                  Temp: {item.main.temp}℃
                                </Typography>
                                <img
                                  src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                                  alt="icon"
                                  width="60"
                                  height="50"
                                />
                                <Typography variant="subtitle2" gutterBottom>
                                  Weather description :
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                  {item.weather[0].description}
                                </Typography>
                              </div>
                            </Grid>
                          ))}
                        </Grid>
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Fade>
            </Modal>
          </Grid>
          <Grid item>
            <Card className={classes.root} onClick={handleOpenTwo}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Current weather in
                </Typography>
                <Typography variant="h5" component="h2">
                  {london.datasl.name}
                </Typography>

                <img
                  src={`http://openweathermap.org/img/w/${icon}.png`}
                  alt="icon"
                  width="60"
                  height="50"
                />
                <Typography>Temperature: {celsl}℃</Typography>
                <Typography>Description: {skyl}</Typography>
              </CardContent>
            </Card>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openTwo}
              onClose={handleCloseTwo}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openTwo}>
                <div className={classes.paper}>
                  <Card className={classes.modalCard} onClick={handleOpenTwo}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        More weather information{" "}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {london.datasl.name}
                      </Typography>
                      <Typography>
                        <Grid container direction="row" spacing={2}>
                          {london.datafl.slice(0, 4).map((item) => (
                            <Grid item>
                              <div
                                style={{
                                  marginTop: 20,
                                  marginLeft: 15,
                                  borderRadius: 12,
                                  width: 150,
                                  boxShadow:
                                    "0 10px 45px rgba(0,0,0,.08), 0 5px 10px rgba(0,0,0,.05)",
                                  textAlign: "center",
                                }}
                              >
                                <Typography variant="h6" gutterBottom>
                                  {timeCity(item.dt)} <br />
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                  Temp: {item.main.temp}℃
                                </Typography>
                                <img
                                  src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                                  alt="icon"
                                  width="60"
                                  height="50"
                                />
                                <Typography variant="subtitle2" gutterBottom>
                                  Weather description :
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                  {item.weather[0].description}
                                </Typography>
                              </div>
                            </Grid>
                          ))}
                        </Grid>
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Fade>
            </Modal>
          </Grid>
          <Grid item>
            <Card className={classes.root} onClick={handleOpenThr}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Current weather in
                </Typography>
                <Typography variant="h5" component="h2">
                  {moscow.datasm.name}
                </Typography>

                <img
                  src={`http://openweathermap.org/img/w/${icon}.png`}
                  alt="icon"
                  width="60"
                  height="50"
                />
                <Typography>Temperature: {celsm}℃</Typography>
                <Typography>Description: {skym}</Typography>
              </CardContent>
            </Card>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openThr}
              onClose={handlCloseThr}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openThr}>
                <div className={classes.paper}>
                  <Card className={classes.modalCard} onClick={handleOpenThr}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        More weather information{" "}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {moscow.datasm.name}
                      </Typography>
                      <Typography>
                        <Grid container direction="row" spacing={2}>
                          {moscow.datafm.slice(0, 4).map((item) => (
                            <Grid item>
                              <div
                                style={{
                                  marginTop: 20,
                                  marginLeft: 15,
                                  borderRadius: 12,
                                  width: 150,
                                  boxShadow:
                                    "0 10px 45px rgba(0,0,0,.08), 0 5px 10px rgba(0,0,0,.05)",
                                  textAlign: "center",
                                }}
                              >
                                <Typography variant="h6" gutterBottom>
                                  {timeCity(item.dt)} <br />
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                  Temp: {item.main.temp}℃
                                </Typography>
                                <img
                                  src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                                  alt="icon"
                                  width="60"
                                  height="50"
                                />
                                <Typography variant="subtitle2" gutterBottom>
                                  Weather description :
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                  {item.weather[0].description}
                                </Typography>
                              </div>
                            </Grid>
                          ))}
                        </Grid>
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Fade>
            </Modal>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;