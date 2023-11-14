import React, { useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";

const RankUpdater = () => {
  const [updateStatus, setUpdateStatus] = useState(""); // 업데이트 상태를 나타내는 상태

  const handleUpdateFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "Accounts"));

      querySnapshot.forEach(async (doc) => {
        try {
          const data = doc.data();

          // point 계산
          let newPoint = 0;
          if (data.received_num_rating !== 0) {
            newPoint =
              data.received_sum_rating / data.received_num_rating +
              Math.log(data.received_num_rating);
          }
          // 문서 업데이트 (point 업데이트)
          await updateDoc(doc.ref, {
            point: newPoint,
          });

          console.log(`Document ${doc.id}: Point successfully updated!`);
        } catch (e) {
          console.error(`Error updating document ${doc.id}: `, e);
        }
      });
      querySnapshot.forEach(async (doc) => {
        try {
          const data = doc.data();

          const rankQuery = query(
            collection(firestore, "Accounts"),
            orderBy("point", "desc")
          );
          const rankQuerySnapshot = await getDocs(rankQuery);
          const rank =
            rankQuerySnapshot.docs.findIndex(
              (rankDoc) => rankDoc.id === doc.id
            ) + 1;

          // rank 업데이트
          await updateDoc(doc.ref, {
            rank: rank,
            percent_rank: rank / rankQuerySnapshot.size,
          });

          console.log(`Document ${doc.id}: Rank successfully updated!`);
        } catch (e) {
          console.error(`Error updating document ${doc.id}: `, e);
        }
      });
      querySnapshot.forEach(async (doc) => {
        try {
          const data = doc.data();

          const rank2Query = query(
            collection(firestore, "Accounts"),
            orderBy("num_rating", "desc")
          );
          const rank2QuerySnapshot = await getDocs(rank2Query);
          const rank2 =
            rank2QuerySnapshot.docs.findIndex(
              (rank2Doc) => rank2Doc.id === doc.id
            ) + 1;
          // rank 업데이트
          await updateDoc(doc.ref, {
            rank2: rank2,
            percent_rank2: rank2 / rank2QuerySnapshot.size,
          });

          console.log(`Document ${doc.id}: Rank2 successfully updated!`);
        } catch (e) {
          console.error(`Error updating document ${doc.id}: `, e);
        }
      });

      setUpdateStatus("All documents updated!");
    } catch (error) {
      console.error("Error updating documents: ", error);
      setUpdateStatus("Error updating documents. Check console for details.");
    }
  };

  return (
    <div>
      <button onClick={handleUpdateFirestore}>Update Firestore</button>
      <p>{updateStatus}</p>
    </div>
  );
};

export default RankUpdater;
