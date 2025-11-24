import React, { useState, useRef } from 'react';

interface HomeViewProps {
  onImageSelected: (base64: string) => void;
  isLoading: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({ onImageSelected, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error(err);
      setCameraError("Unable to access camera. Please check permissions or use file upload.");
      setIsCameraOpen(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const base64 = canvas.toDataURL('image/jpeg');
        
        // Stop stream
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
        
        setIsCameraOpen(false);
        onImageSelected(base64);
      }
    }
  };

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-pulse">
        <div className="relative w-24 h-24 mb-8">
           <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
           <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
           <div className="absolute inset-0 flex items-center justify-center">
             <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
             </svg>
           </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Analyzing Insect...</h2>
        <p className="text-gray-500">Identifying species and checking safety data</p>
      </div>
    );
  }

  if (isCameraOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-8">
          <button 
            onClick={closeCamera}
            className="p-4 rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/30 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button 
            onClick={capturePhoto}
            className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-transparent hover:bg-white/10 transition-all active:scale-95"
          >
            <div className="w-16 h-16 bg-white rounded-full"></div>
          </button>
          <div className="w-14"></div> {/* Spacer for symmetry */}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="inline-block p-4 rounded-2xl bg-emerald-100 mb-6 shadow-sm transform hover:rotate-6 transition-transform duration-300">
           <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
           </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Discover What's <span className="text-emerald-600">Buzzing</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Snap a photo or upload an image to instantly identify any insect with AI-powered precision. Get detailed safety and habitat info in seconds.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 px-4">
        {/* Camera Option */}
        <button 
          onClick={startCamera}
          className="group relative bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 text-left flex flex-col items-center justify-center min-h-[300px]"
        >
          <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Take Photo</h3>
          <p className="text-gray-500 text-center mb-8">Use your camera to capture an insect in real-time</p>
          <span className="w-full py-3 bg-emerald-500 text-white font-semibold rounded-lg text-center group-hover:bg-emerald-600 transition-colors">
            Open Camera
          </span>
        </button>

        {/* Upload Option */}
        <div 
          className="group relative bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 text-left flex flex-col items-center justify-center min-h-[300px] cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
           <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden" 
          />
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Image</h3>
          <p className="text-gray-500 text-center mb-8">Choose a clear photo from your gallery</p>
          <span className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg text-center group-hover:bg-blue-700 transition-colors">
            Choose File
          </span>
        </div>
      </div>

      {cameraError && (
        <div className="mt-8 p-4 bg-red-50 text-red-700 rounded-lg text-center border border-red-200">
          {cameraError}
        </div>
      )}
    </div>
  );
};