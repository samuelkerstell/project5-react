// React imports
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import InfiniteScroll from "react-infinite-scroll-component";
// Bootstrap imports
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
// CSS imports
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
// Axios imports
import { axiosReq } from "../../api/axiosDefaults";
// Component imports
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import RecommendedProfiles from "./RecommendedProfiles";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import Asset from "../../components/Asset";
import Post from "../posts/Post";
import { fetchMoreData } from "../../utils/utils";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
// Asset imports
import NoResults from "../../assets/no-results.png";


function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profilePosts, setProfilePosts] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const { id } = useParams();

    const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
    const { pageProfile } = useProfileData();

    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [{ data: pageProfile }, { data: profilePosts }] =
            await Promise.all([
              axiosReq.get(`/profiles/${id}/`),
              axiosReq.get(`/posts/?owner__profile=${id}`),
            ]);
          setProfileData((prevState) => ({
            ...prevState,
            pageProfile: { results: [pageProfile] },
          }));
          setProfilePosts(profilePosts);
          setHasLoaded(true);
        } catch (err) {

        }
      };
      fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
          <Row noGutters className="px-3 text-center">
          {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
            <Col lg={3} className="text-lg-left">
              <Image
                className={styles.ProfileImage}
                roundedCircle
                src={profile?.image}
              />
            </Col>
            <Col lg={6}>
              <h3 className={`"m-2" ${styles.Owner}`}>{profile?.owner}</h3>
              <Row className="justify-content-center no-gutters">
                <Col xs={3} className="my-2">
                  <div>{profile?.posts_count}</div>
                  <div>Posts</div>
                </Col>
                <Col xs={3} className="my-2">
                  <div>{profile?.followers_count}</div>
                  <div>Followers</div>
                </Col>
                <Col xs={3} className="my-2">
                  <div>{profile?.following_count}</div>
                  <div>Following</div>
                </Col>
              </Row>
            </Col>
            <Col lg={3} className="text-lg-right">
              {currentUser &&
                !is_owner &&
                (profile?.following_id ? (
                  <Button
                    className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                    onClick={() => handleUnfollow(profile)}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    className={`${btnStyles.Button} ${btnStyles.Green}`}
                    onClick={() => handleFollow(profile)}
                  >
                    Follow
                  </Button>
                ))}
            </Col>
            {profile?.content && <Col className="p-3">{profile.content}</Col>}
          </Row>
        </>
      );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s posts:</p>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );
  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <RecommendedProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <RecommendedProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;