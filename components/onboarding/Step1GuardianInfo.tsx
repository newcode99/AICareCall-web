'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { StepCard } from './StepCard';
import type { FirstStepProps, GuardianInfoData } from '@/types/onboarding';
import { formatTimer } from '@/lib/onboarding-helpers';

const formSchema = z.object({
  name: z
    .string()
    .min(2, '이름은 최소 2자 이상이어야 합니다')
    .max(20, '이름은 최대 20자까지 입력 가능합니다'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  verificationCode: z.string().optional(),
});

export function Step1GuardianInfo({ onNext }: FirstStepProps) {
  const [emailSent, setEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [verificationAttempted, setVerificationAttempted] = useState(false);

  const form = useForm<GuardianInfoData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      verificationCode: '',
    },
  });

  useEffect(() => {
    if (timer > 0 && !isVerified) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, isVerified]);

  const handleSendVerification = async () => {
    const email = form.getValues('email');
    const emailValidation = z.string().email().safeParse(email);

    if (!emailValidation.success) {
      form.setError('email', { message: '올바른 이메일 형식이 아닙니다' });
      return;
    }

    // TODO: 실제 API 호출
    console.log('인증번호 발송:', email);
    setEmailSent(true);
    setTimer(10 * 60); // 10분
    setVerificationAttempted(false);
  };

  const handleVerifyCode = async () => {
    const code = form.getValues('verificationCode');

    if (!code || code.length !== 6) {
      form.setError('verificationCode', {
        message: '6자리 인증번호를 입력해주세요',
      });
      return;
    }

    // TODO: 실제 API 호출
    console.log('인증번호 확인:', code);
    if (code === '123456') {
      setIsVerified(true);
      setTimer(0);
    } else {
      setVerificationAttempted(true);
      form.setError('verificationCode', {
        message: '인증번호가 일치하지 않습니다',
      });
    }
  };

  const onSubmit = (data: GuardianInfoData) => {
    if (!isVerified) {
      return;
    }
    onNext(data);
  };

  const canProceed = form.formState.isValid && isVerified;

  return (
    <StepCard
      stepNumber={1}
      title="보호자 정보"
      description="지금 서비스를 사용하고자 하는 분의 정보를 입력해주세요."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  이름 <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="예) 김민수"
                    {...field}
                    disabled={isVerified}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  이메일 <span className="text-destructive">*</span>
                </FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      {...field}
                      disabled={isVerified}
                      className={cn(isVerified && 'opacity-60')}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant={emailSent ? 'outline' : 'default'}
                    onClick={handleSendVerification}
                    disabled={isVerified}
                    className="whitespace-nowrap"
                  >
                    {emailSent ? '재발송' : '인증번호 받기'}
                  </Button>
                </div>
                <FormMessage />
                {emailSent && !isVerified && (
                  <p className="text-sm text-primary flex items-center gap-1 mt-2">
                    <Mail className="w-4 h-4" />
                    인증번호가 발송되었습니다
                  </p>
                )}
                {isVerified && (
                  <p className="text-sm text-green-600 flex items-center gap-1 mt-2 font-medium">
                    <Check className="w-4 h-4" />
                    이메일 인증 완료
                  </p>
                )}
              </FormItem>
            )}
          />

          {emailSent && !isVerified && (
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem className="animate-in fade-in slide-in-from-top-2 duration-200">
                  <FormLabel>
                    인증번호 <span className="text-destructive">*</span>
                  </FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        placeholder="6자리 숫자"
                        maxLength={6}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={handleVerifyCode}
                      className="whitespace-nowrap"
                    >
                      {verificationAttempted ? '다시 받기' : '확인'}
                    </Button>
                  </div>
                  <FormMessage />
                  {timer > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      남은 시간 {formatTimer(timer)}
                    </p>
                  )}
                </FormItem>
              )}
            />
          )}

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={!canProceed}
              size="lg"
              className="min-w-32"
            >
              다음
            </Button>
          </div>
        </form>
      </Form>
    </StepCard>
  );
}
