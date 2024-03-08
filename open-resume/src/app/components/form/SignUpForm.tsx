"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
  username: z.string().min(1, 'Username is required').max(100),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  name: z.string().min(1, 'Name is required'),
  numtel: z.string().min(1, 'Phone number is required'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters'),
  confirmPassword: z.string().min(1, 'Password confirmation is required'),
});

const SignUpForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      name: '',
      numtel: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        setSuccessMessage('Registration successful');
        
        window.location.href = '/SignIn';
      } else {
        setError('Failed to sign up');
      }
    } catch (error) {
      setError('Failed to sign up');
    }
  };
  

  return ( <form onSubmit={form.handleSubmit(onSubmit)} className='mx-auto max-w-md'>
  <div className='space-y-4'>
    <div>
      <label htmlFor='username' className='block font-medium text-gray-700'>
        Username
      </label>
      <input id='username' {...form.register('username')} className='mt-1 p-2 border border-gray-300 rounded-md w-full' />
      {form.formState.errors.username && (
        <p className='text-red-500'>{form.formState.errors.username.message}</p>
      )}
    </div>
    <div>
      <label htmlFor='email' className='block font-medium text-gray-700'>
        Email
      </label>
      <input id='email' {...form.register('email')} className='mt-1 p-2 border border-gray-300 rounded-md w-full' />
      {form.formState.errors.email && (
        <p className='text-red-500'>{form.formState.errors.email.message}</p>
      )}
    </div>
    <div>
      <label htmlFor='name' className='block font-medium text-gray-700'>
        Name
      </label>
      <input id='name' {...form.register('name')} className='mt-1 p-2 border border-gray-300 rounded-md w-full' />
      {form.formState.errors.name && (
        <p className='text-red-500'>{form.formState.errors.name.message}</p>
      )}
    </div>
    <div>
      <label htmlFor='numtel' className='block font-medium text-gray-700'>
        Phone Number
      </label>
      <input id='numtel' {...form.register('numtel')} className='mt-1 p-2 border border-gray-300 rounded-md w-full' />
      {form.formState.errors.numtel && (
        <p className='text-red-500'>{form.formState.errors.numtel.message}</p>
      )}
    </div>
    <div>
      <label htmlFor='password' className='block font-medium text-gray-700'>
        Password
      </label>
      <input id='password' type='password' {...form.register('password')} className='mt-1 p-2 border border-gray-300 rounded-md w-full' />
      {form.formState.errors.password && (
        <p className='text-red-500'>{form.formState.errors.password.message}</p>
      )}
    </div>
    <div>
      <label htmlFor='confirmPassword' className='block font-medium text-gray-700'>
        Confirm Password
      </label>
      <input id='confirmPassword' type='password' {...form.register('confirmPassword')} className='mt-1 p-2 border border-gray-300 rounded-md w-full' />
      {form.formState.errors.confirmPassword && (
        <p className='text-red-500'>{form.formState.errors.confirmPassword.message}</p>
      )}
    </div>
  </div>
  <button type='submit' className='mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md'>
    Sign up
  </button>
  {error && <div className='text-red-500 mt-4'>{error}</div>}
  <p className='text-center text-sm text-gray-600 mt-2'>
    If you  have an account, please&nbsp;
    <a href='/SignIn' className='text-blue-500 hover:underline'>
      Sign in
    </a>
  </p>
</form>
  );
};

export default SignUpForm;

