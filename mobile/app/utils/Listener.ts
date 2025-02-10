import { onSnapshot, collection } from "firebase/firestore";
import { sendPushNotification } from "./Notification";
import { db } from "../../firebaseConfig"; // Assure-toi d'avoir configuré Firebase

const listenForValidationMvt = (currentUserId: number, expoPushToken: string) => {
  const validationMvtRef = collection(db, "ValidationMvt");

  onSnapshot(validationMvtRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const data = change.doc.data();

        if (data.mvtFond.utilisateur.id === currentUserId) {
          console.log("added "+expoPushToken);
          console.log("validatioooon");
          sendPushNotification(expoPushToken, {
            title: "Validation de Mouvement",
            body: "Un de vos mouvements a été validé !",
            data: { id: change.doc.id },
          });
        }
      }
    });
  });
};

export default listenForValidationMvt;
