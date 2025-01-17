// @flow
import React, { Component } from "react";
import { View, Text, TextStyle} from "react-native";
import moment from "moment";

export default class TimeAgo extends Component {
  props: {
    time: string,
    interval?: number,
    hideAgo?: boolean,
    textStyle?: TextStyle,
  };
  state: { timer: null | number } = { timer: null };

  static defaultProps = {
    hideAgo: false,
    interval: 60000
  };

  componentDidMount() {
    this.createTimer();
  }

  createTimer = () => {
    this.setState({
      timer: setTimeout(() => {
        this.update();
      }, this.props.interval)
    });
  };

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  update = () => {
    this.forceUpdate();
    this.createTimer();
  };

  render() {
    const { time, hideAgo, textStyle } = this.props; // added textstyle prop
    return (
      <Text style = {textStyle} {...this.props}>
        {moment(time).fromNow(hideAgo)}
      </Text>
    );
  }
}
