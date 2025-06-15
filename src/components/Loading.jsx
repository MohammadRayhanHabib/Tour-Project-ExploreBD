import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-neutral"></div>
        </div>
        // <div className="flex justify-center items-center min-h-screen bg-base-200">
        //     <span className="loading loading-spinner text-primary"></span>
        // </div>
    );
};

export default Loading;