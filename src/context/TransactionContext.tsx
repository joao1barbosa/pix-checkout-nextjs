"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { PixTransactionResponse } from "@/types";

interface TransactionContextType {
  transaction: PixTransactionResponse | null;
  setTransaction: (data: PixTransactionResponse | null) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export function useTransactionContext() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transaction, setTransaction] = useState<PixTransactionResponse | null>(
    null
  );

  return (
    <TransactionContext.Provider value={{ transaction, setTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}
