
// const AuthLoader: React.FC = () => {
//     return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
//       <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
//       <p className="text-lg tracking-widest">Loading...</p>
//     </div>
//   );
// }

// export default AuthLoader

// src/components/ui/AuthLoader.tsx


// src/components/ui/AuthLoader.tsx
import React from "react";

const AuthLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      
      {/* Multi-layer spinning rings */}
      <div className="relative w-24 h-24 mb-6">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-b-pink-500 border-l-transparent border-r-transparent animate-spin"></div>
        {/* Inner pulsing ring */}
        <div className="absolute inset-4 rounded-full border-4 border-purple-500 opacity-60 animate-ping"></div>
      </div>

      {/* Animated text */}
      <p className="text-xl md:text-2xl font-bold tracking-widest text-center">
        Loading...
      </p>
      <p className="mt-2 text-sm text-gray-300 animate-pulse">Please wait...</p>
    </div>
  );
};



export default AuthLoader;