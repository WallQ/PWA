import React from 'react'

function Comment({ imagePath, altTextPath, name, surname, date, review }) {
    return (
        <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
            <div class="relative flex items-center gap-4">
                <img src={`http://127.0.0.1:3030/public/assets/images/${imagePath}`} class="relative rounded-lg -top-8 -mb-4 bg-white border-2 border-solid border-gray-200 h-20 w-20" alt={`${altTextPath}`} loading="lazy" />
                <div class="flex flex-col w-full items-center">
                    <div class="flex flex-col justify-between">
                        <p class="relative text-xl whitespace-nowrap truncate overflow-hidden mb-0">{name} {surname}</p>												
                        <p class="text-gray-400 text-sm">{new Date(`${date}`).toDateString()}</p>
                    </div>
                </div>
            </div>
            <h6 class="text-gray-500 text-base mb-0">{review}</h6>
        </div>
    )
}

export default Comment;
