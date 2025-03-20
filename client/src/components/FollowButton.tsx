import axios from "axios";
import { useEffect, useState } from "react";
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
      onFollowerCountChange(initialFollowers + 1);
    } catch (error) {
      console.error("Erreur lors du suivi de l'utilisateur:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.delete(`${baseUrl}/api/follows/${userId}`, {
        data: { following_id: userId },
        withCredentials: true,
      });
      setIsFollowing(false);
      onFollowerCountChange(initialFollowers - 1);
    } catch (error) {
      console.error("Erreur lors de l'arrêt du suivi de l'utilisateur:", error);
    }
  };

  if (role === "anonymous") {
    return null;
  }

  return (
    <div>
      {isFollowing ? (
        <button type="button" onClick={handleUnfollow}>
          Unfollow
        </button>
      ) : (
        <button type="button" onClick={handleFollow}>
          Follow
        </button>
      )}
    </div>
  );
}
