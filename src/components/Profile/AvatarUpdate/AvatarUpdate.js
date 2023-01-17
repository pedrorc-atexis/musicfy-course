import React, { useCallback, useState } from "react";
import { Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { User, Storage } from "../../../api";
import { defaultUser } from "../../../assets";
import "./AvatarUpdate.scss";

const userController = new User();
const storageController = new Storage();

export function AvatarUpdate() {
  const { photoURL, uid } = userController.getMe();
  const [avatarURL, setAvatarURL] = useState(photoURL || defaultUser);
  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    setAvatarURL(URL.createObjectURL(file));

    const response = await storageController.uploadFile(file, "avatar", uid);
    const url = await storageController.getURLFile(response.metadata.fullPath);
    userController.updateUserAvatar(url);
  });
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div className="avatar-update" {...getRootProps()}>
      <input {...getInputProps()} />
      <Image src={avatarURL} />
    </div>
  );
}
