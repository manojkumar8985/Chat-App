import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import userAuth from "../hooks/useAuthUser";
import { getStreamToken } from "../api";

import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";

import Loading from "./Loading";
import CallButton from "../Components/CallButton";

import "./chat.css";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const navigate = useNavigate();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user: authUser, isLoading: authLoading } = userAuth();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!authUser || !tokenData?.token || !targetUserId) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.userName,
            image: authUser.pic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error(error);
        toast.error("Failed to connect chat");
      } finally {
        setLoading(false);
      }
    };

    initChat();

    return () => {
      if (chatClient) chatClient.disconnectUser();
    };
  }, [authUser, tokenData, targetUserId]);

  const handleVideoCall = () => {
    if (!channel) return;

    const callUrl = `${window.location.origin}/call/${channel.id}`;

    channel.sendMessage({
      text: `📹 Video call started. Join here: ${callUrl}`,
    });

    toast.success("Video call link sent");
  };

  if (authLoading || loading) return <Loading />;

  if (!chatClient || !channel) {
    return <p className="text-center mt-10">Unable to load chat</p>;
  }

  return (
    <div className="chat-page">
      <div className="chat-container">
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <Window>

              {/* ===== TOP ACTION BAR ===== */}
              <div className="chat-top-bar">
                <button
                  className="back-btn"
                  onClick={() => navigate("/")}
                >
                  ← Home
                </button>

                <div className="chat-actions">
                  <CallButton handleVideoCall={handleVideoCall} />
                </div>
              </div>

              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>

            <Thread />
          </Channel>
        </Chat>
      </div>
    </div>
  );
};

export default ChatPage;
