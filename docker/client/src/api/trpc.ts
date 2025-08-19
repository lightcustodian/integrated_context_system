import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';

// Define the router type manually since we can't import from server
type AppRouter = {
  project: {
    list: {
      query: () => any[];
    };
    get: {
      query: (input: { id: string }) => any;
    };
    create: {
      mutate: (input: { name: string; description?: string; methodology?: string; metadata?: any }) => any;
    };
    update: {
      mutate: (input: { id: string; name?: string; description?: string; status?: string; metadata?: any }) => any;
    };
    delete: {
      mutate: (input: { id: string }) => any;
    };
  };
  task: {
    listByProject: {
      query: (input: { projectId: string }) => any[];
    };
    create: {
      mutate: (input: { projectId: string; title: string; description?: string; status?: string; priority?: string; assignedTo?: string; estimatedHours?: number; metadata?: any }) => any;
    };
    update: {
      mutate: (input: { id: string; title?: string; description?: string; status?: string; priority?: string; assignedTo?: string; columnOrder?: number; actualHours?: number; metadata?: any }) => any;
    };
    delete: {
      mutate: (input: { id: string }) => any;
    };
    reorder: {
      mutate: (input: { taskId: string; newStatus: string; newOrder: number }) => any;
    };
  };
  state: {
    get: {
      query: (input: { projectId: string }) => any;
    };
    update: {
      mutate: (input: { projectId: string; currentPhase?: string; context?: any; addToHistory?: any }) => any;
    };
  };
  sync: {
    push: {
      mutate: (input: { command: string; data: any; timestamp: string }) => any;
    };
    pull: {
      query: (input?: { projectId?: string; since?: string }) => any[];
    };
  };
};

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/trpc',
      headers() {
        return {
          'x-source': 'web',
        };
      },
    }),
  ],
});