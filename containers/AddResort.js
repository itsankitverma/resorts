import { async } from "@firebase/util";
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useState } from "react"
import { useEffect } from "react";
import { db, storage } from "../lib/firebase-config";
import { ref, uploadBytesResumable, getDownloadURL, uploadString } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";

export default function AddResort(props) {

    const [details, setDetails] = useState({
        title: "",
        description: ""
    })
    const [selectedFile, setSelectedFile] = useState(null);

    const profileImage = selectedFile;

    const { title, description } = details

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

    const success = () => toast.success('Resort Added Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const uploadPost = async () => {
        const docRef = await addDoc(collection(db, `users/${props.user.uid}/my-resorts`), {
            title: title,
            description: description,
            photo: profileImage
        });
        const imageRef = ref(storage, `posts/${docRef.id}/${title}`);
        await uploadString(imageRef, selectedFile, "data_url").then(async () => {
            const downloadURL = await getDownloadURL(imageRef);
            await setDoc(doc(db, `users/${props.user.uid}/my-resorts/${docRef.id}`), {
                title: title,
                description: description,
                photo: downloadURL,
            });
        });
        success()
        setDetails({
            title: "",
            description: "",
            photo: ""
        })
        setSelectedFile(null)
    };

    const handleSubmit = async () => {
        try {
            if (title === "" || description === "" || selectedFile === null) {
                alert("Please enter all the details")
            } else {
                uploadPost()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const upload = (e) => {
        const reader = new FileReader();
        // 1048487
        if (e.target.files[0].size < 1048487) {
            if (e.target.files[0]) {
                reader.readAsDataURL(e.target.files[0]);
            }
            reader.onload = (readerEvent) => {
                setSelectedFile(readerEvent.target.result);
            };
        }
        else {
            alert("Please upload an image less than 1Mb")
        }
    };

    return (
        <form className="space-y-8 divide-y divide-gray-200 p-5 md:p-0 md:py-5" onSubmit={(e) => { e.preventDefault() }}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Add Resort</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            This information will be displayed publicly so be careful what you share.
                        </p>
                    </div>

                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Title
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <div className="max-w-lg flex rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={handleChange}
                                        id="username"
                                        autoComplete="username"
                                        className="border-2  p-2 flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Description
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <textarea
                                    id="about"
                                    name="description"
                                    value={description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="p-2 max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"

                                />
                                <p className="mt-2 text-sm text-gray-500">Write a few sentences about your resort..</p>
                                <p className="mt-2 font-bold text-sm text-gray-500">Photo size must be less than 1mb</p>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Cover photo
                            </label>
                            {selectedFile ? <div className="flex items-center gap-5 w-36"><img src={selectedFile} className="w-40" alt="cover photo" /> <button className="text-white bg-gray-700 px-4 py-2 rounded-lg" onClick={() => { setSelectedFile(null) }}>Reset</button></div> : <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    accept="image/x-png,image/gif,image/jpeg"
                                                    onChange={upload}
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>}

                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5 w-full flex justify-end">
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </form>
    )
}
