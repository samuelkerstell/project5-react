import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);


export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    // use for pageProfile later
    pageProfile: { results: [] },
    recommendedProfiles: { results: [] },
  });
  const currentUser = useCurrentUser()

  const handleFollow = async (clickedProfile) => {
    try {
      const {data} = await axiosRes.post('/followers/', {
        followed: clickedProfile.id
      })
    } catch(err) {

    }
  }

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          recommendedProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={{ setProfileData, handleFollow }}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
