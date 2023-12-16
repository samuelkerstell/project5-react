// React imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
// CSS imports
import styles from '../../styles/Comment.module.css';
// Component imports
import Media from 'react-bootstrap/Media'
import Avatar from '../../components/Avatar'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { MoreDropdown } from '../../components/MoreDropdown'
import CommentEditForm from "./CommentEditForm";
// Axios import
import { axiosRes } from '../../api/axiosDefaults';

const Comment = (props) => {
  const {
    profile_id, 
    profile_image, 
    owner, 
    updated_at, 
    content,
    id,
    setPost,
    setComments,
  
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try{
      await axiosRes.delete(`/comments/${id}/`)
      setPost(prevPost => ({
        results: [{
          ...prevPost.results[0],
          comments_count: prevPost.results[0].comments_count -1
        }]
      }));

      setComments(prevComments => ({
        ...prevComments,
        results: prevComments.results.filter(comment => comment.id !== id),
      }));
    } catch(err){

    }
  }

  return (
    <>
      <hr />
      <div className="d-flex align-items-center">
        <Link to={`/profiles/${profile_id}`} className="align-self-start">
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-4">
          <div className="d-flex align-items-center">
            <span className={styles.Owner}>{owner}</span>
            <span className={styles.Date}>{updated_at}</span>
          </div>
            {showEditForm ? (
              <CommentEditForm
                id={id}
                profile_id={profile_id}
                content={content}
                profileImage={profile_image}
                setComments={setComments}
                setShowEditForm={setShowEditForm}
              />
            ) : (
              <p>{content}</p>
            )}
        </Media.Body>
            <div className="ml-auto">
            {is_owner && !showEditForm && (
              <MoreDropdown
                handleEdit={() => setShowEditForm(true)}
                handleDelete={handleDelete}
              />
            )}
            </div>
      </div>
    </>
  );
};

export default Comment;