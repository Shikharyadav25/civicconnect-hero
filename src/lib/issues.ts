import { db } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';

export const createIssue = async (issueData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'issues'), issueData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating issue: ', error);
    throw new Error('Failed to create issue');
  }
};

export const getIssues = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'issues'));
    const issues = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return issues;
  } catch (error) {
    console.error('Error getting issues: ', error);
    throw new Error('Failed to get issues');
  }
};

export const resolveIssue = async (issueId: string, resolutionImage: string) => {
  try {
    const issueRef = doc(db, 'issues', issueId);
    await updateDoc(issueRef, {
      resolved: true,
      resolutionImage,
    });
  } catch (error) {
    console.error('Error resolving issue: ', error);
    throw new Error('Failed to resolve issue');
  }
};
