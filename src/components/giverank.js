import {getDoc, doc} from "firebase/firestore";

const getpercentrank = async() => {
    const userEmail = userCredential.user.email;

    const q = query(
        collection(firestore, "Accounts"),
        where("userEmail","==", userEmail)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty){
        const userDoc = querySnapshot.docs[0];

        const userpercentrank = userDoc.data().percent_rank;
        console.log("userrank:", userpercentrank);
    } else{
        console.error("에러임 ㅋㅋ")
    }
};