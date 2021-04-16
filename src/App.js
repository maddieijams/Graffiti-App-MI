import React, { Component } from "react";
import Sitebar from "./home/NavBar";
import "./App.css";
import Login from "./user/Login";
import Signup from "./user/Signup";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Container, Row, Col, Pagination, PaginationItem } from "reactstrap";
import CreateModal from "./home/CreateModal";
import EditModal from "./home/EditModal";
import APIURL from "../src/helpers/environment";

const imgStyle = {
  width: "95%",
  height: "95%",
  margin: "1em",
  borderRadius: "1em",
};

const mapStyles = {
  width: "95%",
  height: "95%",
  margin: "1em",
  borderRadius: "1em",
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionToken: "", //store the session token here so i can pass it to other components through props
      loginShowing: false,
      signupShowing: false,
      createShowing: false,
      editShowing: false,
      updateShowing: false,
      graffiti: [], //all graffiti
      userGraffiti: [], //graffiti for one user to display in modal
      currentPageNumber: 1,
      itemsPerPage: "",
    };
  }

  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token });
    }
    this.fetchGraffiti();
  }

  fetchGraffiti = () => {
    fetch(`${APIURL}/home`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((graffiti) =>
        this.setState({ graffiti: graffiti }, () =>
          console.log(this.state.graffiti)
        )
      );
  };

  setSessionState = (token) => {
    localStorage.setItem("token", token);
    this.setState({ sessionToken: token });
  };

  editClick = (e) => {
    this.toggleEdit();
    fetch(`${APIURL}/graffiti/getall`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.state.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((graffiti) =>
        this.setState({ userGraffiti: graffiti }, () => console.log(this.state))
      );
  };

  getAfterDelete = () => {
    fetch(`${APIURL}/graffiti/getall`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.state.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((graffiti) =>
        this.setState({ userGraffiti: graffiti }, () =>
          console.log(this.state.userGraffiti)
        )
      );
  };

  logoutFunc = (e) => {
    this.setState({
      sessionToken: "",
    });
    localStorage.clear();
  };

  toggleSignup = (e) => {
    this.setState({
      signupShowing: !this.state.signupShowing,
    });
  };

  toggleLogin = (e) => {
    this.setState({
      loginShowing: !this.state.loginShowing,
    });
  };

  toggleCreate = (e) => {
    this.setState({
      createShowing: !this.state.createShowing,
    });
  };

  editCreateToggle = (e) => {
    this.toggleCreate();
    this.toggleEdit();
  };

  toggleEdit = (e) => {
    this.setState({
      editShowing: !this.state.editShowing,
    });
  };

  toggleUpdate = (e) => {
    this.setState({
      updateShowing: !this.state.updateShowing,
    });
  };

  handleUpdate = () => {
    this.toggleEdit();
    this.toggleUpdate();
  };

  render() {
    return (
      <React.Fragment>
        <div className="main-container">
          <div>
            <Sitebar
              logout={this.logoutFunc}
              toggleLogin={this.toggleLogin}
              toggleSignup={this.toggleSignup}
              sessionToken={this.state.sessionToken}
              toggleCreate={this.toggleCreate}
              editClick={this.editClick}
            />
            {this.state.loginShowing ? (
              <Login
                setToken={this.setSessionState}
                toggleLogin={this.toggleLogin}
              />
            ) : null}
            {this.state.signupShowing ? (
              <Signup
                setToken={this.setSessionState}
                toggleSignup={this.toggleSignup}
              />
            ) : null}
          </div>
          <Pagination>
            <PaginationItem>
              {this.state.graffiti.map((el, index) => (
                <div className="itemDisplay" key={index}>
                  <Container>
                    <Row>
                      <Col className="text-center">
                        <h1 className="itemTitle">{el.title}</h1>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">
                        <p>{el.info}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <Map
                          google={window.google}
                          zoom={14}
                          style={mapStyles}
                          initialCenter={{
                            lat: el.lat,
                            lng: el.lng,
                          }}
                        >
                          <Marker title={el.title} />
                        </Map>
                      </Col>
                      <Col lg="6">
                        <img src={el.image} style={imgStyle} alt="something" />
                      </Col>
                    </Row>
                  </Container>
                </div>
              ))}
            </PaginationItem>
          </Pagination>

          {this.state.createShowing ? (
            <CreateModal
              toggleCreate={this.toggleCreate}
              fetchGraffiti={this.fetchGraffiti}
              sessionToken={this.state.sessionToken}
            />
          ) : null}

          <EditModal
            editCreateToggle={this.editCreateToggle}
            getAfterDelete={this.getAfterDelete}
            editClick={this.editClick}
            fetchGraffiti={this.fetchGraffiti}
            toggleEdit={this.toggleEdit}
            toggleUpdate={this.toggleUpdate}
            handleUpdate={this.handleUpdate}
            sessionToken={this.state.sessionToken}
            editShowing={this.state.editShowing}
            updateShowing={this.state.updateShowing}
            userGraffiti={this.state.userGraffiti}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBKSa_jZJbPCRrzxCTMp9s-tyJXnttO5c8",
})(App);
