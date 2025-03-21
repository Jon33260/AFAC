import axios from "axios";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Auth from "../services/AuthContext";
import "../styles/FollowButton.css";

const baseUrl = import.meta.env.VITE_API_URL;

export default function FollowButton({
  userId,
  initialFollowers,
  onFollowerCountChange,
}: FollowButtonProps) {
  const { role } = Auth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(initialFollowers);

  useEffect(() => {
    setFollowerCount(initialFollowers);
  }, [initialFollowers]);

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/follows/check/${userId}`,
          {
            withCredentials: true,
          },
        );

        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error("Erreur lors de la vérification du suivi:", error);
        setIsFollowing(false);
      }
    };

    checkFollowStatus();
  }, [userId]);

  const handleFollow = async () => {
    try {
      await axios.post(
        `${baseUrl}/api/follows`,
        { following_id: userId },
        {
          withCredentials: true,
        },
      );
      setIsFollowing(true);
      const newCount = followerCount + 1;
      setFollowerCount(newCount);
      onFollowerCountChange(newCount);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        if (status === 400 && data.message === "You cannot follow yourself.") {
          toast.error("Vous ne pouvez pas vous suivre vous même", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        } else {
          console.error("Erreur inattendue:", error);
        }
      }
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.delete(`${baseUrl}/api/follows/${userId}`, {
        data: { following_id: userId },
        withCredentials: true,
      });
      setIsFollowing(false);
      const newCount = followerCount - 1;
      setFollowerCount(newCount);
      onFollowerCountChange(newCount);
    } catch (error) {
      console.error("Erreur lors de l'arrêt du suivi de l'utilisateur:", error);
    }
  };

  if (role === "anonymous") {
    return null;
  }

  return (
    <>
      <div>
        {isFollowing ? (
          <button
            type="button"
            onClick={handleUnfollow}
            className="unfollow-button"
          >
            Unfollow
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFollow}
            className="follow-button"
          >
            Follow
          </button>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}
