import { PoolItem } from './pool-item.model';

export interface Pack {
  id?: string;
  title?: string;
  priority?: number;
  tasks: PoolItem[];
}


