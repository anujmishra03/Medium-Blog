interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
}

interface AvatarProps {
  name: string;
  size: string
  
}

import { useState } from "react";

export const Avatar = ({ name }: AvatarProps) => {
  return (
    <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-200 rounded-full shadow-sm">
      <span className="font-medium text-gray-700 text-lg">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
};

export const BlogCard = ({
  authorName,
  title,
  content,
  publishDate,
}: BlogCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const readingTime = Math.ceil(content.length / 100);
  const minutesText = readingTime === 1 ? "minute" : "minutes";
  const progressWidth = Math.min((content.length / 500) * 100, 100);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    
    <div className="mx-auto my-6 p-6 bg-white border border-gray-300 rounded-xl shadow-md space-y-4 hover:shadow-lg transition-shadow duration-300 max-w-xl">
      <div className="flex items-center gap-4 mb-4">
        <Avatar name={authorName} size={""}/>
        <div className="text-sm text-gray-600">
          <div className="font-semibold">{authorName}</div>
          <div>{publishDate}</div>
        </div>
      </div>

      <div className="font-bold text-xl mb-2 text-gray-800">{title}</div>
      <div className="text-gray-600 mb-4">
        {isExpanded ? content : content.slice(0, 100) + "..."}
      </div>

      <button
        onClick={toggleContent}
        className="text-blue-500 hover:text-blue-700 text-sm"
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>

      <div className="text-sm text-gray-500 mb-2">
        {`${readingTime} ${minutesText}`}
      </div>

      <div className="bg-gray-200 h-2 w-full rounded-full relative overflow-hidden">
        <div
          className="bg-blue-500 h-full transition-width duration-300"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
};