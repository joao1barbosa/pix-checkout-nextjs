import { NextResponse } from 'next/server';
import { PixTransactionRequest } from '@/types';
import axios from 'axios';

const API_URL = process.env.PAYMENT_API_BASE_URL;
const SECRET_KEY = process.env.PAYMENT_API_SECRET_KEY;

// POST: Criar transação PIX
export async function POST(request: Request) {
  if (!API_URL || !SECRET_KEY) {
    return NextResponse.json({ error: 'Configuração de ambiente da API ausente.' }, { status: 500 });
  }

  try {
    const formData = await request.json();

    const authString = `Basic ${Buffer.from(SECRET_KEY).toString('base64')}`;
    const requestBody: PixTransactionRequest = {
      customer: {
          name: formData.buyerName,
          email: "teste@teste.com",
          phone: "(11) 99999-9999",
          document: {
            type: "CPF",
            number: formData.buyerDocument
          },
      },
      paymentMethod: "PIX",
      pix: {
          expiresInDays: 1
      },
      items: [
          {
            title: "teste",
            unitPrice: formData.amountInCents,
            quantity: 1,
            externalRef: "PRODUTO0001",
          }
      ],
      amount: formData.amountInCents,
      description: formData.description,
    };
    
    const response = await axios.post(
      API_URL,
      requestBody,
      {
        headers: {
            'Authorization': authString,
            'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(response.data, { status: response.status });

  } catch (error) {
    let errorMessage;
    let statusCode = 500;

    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error || errorMessage;
      statusCode = error.response.status;
    }

    console.error("Erro na API de Pagamento:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}