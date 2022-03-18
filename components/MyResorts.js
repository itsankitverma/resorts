/* eslint-disable @next/next/no-img-element */
import React from 'react'

const MyResorts = () => {
    const myResort = [
        {
            name: "The Heaven",
            image: "https://a0.muscache.com/im/pictures/aef20929-0d6a-40e7-8ac9-321ff0edf8c9.jpg?im_w=320",
            description: "The Heaven is an awesome resort located in the hills of The Himalayas.",
        }, {
            name: "The Heaven",
            image: "https://a0.muscache.com/im/pictures/aef20929-0d6a-40e7-8ac9-321ff0edf8c9.jpg?im_w=320",
            description: "The Heaven is an awesome resort located in the hills of The Himalayas.",
        }, {
            name: "The Heaven",
            image: "https://a0.muscache.com/im/pictures/aef20929-0d6a-40e7-8ac9-321ff0edf8c9.jpg?im_w=320",
            description: "The Heaven is an awesome resort located in the hills of The Himalayas.",
        }, {
            name: "The Heaven",
            image: "https://a0.muscache.com/im/pictures/aef20929-0d6a-40e7-8ac9-321ff0edf8c9.jpg?im_w=320",
            description: "The Heaven is an awesome resort located in the hills of The Himalayas.",
        }, {
            name: "The Heaven",
            image: "https://a0.muscache.com/im/pictures/aef20929-0d6a-40e7-8ac9-321ff0edf8c9.jpg?im_w=320",
            description: "The Heaven is an awesome resort located in the hills of The Himalayas.",
        }, {
            name: "The Heaven",
            image: "https://a0.muscache.com/im/pictures/aef20929-0d6a-40e7-8ac9-321ff0edf8c9.jpg?im_w=320",
            description: "The Heaven is an awesome resort located in the hills of The Himalayas.",
        },
    ]
    return (
        <div className='flex flex-col md:gap-6 flex-wrap w-[22rem] md:w-full md:px-48 md:py-5'>
            <p className='text-3xl font-semibold md:pl-24 py-3'>My Resorts</p>
            <div className='flex gap-3 flex-wrap w-full items-center justify-center'>
                {myResort.map((resorts, id) => {
                    return (
                        <div className='md:w-[20rem] w-96 border-2 border-black rounded-xl' key={id}>
                            <img
                                className='w-full md:h-1/2 h-full md:w-96'
                                src={resorts.image} alt="" />
                            <div className='p-4 grid gap-2 h-1/2 '>
                                <p className='text-2xl font-bold'>{resorts.name}</p>
                                <p>{resorts.description} </p>
                                <button className='p-2 flex items-center justify-center w-full bg-gray-700 text-white'>View Details</button>
                            </div>
                        </div>
                    )
                })}
            </div>


        </div>
    )
}

export default MyResorts