import { CheckIcon } from '@heroicons/react/24/solid';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useToggle } from 'react-use';

import useSignIn from '../../../hooks/use-sign-in';
import useSignUp from '../../../hooks/use-sign-up';
import Button from '../../button';
import { Input, Label } from '../../forms';
import LoadingIcon from '../../loading-icon';
import { usePageContext } from '../../page';

export default function SignIn() {
  const router = useRouter();

  const emailRef = React.useRef();
  const nameRef = React.useRef();

  const [isNewUser, setIsNewUser] = useToggle(false);

  const signInMutation = useSignIn({
    onSuccess: (response) => {
      if (response.status && response.status === 401) {
        setIsNewUser(true);
      } else if (response.magicLink) {
        router.replace(response.magicLink);
      }
    },
  });

  const signUpMutation = useSignUp({
    onSuccess: () => {
      window.location = '/';
    },
  });

  usePageContext({
    title: isNewUser ? 'Sign-Up' : 'Sign-In',
  });

  const submit = () => {
    const email = emailRef.current.value.trim();
    if (email) {
      if (isNewUser) {
        const firstName = nameRef.current.value.trim();
        if (firstName) signUpMutation.mutate({ email, firstName });
      } else {
        signInMutation.mutate({ email });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Sign-In</title>
      </Head>
      <div className='flex flex-col flex-1 space-y-4'>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' type='email' name='email' ref={emailRef} />
        {isNewUser && (
          <>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' type='text' name='name' ref={nameRef} />
          </>
        )}
        <Button
          className='flex justify-center items-center'
          disabled={signInMutation.isLoading}
          onClick={() => submit()}
        >
          {signInMutation.isLoading ? (
            <LoadingIcon className='w-6 h-6' />
          ) : (
            <CheckIcon className='w-6 h-6' />
          )}
        </Button>
      </div>
    </>
  );
}
