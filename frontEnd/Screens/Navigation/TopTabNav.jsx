import { View, Text, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import Login from "../Registration/Login";
import SignUp from "../Registration/SignUp";
import ResImage from "../../Component/ResImg";
const Tab = createMaterialTopTabNavigator();
const TopTabNav = ({ route }) => {
  const { showCINImage } = route.params;
  return (
    <View>
      <ScrollView>
        <View style={{ marginTop: 30 }}>
       
          <Tab.Navigator style={{ height: 805 }}>
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen
              name="SignUp"
              component={SignUp}
              initialParams={{ showCINImage: showCINImage }}
            />
          </Tab.Navigator>
        </View>
      </ScrollView>
    </View>
  );
};

export default TopTabNav;
