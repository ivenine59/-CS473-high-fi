import {getDoc, doc} from "firebase/firestore";
import {
    addDoc,
    updateDoc,
    getDocs,
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
  } from "firebase/firestore";
  import { firestore } from "../firebase";

const getpercentrank = async(userEmail) => {
    // const userEmail = userCredential.user.email;

    const q = query(
        collection(firestore, "Accounts"),
        where("userEmail","==", userEmail)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty){
        const userDoc = querySnapshot.docs[0];

        const userpercentrank = userDoc.data().percent_rank;
        const userpercentrank2 = userDoc.data().percent_rank2;
        return [userpercentrank, userpercentrank2]
    } else{
        console.error("에러임 ㅋㅋ")
    }
};

export default getpercentrank