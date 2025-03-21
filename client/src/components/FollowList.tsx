import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/FollowList.css";

export default function FollowList({ id, type, onClose }: FollowListProps) {
  const [users, setUsers] = useState<FollowUser[]>([]);

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/follows/${type}/${id}`,
          {
            withCredentials: true,
          },
        );
        setUsers(response.data);
      } catch (error) {
        console.error(`Erreur lors de la récupération des ${type}:`, error);
      }
    };

    fetchUsers();
  }, [id, type]);

  return (
    <div className="follow-list-modal">
      <div className="follow-list-content">
        <div className="follow-list-header">
          <h2>{type === "followers" ? "Abonnés" : "Abonnements"}</h2>
          <button type="button" onClick={onClose} className="close-button">
            ×
          </button>
        </div>

        <div className="follow-list">
          {users.map((user) => (
            <button
              key={user.id}
              type="button"
              className="follow-user-item"
              onClick={() => {
                onClose();
                window.location.href = `/profile/${user.id}`;
              }}
            >
              <img
                src={user.profile_picture || "Img"}
                alt={user.username}
                className="follow-user-avatar"
              />
              <span className="follow-username">{user.username}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
