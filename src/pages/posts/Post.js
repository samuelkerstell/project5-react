import React, { useState } from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    dislikes_count,
    dislike_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  console.log('like_id:', like_id);
  console.log('dislike_id:', dislike_id);

  
  const [isLiked, setIsLiked] = useState(like_id !== null);
  const [isDisliked, setIsDisliked] = useState(dislike_id !== null);

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`)
  }

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err)
    }
  };

  //Like
  const handleLike = async () => {
    try {
      if (isDisliked && !isLiked) {
        await axiosRes.delete(`/dislikes/${dislike_id}/`);
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => (
            post.id === id ? { ...post, dislikes_count: post.dislikes_count - 1, dislike_id: null } : post
          )),
        }));
        setIsDisliked(false);
      }
  
      if (!isLiked) {
        const { data } = await axiosRes.post("/likes/", { post: id });
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => (
            post.id === id ? { ...post, likes_count: post.likes_count + 1, like_id: data.id } : post
          )),
        }));
        setIsLiked(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
      setIsLiked(false);
    } catch (err) {
      console.log(err);
    }
  };
  
  // Dislike
  const handleDislike = async () => {
    try {
      if (isLiked && !isDisliked) {
        await axiosRes.delete(`/likes/${like_id}/`);
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => (
            post.id === id ? { ...post, likes_count: post.likes_count - 1, like_id: null } : post
          )),
        }));
        setIsLiked(false);
      }
  
      if (!isDisliked) {
        const { data } = await axiosRes.post("/dislikes/", { post: id });
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => (
            post.id === id ? { ...post, dislikes_count: post.dislikes_count + 1, dislike_id: data.id } : post
          )),
        }));
        setIsDisliked(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUndislike = async () => {
    try {
      await axiosRes.delete(`/dislikes/${dislike_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, dislikes_count: post.dislikes_count - 1, dislike_id: null }
            : post;
        }),
      }));
      setIsDisliked(false);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} /> }
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="fa-regular fa-thumbs-up" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fa-solid fa-thumbs-up ${styles.ThumbsUp}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`fa-regular fa-thumbs-up ${styles.ThumbsUpOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="fa-regular fa-thumbs-up" />
            </OverlayTrigger>
          )}
          {likes_count}


          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't dislike your own post!</Tooltip>}
            >
              <i className="fa-regular fa-thumbs-down" />
            </OverlayTrigger>
          ) : dislike_id ? (
            <span onClick={handleUndislike}>
              <i className={`fa-solid fa-thumbs-down ${styles.ThumbsUp}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleDislike}>
              <i className={`fa-regular fa-thumbs-down ${styles.ThumbsUpOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to dislike posts!</Tooltip>}
            >
              <i className="fa-regular fa-thumbs-down" />
            </OverlayTrigger>
          )}
          {dislikes_count}


          <Link to={`/posts/${id}`}>
            <i className="far fa-comment" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;