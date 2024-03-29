import { StatusBar } from "expo-status-bar";
import { ImageBackground, Platform } from "react-native";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import Text from "../components/Text";
import { AntDesign } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";

const image = { uri: "https://reactjs.org/logo-og.png" };
const axios = require('axios')
export default SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState();
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const getPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      return status;
    }
  };

  {
    /*Profile Photo */
  }

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.cancelled) {
        setProfilePhoto(result.uri);
      }
    } catch (error) {
      console.log("Error @pickImage:", error);
    }
  };

  const addProfilePhoto = async () => {
    const status = await getPermission();

    if (status !== "granted") {
      alert("We need permission to access your Photos");
      return;
    }
    pickImage();
  };

  const signUp = async () => {
    setLoading(true);

    const user = { username, email, password, profilePhoto };

    try {
      const createdUser = await firebase.createUser(user);
      global.email=email
      setUser({ ...createdUser, isLoggedIn: true });
      const urlNeeded = 'http://10.0.2.2:5000/insert-one/'+email+'/';
      // axios.post(urlNeeded, {"h":""})
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
      fetch(urlNeeded);
    } catch (error) {
      console.log("Error @signUp: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={backgroundImg}
        imageStyle={{ opacity: 0.3 }}
      >
        <Main>
          <Text title semi center>
            Sign Up for the App
          </Text>
        </Main>

        <ProfilePhotoContainer onPress={addProfilePhoto}>
          {profilePhoto ? (
            <ProfilePhoto source={{ uri: profilePhoto }} />
          ) : (
            <DefaultProfilePhoto>
              <AntDesign name="plus" size={24} color="#ffffff" />
            </DefaultProfilePhoto>
          )}
        </ProfilePhotoContainer>

        <Auth>
          <AuthContainer>
            <AuthTitle> Username </AuthTitle>
            <AuthField
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
              onChangeText={(username) => setUsername(username.trim())}
              value={username}
            />
            <AuthTitle> Email Address </AuthTitle>
            <AuthField
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(email) => setEmail(email.trim())}
              value={email}
            />
            <AuthTitle> Password </AuthTitle>
            <AuthField
              autoCapitalize="none"
              autoCompleteType="password"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password.trim())}
              value={password}
            />
          </AuthContainer>
        </Auth>
        <SignUpContainer onPress={signUp} disabled={loading}>
          {loading ? (
            <Loading />
          ) : (
            <Text bold center color="#fff">
              Sign Up
            </Text>
          )}
        </SignUpContainer>
        <SignIn onPress={() => navigation.navigate("SignIn")}>
          <Text small center>
            Already a user?{" "}
            <Text bold color="blue">
              Sign In
            </Text>
          </Text>
        </SignIn>
        <HeaderGraphic>
          <RightCircle />
          <LeftCircle />
        </HeaderGraphic>
        <StatusBar barStyle="light-content" />
      </ImageBackground>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Main = styled.View`
  margin-top: 160px;
`;

const RightCircle = styled.View`
  background-color: #f60000;
  position: absolute;
`;

const LeftCircle = styled.View`
  background-color: #febea8;
  position: absolute;
`;

const HeaderGraphic = styled.View`
  position: absolute;
  width: 100%;
  top: -50px;
  z-index: -100;
`;

const Auth = styled.View`
  margin: 16px 32px 32px;
`;

const AuthContainer = styled.View`
  margin-bottom: 32px;
`;
const AuthTitle = styled(Text)`
  color: #8e93a1;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 300;
`;
const AuthField = styled.TextInput`
  border-bottom-color: #8e93a1;
  border-bottom-width: 0.5px;
  height: 48px;
`;

const SignUpContainer = styled.TouchableOpacity`
  margin: 0 32px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #002d72;
  border-radius: 6px;
`;

const SignIn = styled.TouchableOpacity`
  margin-top: 16px;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#ffffff",
  size: "small",
}))``;

const ProfilePhotoContainer = styled.View`
  background-color: #e1e2e6;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  align-self: center;
  margin-top: 16px;
  overflow: hidden;
`;

const DefaultProfilePhoto = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ProfilePhoto = styled.Image`
  flex: 1;
`;

const backgroundImg = styled.View`
  flex: 1;
  resizemode: "cover";
  justifycontent: "center";
`;
