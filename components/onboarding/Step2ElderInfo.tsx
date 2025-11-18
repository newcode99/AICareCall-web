'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { StepCard } from './StepCard';
import { StepNavigation } from './StepNavigation';
import type { StepProps, ElderInfoData, Gender, Relationship, LivingArrangement } from '@/types/onboarding';
import { formatPhoneNumber } from '@/lib/onboarding-helpers';

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, '이름은 최소 2자 이상이어야 합니다')
      .max(20, '이름은 최대 20자까지 입력 가능합니다'),
    gender: z.enum(['male', 'female']).refine((val) => val, {
      message: '성별을 선택해주세요',
    }),
    age: z
      .number()
      .min(60, '60세 이상만 입력 가능합니다')
      .max(120, '올바른 나이를 입력해주세요'),
    phone: z
      .string()
      .regex(
        /^010-\d{4}-\d{4}$/,
        '올바른 전화번호 형식이 아닙니다 (010-0000-0000)'
      ),
    relationship: z.string().min(1, '관계를 선택해주세요'),
    relationshipOther: z.string().optional(),
    livingArrangement: z.string().optional(),
    livingArrangementOther: z.string().optional(),
    healthInfo: z
      .string()
      .min(1, '건강 정보를 입력해주세요')
      .max(500, '최대 500자까지 입력 가능합니다'),
  })
  .refine(
    (data) => {
      if (data.relationship === 'other' && !data.relationshipOther?.trim()) {
        return false;
      }
      return true;
    },
    {
      message: '관계를 입력해주세요',
      path: ['relationshipOther'],
    }
  )
  .refine(
    (data) => {
      if (
        data.livingArrangement === 'other' &&
        !data.livingArrangementOther?.trim()
      ) {
        return false;
      }
      return true;
    },
    {
      message: '거주 형태를 입력해주세요',
      path: ['livingArrangementOther'],
    }
  );

export function Step2ElderInfo({
  onNext,
  onPrev,
  initialData,
}: StepProps<ElderInfoData>) {
  const form = useForm<ElderInfoData>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: initialData?.name || '',
      gender: initialData?.gender || undefined,
      age: initialData?.age || undefined,
      phone: initialData?.phone || '',
      relationship: initialData?.relationship || ('' as unknown as Relationship),
      relationshipOther: initialData?.relationshipOther || '',
      livingArrangement: initialData?.livingArrangement || ('' as unknown as LivingArrangement | undefined),
      livingArrangementOther: initialData?.livingArrangementOther || '',
      healthInfo: initialData?.healthInfo || '',
    },
  });

  const watchRelationship = form.watch('relationship');
  const watchLivingArrangement = form.watch('livingArrangement');
  const watchHealthInfo = form.watch('healthInfo');

  const isFormValid = form.formState.isValid;

  const onSubmit = (data: ElderInfoData) => {
    onNext(data);
  };

  return (
    <StepCard
      stepNumber={2}
      title="어르신 정보"
      description="안부 전화를 받으실 어르신의 정보를 입력해주세요."
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
                <FormDescription>
                  어르신의 성함을 입력해주세요 (2-20자)
                </FormDescription>
                <FormControl>
                  <Input placeholder="예) 김영희" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  성별 <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        남성
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        여성
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    나이 <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormDescription>만 나이 (60-120세)</FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="예) 78"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    연락처 <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormDescription>휴대전화 번호</FormDescription>
                  <FormControl>
                    <Input
                      placeholder="010-0000-0000"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        field.onChange(formatted);
                      }}
                      maxLength={13}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    보호자와의 관계 <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="관계 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="son">아들</SelectItem>
                      <SelectItem value="daughter">딸</SelectItem>
                      <SelectItem value="son-in-law">사위</SelectItem>
                      <SelectItem value="daughter-in-law">며느리</SelectItem>
                      <SelectItem value="grandson">손자</SelectItem>
                      <SelectItem value="granddaughter">손녀</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="livingArrangement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    거주 형태{' '}
                    <span className="text-muted-foreground">(선택)</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="거주 형태 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="alone">독거</SelectItem>
                      <SelectItem value="with-spouse">
                        배우자와 동거
                      </SelectItem>
                      <SelectItem value="with-children">
                        자녀와 동거
                      </SelectItem>
                      <SelectItem value="nursing-home">요양시설</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {watchRelationship === 'other' && (
            <FormField
              control={form.control}
              name="relationshipOther"
              render={({ field }) => (
                <FormItem className="animate-in fade-in slide-in-from-top-2 duration-200">
                  <FormLabel>관계 입력</FormLabel>
                  <FormControl>
                    <Input placeholder="예) 조카" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {watchLivingArrangement === 'other' && (
            <FormField
              control={form.control}
              name="livingArrangementOther"
              render={({ field }) => (
                <FormItem className="animate-in fade-in slide-in-from-top-2 duration-200">
                  <FormLabel>거주 형태 입력</FormLabel>
                  <FormControl>
                    <Input placeholder="예) 친척과 동거" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="healthInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  주요 질환 <span className="text-destructive">*</span>
                </FormLabel>
                <FormDescription>
                  어르신의 주요 질환이나 건강 상태를 입력해주세요 (최대 500자)
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="예) 고혈압, 당뇨로 매일 아침 약 복용 중. 무릎 관절염 있음"
                    className="resize-none min-h-[100px]"
                    maxLength={500}
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between items-center">
                  <FormMessage />
                  <span className="text-xs text-muted-foreground">
                    {watchHealthInfo?.length || 0}/500
                  </span>
                </div>
              </FormItem>
            )}
          />

          <StepNavigation
            onPrev={onPrev}
            onNext={onNext}
            nextDisabled={!isFormValid}
          />
        </form>
      </Form>
    </StepCard>
  );
}
