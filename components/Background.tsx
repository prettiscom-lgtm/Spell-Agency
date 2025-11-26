import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Background Blobs - Creating the Aurora Effect */}
      {/* In Dark mode: opacity reduced slightly but mix-blend-mode handles the glow against black background */}
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-60 dark:opacity-20 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-[#FFA96B] dark:bg-brand-orange rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-60 dark:opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-[10%] left-[20%] w-[60vw] h-[60vw] bg-[#FFF7AD] dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-70 dark:opacity-20 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-[-20%] right-[20%] w-[50vw] h-[50vw] bg-pink-200 dark:bg-brand-blue rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-50 dark:opacity-20 animate-blob animation-delay-3000"></div>
    </div>
  );
};

export default Background;