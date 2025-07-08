import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/database';

const Profile = () => {
  const { uid } = useParams();
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = firebase.database().ref(`users/${uid}`);
      const snapshot = await userRef.once('value');
      const userData = snapshot.val();
      setUsername(userData.username);

      // Check if avatar exists in Firebase Storage
      const storageRef = firebase.storage().ref(`avatars/${uid}`);
      storageRef
        .getDownloadURL()
        .then((url) => setAvatarUrl(url))
        .catch(() => {
          // Use default avatar if user's avatar is not present
          setAvatarUrl(
            'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
          );
        });
    };

    fetchUserData();
  }, [uid]);

  return (
    <div>
      <h2>Profile</h2>
      <p>{username}</p>
      <img src={avatarUrl} alt="Avatar" />
      <p>⠀⠀⠀⠀⠀⠀</p>
      <i>
        <small>More to profile coming soon!</small>
      </i>
    </div>
  );
};

export default Profile;
