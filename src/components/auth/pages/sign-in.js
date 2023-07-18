import { HandRaisedIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useToggle } from 'react-use';

import useSignIn from '../../../hooks/use-sign-in';
import useSignUp from '../../../hooks/use-sign-up';
import Button from '../../button';
import { Input, Label } from '../../forms';
import InfoCard from '../../info-card';
import LoadingIcon from '../../loading-icon';
import { usePageContext } from '../../layouts';

export default function SignIn() {
  const router = useRouter();

  const emailRef = React.useRef();
  const nameRef = React.useRef();

  const [isNewUser, setIsNewUser] = useToggle(false);
  const [isRedirecting, setIsRedirecting] = useToggle(false);
  const [isComplete, setIsComplete] = useToggle(false);
  const [isRateLimited, setIsRateLimited] = useToggle(false);

  const signInMutation = useSignIn({
    onSuccess: (response) => {
      if (response.ok) {
        setIsComplete(true);
      } else if (response.status === 429) {
        setIsRateLimited(true);
      } else if (response.status === 401) {
        setIsNewUser(true);
      } else {
        // TODO: handle error
      }
    },
  });

  const signUpMutation = useSignUp({
    onSuccess: () => {
      setIsRedirecting(true);
      if (isNewUser) {
        router.push('/welcome');
      } else {
        router.push('/dashboard');
      }
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

  const isLoading =
    signInMutation.isLoading || signUpMutation.isLoading || isRedirecting;

  const disabled = isComplete || isLoading;

  return (
    <>
      <Head>
        <title>Sign-In</title>
      </Head>
      <div className='flex flex-col space-y-4'>
        {isComplete && (
          <InfoCard variant='success'>
            <SparklesIcon className='h-6 w-6 pr-2' />
            <span>
              We sent you a magic link. Please check your email inbox.
            </span>
          </InfoCard>
        )}
        {isRateLimited && (
          <InfoCard variant='warn'>
            <HandRaisedIcon className='h-6 w-6 pr-2' />
            <span>Whoa, hold your horses there. Please slow down.</span>
          </InfoCard>
        )}
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          name='email'
          ref={emailRef}
          disabled={disabled}
          readOnly={disabled}
        />
        {isNewUser && (
          <>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              type='text'
              name='name'
              ref={nameRef}
              disabled={disabled}
              readOnly={disabled}
            />
          </>
        )}
        <Button
          className='flex items-center justify-center'
          variant='primary'
          disabled={disabled}
          onClick={() => submit()}
        >
          {isLoading ? (
            <LoadingIcon className='h-6 w-6' />
          ) : (
            <CheckIcon className='h-6 w-6' />
          )}
        </Button>
      </div>
    </>
  );
}
