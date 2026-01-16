import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../api";

import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";

const Home = () => {
  const queryClient = useQueryClient();

  /* ================= FRIENDS ================= */
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  /* ================= RECOMMENDATIONS ================= */
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUsers,
  });

  /* ================= OUTGOING REQUESTS ================= */
  const { data: outgoingReqs = [] } = useQuery({
    queryKey: ["outgoingReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  /* ================= SEND FRIEND REQUEST ================= */
  const { mutate, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingReqs"] }),
  });

  /* ================= STORE SENT REQUEST IDS ================= */


const sentIds = useMemo(() => {
  const ids = new Set();
  outgoingReqs.forEach((req) => ids.add(req.recipient._id));
  return ids;
}, [outgoingReqs]);


  /* ================= FILTER RECOMMENDATIONS ================= */
  const friendIds = new Set((friends || []).map((friend) => friend._id));
  const filteredUsers = users.filter(
    (user) => !friendIds.has(user._id)
  );

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto space-y-12">
      {/* ================= YOUR FRIENDS ================= */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Friends</h2>
          <button className="btn btn-outline btn-sm hidden md:inline-flex">
            <UsersIcon className="w-4 h-4 mr-1" />
            Friend Requests
          </button>
        </div>

        {loadingFriends ? (
          <div className="text-center">Loading...</div>
        ) : friends.length === 0 ? (
          <p className="opacity-70">No friends yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="bg-base-200 rounded-xl p-5 shadow"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={friend.pic}
                    className="w-14 h-14 rounded-full"
                    alt={friend.userName}
                  />
                  <div>
                    <h3 className="font-semibold">{friend.userName}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {friend.nativeLanguage && (
                        <span className="badge badge-secondary badge-sm">
                          Native: {friend.nativeLanguage}
                        </span>
                      )}
                      {friend.learningLanguage && (
                        <span className="badge badge-outline badge-sm">
                          Learning: {friend.learningLanguage}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button className="btn btn-outline btn-sm w-full mt-4">
                  <Link to={`/chat/${friend._id}`}>
                  Message</Link>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= MEET NEW LEARNERS ================= */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Meet New Learners</h2>
        <p className="opacity-70 mb-6">
          Discover perfect language exchange partners
        </p>

        {loadingUsers ? (
          <div className="text-center">Loading...</div>
        ) : filteredUsers.length === 0 ? (
          <p className="opacity-70">No new users to recommend</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => {
              const sent = sentIds.has(user._id);

              return (
                <div
                  key={user._id}
                  className="bg-base-200 rounded-xl p-5 shadow
                             transition-all duration-300
                             hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]"
                >
                  {/* USER HEADER */}
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={user.pic}
                      className="w-14 h-14 rounded-full"
                      alt={user.userName}
                    />
                    <div>
                      <h3 className="font-semibold">{user.userName}</h3>

                      {user.location && (
                        <p className="text-xs opacity-70 flex items-center">
                          <MapPinIcon className="w-3 h-3 mr-1" />
                          {user.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 🌍 LANGUAGES */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {user.nativeLanguage && (
                      <span className="badge badge-secondary badge-sm">
                        Native: {user.nativeLanguage}
                      </span>
                    )}
                    {user.learningLanguage && (
                      <span className="badge badge-outline badge-sm">
                        Learning: {user.learningLanguage}
                      </span>
                    )}
                  </div>

                  {/* BIO */}
                  {user.bio && (
                    <p className="text-sm opacity-70 mb-4 line-clamp-3">
                      {user.bio}
                    </p>
                  )}

                  {/* ACTION BUTTON */}
                  <button
                    disabled={sent || isPending}
                    onClick={() => mutate(user._id)}
                    className={`btn w-full ${
                      sent ? "btn-disabled" : "btn-success"
                    }`}
                  >
                    {sent ? (
                      <>
                        <CheckCircleIcon className="w-4 h-4 mr-2" />
                        Request Sent
                      </>
                    ) : (
                      <>
                        <UserPlusIcon className="w-4 h-4 mr-2" />
                        Send Friend Request
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
