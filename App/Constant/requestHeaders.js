import AsyncStorage from '@react-native-async-storage/async-storage';
export async function getHeaders(type) {
    var userToken;
   await AsyncStorage.multiGet(["userMode", "userToken","userDetail"]).then(response => {
      console.log("Key ->> ",response) // Key1
      userToken = response[1][1];
      console.log("userToken ->> ",userToken)
  });
    const headers = {
      headers: {
        "Content-type": type == "multipart" ? "multipart/form-data" : "application/json",
        // UserId: `${JSON.parse(AsyncStorage.getItem("user")).userId}`,
        "Authorization": `Bearer ${userToken}`,
      },
    };
    return headers;
  }