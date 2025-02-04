'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Por favor, selecciona un consumidor.',
  }),
  //si llega un string a amount, lo convertira a tipo number y a la vez validara el tipo
  amount: z.coerce.number().gt(0, { message: 'Por favor, introduce un importe superior a 0.' }),
  status: z.enum(['pending', 'paid'],{
    invalid_type_error: 'Por favor, selecciona un estado.',
  }),
  
  date: z.string(),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
  
//se omite la validacion de los campos id y date
const CreateInvoice = FormSchema.omit({id: true, date: true });
const UpdateInvoice = FormSchema.omit({id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  // const rawFormData = {
  //   customerId: formData.get('customerId'),
  //   amount: formData.get('amount'),
  //   status: formData.get('status'),
  // };
  // console.log(rawFormData);
  //cuando tengamos muchos datos podemos usar la siguiente linea que automapea los campos
  // const rawFormData = Object.fromEntries(formData.entries())

  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  console.log("amountInCent: "+ amountInCents);

  try {
    await sql`INSERT INTO invoices (customer_id, amount, status, date) VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
  } catch (error) {
    return {
      message: 'Database Error: '+ error,
    };
  }

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
    try {
      await sql`UPDATE invoices SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status} WHERE id = ${id}`;
    } catch (error) {
      console.error('Database Error:', error);
      return {
        message: 'Database Error: Failed to Update Invoice.',
      };
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

  export async function deleteInvoice(id: string) {
    //log en la terminal del visual code
    console.log("eliminando id: "+ id);

    try{
      await sql`DELETE FROM invoices WHERE id = ${id}`;
      revalidatePath('/dashboard/invoices');
      return { message: 'Deleted Invoice.' };
    } catch{
      // return {
      //   message: 'Database Error: Failed to Delete Invoice.',
      // };

      //enviamos el string de error a error.tsx para que lo muestre
      throw new Error('Error al eliminar la factura');
    }
    
    
  }