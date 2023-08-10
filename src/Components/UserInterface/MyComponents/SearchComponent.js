import { Paper, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { LocationOn } from "@mui/icons-material";
import { ServerURL, getData, postData } from "../../Services/FetchBackendData";
import { List, ListItem, ListItemText } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import DateDiff from "date-diff";

export default function SearchComponent(props) {
  const [selectedCity, setSelectedCity] = useState("Gwalior");
  const [open, setOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [startTime, setStartTime] = useState("Start Time");
  const [endTime, setEndTime] = useState("End Time");
  const [daysTime, setDaysTime] = useState("");
  const [days, setDays] = useState("");
  const [hrs, sethrs] = useState("");
  var navigate = useNavigate();
  var dispatch = useDispatch();
  var bookingDetails = useSelector((state) => state.booking);

  const fetchCities = async () => {
    var response = await getData("user/display_cities");
    setCities(response.data);
  };

  useEffect(function () {
    fetchCities();
  }, []);

  const handleCitySelect = (cityselected) => {
    setSelectedCity(cityselected);
    setOpen(false);
  };

  const showTopCityList = () => {
    return cities.map((item) => {
      return (
        <>
          {item.status == "Top City" ? (
            <ListItem Button>
              <ListItemText
                primary={
                  <span style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item.cityname}
                  </span>
                }
                onClick={() => handleCitySelect(item.cityname)}
              />
            </ListItem>
          ) : (
            <></>
          )}
        </>
      );
    });
  };

  const showOtherCityList = () => {
    return cities.map((item) => {
      return (
        <>
          {item.status == "Other City" ? (
            <ListItem Button>
              <ListItemText
                style={{ fontSize: 18, fontWeight: "bold" }}
                primary={item.cityname}
                onClick={() => handleCitySelect(item.cityname)}
              />
            </ListItem>
          ) : (
            <></>
          )}
        </>
      );
    });
  };

  const handleCityDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cityDialog = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          style={{ borderRadius: 20, height: "80%" }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            {"Select City"}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <List>
              <div style={{ fontFamily: "cursive", fontWeight: "bolder" }}>
                Top Cities
              </div>
              {showTopCityList()}
            </List>
            <Divider />
            <List>
              <div style={{ fontFamily: "cursive", fontWeight: "bolder" }}>
                Other Cities
              </div>
              {showOtherCityList()}
            </List>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const handleSetStartTimeValue = (newValue) => {
    setStartTime(newValue);
  };
  const handleSetEndTimeValue = (newValue) => {
    setEndTime(newValue);
    dateDiff(newValue);
  };

  const dateDiff = () => {
    var startDay = new Date(startTime);
    var endDay = new Date(endTime);
    var diff = new DateDiff(endDay, startDay);
    setDays(parseInt(diff.days()));
    sethrs(Math.ceil(diff.hours() % 24));
    setDaysTime(
      "Duration : " +
        parseInt(diff.days()) +
        " Days " +
        Math.ceil(diff.hours() % 24) +
        " Hrs"
    );
  };

  const handleClick = async () => {
    if ((days >= 0 && hrs > 0) || (days > 0 && hrs >= 0)) {
      dispatch({
        type: "ADD_BOOKING",
        payload: {
          city: selectedCity,
          starttime: startTime,
          endtime: endTime,
          duration: daysTime,
          days: days,
          hrs: hrs,
        },
      });
      navigate("/vehicle_details");
    } else {
      alert("Invalid date/time pls choose correct date & time....");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <img src="/assets/Slider2.png" style={{ width: "100%", height: 570 }} />
      <div style={{ position: "absolute", left: "5%", top: "6%" }}>
        <Paper
          elevation={3}
          style={{
            flexDirection: "column",
            display: "flex",
            padding: 45,
            width: 450,
            alignItems: "center",
            height: 390,
            borderRadius: 15,
          }}
        >
          <div
            style={{
              position: "relative",
              padding: 10,
              background: "#40739e",
              width: 430,
              height: 60,
              borderRadius: 15,
            }}
          >
            <div style={{ position: "absolute", left: "2%", top: "12%" }}>
              <div style={{ position: "relative" }}>
                <img
                  src="/assets/message1.png"
                  style={{ width: 216, height: 80 }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "33%",
                    top: 1,
                    fontFamily: "cursive",
                    fontWeight: "bolder",
                    fontSize: 24,
                  }}
                >
                  Rentals
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "27%",
                    top: "40%",
                    fontFamily: "cursive",
                    fontWeight: "350",
                    fontSize: 12,
                    flexDirection: "column",
                  }}
                >
                  For Hours and Days
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", left: "50%", top: "12%" }}>
              <div style={{ position: "relative" }}>
                <img
                  src="/assets/message1.png"
                  style={{ width: 215, height: 80, flexDirection: "column" }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "18%",
                    top: 1,
                    fontFamily: "cursive",
                    fontWeight: "bolder",
                    fontSize: 24,
                  }}
                >
                  Subscription
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "23%",
                    top: "40%",
                    fontFamily: "cursive",
                    fontWeight: "350",
                    fontSize: 12,
                    flexDirection: "column",
                  }}
                >
                  For Months and Years
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src="/assets/rentals2.png"
              style={{ width: 120, marginTop: "20%" }}
            />
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#7f8c8d",
              marginTop: 8,
              fontFamily: "cursive",
            }}
          >
            Self Drive Car Rental In INDIA
          </div>
          <div
            onClick={handleCityDialog}
            style={{
              cursor: "pointer",
              alignItems: "center",
              marginTop: "6%",
              display: "flex",
              padding: 15,
              width: 390,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: 25,
              border: "1px solid #bdc3c7",
            }}
          >
            <LocationOn />
            <span style={{ fontSize: 20, fontWeight: 600, paddingLeft: 10 }}>
              {selectedCity}
            </span>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                cursor: "pointer",
                alignItems: "center",
                display: "flex",
                padding: 15,
                width: 179,
                borderBottomLeftRadius: 10,
                height: 25,
                border: "1px solid #bdc3c7",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                  label={
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#7f8c8d",
                      }}
                    >
                      Start Time
                    </span>
                  }
                  InputProps={{
                    disableUnderline: true,
                  }}
                  value={startTime}
                  onChange={(newValue) => {
                    handleSetStartTimeValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField variant="standard" {...params} />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div
              style={{
                cursor: "pointer",
                alignItems: "center",
                display: "flex",
                padding: 15,
                width: 179,
                borderEndEndRadius: 10,
                height: 25,
                border: "1px solid #bdc3c7",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                  label={
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#7f8c8d",
                      }}
                    >
                      End Time
                    </span>
                  }
                  InputProps={{
                    disableUnderline: true,
                  }}
                  value={endTime}
                  onChange={(newValue) => {
                    handleSetEndTimeValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField variant="standard" {...params} />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div
            style={{
              color: "#7f8c8d",
              fontWeight: 600,
              fontSize: 11,
              marginTop: 10,
            }}
          >
            {daysTime}
          </div>
          <div style={{ position: "absolute", left: "11%", top: "78%" }}>
            <div
              onClick={handleClick}
              style={{
                cursor: "pointer",
                borderRadius: 50,
                border: "1px solid #bdc3c7",
                background: "#f39c12",
                margin: "5%",
                height: 60,
                width: 380,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <span style={{ color: "white", fontSize: 20, fontWeight: 600 }}>
                Search
              </span>
            </div>
          </div>
        </Paper>
      </div>
      <div>{cityDialog()}</div>
    </div>
  );
}
