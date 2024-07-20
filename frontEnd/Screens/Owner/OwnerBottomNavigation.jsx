import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profilee from "../Owner/Profilee";
import Add from "./Add";
import { Octicons } from '@expo/vector-icons';
import { SimpleLineIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import OwnerHomePage from "./OwnerHomePage";
import OwnerChatRoom from "./OwnerChatRoom";
import SessionStorage from "react-native-session-storage";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

const OwnerBottomNavigation = () => {
  const email = SessionStorage.getItem("email");
  const ownerid = SessionStorage.getItem("ownerid");
  const navigation = useNavigation();
  const onPressHome = () =>
    navigation.navigate("OwnerHomePage", { screen: "OwnerHomePage" });

  const renderIconWithDot = (IconComponent, iconName, focused, iconSize = 24) => (
    <View style={styles.iconContainer}>
      <IconComponent name={iconName} size={iconSize} color={focused ? "#4d8790" : "gray"} />
      {focused && <View style={styles.dot} />}
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={OwnerHomePage}
        options={{
          tabBarIcon: ({ focused }) => renderIconWithDot(Octicons, "home", focused),
        }}
      />
      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          tabBarIcon: ({ focused }) => renderIconWithDot(MaterialIcons, "add", focused),
        }}
      />
        <Tab.Screen
        name="Chat"
        component={OwnerChatRoom}
        options={{
          tabBarIcon: ({ focused }) => renderIconWithDot(Ionicons, "chatbox-ellipses-outline", focused),
        }}
      />
      <Tab.Screen
        name="Profilee"
        component={Profilee}
        options={{
          tabBarIcon: ({ focused }) => renderIconWithDot(SimpleLineIcons, "user", focused),
        }}
      />
    </Tab.Navigator>
  );
};

export default OwnerBottomNavigation;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffffff",
    height: 60,
    borderTopWidth: 0,
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4d8790",
    marginTop: 4,
  },
});
