import React from 'react';

import type { RoutineInfo } from '@/entities/routine';
import { Button } from '@/shared/Components';

import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from 'react-icons/md';

type RoutineDetailHeaderProps = {
  isEditingRoutine: boolean;
  setIsEditingRoutine: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RoutineDetailHeader({
  title,
  description,
  isEditingRoutine,
  setIsEditingRoutine,
}: RoutineInfo & RoutineDetailHeaderProps) {
  const handleCancelEdit = () => {
    setIsEditingRoutine(false);
  };

  if (!isEditingRoutine)
    return (
      <header className="flex justify-between items-center bg-white  max-h-40">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-2xl">{title}</h1>
          {description && <p>{description}</p>}
        </div>
        <div>
          <Button
            className="gap-x-0.5"
            onClick={() => setIsEditingRoutine(true)}
          >
            <span>수정</span>
            <span>
              <MdOutlineArrowForwardIos />
            </span>
          </Button>
        </div>
      </header>
    );

  if (isEditingRoutine)
    return (
      <header className="flex items-center bg-white  ">
        <Button variant="link" onClick={handleCancelEdit}>
          <span>
            <MdOutlineArrowBackIos />
          </span>
          <span>루틴으로 돌아가기</span>
        </Button>
      </header>
    );
}
