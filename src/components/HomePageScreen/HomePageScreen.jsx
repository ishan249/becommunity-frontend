import React, { useContext, useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import "./HomePageScreen.css";
import userImg from "../../assets/WhatsApp Image 2022-04-29 at 5.15.34 PM.jpeg";
import AuthContext from "../../context/AuthContext";
function HomePageScreen() {
  const { authToken } = useContext(AuthContext);
  const [postsData, setPostsData] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([])
  useEffect(() => {
    get_post();
    get_joined_communities();
  }, []);

  const get_post = async () => {
    let response = await fetch("http://127.0.0.1:8000/get-post/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken.refresh}`,
      },
    });
    let data = await response.json();
    console.log("posts",data);
    setPostsData(data);
  };

  const get_joined_communities = async () =>{
    let response = await fetch("http://127.0.0.1:8000/get_user_joined_community/",{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken.refresh}`,
      },
    })
    let data = await response.json();
    console.log("communities joined",data);
    setJoinedCommunities(data);
  }

  const [open, setOpen] = useState(true);

  return (
    <div className="bg-[#0F2A36]">
      <header
        id="navbar"
        className="relative z-20 bg-[#0F2A36] shadow-xl w-full sticky top-0 left-0"
      >
        <nav className="container md:flex items-center flex-row w-full py-[5px] md:pl-0 pl-5 md:px-1">
          <div
            onClick={() => setOpen(!open)}
            className="text-2xl absolute left-5 top-4 cursor-pointer"
          >
            <i
              className={
                open ? "fa fa-close text-white" : "fa-solid fa-bars text-white"
              }
            ></i>
          </div>

          <div className="w-1/4 font-bold text-2xl cursor-pointer flex text-left items-center">
            <a className="flex flex-row no-underline" href="/">
              <span className="text-white font-Inter">BeCommunity</span>
            </a>
          </div>

          <div className="w-1/2 font-bold text-2xl cursor-pointer flex text-left items-center">
            <div className="relative w-5/6">
              <i
                class="fa fa-search absolute text-xl top-[6px] right-3 text-white"
                aria-hidden="true"
              ></i>
              <input
                className="bg-[#0B222C] h-9 w-full rounded-lg text-white pl-2 font-medium"
                placeholder="Search"
                type="text"
                name="search"
                id="search"
              />
            </div>
          </div>

          <div className="w-1/4 flex items-center justify-end">
            <div
              id="create"
              className="flex w-fit h-fit px-2 pb-2 items-center justify-center text-center rounded-lg mr-0"
            >
              <Tooltip
                className="transition delay-40 ease-in duration-400 text-black"
                title="Create a Community"
                arrow
              >
                <button className="text-4xl text-white font-semibold font-Inter">+</button>
              </Tooltip>
            </div>

            <div className="flex w-14 h-14 items-center justify-center mx-2 cursor-pointer">
              <button className="rounded-full object-fit mx-1 bg-white">
                <img src={userImg} className="rounded-full" alt="userimg" />
              </button>
              <i className="fa fa-caret-down text-white"></i>
            </div>
          </div>
        </nav>
      </header>

      <div
        style={{ justifyContent: open ? "space-between" : "space-around" }}
        className="w-full flex bg-[#0F2A36]"
      >
        <div
          style={{ display: open ? "block" : "none" }}
          className="w-1/5 font-Inter h-screen flex flex-col items-center shadow-xl z-10 p-2 bg-[#0B222C] left-0 top-10 sticky overflow-y-auto"
        >
          <div className="w-2/3 bg-[#0F2A36] text-white py-2 text-center text-xl rounded-lg w-full mt-4 mb-4 cursor-pointer">
            Home
          </div>
          <div className="w-2/3 bg-[#0B222C] text-white py-2 text-center text-xl rounded-lg w-full mb-4 cursor-pointer">
            Top
          </div>
          <div className="w-2/3 bg-[#0B222C] text-white py-2 text-center text-xl rounded-lg w-full mb-4 cursor-pointer">
            New
          </div>
          <div className="w-2/3 border-b-2 border-white text-white py-2 text-left text-xl w-full mb-4">
            Joined
          </div>


          {joinedCommunities.map((community)=>(
             <div key={community.id} className="w-2/3 bg-[#0B222C] text-white py-2 text-center text-xl rounded-lg w-full mb-4 cursor-pointer">
             {community.name}
           </div>
          ))}
        </div>

        <div className={`${open ? 'w-3/5' : 'w-4/5'} flex flex-col items-center shadow-xl z-10 p-2 bg-[#0F2A36] rounded-lg pt-5`}>
          {postsData.map((post) => (
            <div className="font-Inter w-2/3 rounded-lg bg-[#0B222C] py-3 mb-5">
              <div className="title text-[#ACACAC] py-2 px-4">
                {post.post_creator} | {post.community}
              </div>
              <div className="content font-semibold text-lg text-white px-4 pb-2">{post.title}</div>
              <div className="content text-[#c2c2c2] px-4 pb-4">
                {post.description}
              </div>
              {post.image && (
                <div>
                  <img src={`http://127.0.0.1:8000${post.image}`} alt="" />
                </div>
              )}
            </div>
          ))}

          {/* <div className="w-2/3 rounded-lg bg-[#0B222C] py-3 mb-5 border border-white">
            <div className="title text-[#ACACAC] py-2 px-4">
              Sam67 | SpaceTalks
            </div>
            <div className="content text-white px-4 pb-4">
              Batman trilogy is the only good DC movie according to me in a
              longest time. #DC #Batman #Nolan
            </div>

            <div className="reactions text-white px-4 pb-4">
              <i class="fa-solid fa-arrow-up text-white cursor-pointer">
                <span className="text-gray-400 mx-2">67</span>
              </i>
              <i class="fa-solid fa-arrow-down text-white ml-4 cursor-pointer">
                <span className="text-gray-400 mx-2">23</span>
              </i>
            </div>
          </div> */}
          {/* <div className="w-2/3 rounded-lg bg-[#0B222C] py-3 mb-5">
            <div className="title text-[#ACACAC] py-2 px-4">
              Sam67 | SpaceTalks
            </div>
            <div className="content text-white px-4 pb-4">
              Batman trilogy is the only good DC movie according to me in a
              longest time. #DC #Batman #Nolan
            </div>

            <div className="reactions text-white px-4 pb-4">
              <i class="fa-solid fa-arrow-up text-white cursor-pointer">
                <span className="text-gray-400 mx-2">67</span>
              </i>
              <i class="fa-solid fa-arrow-down text-white ml-4 cursor-pointer">
                <span className="text-gray-400 mx-2">23</span>
              </i>
            </div>
          </div> */}
        </div>

        <div className="w-1/5 h-screen font-Inter flex flex-col shadow-xl z-10 p-2 bg-[#0B222C] rounded-lg sticky right-0 top-10">
          <p className="text-center text-white mt-5 font-medium text-xl">
            Popular Communities
          </p>
          <p className="text-center text-white mt-1 font-medium text-xl">
            <span className="text-lg font-small text-left text-[#ACACAC] mr-10 cursor-pointer hover:underline">
              Arts
            </span>
            <span className="text-lg font-small text-right text-[#ACACAC] ml-10 cursor-pointer hover:underline">
              Space
            </span>
          </p>
          <p className="text-center text-white mt-1 font-medium text-xl">
            <span className="text-lg font-small text-left text-[#ACACAC] mr-7 cursor-pointer hover:underline">
              Gaming
            </span>
            <span className="text-lg font-small text-right text-[#ACACAC] ml-7 cursor-pointer hover:underline">
              Cinema
            </span>
          </p>
          <p className="text-center text-white mt-1 font-medium text-xl">
            <span className="text-lg font-small text-left text-[#ACACAC] mr-9 cursor-pointer hover:underline">
              Books
            </span>
            <span className="text-lg font-small text-right text-[#ACACAC] ml-9 cursor-pointer hover:underline">
              Tech
            </span>
          </p>
          <div className="w-full flex flex-col items-center">
            <div className="w-2/3 bg-[#0F2A36] text-white py-2 text-center text-xl rounded-lg w-full mt-4 mb-4 cursor-pointer">
              Link 1
            </div>
            <div className="w-2/3 bg-[#0F2A36] text-white py-2 text-center text-xl rounded-lg w-full mb-4 cursor-pointer">
              Link 2
            </div>
            <div className="w-2/3 bg-[#0F2A36] text-white py-2 text-center text-xl rounded-lg w-full mb-4 cursor-pointer">
              Link 3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageScreen;
