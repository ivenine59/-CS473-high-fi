// comment.js
import {
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, firestore } from "../firebase";

export const fetchComments = (postId, setComments) => {
  return onSnapshot(
    query(
      collection(firestore, "Postings", postId, "Comments"),
      orderBy("createAt", "asc")
    ),
    (snapshot) => {
      const commentsData = snapshot.docs.map((commentDoc) => ({
        id: commentDoc.id,
        ...commentDoc.data(),
      }));
      setComments(commentsData);
    }
  );
};

export const postComment = async (postId, comment) => {
  try {
    const user = auth.currentUser; // Get the current user
    const uid = user ? user.uid : null; // Get the user's uid

    if (!uid) {
      console.error("User not authenticated");
      return;
    }

    const userEmail = user ? user.email : null; // Get the user's email

    if (!userEmail) {
      console.error("User email not available");
      return;
    }

    const commentData = {
      text: comment,
      createAt: Date.now(),
      uid: uid,
      userEmail: userEmail,
      // Other comment-related fields
    };

    const postRef = doc(firestore, "Postings", postId);
    const commentsRef = collection(postRef, "Comments");
    await addDoc(commentsRef, commentData);

    console.log("댓글이 성공적으로 게시되었습니다.");
    // Perform necessary actions after comment submission
  } catch (error) {
    console.log("댓글 게시 중 오류 발생:", error.message);
  }
};

export const postRating = async (postId, commentId, rating) => {
  try {
    const user = auth.currentUser; // Get the current user
    const uid = user ? user.uid : null; // Get the user's uid

    if (!uid) {
      console.error("User not authenticated");
      return;
    }

    const userEmail = user ? user.email : null; // Get the user's email

    if (!userEmail) {
      console.error("User email not available");
      return;
    }

    const RatingData = {
      postId: postId,
      commentId: commentId,
      uid: uid,
      userEmail: userEmail,
      rating: rating,
      // Other comment-related fields
    };

    const postRef = doc(firestore, "Postings", postId);
    const commentsRef = doc(postRef, "Comments", commentId);
    const ratingsRef = collection(commentsRef, "ratings");

    const ExistingRatingQuery = query(
      ratingsRef,
      where("uid", "==", uid),
      where("postId", "==", postId)
    );
    const ExistingRatingSnapshot = await getDocs(ExistingRatingQuery);

    let originalRating = 0;
    let existingFlag = 0;
    let avgRating = 3;

    if (!ExistingRatingSnapshot.empty) {
      const existingRatingDoc = ExistingRatingSnapshot.docs[0];
      const existingRatingData = existingRatingDoc.data();
      originalRating = existingRatingData.rating;
      existingFlag = 1;
      await updateDoc(existingRatingDoc.ref, RatingData);
      console.log("별점이 성공적으로 업데이트되었습니다.");
    } else {
      await addDoc(ratingsRef, RatingData);
      console.log("별점이 성공적으로 게시되었습니다.");
    }

    const accountRef = collection(firestore, "Accounts");
    const accountQuery = query(accountRef, where("userEmail", "==", userEmail));
    const accountSnapshot = await getDocs(accountQuery);
    const authordoc = await getDoc(commentsRef);
    const authordata = authordoc.data();
    const receiverQuery = query(accountRef, where("userEmail", "==", authordata.userEmail));
    const receiverSnapshot = await getDocs(receiverQuery);

    if (!accountSnapshot.docs.empty) {
      const accountDoc = accountSnapshot.docs[0];
      const accountData = accountDoc.data();
      const currentRating = accountData.sum_rating;
      const numRating = accountData.num_rating;
      const extraRating = rating;
      const accountDocRef = doc(accountRef, accountDoc.id);

      await updateDoc(accountDocRef, {
        sum_rating: currentRating + extraRating - originalRating,
        num_rating: numRating + 1 - existingFlag,
      });

      if (existingFlag === 1){
        avgRating = (currentRating - originalRating) / (numRating - 1)
      }

      console.log("Rating 업데이트 성공");
    } else {
      console.error("해당 이메일을 가진 사용자가 없습니다.");
    }

    if (!receiverSnapshot.docs.empty) {
      const receiverDoc = receiverSnapshot.docs[0];
      const receiverData = receiverDoc.data();
      const re_currentRating = receiverData.received_sum_rating;
      const re_numRating = receiverData.received_num_rating;
      const re_extraRating = rating;

      const receiverDocRef = doc(accountRef, receiverDoc.id);
      await updateDoc(receiverDocRef, {
        received_sum_rating: re_currentRating + (1 - existingFlag)*(3 - avgRating) + re_extraRating - originalRating,
        received_num_rating: re_numRating + 1 - existingFlag,
      });

      console.log("Rating receiver 업데이트 성공");
    } else {
      console.error("해당 이메일을 가진 사용자가 없습니다.");
    }

    // Perform necessary actions after comment submission
  } catch (error) {
    console.log("별점 게시 중 오류 발생:", error.message);
  }
};
