import React from 'react';
import { HandRaisedIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useToggle } from 'react-use';

import { MarketingLayout } from '@/components/layouts';
import LoadingIcon from '@/components/loading-icon';
import { H1 } from '@/components/typography';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useSignIn from '@/hooks/use-sign-in';
import useSignUp from '@/hooks/use-sign-up';

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
      <div className='container mx-auto flex h-full flex-col items-center pt-24'>
        <section className='flex w-full flex-col gap-4 md:w-96'>
          <H1 className='font-extrabold'>Sign-In</H1>
          {isComplete && (
            <Alert>
              <SparklesIcon className='h-6 w-6 pr-2' />
              <AlertDescription>
                <span>
                  We sent you a magic link. Please check your email inbox.
                </span>
              </AlertDescription>
            </Alert>
          )}
          {isRateLimited && (
            <Alert>
              <HandRaisedIcon className='h-6 w-6 pr-2' />
              <AlertDescription>
                <span>Whoa, there. Please slow down.</span>
              </AlertDescription>
            </Alert>
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
        </section>
      </div>
    </>
  );
}

SignIn.getLayout = () => MarketingLayout;
