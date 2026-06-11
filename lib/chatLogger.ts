import { db } from "@/lib/firebase";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export async function logChat({
  teamId,
  teamName,
  stakeholderId,
  stakeholderName,
  question,
  answer,
}: {
  teamId: string;
  teamName: string;
  stakeholderId: string;
  stakeholderName: string;
  question: string;
  answer: string;
}) {
  try {
    await addDoc(
      collection(db, "competition_logs"),
      {
        teamId,
        teamName,
        stakeholderId,
        stakeholderName,
        question,
        answer,
        timestamp: serverTimestamp(),
      }
    );
  } catch (error) {
    console.error(
      "FIRESTORE LOG ERROR",
      error
    );
  }
}