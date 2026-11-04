import { QueryClient } from "@tanstack/react-query";

// Shared query client for imperative cache actions outside components
// (e.g. sign-out teardown). The router creates its own instance for
// loaders; both stay in sync through the QueryClientProvider only when
// components use this one.
export const queryClient = new QueryClient();
