import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editComment, deleteComment } from "../../store/comments";

function EditComment({ commentData }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState(commentData.comment);
  const [showEdit, setShowEdit] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];

    if (comment.length >= 250) {
      errors.push("Comment must not exceed 250 characters.");
    } else if (comment.length <= 10) {
      errors.push("Comment must be between 10 to 250 characters.");
    }

    setErrors(errors);
  }, [comment]);

  const handleEdit = (e) => {
    e.preventDefault();

    const payload = {
      comment,
    };

    const editedComment = dispatch(editComment(commentData.id, payload));

    if (editedComment) {
      setShowEdit(false);
      window.location.reload(false)
    }
  };

  const onEdit = (e) => {
    e.preventDefault();

    if (showEdit) {
        setShowEdit(false)
    } else {
        setShowEdit(true)
    }
  }

  return (
    <div id="edit-comment-form-outer-cntr">
      <i
        class={showEdit === false ? "fa-solid fa-pen-to-square edit-comment-btn" : "fa-solid fa-xmark"}
        onClick={onEdit}
      ></i>
      <form onSubmit={handleEdit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className={showEdit ? "showEdit" : "hideShowEdit"}
          />
          <div id="new-comments-error-valids" className={showEdit ? "showEdit" : "hideShowEdit"}>
            {errors.map((error, idx) => (
              <div key={idx}>
                {error}
              </div>
            ))}
          </div>
          <div id="edit-comment-buttons-ctnr">

        <button
          id="edit-comment-buttons-submit"
          className={showEdit ? "showEdit" : "hideShowEdit"}

          >Submit</button>
        <button
          id="edit-comment-buttons-delete"
          className={showEdit ? "showEdit" : "hideShowEdit"}

          onClick={() => dispatch(deleteComment(commentData.id)) && window.location.reload(false)}>Delete</button>
          </div>
      </form>
    </div>
  );
}

export default EditComment;
