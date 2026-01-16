import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import userAuth from "../hooks/useAuthUser";
import { getStreamToken } from "../api";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import Loading from "./Loading";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { user: authUser, isLoading } = userAuth();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    if (!tokenData?.token || !authUser || !callId) return;

    let videoClient;
    let callInstance;

    const initCall = async () => {
      try {
        const user = {
          id: authUser._id,
          name: authUser.userName,
          image: authUser.pic,
        };

        videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        callInstance = videoClient.call("default", callId);

        await callInstance.join({ create: true });

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error(error);
        toast.error("Could not join the call");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();

    // ✅ CLEANUP
    return () => {
      if (callInstance) callInstance.leave();
      if (videoClient) videoClient.disconnectUser();
    };
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <Loading />;

  if (!client || !call) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Failed to initialize call</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <CallContent onLeave={() => navigate("/")} />
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

const CallContent = ({ onLeave }) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  // ✅ SAFE navigation
  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      onLeave();
    }
  }, [callingState, onLeave]);

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;
