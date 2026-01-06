import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRoutine } from '../api';

export default function useDeleteRoutine(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteRoutine(id),
    // 삭제 성공 시 실행될 로직
    onSuccess: () => {
      // ⭐ 핵심: 'routines' 키를 가진 전체 목록 쿼리를 무효화해서 새로고침하게 만듦
      queryClient.invalidateQueries({ queryKey: ['routines'] });

      alert('삭제되었습니다.');
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    },
  });
}
