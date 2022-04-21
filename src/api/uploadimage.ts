import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../helpers/firebase";

const getUrlImage = async (file: any, setProg: (prog: any) => void, onSuccess: (url: any) => void) => {
    const storageRef = ref(storage, `/file/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
        (snapshot: any) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            if (prog > 0) {
                setProg(prog);
            }
        },
        (err: any) => console.log(err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then((url: any) => {
                    onSuccess(url);
                })
        })
}

export { getUrlImage }
