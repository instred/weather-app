import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

const db = getFirestore();

export async function saveRecentSearches(recentSearches) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return;

  // Bierzemy tylko ostatnie 5 elementów z tablicy recentSearches
  const recentFive = recentSearches.slice(0, 5);

  console.log('Zapisuję ostatnie 5 wyników:', recentFive);

  const userDocRef = doc(db, 'users', user.uid);

  try {
    await setDoc(userDocRef, { recentSearches: recentFive }, { merge: true });
  } catch (error) {
    console.error('Błąd zapisu ostatnich wyszukiwań:', error);
  }
}

export async function getRecentSearches() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return [];

  const userDocRef = doc(db, 'users', user.uid);
  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.recentSearches || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Błąd pobierania ostatnich wyszukiwań:', error);
    return [];
  }
}

