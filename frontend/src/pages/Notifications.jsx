import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptFriendRequest,
  getFriendRequests,
} from "../api";

import {
  CheckCircleIcon,
  UserCheckIcon,
  UserPlusIcon,
} from "lucide-react";

const Notifications = () => {
  const queryClient = useQueryClient();

  /* ================= FRIEND REQUESTS ================= */
  const { data, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  /* ================= ACCEPT REQUEST ================= */
  const { mutate: acceptReq, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  // 🔹 Use pre-filtered arrays from the backend
  const pendingRequests = data?.incomingReqs || [];
  const acceptedRequests = data?.acceptedReqs || [];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-10">
      {/* ================= TITLE ================= */}
      <h1 className="text-3xl font-bold">Notifications</h1>

      {/* ================= FRIEND REQUESTS ================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <UserPlusIcon className="w-5 h-5 text-green-500" />
          <h2 className="text-xl font-semibold">
            Friend Requests
            {pendingRequests.length > 0 && (
              <span className="ml-2 badge badge-success badge-sm">
                {pendingRequests.length}
              </span>
            )}
          </h2>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : pendingRequests.length === 0 ? (
          <p className="opacity-60">No new friend requests</p>
        ) : (
          <div className="space-y-3">
            {pendingRequests.map((req) => {
              const user = req.sender;

              return (
                <div
                  key={req._id}
                  className="flex items-center justify-between bg-base-200 rounded-xl p-4 hover:bg-base-300 transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={user.pic}
                      alt={user.userName}
                      className="w-12 h-12 rounded-full"
                    />

                    <div>
                      <p className="font-semibold">{user.userName}</p>

                      <div className="flex gap-2 mt-1 text-xs">
                        <span className="badge badge-success badge-outline">
                          Native: {user.nativeLanguage}
                        </span>
                        <span className="badge badge-outline">
                          Learning: {user.learningLanguage}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => acceptReq(req._id)}
                    disabled={isPending}
                    className="btn btn-success btn-sm"
                  >
                    Accept
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= NEW CONNECTIONS ================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <UserCheckIcon className="w-5 h-5 text-green-500" />
          <h2 className="text-xl font-semibold">New Connections</h2>
        </div>

        {acceptedRequests.length === 0 ? (
          <p className="opacity-60">No recent connections</p>
        ) : (
          <div className="space-y-3">
            {acceptedRequests.map((req) => {
              const user = req.recipient;

              return (
                <div
                  key={req._id}
                  className="flex items-center justify-between bg-base-200 rounded-xl p-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={user.pic}
                      alt={user.userName}
                      className="w-12 h-12 rounded-full"
                    />

                    <div>
                      <p className="font-semibold">{user.userName}</p>
                      <p className="text-xs opacity-70">
                        Accepted your friend request
                      </p>
                    </div>
                  </div>

                  <span className="badge badge-success gap-1">
                    <CheckCircleIcon className="w-3 h-3" />
                    New Friend
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Notifications;
