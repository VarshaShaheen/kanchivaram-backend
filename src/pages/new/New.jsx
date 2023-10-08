import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const New = ({ inputs, title }) => {
  const [files, setFiles] = useState([]); // Store multiple files
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);

  useEffect(() => {
    const uploadFile = async () => {
      const uploadedImages = [];

      for (const file of files) {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              setPer(progress);
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  break;
              }
            },
            (error) => {
              console.log(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("File available at", downloadURL);
              uploadedImages.push(downloadURL);
              if (uploadedImages.length === files.length) {
                setData((prev) => ({
                  ...prev,
                  images: uploadedImages, // Store the array of image URLs
                }));
              }
            }
        );
      }
    };

    // Upload files when 'files' state changes
    files.length > 0 && uploadFile();
  }, [files]);

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      // Add the data to Firestore
      const docRef = await addDoc(collection(db, "products"), data);
      console.log("Document written with ID: ", docRef.id);

      // Clear the form inputs and reset 'files'
      setData({});
      setFiles([]);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Add a new file to 'files' state
  const handleAddNewFile = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*"; // Specify the accepted file types
    fileInput.addEventListener("change", (e) => {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    });
    fileInput.click();
  };

  return (
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="bottom">
            <div className="left">
              {files.length > 0 ? (
                  files.map((file, index) => (
                      <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt={`Image ${index}`}
                      />
                  ))
              ) : (
                  <img
                      src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      alt=""
                  />
              )}
              <button onClick={handleAddNewFile}>Add New</button>
            </div>
            <div className="right">
              <form onSubmit={handleAdd}>
                {inputs.map((input) => (
                    <div className="productInput" key={input.id}>
                      <label>{input.label}</label>
                      <input
                          id={input.id}
                          type={input.type}
                          placeholder={input.placeholder}
                          onChange={handleInput}
                      />
                    </div>
                ))}
                <button disabled={per != null && per < 100} type="submit">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default New;
