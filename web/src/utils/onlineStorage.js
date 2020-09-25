import { useFirebase } from "react-redux-firebase";

export function useOnlineStorage() {
  const firebase = useFirebase();

  function uploadUserFile(uid, file) {
    return firebase.uploadFile(`/users/${uid}`, file);
  }

  return { uploadUserFile };
}
