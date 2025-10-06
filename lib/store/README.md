# Zustand Store

## When to Use Zustand

Use Zustand for **client-side UI state** that needs to be:
- Shared across multiple components
- Persisted to localStorage
- Updated frequently without causing re-renders

### Good use cases:
- UI preferences (sidebar state, theme, layout mode)
- Form wizards (multi-step form state)
- Modal/drawer open/close state
- User interface settings
- Temporary client-side data

### Do NOT use Zustand for:
- Server data fetching (use React Query instead)
- Data from APIs/databases (use React Query instead)
- Single component state (use React useState instead)

## Store Pattern

All stores should follow this pattern:

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface YourStoreState {
  // State properties
  someValue: string;

  // Actions (always use arrow functions)
  setSomeValue: (value: string) => void;
  reset: () => void;
}

const initialState = {
  someValue: 'default',
};

export const useYourStore = create<YourStoreState>()(
  persist(
    (set) => ({
      ...initialState,

      setSomeValue: (value) => set({ someValue: value }),
      reset: () => set(initialState),
    }),
    {
      name: 'your-store-name', // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

## Usage in Components

```typescript
'use client';

import { useUserPreferences } from '@/lib/store/user-preferences';

export function SidebarToggle() {
  // Subscribe to entire store (causes re-render on any change)
  const { sidebarOpen, toggleSidebar } = useUserPreferences();

  // Or subscribe to specific values (only re-renders when those values change)
  const sidebarOpen = useUserPreferences((state) => state.sidebarOpen);
  const toggleSidebar = useUserPreferences((state) => state.toggleSidebar);

  return (
    <button onClick={toggleSidebar}>
      {sidebarOpen ? 'Close' : 'Open'} Sidebar
    </button>
  );
}
```

## Performance Tips

1. **Selector pattern** - Only subscribe to the state you need:
   ```typescript
   const value = useStore((state) => state.value);
   ```

2. **Shallow comparison** - For multiple values:
   ```typescript
   import { shallow } from 'zustand/shallow';
   const { value1, value2 } = useStore(
     (state) => ({ value1: state.value1, value2: state.value2 }),
     shallow
   );
   ```

3. **Actions outside render** - Extract actions that don't change:
   ```typescript
   const toggleSidebar = useStore((state) => state.toggleSidebar);
   ```

## React Query vs Zustand

| Feature | Use React Query | Use Zustand |
|---------|----------------|-------------|
| Server data | ✅ | ❌ |
| API calls | ✅ | ❌ |
| Caching | ✅ | ❌ |
| UI state | ❌ | ✅ |
| localStorage | ❌ | ✅ |
| Form wizard state | ❌ | ✅ |
