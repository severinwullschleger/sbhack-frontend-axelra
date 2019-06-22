import React, { Component } from "react";
import styled from "styled-components";
import { Flex } from "../layout/layout";
import { View } from "react-native";
import { Input } from "react-native-elements";
import { _ } from "lodash";
import { TouchableOpacity } from "react-native";
import { __COLORS, __GRAY_SCALE } from "../layout/colors";
import { RegularText } from "../layout/typography";
import { __FONTS } from "../layout/fonts";
import { ScrollView } from "react-native";

const Container = styled(Flex)`
  padding: 20px;
  justify-content: center;
`;

const Predictions = styled(ScrollView)`
  flex-direction: column;
  padding: 10px;
`;

const Prediction = styled(TouchableOpacity)`
  padding: 18px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${__GRAY_SCALE._200};
`;

const PredictionText = styled(RegularText)`
  color: ${__COLORS.FIRST};
`;

class MyGoogleInputField extends Component {
  state = {
    predictions: [],
    selectedPrediction: ""
  };

  setPrediction(selectedPrediction) {
    this.setState({ selectedPrediction, predictions: [] });
  }

  sendRequest(text) {
    const API_KEY = "AIzaSyBPui8m2SN1pr_Fnaw8xKq_l0L9BQ8ZrSg";
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&types=geocode&key=${API_KEY}`
    )
      .then(response => response.json())
      .then(response => {
        this.setState({
          predictions: response.predictions.map(p => p.description)
        });
      })
      .catch(error => console.log);
  }

  getPredictions() {}

  render() {
    console.log(this.state.predictions);
    return (
      <Container flex={1}>
        <Input
          placeholder={this.props.placeholder}
          shake={true}
          returnKeyType={this.props.returnKeyType}
          label={this.props.label}
          value={this.state.selectedPrediction}
          labelStyle={{ color: __COLORS.FIRST, fontFamily: __FONTS.BOLD }}
          inputStyle={{ color: __COLORS.FIRST, fontFamily: __FONTS.REGULAR }}
          onChange={e => {
            const value = e.nativeEvent.text;
            this.setState({ selectedPrediction: value });
            this.sendRequest(value);
          }}
        />
        <Predictions>
          {this.state.predictions.map((p, i) => {
            return (
              <Prediction
                key={i}
                onPress={() => {
                  this.setPrediction(p);
                }}
              >
                <PredictionText>{p}</PredictionText>
              </Prediction>
            );
          })}
        </Predictions>
      </Container>
    );
  }
}

export default MyGoogleInputField;
