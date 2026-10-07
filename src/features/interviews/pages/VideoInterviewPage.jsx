import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Settings,
  Sparkles,
  MessageSquare,
  Users,
  ShieldCheck,
} from 'lucide-react';
import Button from '../../../core/components/Button';
import toast from 'react-hot-toast';

export const VideoInterviewPage = () => {
  const navigate = useNavigate();
  const localVideoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  useEffect(() => {
    // Attempt real camera & mic access
    async function startCamera() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          setStream(mediaStream);
          setHasCameraPermission(true);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = mediaStream;
          }
        }
      } catch (err) {
        console.warn('Camera/Mic permission denied or not available:', err);
        setHasCameraPermission(false);
      }
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const handleEndCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    toast.success('Interview call completed');
    navigate('/interviews');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Video className="w-6 h-6 text-indigo-600" />
            Live Technical Video Room
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Encrypted WebRTC Peer-to-Peer Interview Room
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            ● Room Status: Connected
          </span>
        </div>
      </div>

      {/* Main Video Call Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Local Participant Preview */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 aspect-video flex items-center justify-center border border-slate-800 shadow-2xl">
          {hasCameraPermission && !isVideoOff ? (
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover -scale-x-100"
            />
          ) : (
            <div className="text-center p-6 space-y-2">
              <div className="w-16 h-16 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-xl mx-auto">
                You
              </div>
              <p className="text-xs text-slate-400">
                {isVideoOff ? 'Camera is turned off' : 'Camera permission not granted'}
              </p>
            </div>
          )}
          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-bold">
            You (Candidate) {isMuted && '• 🔇 Muted'}
          </div>
        </div>

        {/* Remote Interviewer Video (Simulated Feed) */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 aspect-video flex items-center justify-center border border-slate-800 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
            alt="Interviewer"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-bold">
            Priya Patel (Lead Recruiter - TechCorp)
          </div>
          <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
            HD 1080p
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-4 rounded-3xl bg-slate-900 text-white flex items-center justify-center gap-4 shadow-xl border border-slate-800">
        <button
          onClick={toggleMute}
          className={`p-3.5 rounded-2xl transition-all ${
            isMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}
          title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <button
          onClick={toggleVideo}
          className={`p-3.5 rounded-2xl transition-all ${
            isVideoOff ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}
          title={isVideoOff ? 'Turn video on' : 'Turn video off'}
        >
          {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
        </button>

        <button
          onClick={handleEndCall}
          className="p-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white px-6 font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30"
        >
          <PhoneOff className="w-5 h-5" />
          <span>Leave Room</span>
        </button>
      </div>
    </div>
  );
};

export default VideoInterviewPage;
