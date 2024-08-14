import React, { useEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    StyleSheet,
    Switch,
    ScrollView,
    ScrollViewProps,
  } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import SignOut from './SignOut.web';

export default function CustomDrawer(props: any) {
  const { user } = props;

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <ImageBackground
          source={require("../assets/background.png")}
          style={{ padding: 25}}
        >
          <Image
            alt="Not find"
            source={{uri: user?.picture}}
            style={styles.userAvatar}
          />
          <Text style={styles.userText}> {user?.name.split(" ")[0]} </Text>
        </ImageBackground>

        <View style={styles.drawerItemList}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          // backgroundColor: colors.cardbackground,
        }}
      >
        <Text style={styles.preferences}>Preferences</Text>

        <View style={styles.switchTextContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor="#f4f3f4"
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
          />
          <Text
            style={{
              fontSize: 15,
            }}
          >
            Dark Theme
          </Text>
        </View>
      </View> */}
      
      <View style={styles.userActions}>
        <TouchableOpacity onPress={() => {}} style={styles.shareButton}>
          <View style={styles.shareView}>
            <Ionicons name="share-social-outline" size={22} />
            <Text style={styles.shareText} > Tell a Friend </Text>
          </View>
        </TouchableOpacity>

        <SignOut />
      </View>
    
    </View>
  );
};



const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: "#9288F9",
    paddingTop: 0,
    // marginTop: -50,
    // margin: 0,
    // zIndex: 10,
  },
  userAvatar: {
    height: 67.5,
    width: 67.5,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 30,
    backgroundColor: "#FFBF00",
    borderWidth: 1,
    borderColor: "#6495ED"
  },
  userText: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 5,
  },
  drawerItemList : { 
    flex: 1, 
    backgroundColor: "#fff", 
    paddingTop: 10 
  },
  // switchTextContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginLeft: 7,
  //   paddingVertical: 5,
  // },
  // preferences: {
  //   fontSize: 16,
  //   color: "#ccc",
  //   paddingTop: 10,
  //   fontWeight: "500",
  //   paddingLeft: 20,
  // },
  switchText: {
    fontSize: 17,
    color: "",
    paddingTop: 10,
    fontWeight: "bold",
  },
  userActions: { 
    padding: 20, 
    borderTopWidth: 1, 
    borderTopColor: "#ccc" 
  },
  shareButton: { 
    paddingVertical: 15 
  },
  shareView: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  shareText: {
    fontSize: 15,
    marginLeft: 5,
  }
});
  