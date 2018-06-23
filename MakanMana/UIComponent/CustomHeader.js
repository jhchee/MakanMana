import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { DrawerActions } from "react-navigation";
import { Header, Body, Title, Content, Left, Right } from "native-base";
import { Icon } from "react-native-elements";

class CustomHeader extends React.Component {
  render() {
    return (
      <Header style={styles.header}>
        <Left>
          <Icon
            name="ios-menu"
            type="ionicon"
            onPress={() => this.props.drawerOpen()}
            size={28}
            color="white"
          />
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "orange"
  }
});
export default CustomHeader;
