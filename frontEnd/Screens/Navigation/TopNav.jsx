import { View, Text, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import ResImage from "../../Component/ResImg";
import LogInUser from "../Registration/ClientLogIn";
import SignUp from "../Registration/SignUp";
const Tab = createMaterialTopTabNavigator();
const TopNav = ({ route }) => {
  const { showCINImage } = route.params;
  return (
    <View>
      <ScrollView>
        <View style={{ marginTop: 30 }}>
     

          <Tab.Navigator style={{ height: 805 }}>
            <Tab.Screen name="LogIn" component={LogInUser} />
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

export default TopNav;
