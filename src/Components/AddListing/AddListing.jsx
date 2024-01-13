import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "../../Firebase/firebase.init";
import { getStorage } from "firebase/storage"
import { ref, uploadBytes } from "firebase/storage";
import { Circles } from 'react-loader-spinner'
import "./add.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from "firebase/auth";

const AddListing = () => {
    const auth = getAuth(app)
    const user = auth.currentUser;

    const [usersName, setUsersName] = useState("Unknown User")
    const [category, setCategory] = useState('')
    const [profilePic, setProfilePic] = useState("https://cdn4.iconfinder.com/data/icons/user-people-2/48/6-1024.png")
    const [isLoadin, setIsLoadin] = useState(false)
    const [title, setTitle] = useState("");
    const [uploadedImage, setUploadedImage] = useState(null)
    const [model, setModel] = useState('');
    const [milage, setMilage] = useState('');
    const [seat, setSeat] = useState('')
    const [price, setPrice] = useState('')
    const [availableFrom, setAvailableFrom] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [availableTo, setAvailableTo] = useState('')
    const [description, setDescription] = useState('');

    useEffect(() => {
        user.displayName && setUsersName(user.displayName)
        setProfilePic(user.photoURL)
    }, [user.displayName, user.profilePic, user.photoURL])

    const db = getFirestore(app)
    const storage = getStorage(app)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoadin(true)
        try {
            const imgRef = ref(storage, `users/${uploadedImage.name}-${Date.now()}`)
            const imageLink = await uploadBytes(imgRef, uploadedImage)
            const docRef = await addDoc(collection(db, "users"), {
                imageUrl: imageLink.ref.fullPath,
                title: title,
                model: model,
                milage: milage,
                seat: seat,
                price: price,
                from: availableFrom,
                to: availableTo,
                userName: usersName,
                profilePic: profilePic
            });
            toast("Successfully Added to Lising....")
            setIsLoadin(false)
            console.log(docRef.id)
        } catch (e) {
            setIsLoadin(true)
            console.error("Error adding document: ", e);
        }
        setIsLoadin(false)
    };

    return (
        <div className="add rounded-lg">
            <ToastContainer></ToastContainer>
            <div className="  ">
                <div className="w-[90%] md:w-1/2 mx-auto p-8 ">
                    <form className=" text-center space-y-2  " onSubmit={handleSubmit}>
                        <div className="field ">
                            <label htmlFor="text" className=" ">Image</label>
                            <input
                                className="bg-gray-200 p-2 w-full"
                                type="file"
                                accept="image/*"
                                name="image"
                                onChange={(e) => setUploadedImage(e.target.files[0])}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="text" className="  ">Category</label>
                            <select
                                className="bg-gray-200 p-2 bgBord w-full"
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="bike">Bike</option>
                                <option value="car">Car</option>
                                <option value="motorcycle">Motorcycle</option>
                            </select>
                        </div>


                        <div className="field">
                            <label htmlFor="text" className="  ">Title</label>
                            <input
                                className="bg-gray-200 p-2 w-full "
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>


                        <div className="field">
                            <label htmlFor="text" className=" ">Model & Year</label>
                            <input
                                className="bg-gray-200 p-2  w-full"
                                type="text"
                                name="model"
                                placeholder="Model & Year"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="text" className=" ">Milage (KM)</label>
                            <input
                                className="bg-gray-200 p-2 w-full "
                                type="number"
                                name="milage"
                                placeholder="Milage (KM)"
                                value={milage}
                                onChange={(e) => setMilage(e.target.value)}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="text" className=" ">Seating Capacity</label>
                            <input
                                className="bg-gray-200 p-2  w-full"
                                type="number"
                                name="seat"
                                placeholder="Seating Capacity"
                                value={seat}
                                onChange={(e) => setSeat(e.target.value)}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="text" className=" ">Price Per Hour (BDT)</label>
                            <input
                                className="bg-gray-200 p-2  w-full"
                                type="number"
                                name="price"
                                placeholder="Price per Hour (BDT)"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="text" className=" ">Description</label>
                            <input
                                className="bg-gray-200 p-2  w-full"
                                type="text"
                                name="description"
                                placeholder="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>


                        <div className="field">
                            <label htmlFor="text" className=" ">Available From </label>
                            <input
                                className="bg-gray-200 p-2  w-full"
                                type="time"
                                name="from"
                                placeholder="Model & Year"
                                value={availableFrom}
                                onChange={(e) => setAvailableFrom(e.target.value)}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="text" className=" ">Available To</label>
                            <input
                                className="bg-gray-200 p-2  w-full"
                                type="time"
                                name="to"
                                placeholder="Available To"
                                value={availableTo}
                                onChange={(e) => setAvailableTo(e.target.value)}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="text" className=" ">Phone Number</label>
                            <input
                                className="bg-gray-200 p-2  w-full"
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn w-full h-20 btn-success">
                            <div className="h-10 text-white w-10 flex items-center justify-center font-bold text-3xl">
                                {
                                    isLoadin ? <Circles
                                        color="#fff"
                                        height="60"
                                        width="60">

                                    </Circles> : "Submit"
                                }
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddListing;