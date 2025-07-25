import React, { useRef, useState } from 'react'
import { IoArrowBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import dp from "../assets/dp.webp";
import { setUserData } from '../redux/userSlice';
import { setProfileData } from '../redux/userSlice';
import { serverUrl } from '../App';
import axios from 'axios';

const EditProfile = () => {
  const { userData } = useSelector(state => state.user);
  const navigate = useNavigate();
  const imageInput = useRef();
  const [name, setName] = useState(userData?.name || "")
  const [userName, setUserName] = useState(userData?.userName || "")
  const [bio, setBio] = useState(userData?.bio || "")
  const [profession, setProfession] = useState(userData?.profession || "")
  const [gender, setGender] = useState(userData?.gender || "")

  const [frontendImage, setFrontendImage] = useState(userData?.profileImage || dp);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleEditProfile = async () => {
    setLoading(true)
    try {
      const formdata = new FormData()
      formdata.append("name", name)
      formdata.append("userName", userName)
      formdata.append("bio", bio)
      formdata.append("profession", profession)
      formdata.append("gender", gender)
      if (backendImage) {
        formdata.append("profileImage", backendImage)
      }
      const result = await axios.post(`${serverUrl}/api/user/editProfile`, formdata, { withCredentials: true })
      
      // Only update specific fields instead of replacing the entire userData object
      const updatedUserData = {
        ...userData,
        name: result.data.name,
        userName: result.data.userName,
        bio: result.data.bio,
        profession: result.data.profession,
        gender: result.data.gender,
        profileImage: result.data.profileImage
      };

      // Update only the profile-specific data while preserving followers/following
      const updatedProfileData = {
        ...userData, // Keep existing data including followers/following
        name: result.data.name,
        userName: result.data.userName,
        bio: result.data.bio,
        profession: result.data.profession,
        gender: result.data.gender,
        profileImage: result.data.profileImage
      };
      
      dispatch(setUserData(updatedUserData))
      dispatch(setProfileData(updatedProfileData))
      
      setLoading(false)
      navigate(`/profile/${result.data.userName}`) // Use updated userName in case it changed
    } catch (error) {
      console.error("Edit profile error:", error);
      setLoading(false) // Make sure to set loading to false on error
    }
  }

  return (
    <div className='w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px]'>
      <div className='w-full h-[80px] flex items-center gap-[20px] px-[20px]'>
        <IoArrowBackSharp
          className='text-white cursor-pointer w-[25px] h-[25px]'
          onClick={() => navigate(`/profile/${userData.userName}`)}
        />
        <h1 className='text-white text-[20px] font-semibold'>Edit Profile</h1>
      </div>

      <div
        className='w-[70px] h-[70px] md:w-[100px] md:h-[100px] border-2 border-black rounded-full cursor-pointer overflow-hidden'
        onClick={() => imageInput.current.click()}
      >
        <input
          type="file"
          accept='image/*'
          ref={imageInput}
          hidden
          onChange={handleImage}
        />
        <img src={frontendImage} alt="dp" className='w-full h-full object-cover' />
      </div>

      <div className='text-blue-500 text-center text-[18px] font-semibold cursor-pointer' onClick={() => imageInput.current.click()}>
        Change your Profile Picture
      </div>

      <input
        type="text"
        className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none'
        placeholder='Enter your Name'
        onChange={(e) => setName(e.target.value)} value={name}
      />
      <input
        type="text"
        className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none'
        placeholder='Enter your UserName'
        onChange={(e) => setUserName(e.target.value)} value={userName}
      />
      <input
        type="text"
        className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none'
        placeholder='Bio'
        onChange={(e) => setBio(e.target.value)} value={bio}
      />
      <input
        type="text"
        className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none'
        placeholder='Profession'
        onChange={(e) => setProfession(e.target.value)} value={profession}
      />
      <input
        type="text"
        className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none'
        placeholder='Gender'
        onChange={(e) => setGender(e.target.value)} value={gender}
      />
      <button
        className="px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-white cursor-pointer rounded-2xl"
        onClick={handleEditProfile}
        disabled={loading}
      >
        {loading ? <ClipLoader size={30} color="black" /> : "Save Profile"}
      </button>
    </div>
  );
};

export default EditProfile;