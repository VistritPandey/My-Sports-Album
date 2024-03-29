import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { ImageBackground } from "react-native";
import styled from "styled-components";
import Text from "../components/Text";
import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";

export default SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const signIn = async () => {
    setLoading(true);

    try {
      await firebase.signIn(email, password);

      const uid = firebase.getCurrentUser().uid;

      const userInfo = await firebase.getUserInfo(uid);

      setUser({
        username: userInfo.username,
        email: userInfo.email,
        uid,
        profilePhotoUrl: userInfo.profilePhotoUrl,
        isLoggedIn: true,
      });
    } catch (error) {
      alert(error.message);
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
            {" "}
            Welcome Back
          </Text>
          <Text title semi center>
            {" "}
            to MSA
          </Text>
        </Main>
        <Auth>
          <AuthContainer>
            <AuthTitle> Email Address </AuthTitle>
            <AuthField
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              autoFocus={true}
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
        <SignInContainer onPress={signIn} disabled={loading}>
          {loading ? (
            <Loading />
          ) : (
            <Text bold center color="#fff">
              Sign In
            </Text>
          )}
        </SignInContainer>
        <SignUp onPress={() => navigation.navigate("SignUp")}>
          <Text small center>
            New to the App?{" "}
            <Text bold color="blue">
              Sign Up
            </Text>
          </Text>
        </SignUp>
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
  margin-top: 192px;
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
  margin: 64px 32px 32px;
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

const SignInContainer = styled.TouchableOpacity`
  margin: 0 32px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #002d72;
  border-radius: 6px;
`;

const SignUp = styled.TouchableOpacity`
  margin-top: 16px;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#ffffff",
  size: "small",
}))``;

const backgroundImg = styled.View`
  flex: 1;
  resizemode: "cover";
  justifycontent: "center";
`;
