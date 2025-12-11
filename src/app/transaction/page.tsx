"use client";

import { useTransactionContext } from "@/context/TransactionContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { QRCodeCanvas } from "qrcode.react";

interface StatusMap {
  [key: string]: string;
}

export default function TransactionDetailsPage() {
  const { transaction } = useTransactionContext();
  const isValidTransaction = !!transaction;

  const statusTraducoes: StatusMap = {
    waiting_payment: "Aguardando Pagamento",
    processing: "Em Processamento",
    paid: "Pago",
    canceled: "Cancelado",
  };

  if (!isValidTransaction) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-500 text-2xl text-center">
              Dados Ausentes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>Os dados da transação foram perdidos.</p>
            <p>Por favor, volte ao formulário para criar uma nova transação.</p>
            <Button
              onClick={() => (window.location.href = "/")}
              className="mt-6"
            >
              Voltar ao Formulário
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const paymentLink = transaction.pix.qrcode || "";
  const isPaymentPending = transaction.status === "waiting_payment";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(paymentLink);
    toast.success("Link de pagamento copiado para a área de transferência!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-green-600 text-center">
            ✅ Transação PIX Gerada!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isPaymentPending && (
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-xl font-semibold">
                Escaneie o QR Code para pagar:
              </h3>
              {/* Geração do QR Code a partir do link/código */}
            </div>
          )}
          <div className="flex flex-col space-y-2">
            <div className="flex justify-center">
              <QRCodeCanvas value={paymentLink} size={250} />
            </div>
            <div className="w-full justify-center items-center flex flex-row">
              <Label className="text-center text-gray-500">
                Expira em:{" "}
                {new Date(transaction.pix.expirationDate).toLocaleString(
                  "pt-BR",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }
                )}
              </Label>
            </div>
          </div>
          {paymentLink && (
            <div className="space-y-2">
              <Label className="font-semibold">PIX Copia e Cola:</Label>
              <div className="flex flex-row justify-between items-center space-x-2">
                <Input
                  value={paymentLink}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button size="sm" onClick={handleCopyLink}>
                  Copiar
                </Button>
              </div>
            </div>
          )}
          {/* Dados da Transação */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-semibold">ID da Transação:</Label>
              <Input
                value={transaction.id}
                readOnly
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Status:</Label>
              <Input
                value={
                  statusTraducoes[transaction.status] || transaction.status
                }
                readOnly
                className="capitalize font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Valor:</Label>
              <Input
                value={`R$ ${(transaction.amount / 100).toFixed(2)}`}
                readOnly
                className="font-bold"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
