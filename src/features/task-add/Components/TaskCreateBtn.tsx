import { Button } from '@/shared/Components';

export default function TaskCreateBtn({ addTask }: { addTask: () => void }) {
  return (
    <Button
      onClick={() => {
        addTask();
      }}
      type="button"
      variant="dashed"
      size="sm"
    >
      실천 행동 추가
    </Button>
  );
}
