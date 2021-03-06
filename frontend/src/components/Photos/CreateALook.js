import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLook } from "../../store/photos";
import { useHistory } from "react-router-dom";
import { getCollections } from "../../store/collections";
import "./CreateALook.css";

const CreateALook = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [collectionId, setCollectionId] = useState(null);
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const collections = Object.values(useSelector((state) => state.collections));

  useEffect(() => {
    dispatch(getCollections());
  }, [dispatch]);

  useEffect(() => {
    const errors = [];

    if (imageUrl.length < 1) {
      errors.push("Please provide an Image URL.")
    }

    if (!(imageUrl.includes(".jpg" || ".png"))) {
      errors.push("Please provide a valid Image URL.")
    }

    if (description.length < 1) {
      errors.push("Please provide a title.")
    } else if (description.length < 1 || description.length > 32) {
      errors.push("Title must contain at least 1 and no more than 32 characters.")
    }

    setErrors(errors);
  }, [imageUrl, description])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: sessionUser.id,
      collectionId,
      imageUrl,
      description,
    }

    dispatch(createLook(payload))

    history.push("/photos")
  }



  return (
    <div>
      <div id="form-container">
        <form id="form" onSubmit={(e) => handleSubmit(e)}>
        <h1 id="create-a-look-header">CREATE A LOOK</h1>

          <label className="add-a-look-labels">Image URL: </label>
          <input
            type="text"
            placeholder="Insert image URL here..."
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="input"
            />
          <label className="add-a-look-labels">Title: </label>
          <input
            type="text"
            placeholder="Insert title here..."
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input"
          />
          <label className="add-a-look-labels">Collection: </label>
          <select
            className="input select"
            onChange={(e) => setCollectionId(e.target.value)}
          >
            <option value={null} >Choose a collection</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.title}
              </option>
            ))}
          </select>
          <button
            className="submit"
            disabled={(errors.length > 0)}
          >
            Submit
          </button>
        </form>
      </div>
      <video id="add-look-video-bg" autoPlay playsInline muted loop>
          <source type="video/mp4" src="https://res.cloudinary.com/matchaprince/video/upload/v1654329042/final_629b0588c72b7b0066e388df_607188_orb7k9.mp4"/>
        </video>
        <div id="add-a-look-errors">
              {errors.includes("Please provide an Image URL." || "Please provide a title." || "Please provide a valid Image URL." || "Title must contain at least 1 and no more than 32 characters.") ? <></> : <ul>
                {errors.map((error, idx) => (
                  <li key={idx} className="add-a-look-li">{error}</li>
                ))}
              </ul>}
            </div>
    </div>
  );
};

export default CreateALook;
