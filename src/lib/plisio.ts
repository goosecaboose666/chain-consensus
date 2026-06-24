export interface CreateInvoiceParams {
  order_name: string;
  order_number: string;
  source_amount: string;
  source_currency: string;
  currency: string; // the cryptocurrency they want to pay in
  cancel_url?: string;
  callback_url?: string;
  success_url?: string;
}

export async function createPlisioInvoice(params: CreateInvoiceParams) {
  const apiKey = process.env.PLISIO_SECRET_KEY;
  if (!apiKey) {
    throw new Error('PLISIO_SECRET_KEY is not set');
  }

  const queryParams = new URLSearchParams({
    ...params as any,
    api_key: apiKey
  });

  const response = await fetch(`https://api.plisio.net/api/v1/invoices/new?${queryParams.toString()}`, {
    method: 'GET' // Plisio API uses GET for new invoices
  });

  if (!response.ok) {
    throw new Error(`Plisio API error: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.status !== 'success') {
    throw new Error(`Plisio API returned error: ${JSON.stringify(data.data)}`);
  }

  return data.data;
}
