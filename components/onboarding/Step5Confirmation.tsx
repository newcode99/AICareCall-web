'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Copy, Check } from 'lucide-react';
import { StepCard } from './StepCard';
import { StepNavigation } from './StepNavigation';
import type { LastStepProps, ConfirmationData } from '@/types/onboarding';
import {
  getGenderLabel,
  getRelationshipLabel,
  getLivingArrangementLabel,
  getCallFrequencyLabel,
  getCallTimesLabel,
  getRepeatDaysLabel,
  getCallLengthLabel,
  getCallContentSummary,
} from '@/lib/onboarding-helpers';

const formSchema = z.object({
  elderConsent: z.boolean().refine((val) => val === true, {
    message: '어르신 동의를 확인해주세요',
  }),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: '개인정보 수집 및 이용에 동의해주세요',
  }),
});

export function Step5Confirmation({
  onSubmit,
  onPrev,
  onEdit,
  allFormData,
}: LastStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [copied, setCopied] = useState(false);

  const form = useForm<ConfirmationData>({
    resolver: zodResolver(formSchema) as any,
    mode: 'onChange',
    defaultValues: {
      elderConsent: false,
      privacyConsent: false,
    },
  });

  const isFormValid = form.formState.isValid;

  const handleSubmit = async (data: ConfirmationData) => {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setInviteCode(code);

    setIsSubmitting(false);
    setShowSuccessDialog(true);
    onSubmit(data);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const { guardian, elder, callSettings, callContent } = allFormData;

  return (
    <>
      <StepCard
        stepNumber={5}
        title="최종 확인"
        description="입력하신 정보를 확인하고 서비스를 시작해주세요"
      >
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-muted/30">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold">보호자 정보</h3>
              <Button variant="outline" size="sm" onClick={() => onEdit(1)}>
                수정
              </Button>
            </div>
            <div className="space-y-1 text-sm">
              <p>• 이름: {guardian?.name || '-'}</p>
              <p>• 이메일: {guardian?.email || '-'}</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-muted/30">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold">어르신 정보</h3>
              <Button variant="outline" size="sm" onClick={() => onEdit(2)}>
                수정
              </Button>
            </div>
            <div className="space-y-1 text-sm">
              <p>
                • 이름: {elder?.name || '-'} (
                {elder?.gender ? getGenderLabel(elder.gender) : '-'},{' '}
                {elder?.age || '-'}세)
              </p>
              <p>
                • 관계:{' '}
                {elder?.relationship
                  ? getRelationshipLabel(elder.relationship)
                  : '-'}
              </p>
              <p>• 연락처: {elder?.phone || '-'}</p>
              {elder?.livingArrangement && (
                <p>
                  • 거주:{' '}
                  {getLivingArrangementLabel(elder.livingArrangement)}
                </p>
              )}
              {elder?.healthInfo && <p>• 건강: {elder.healthInfo}</p>}
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-muted/30">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold">통화 설정</h3>
              <Button variant="outline" size="sm" onClick={() => onEdit(3)}>
                수정
              </Button>
            </div>
            <div className="space-y-1 text-sm">
              <p>
                •{' '}
                {callSettings?.callFrequency
                  ? getCallFrequencyLabel(callSettings.callFrequency)
                  : '-'}{' '}
                (
                {callSettings?.callTimes
                  ? getCallTimesLabel(callSettings.callTimes)
                  : '-'}
                )
              </p>
              <p>
                •{' '}
                {callSettings?.startDate
                  ? format(new Date(callSettings.startDate), 'yyyy-MM-dd', {
                      locale: ko,
                    })
                  : '-'}{' '}
                시작 ~{' '}
                {callSettings?.hasEndDate && callSettings?.endDate
                  ? format(new Date(callSettings.endDate), 'yyyy-MM-dd', {
                      locale: ko,
                    })
                  : '종료일 없음'}
              </p>
              <p>
                • 요일:{' '}
                {callSettings?.repeatDays
                  ? getRepeatDaysLabel(callSettings.repeatDays)
                  : '-'}
              </p>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-muted/30">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold">통화 내용</h3>
              <Button variant="outline" size="sm" onClick={() => onEdit(4)}>
                수정
              </Button>
            </div>
            <div className="space-y-1 text-sm">
              <p>• 질문: {getCallContentSummary(callContent)}</p>
              <p>
                • 대화 길이:{' '}
                {callContent?.callLength
                  ? getCallLengthLabel(callContent.callLength)
                  : '-'}
              </p>
              {callContent?.additionalQuestions && (
                <p>
                  • 추가 질문:{' '}
                  {callContent.additionalQuestions.substring(0, 50)}
                  {callContent.additionalQuestions.length > 50 ? '...' : ''}
                </p>
              )}
            </div>
          </div>

          <div className="pt-6 space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="elderConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-semibold cursor-pointer">
                          <span className="text-destructive">* </span>
                          서비스 신청에 대해 어르신 본인의 동의를 얻었음을
                          확인합니다
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="privacyConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-semibold cursor-pointer">
                          <span className="text-destructive">* </span>
                          서비스 제공을 위한 개인정보 수집 및 이용에 동의합니다
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <StepNavigation
                  onPrev={onPrev}
                  onNext={onSubmit}
                  nextLabel="시작하기"
                  nextDisabled={!isFormValid}
                  isSubmitting={isSubmitting}
                />
              </form>
            </Form>
          </div>
        </div>
      </StepCard>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">🎉</DialogTitle>
            <DialogTitle className="text-center">
              신청이 완료되었습니다!
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              어르신께 아래 초대 코드를 전달해주세요
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-6 border-2 rounded-lg bg-primary/5 border-primary/20 text-center space-y-4">
              <p className="text-sm font-medium text-muted-foreground">
                초대 코드
              </p>
              <p className="text-3xl font-bold tracking-wider">{inviteCode}</p>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="w-full"
                disabled={copied}
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    복사됨!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    코드 복사
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-3 text-sm">
              <p className="font-semibold">📱 어르신 앱 설치 안내</p>
              <ol className="space-y-2 pl-5 list-decimal text-muted-foreground">
                <li>앱스토어에서 'ai케어콜' 검색</li>
                <li>앱 설치 후 초대 코드 입력</li>
                <li>설정한 시간에 첫 통화 시작!</li>
              </ol>
            </div>

            <Button
              onClick={() => (window.location.href = '/dashboard')}
              className="w-full"
            >
              대시보드로 이동
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
