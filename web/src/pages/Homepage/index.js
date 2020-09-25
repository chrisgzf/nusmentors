import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Container,
  Grid,
} from "@material-ui/core";
import LogoIcon from "components/LogoIcon";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import ImageFirst from "./img/mentee_1.svg";
import ImageSecond from "./img/mentor_3.svg";
import ImageThird from "./img/mentor_2.svg";

const features = [
  {
    title: <>Look for mentors</>,
    imgUrl: ImageFirst,
    description: (
      <>
        NUSMentors helps you find mentors that are
        proficient in your area of interest
      </>
    ),
  },
  {
    title: <>Connect with mentees</>,
    imgUrl: ImageSecond,
    description: (
      <>
        NUSMentors connects you with mentees and
        enables you to build your network with juniors in a meaningful way
      </>
    ),
  },
  {
    title: <>All in one platform</>,
    imgUrl: ImageThird,
    description: (
      <>
        Looking to do both? You can obtain mentorship and also mentor others in NUSMentors!
      </>
    ),
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    color: "white",
    marginBottom: "10px",
    fontSize: "45px",
    textShadow: "0.5px 0.5px #A3AAAF",

  },
  heroSubtitle: {
    color: "white",
    marginBottom: "30px",
    fontSize: "25px",
    textShadow: "0.5px 0.5px #A3AAAF",
  },
  button: {
    "&:hover": {
      backgroundColor: "aliceblue",
      color: "#1FAAFF",
      transitionDelay: "0.3",
    },
    color: "white",
    border: "solid",
    borderColor: "aliceblue",
    textAlign: "left",
    fontSize: "22px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  appHeader: {
    minHeight: "46vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    backgroundColor: "#1FAAFF",
  },
  features: {
    display: "flex",
    alignItems: "center",
    padding: "2rem 0",
    width: "100%",
  },
  feature: {},
  featureImage: {
    height: "200px",
    width: "200px",
  },
  description: {
    fontSize: "18px",
  },
  title: {
    fontSize: "22px",
    marginBottom: "6px",
  }
}));

function Feature({ imgUrl, title, description }) {
  const classes = useStyles();
  return (
    <Grid item sm={4}>
      {imgUrl && (
        <div>
          <img className={classes.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h1 className={classes.title}>{title}</h1>
      <div className={classes.description}>{description}</div>
    </Grid>
  );
}
function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <header className={classes.appHeader}>
        {/* <LogoIcon scale="90%"/> */}
        <h1 className={classes.heroTitle}>Welcome to NUSMentors</h1>
        <div className={classes.heroSubtitle}>
          If you're looking for a mentorship, you've come to the right place!
        </div>
        <Button
          variant="outlined"
          size="large"
          href="/dashboard"
          className={classes.button}
        >
          Get Started
        </Button>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={classes.features}>
            <Container>
              <Grid container spacing={6}>
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </Grid>
            </Container>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
