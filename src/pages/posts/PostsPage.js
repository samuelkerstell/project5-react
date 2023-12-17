// React imports
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
// Bootstrap imports
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
//CSS imports
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
// Axios imports
import { axiosReq } from "../../api/axiosDefaults";
// Asset imports
import NoResults from "../../assets/no-results.png";
// Component imports
import { fetchMoreData } from "../../utils/utils";
import RecommendedProfiles from "../profiles/RecommendedProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Post from "./Post";
import Asset from "../../components/Asset";

function PostsPage({ message, filter = ""}) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = `/posts/?${filter}search=${query}`;
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {

      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname], currentUser);
  
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <RecommendedProfiles mobile className="mt-4"/>
        <i className={`fas fa-search d-lg-none ${styles.SearchIcon}`} />
        <Form
          className={`${styles.SearchBar} d-lg-none`}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll 
                children={
                  posts.results.map((post) => (
                    <Post key={post.id} {...post} setPosts={setPosts} />
                  ))
                }
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
              
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>
        <RecommendedProfiles />
      </Col>
    </Row>
  );
}

export default PostsPage;