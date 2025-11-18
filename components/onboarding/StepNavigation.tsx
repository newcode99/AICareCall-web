import { Button } from '@/components/ui/button';

interface StepNavigationProps {
  onPrev?: () => void;
  onNext?: unknown;
  nextLabel?: string;
  nextDisabled?: boolean;
  isSubmitting?: boolean;
}

export function StepNavigation({
  onPrev,
  onNext,
  nextLabel = '다음',
  nextDisabled = false,
  isSubmitting = false,
}: StepNavigationProps) {
  return (
    <div className="flex justify-between pt-4 border-t">
      {onPrev ? (
        <Button type="button" variant="outline" onClick={onPrev}>
          이전
        </Button>
      ) : (
        <div />
      )}
      <Button
        type="submit"
        size="lg"
        className="min-w-32"
        disabled={nextDisabled || isSubmitting}
      >
        {isSubmitting ? '처리 중...' : nextLabel}
      </Button>
    </div>
  );
}
