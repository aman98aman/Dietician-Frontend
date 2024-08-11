import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LiaWhatsapp } from "react-icons/lia";
import { decodeJwt } from "../../middelwares";
import { useSelector } from "react-redux";


const Requests = () => {
  const [allRequests, setAllRequests] = useState([]);
  const token = localStorage.getItem("dietToken");
  const decoded = token ? decodeJwt(token) : null;
  const allUser = useSelector((state) => state.allUser.userArr || []);

  console.log("all requestinside requests.jsx", allRequests)

  async function handleDelete(comingIndex, id) {
    try {
      const res = await fetch("http://localhost:3333/request/deleteRequest", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: id })
      });

      const resJson = await res.json();
      if (resJson.success) {
        // Correctly filter out the deleted item
        const newState = allRequests.filter((_, index) => index !== comingIndex);
        setAllRequests(newState);
        toast.success("Deleting Successful");
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      toast.error("Network error");
    }
  }

  function openWhatsApp(comingIndex){
    console.log(allRequests)
    //const request = allRequests.filter( (index)=> index != comingIndex);
    const url = `https://wa.me/${allRequests?.[comingIndex]?.phoneNumber}`;
    // const url = `https://web.whatsapp.com/send?phone=6387651169`
    window.open(url, '_blank');
  }

  function fetchdata(){
    const data = fetch("http://localhost:3333/users/allUser").then((data)=>{
      const resData = data.json();
      dispatch(setUserDetails(resData.data))
    })
  }

  useEffect(()=>{
    if(!allUser){
      fetchdata()
    }    
  },[])
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3333/request/getRequest");
        const jsonres = await res.json();
        if (jsonres.success) {
          setAllRequests(jsonres.data);
        } else {
          toast.error("Failed to fetch requests");
        }
      } catch (e) {
        toast.error("Oops something went wrong!!");
      }
    }

    fetchData();
  }, []);

  return (
    <main className="mt-[95%] mx-8 my-4 p-2 lg:mx-16 md:mt-[12%] lg:mt-0">
      <h1 className="my-4 mb-8 text-3xl text-black">
        <i className="ai ai-hands-clapping-fill mr-3 text-2xl text-black"></i>
        Requests
      </h1>
      <section className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">

        {
          (allRequests.length == 0) ? <div className="text-white">You have no request right now...!!!</div> : allRequests.map((value, index) => (
            <div className="relative rounded-lg bg-white px-8 py-8 shadow-md" key={index}>
              <div className="flex flex-col flex-wrap">
                <div className="my-auto -mt-4">
                  <i className="ai ai-carrot-fill absolute right-4 top-4 text-right text-xl text-orange-400"></i>
                </div>
                <div className="my-4 mb-6">
                  <h4 className="font-serif text-xl">{value.name}</h4>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  className="py-2 px-3 bg-blue-500 rounded-md text-white hover:border-b-4 hover:rounded-md hover:border-slate-300-400 hover:bg-red-600 dark:hover:bg-gray-300 dark:hover:text-slate-950"
                  onClick={() => { handleDelete(index, value._id); }}
                >
                  Delete
                </button>
                <LiaWhatsapp
                  style={{ color: 'green', fontSize: '50px' }} 
                  onClick={() => openWhatsApp(index)}
                  />
                  
              </div>
            </div>
          ))}
      </section>
    </main>
  );
};

export default Requests;
