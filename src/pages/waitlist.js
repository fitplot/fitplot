import {
  ArrowRightIcon,
  HandRaisedIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { useToggle } from 'react-use';
import Balancer from 'react-wrap-balancer';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InfoCard from '@/components/info-card';
import { MarketingLayout } from '@/components/layouts';
import LoadingIcon from '@/components/loading-icon';
import { H1, Paragraph } from '@/components/typography';
import useAddToWaitlist from '@/hooks/use-waitlist';
import withUser from '@/lib/with-user';
import { Button } from '@/components/ui/button';

export default function Waitlist() {
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
    <div className='container mx-auto flex flex-1 flex-col items-center'>
      <section className='flex flex-1 flex-col items-center space-y-8 pt-28 text-center'>
        <H1 className='font-extrabold tracking-tighter'>
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
        <div className='flex w-full max-w-lg flex-col gap-4 text-left'>
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
                <ArrowRightIcon className='inline-block h-6 pl-2' />
              </span>
            )}
          </Button>
        </div>
      </section>
    </div>
  );
}

Waitlist.getLayout = () => MarketingLayout;

export const getServerSideProps = withUser({ required: false });
