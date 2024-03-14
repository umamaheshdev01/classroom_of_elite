import React from 'react';
import { useState } from 'react';
function LectureCard({item}) {
  const desc = item.description;
  
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
      setShowFullDescription(!showFullDescription);
    }
  return (
    <div className="grid max-w-3xl w-full gap-4 px-4 mx-auto md:gap-8 lg:px-6 border border-gray-200 rounded-lg dark:border-gray-800">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {/* <img src="/placeholder.svg" width="40" height="40" alt="Image" className="rounded-full" style={{ aspectRatio: '40 / 40', objectFit: 'cover' }} /> */}
          <div className="flex items-center gap-1 text-sm">
            <div className="font-semibold m-3">{item.Users.fname}</div>
            <div className="text-gray-500 dark:text-gray-400">1h</div>
          </div>
        </div>
        <div className="space-y-2 text-sm leading-6 md:text-base md:leading-7">
        <p className="font-semibold">Lecture Summary</p>
          <p>
            {showFullDescription ? desc : `${desc.slice(0,100)} . . . .`}
          </p>
              {desc.length > 100 && (
                <button onClick={toggleDescription} className='text-blue-600'>
                {showFullDescription ? 'Read Less' : 'Read More'}
              </button>
          )}
        </div>
        <div className="grid gap-2 text-sm leading-6 md:text-base md:leading-7">
          
    
        </div>
      </div>
    </div>
  );
}


export default LectureCard;