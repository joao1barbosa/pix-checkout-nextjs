"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PixTransactionResponse } from "@/types";
import { useTransactionContext } from "@/context/TransactionContext";
import { useRouter } from "next/navigation";

export function PaymentForm() {
  const [buyerName, setBuyerName] = useState("");
  const [buyerDocument, setBuyerDocument] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setTransaction } = useTransactionContext();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!buyerName || !buyerDocument || !amount || !description) {
      setError("Todos os campos são obrigatórios.");
      setIsLoading(false);
      return;
    }

    const amountInCents = Math.round(
      parseFloat(amount.replace(",", ".")) * 100
    );

    if (isNaN(amountInCents) || amountInCents <= 0) {
      setError("Valor inválido.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post<PixTransactionResponse>(
        "/api/payments",
        {
          buyerName,
          buyerDocument,
          amountInCents,
          description,
        }
      );

      if (response.status !== 200) {
        throw new Error("Falha ao criar a transação PIX.");
      }

      setTransaction(response.data);

      router.push("/transaction");
    } catch (err) {
      const errMessage =
        axios.isAxiosError(err) && err.response
          ? err.response.data.error || "Erro desconhecido ao criar a transação."
          : "Erro de rede ou falha interna.";
      setError(errMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Criar Pagamento PIX
        </CardTitle>
        <CardDescription className="text-center">
          Preencha os dados para gerar a transação PIX.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="buyerName">Nome do Comprador:</Label>
            <Input
              id="buyerName"
              placeholder="João da Silva"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="buyerDocument">CPF:</Label>
            <Input
              id="buyerDocument"
              placeholder="000.000.000-00"
              value={buyerDocument}
              onChange={(e) => setBuyerDocument(e.target.value)}
              maxLength={14}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Valor (R$):</Label>
            <Input
              id="amount"
              type="text"
              placeholder="10.00"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value.replace(/[^0-9.,]/g, ""))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição:</Label>
            <Input
              id="description"
              placeholder="Compra de Produto X"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm font-medium text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Gerando Transação..." : "Gerar PIX"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
