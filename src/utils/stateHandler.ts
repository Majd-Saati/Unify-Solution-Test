export type DataState = 'loading' | 'error' | 'empty' | 'success';

export interface StateHandlerOptions {
  isLoading: boolean;
  hasError: boolean;
  hasData: boolean;
  totalCount: number;
}

export function getDataState({
  isLoading,
  hasError,
  hasData,
  totalCount,
}: StateHandlerOptions): DataState {
  if (isLoading) return 'loading';
  if (hasError) return 'error';
  if (!hasData && totalCount === 0) return 'empty';
  return 'success';
}

export function handleDataState<T>(
  state: DataState,
  handlers: {
    loading: () => T;
    error: () => T;
    empty: () => T;
    success: () => T;
  }
): T {
  switch (state) {
    case 'loading':
      return handlers.loading();
    case 'error':
      return handlers.error();
    case 'empty':
      return handlers.empty();
    case 'success':
      return handlers.success();
    default:
      return handlers.loading();
  }
}

