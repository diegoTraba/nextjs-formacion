'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    //si llega un string a amount, lo convertira a tipo number y a la vez validara el tipo
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
  });

  //se omite la validacion de los campos id y date
  const CreateInvoice = FormSchema.omit({date: true });
  const UpdateInvoice = FormSchema.omit({id: true, date: true });

export async function createInvoice(formData: FormData) {
    // const rawFormData = {
    const { id, customerId, amount, status } = CreateInvoice.parse({
        id: formData.get("id"),
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    //cuando tengamos muchos datos podemos usar la siguiente linea que automapea los campos
    //const rawFormData = Object.fromEntries(formData.entries())

    console.log(customerId);

    await sql`INSERT INTO invoices (customer_id, amount, status, date) VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;

    //Next almacena en cache los segmentos de ruta en el navegador del usuario de tal manera que cuando actualicemos los datos de una vista hay que borrar la cache y activar una nueva
    //solicitud al servidor
    revalidatePath('/dashboard/invoices');

    redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
   
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

  export async function deleteInvoice(id: string) {
    console.log("eliminando id: "+ id);
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  }