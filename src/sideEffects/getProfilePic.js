export default async function getProfilePic(email) {
    console.log("inside getprofiledata in userprofile", email)
    try{
    const response = await fetch("http://localhost:3333/users/getProfilePic", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    });

    const jsonData = await response.json();

    const gifData = jsonData?.data?.data?.data;
    console.log("data", gifData);


    let binary = '';
    const bytes = new Uint8Array(gifData);
    const length = bytes.byteLength;

    for (let i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
   }catch(error){
    toast.error("OOP's..Got some error while loading pic");
   }
}