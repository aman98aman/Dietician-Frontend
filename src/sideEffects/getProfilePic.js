import api from "../components/AxiosInterceptor";

export default async function getProfilePic(email) {
  console.log("inside getprofiledata in userprofile", email);
  try {
    const response = await api.post(
      "/users/getProfilePic",
      JSON.stringify({ email: email }),
    );

    const jsonData = response;

    const gifData = jsonData?.data?.data?.data;
    console.log("data", gifData);

    let binary = "";
    const bytes = new Uint8Array(gifData);
    const length = bytes.byteLength;

    for (let i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
  } catch (error) {
    toast.error("OOP's..Got some error while loading pic");
  }
}
