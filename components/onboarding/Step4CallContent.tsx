'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { StepCard } from './StepCard';
import { StepNavigation } from './StepNavigation';
import type { StepProps, CallContentData } from '@/types/onboarding';

const formSchema = z.object({
  mealDepth: z.enum(['simple', 'normal', 'detailed']),
  askAppetite: z.boolean().default(false),
  askCompany: z.boolean().default(false),

  askMedication: z.boolean().default(false),
  medMorning: z.boolean().default(false),
  medLunch: z.boolean().default(false),
  medEvening: z.boolean().default(false),
  askPain: z.boolean().default(false),
  askSleep: z.boolean().default(false),
  askDiscomfort: z.boolean().default(false),

  moodDepth: z.enum(['simple', 'detailed']),
  askLoneliness: z.boolean().default(false),
  askWorries: z.boolean().default(false),
  askContacts: z.boolean().default(false),

  activityDepth: z.enum(['simple', 'normal', 'detailed']),
  askOutdoor: z.boolean().default(false),
  askExercise: z.boolean().default(false),
  askHobbies: z.boolean().default(false),

  callLength: z.enum(['short', 'normal', 'long']),

  additionalQuestions: z
    .string()
    .max(500, '최대 500자까지 입력 가능합니다')
    .optional(),
});

