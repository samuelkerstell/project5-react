// React imports
import React from "react";
// Bootstrap imports
import { Container } from "react-bootstrap";
// CSS imports
import appStyles from "../../App.module.css";
import styles from "../../styles/RecommendedProfiles.module.css";
// Component imports
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";

const RecommendedProfiles = ({ mobile }) => {
  const { recommendedProfiles } = useProfileData();

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {recommendedProfiles.results.length ? (
        <>
          <p className={styles.Title}>Recommended profiles</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {recommendedProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            recommendedProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default RecommendedProfiles