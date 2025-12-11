import { NextResponse } from 'next/server';
import axios from 'axios';

// Variáveis de Ambiente
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
    
    const requestBody = {
        customer: {
            name: formData.buyerName,
            email: formData.buyerEmail,
            phone: formData.buyerPhone,
            document: formData.buyerDocument,
        },
        paymentMethod: "PIX",
        pix: {
            expiresInDays: 1
        },
        items: [
            {
                title: formData.description,
                unitPrice: formData.amountInCents,
                quantity: 1,
                externalRef: formData.externalRef,
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
    let errorMessage = 'Erro ao processar transação PIX.';
    let statusCode = 500;

    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || errorMessage;
      statusCode = error.response.status;
    }

    console.error("Erro na API de Pagamento:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}