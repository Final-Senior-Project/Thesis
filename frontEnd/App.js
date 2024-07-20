import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StripeProvider } from "@stripe/stripe-react-native";
import { Provider } from './Component/Auth.jsx';
import OnBording from './Screens/OnBordingScreen/OnBording.jsx';
import Role from './Screens/OnBordingScreen/Role.jsx';
import Login from './Screens/Registration/Login.jsx';
import TopTabNav from './Screens/Navigation/TopTabNav.jsx';
import BottomNavigation from './Screens/Navigation/BottomNavigation.jsx';
import LogInUser from './Screens/Registration/ClientLogIn.jsx';
import TopNav from './Screens/Navigation/TopNav.jsx';
import SignUp from './Screens/Registration/SignUp.jsx';
import Chat from './Screens/Chat/Chat.jsx';
import Profile from './Screens/Profile/Profile.jsx';
import Chats from './Screens/Chat/Chats.jsx';
import HomePage from './Screens/HomePage/HomePage.jsx';
import AllChats from './Screens/Chat/AllChats.jsx';
import EditProfile from './Screens/Profile/EditProfile.jsx';
import Subscribe from './Screens/Subscribe/Subscribe.jsx';
import ProductDetails from './Screens/PropertyDetails/ProductDetails.jsx'; 
import AllPropertiesPage from './Screens/HomePage/AllPropertiesPage.jsx';  
import FilteredProperties from './Screens/HomePage/FilteredProperties.jsx';
import Bottomsheet from './Component/Bottomsheet.jsx';
import Calender from './Screens/PropertyDetails/Calender.jsx'
import add from "./Screens/Owner/Add.jsx"
import Photo from './Screens/Owner/ImgPicker.jsx';
import EditProfilee from './Screens/Owner/EditProfilee';
import Profilee from './Screens/Owner/Profilee';
import ProductsDetails from './Screens/Owner/ProductsDetails.jsx'; 
import ExtraFeatures from './Screens/Owner/ExtraFeatures.jsx';
import OwnerBottomNavigation from './Screens/Owner/OwnerBottomNavigation.jsx';
import OwnerHomePage from './Screens/Owner/OwnerHomePage.jsx';
import OwnerAllChats from './Screens/Owner/OwnerAllChats.jsx';
import OwnerChats from './Screens/Owner/OwnerChats.jsx';
import OwnerChatRoom from './Screens/Owner/OwnerChatRoom.jsx';
import Edit from './Screens/Owner/update/Edit.jsx';
import Extra from "./Screens/Owner/update/Extraupdate.jsx"
import EditPhoto from './Screens/Owner/update/Photo.jsx';
import Search from './Screens/Search/Search.jsx';
import { ToastProvider } from 'react-native-fast-toast'



const Stack = createStackNavigator();
export default function App() {
  return (
    <ToastProvider>
    <StripeProvider publishableKey="pk_test_51PXUqxJX5WGHFkJ357yF3r3zYUZa5DG1brYSqTPvuq68dWTkyK6hKKGXwghw2ggTBbZIy6LvNwhlPA1nNlxbskhE00iE9RwmHl">
    <Provider>
      <NavigationContainer>
        
        <Stack.Navigator >
           <Stack.Screen name="OnBording" component={OnBording} options={{ headerShown: false }}/>
          <Stack.Screen name="Role" component={Role} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }} />  
          <Stack.Screen name="TopNav" component={TopNav} options={{ headerShown: false }}/>
          <Stack.Screen name="TopTabNav" component={TopTabNav} options={{ headerShown: false }}/>
          <Stack.Screen name="SignUp" component={SignUp}  options={{ headerShown: false }}/>  
           <Stack.Screen name="LogIn" component={LogInUser} options={{ headerShown: false }} />   
          <Stack.Screen name="OwnerNav" component={OwnerBottomNavigation} options={{ headerShown: false }}/>
          <Stack.Screen name="Navigation" component={BottomNavigation} options={{ headerShown: false }}/>
           <Stack.Screen name="ProductDetails" component={ProductDetails}   options={{ headerShown: false }}/>
           <Stack.Screen name="EditProperty" component={Edit}   options={{ headerShown: false }}/>
          <Stack.Screen name="Subscribe" component={Subscribe}  options={{ headerShown: false }}/>    
          <Stack.Screen name="Home" component={HomePage}  />
           <Stack.Screen name="FilteredProperties" component={FilteredProperties} />
          <Stack.Screen name="Calender" component={Calender} />
          <Stack.Screen name="AllProperties" component={AllPropertiesPage} options={{ title: 'All Properties', headerShown: false  }} />
          <Stack.Screen name="Search" component={Search}  options={{ headerShown: false }}/>  
          <Stack.Screen name="FiltredProperties" component={FilteredProperties}  options={{ headerShown: false }}/>  
          <Stack.Screen name="Profile" component={Profile}  options={{ headerShown: false }}/>
          <Stack.Screen name="EditProfile" component={EditProfile}  options={{ headerShown: false }}/> 
          <Stack.Screen name="Chat" component={Chat}  options={{ headerShown: false }}/> 
          <Stack.Screen name="AllChat" component={AllChats}  options={{ headerShown: false }}/>  
           <Stack.Screen name="Chats" component={Chats}  options={{ headerShown: false }}/> 
           <Stack.Screen name="bottom" component={Bottomsheet}  options={{ headerShown: false }}/>  
           <Stack.Screen name="HomePage" component={OwnerHomePage}  />   
            <Stack.Screen name="EditProfilee" component={EditProfilee}   options={{ headerShown: false }}/> 
          <Stack.Screen name="add" component={add} options={{ headerShown: false }}/>
          <Stack.Screen name="Extra" component={ExtraFeatures}  options={{ headerShown: false }}/>
           <Stack.Screen name="Profilee" component={Profilee}  options={{ headerShown: false }}/>    
          <Stack.Screen name="img" component={Photo} options={{ headerShown: false }}  />  
           <Stack.Screen name="ProductsDetails" component={ProductsDetails}   />    
           <Stack.Screen name="EditExtra" component={Extra}   />    
           <Stack.Screen name="EditImage" component={EditPhoto}   />    
           <Stack.Screen name="ownerchats" component={OwnerChats}   />    
           <Stack.Screen name="OwnerChatRoom" component={OwnerChatRoom}   />    
           <Stack.Screen name="OwnerAllChats" component={OwnerAllChats}   />    
           
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    </StripeProvider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
