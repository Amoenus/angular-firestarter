
export interface PoolItem {
  id: string;
  description?: string;
  rate: number,
  pityRate?: number;
  label: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  poolItems: PoolItem[];
}
