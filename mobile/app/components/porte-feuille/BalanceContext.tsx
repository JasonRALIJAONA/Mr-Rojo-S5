import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";

const BalanceContext = createContext({
  balance: 0,
  fetchUserBalance: () => {},
});

export function BalanceProvider({ children }) {
  const [balance, setBalance] = useState(0);

  const fetchUserBalance = () => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "mvt_fond"), where("id_utilisateur", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let totalDepot = 0;
      let totalRetrait = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        totalDepot += data.depot || 0;
        totalRetrait += data.retrait || 0;
      });

      setBalance(totalDepot - totalRetrait);
    });

    return unsubscribe;
  };

  useEffect(() => {
    return fetchUserBalance();
  }, []);

  return <BalanceContext.Provider value={{ balance, fetchUserBalance }}>{children}</BalanceContext.Provider>;
}

export function useBalance() {
  return useContext(BalanceContext);
}
