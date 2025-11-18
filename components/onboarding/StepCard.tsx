import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function StepCard({
  stepNumber,
  title,
  description,
  children,
}: StepCardProps) {
  return (
    <Card className="animate-in fade-in slide-in-from-top-2 duration-200">
      <CardHeader>
        <CardTitle className="text-2xl">
          {stepNumber}. {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