export function Step4CallContent({
  onNext,
  onPrev,
  initialData,
}: StepProps<CallContentData>) {
  const form = useForm<CallContentData>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      mealDepth: initialData?.mealDepth || 'normal',
      askAppetite: initialData?.askAppetite || false,
      askCompany: initialData?.askCompany || false,
      askMedication: initialData?.askMedication || false,
      medMorning: initialData?.medMorning || false,
      medLunch: initialData?.medLunch || false,
      medEvening: initialData?.medEvening || false,
      askPain: initialData?.askPain || false,
      askSleep: initialData?.askSleep || false,
      askDiscomfort: initialData?.askDiscomfort || false,
      moodDepth: initialData?.moodDepth || 'simple',
      askLoneliness: initialData?.askLoneliness || false,
      askWorries: initialData?.askWorries || false,
      askContacts: initialData?.askContacts || false,
      activityDepth: initialData?.activityDepth || 'normal',
      askOutdoor: initialData?.askOutdoor || false,
      askExercise: initialData?.askExercise || false,
      askHobbies: initialData?.askHobbies || false,
      callLength: initialData?.callLength || 'normal',
      additionalQuestions: initialData?.additionalQuestions || '',
    },
  });

  const additionalQuestionsValue = form.watch('additionalQuestions') || '';
  const askMedication = form.watch('askMedication');

  const onSubmit = (data: CallContentData) => {
    onNext(data);
  };

  return (
    <StepCard
      stepNumber={4}
      title="통화 내용 설정"
      description="AI가 어르신께 매일 물어볼 내용을 설정해주세요"
    >
      <p className="text-sm text-muted-foreground mb-6">
        모든 항목이 기본으로 포함되며, 세부 옵션을 선택할 수 있습니다
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Accordion type="multiple" defaultValue={['meal']} className="w-full">
            <AccordionItem value="meal" className="border rounded-lg px-4 mb-3">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🍽️</span>
                  <span className="font-semibold">식사</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div className="p-3 bg-muted rounded text-sm text-muted-foreground">
                  기본 질문: 오늘 식사는 하셨어요?
                </div>

                <FormField
                  control={form.control}
                  name="mealDepth"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>얼마나 자세히 물어볼까요?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          {['simple', 'normal', 'detailed'].map((value) => (
                            <FormItem
                              key={value}
                              className="flex items-center space-x-2 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={value} />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {value === 'simple'
                                  ? '간단히'
                                  : value === 'normal'
                                  ? '보통'
                                  : '자세히'}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="askAppetite"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          입맛은 괜찮으신지 물어보기
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="askCompany"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          혼자 드셨는지/함께 드셨는지 물어보기
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="medication"
              className="border rounded-lg px-4 mb-3"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💊</span>
                  <span className="font-semibold">복약/건강</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div className="p-3 bg-muted rounded text-sm text-muted-foreground">
                  기본 질문: 오늘 몸 상태는 어떠세요?
                </div>

                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="askMedication"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          약 드셨는지 물어보기
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  {askMedication && (
                    <div className="ml-8 space-y-2 p-3 bg-background rounded border animate-in fade-in slide-in-from-top-1 duration-200">
                      <p className="text-sm text-muted-foreground mb-2">
                        시간대 선택
                      </p>
                      <div className="flex gap-4">
                        <FormField
                          control={form.control}
                          name="medMorning"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                아침
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="medLunch"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                점심
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="medEvening"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                저녁
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="askPain"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          아픈 곳은 없으신지 물어보기
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="askSleep"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          잠은 잘 주무셨는지 물어보기 (아침 통화 시만)
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="askDiscomfort"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          어지럽거나 불편한 곳은 없는지 물어보기
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mood" className="border rounded-lg px-4 mb-3">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <span className="text-lg">😊</span>
                  <span className="font-semibold">기분/컨디션</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div className="p-3 bg-muted rounded text-sm text-muted-foreground">
                  기본 질문: 오늘 기분은 어떠세요?
                </div>

                <FormField
                  control={form.control}
                  name="moodDepth"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>얼마나 자세히 물어볼까요?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          {['simple', 'detailed'].map((value) => (
                            <FormItem
                              key={value}
                              className="flex items-center space-x-2 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={value} />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {value === 'simple' ? '간단히' : '자세히'}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="askLoneliness"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          외로우시진 않은지 물어보기
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="askWorries"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          궁금하거나 걱정되는 일은 없는지 물어보기
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="askContacts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          누구와 연락하셨는지 물어보기
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="activity"
              className="border rounded-lg px-4 mb-3"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  <span className="font-semibold">특별한 일/하루 요약</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div className="p-3 bg-muted rounded text-sm text-muted-foreground">
                  기본 질문: 오늘 특별한 일이 있으셨어요?
                </div>

                <FormField
                  control={form.control}
                  name="activityDepth"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>얼마나 자세히 물어볼까요?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          {['simple', 'normal', 'detailed'].map((value) => (
                            <FormItem
                              key={value}
                              className="flex items-center space-x-2 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={value} />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {value === 'simple'
                                  ? '간단히'
                                  : value === 'normal'
                                  ? '보통'
                                  : '자세히'}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="askOutdoor"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          외출하셨는지 물어보기
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="askExercise"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          운동이나 산책 하셨는지 물어보기
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="askHobbies"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          TV나 취미 생활 하셨는지 물어보기
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="space-y-4 pt-2 border-t">
            <FormField
              control={form.control}
              name="callLength"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base font-semibold">
                    통화 길이를 선택해주세요
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      {[
                        { value: 'short', label: '짧게 (2-3분)' },
                        { value: 'normal', label: '보통 (5분 내외)' },
                        { value: 'long', label: '길게 (7-10분)' },
                      ].map((option) => (
                        <FormItem
                          key={option.value}
                          className="flex items-center space-x-2 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 pt-4 border-t">
            <FormField
              control={form.control}
              name="additionalQuestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    추가로 물어볼 내용{' '}
                    <span className="text-muted-foreground font-normal">
                      (선택)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`예시:\n• 손주들 보고 싶진 않으세요?\n• 오늘 교회 가셨어요?\n• 물 충분히 드셨어요?`}
                      className="resize-none min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <div className="flex justify-between items-center">
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">
                      {additionalQuestionsValue.length}/500
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <StepNavigation onPrev={onPrev} onNext={onNext} />
        </form>
      </Form>
    </StepCard>
  );
}
