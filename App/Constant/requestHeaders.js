import AsyncStorage from '@react-native-async-storage/async-storage';
export async function getHeaders() {
    const headers = {
      headers: {
        "Content-type": "application/json",
        // UserId: `${JSON.parse(AsyncStorage.getItem("user")).userId}`,
        "Authorization": `Bearer ${await AsyncStorage.getItem("userToken")}`,
      },
    };
    return headers;
  }