interface Costumer{
    name: string,
    email: string,
    phone: string,
    document: {
            type: "CPF",
            number: string
    },
}

export interface PixTransactionRequest {
    customer: Costumer,
    paymentMethod: "PIX",
    pix: {
        expiresInDays: 1
    },
    items: [
        {
        title: string,
        unitPrice: number,
        quantity: number,
        externalRef: string,
        }
    ],
    amount: number,
    description: string,
};


export interface PixTransactionResponse {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  costumer: Costumer;
  pix: {
    qrcode: string;
    expirationDate: string;
    end2endId: string;
    receiptUrl: string;
  };
}