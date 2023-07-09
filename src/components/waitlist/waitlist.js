import {
  ArrowRightIcon,
  HandRaisedIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { useToggle } from 'react-use';
import Balancer from 'react-wrap-balancer';

import useAddToWaitlist from '../../hooks/use-waitlist';
import Button from '../button';
import { Input, Label } from '../forms';
import InfoCard from '../info-card';
import LoadingIcon from '../loading-icon';
import { usePageContext } from '../page';
import { H1, Paragraph } from '../typography';

export default function Waitlist() {
  usePageContext({ title: 'Waitlist' });

  const emailRef = React.useRef();
  const nameRef = React.useRef();
  const [isComplete, setIsComplete] = useToggle(false);
  const [isRateLimited, setIsRateLimited] = useToggle(false);

  const { mutate: addToWaitlist, isLoading } = useAddToWaitlist({
    onSuccess: (response) => {
      if (response.ok) {
        setIsComplete(true);
      } else if (response.status === 429) {
        setIsRateLimited(true);
      } else {
        // TODO: handle error
      }
    },
  });

  const submit = React.useCallback(() => {
    const email = emailRef.current.value.trim();
    const firstName = nameRef.current.value.trim();

    if (email && firstName) addToWaitlist({ email, firstName });
  }, [emailRef, nameRef, addToWaitlist]);

  const disabled = isLoading;

  return (
    <div className='flex-1 flex flex-col mx-auto items-center container'>
      <section className='flex-1 flex flex-col space-y-8 text-center items-center pt-28'>
        <H1 className='tracking-tighter font-extrabold'>
          <Balancer>
            Join the waitlist and transform your fitness productivity.
          </Balancer>
        </H1>
        <Paragraph>
          By signing up to our waitlist, you will be first in line to know when
          we launch and receive early access.
        </Paragraph>
        {isComplete && (
          <InfoCard variant='success'>
            <SparklesIcon className='w-6 h-6 pr-2' />
            <span>
              We sent you a magic link. Please check your email inbox.
            </span>
          </InfoCard>
        )}
        {isRateLimited && (
          <InfoCard variant='warn'>
            <HandRaisedIcon className='w-6 h-6 pr-2' />
            <span>Whoa, hold your horses there. Please slow down.</span>
          </InfoCard>
        )}
        <div className='flex flex-col gap-4 w-full text-left max-w-lg'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            name='email'
            ref={emailRef}
            disabled={disabled}
            readOnly={disabled}
          />
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            type='text'
            name='name'
            ref={nameRef}
            disabled={disabled}
            readOnly={disabled}
          />
          <Button
            onClick={submit}
            className='block flex justify-center'
            variant='primary'
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingIcon className='w-6' />
            ) : (
              <span>
                Secure Your Spot
                <ArrowRightIcon className='pl-2 inline-block h-6' />
              </span>
            )}
          </Button>
        </div>
      </section>
    </div>
  );
}
