import { useState } from "react";
import { arrayUnion, Timestamp } from "firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
//styles
import "./Project.css";

const ProjectComments = ({ document }) => {
  const { updateDocument, state } = useFirestore("projects");
  const [comment, setComment] = useState("");
  const { user } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: comment,
      createdAt: Timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    await updateDocument(document.id, {
      comments: arrayUnion(commentToAdd),
    });
    if (!state.error) {
      setComment("");
    }
  };
  return (
    <div className="project-comments">
      <h4>Project Comments</h4>
      <ul>
        {document.comments.length > 0 &&
          document.comments.map((comment) => (
            <li className="comment" key={comment.id}>
              <div className="comment-author">
                <img src={comment.photoURL} alt="user" />
                <p>{comment.displayName}</p>
              </div>
              <div className="comment-date">
                {formatDistanceToNow(comment.createdAt.toDate(), {
                  addSuffix: true,
                })}
              </div>
              <div>
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>

      <form onSubmit={handleSubmit} className="add-comment">
        <label>
          <span>Add a comment</span>
          <textarea
            required
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></textarea>
        </label>
        <button className="auth-button">Add comment</button>
      </form>
    </div>
  );
};

export default ProjectComments;
