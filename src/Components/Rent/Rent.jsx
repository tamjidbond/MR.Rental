/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import app from "../../Firebase/firebase.init";
import RentCard from "./Rent Card/RentCard";
import { FaSearch } from "react-icons/fa";
import { Oval } from "react-loader-spinner";

const UserList = () => {
    const [isLoading, setIsLoading] = useState(true)

    const storage = getStorage(app);

    const getImageUrl = async (path) => {
        try {
            const url = await getDownloadURL(ref(storage, path));
            return url;
        } catch (error) {
            console.error("Error getting download URL: ", error);
            return "";
        }
    };

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const db = getFirestore(app);
            const usersCollection = collection(db, "users");

            try {
                const querySnapshot = await getDocs(usersCollection);
                const usersData = [];

                for (const doc of querySnapshot.docs) {
                    const user = doc.data();
                    const imageUrl = user.imageUrl;
                    const url = await getImageUrl(imageUrl);

                    usersData.push({
                        id: doc.id,
                        data: { ...user, imageUrl: url },
                    });
                }
                
                setUsers(usersData);
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching users: ", error);
            }
        };

        fetchUsers();
    }, [getImageUrl]);

    return (
        <div className="mx-auto flex flex-col  justify-center">
            <div className="w-full">
                <div className="flex justify-between items-center w-full">
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1 bg-green-400">Filter</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-green-100 rounded-box left-10 w-52">
                            <li><a>All</a></li>
                            <li><a>Car</a></li>
                            <li><a>Bike</a></li>
                            <li><a>Motorcycle</a></li>
                        </ul>
                    </div>
                    <div className="px-2 flex gap-4 bg-red-400 rounded-full">
                        <input type="text" name="seatch" className="py-2 bg-red-400 px-6 ml-3" id="" />
                        <button >
                            <FaSearch></FaSearch>
                        </button>
                    </div>
                </div>
            </div>
            <div>
                {
                    isLoading && (
                        <div className="min-h-screen min-w-screen ml-8 flex justify-center items-center">
                            <Oval height="70%" width="90%" />
                        </div>
                    )
                }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 md:p-0">
                {users.map((user) => (<RentCard user={user} key={user.data.id}></RentCard>))}
            </div>
        </div >
    );
};

export default UserList;
