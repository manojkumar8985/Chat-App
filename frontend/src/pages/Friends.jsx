import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import userAuth from "../hooks/useAuthUser";
import { getUserFriends } from "../api";
import Loading from "./Loading";

const Friends = () => {
  const { user, isLoading: authLoading } = userAuth();

  const {
    data: friends = [],
    isLoading,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
    enabled: !!user,
  });
  

  if (authLoading || isLoading) return <Loading />;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Friends</h1>

      {/* Empty State */}
      {friends.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">You have no friends yet</p>
        </div>
      ) : (
        /* Friends Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <div
              key={friend._id}
              className="flex items-center gap-4 p-4 rounded-xl border border-base-300 bg-base-100 hover:shadow-md transition"
            >
              {/* Avatar */}
              <img
                src={friend.pic}
                alt={friend.userName}
                className="w-14 h-14 rounded-full object-cover"
              />

              {/* Info */}
              <div className="flex-1">
                <h2 className="font-semibold text-lg">
                  {friend.userName}
                </h2>
                <p className="text-sm text-gray-500 truncate">
                  {friend.email}
                </p>
              </div>

              {/* Action */}
              <Link
                to={`/chat/${friend._id}`}
                className="btn btn-outline btn-sm"
              >
                Chat
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Friends;
