// --- OPAQUE UTILITIES (from your prompt) ---
type StringLiteral<Type> = Type extends string ? (string extends Type ? never : Type) : never;

declare const __OPAQUE_TYPE__: unique symbol;

export type WithOpaque<Token extends string> = {
  readonly [__OPAQUE_TYPE__]: Token;
};

export type Opaque<Type, Token extends string> = Token extends StringLiteral<Token> 
  ? Type & WithOpaque<Token> 
  : never;

// --- INTERFACES ---
export interface LockHandle extends Disposable {
  destroy(): void;
}

// --- STATE DEFINITION ---
/**
 * The internal state of the lock.
 * This is a simple, serializable POJO.
 */
interface LockState {
  isTaken: boolean;
}

/**
 * The Opaque type prevents arbitrary objects from being passed into the lock functions,
 * ensuring type safety while maintaining serializability.
 */
export type ExclusiveLock = Opaque<LockState, "ExclusiveLock">;


// --- ANNEXED FUNCTIONS ---
/**
 * A module-like grouping of functional operations for the ExclusiveLock.
 * You can also export these as standalone functions if you prefer.
 */
export const ExclusiveLock = {
  /**
   * Creates a new, serializable lock state.
   */
  create(): ExclusiveLock {
    return { isTaken: false } as ExclusiveLock;
  },

  /**
   * Restores a lock from a deserialized state (e.g., from JSON.parse).
   */
  fromJSON(data: LockState): ExclusiveLock {
    return { isTaken: data.isTaken } as ExclusiveLock;
  },

  /**
   * Attempts to acquire the lock. 
   * Mutates the provided lock state and returns a LockHandle if successful.
   */
  tryAcquire(lock: ExclusiveLock): LockHandle | undefined {
    // If the resource is already taken, fail by returning undefined
    if (lock.isTaken) {
      return undefined;
    }

    // Mark as taken
    lock.isTaken = true;
    let isDestroyed = false;

    // Return the handle (the handle itself contains behavior and is not serializable)
    return {
      destroy: () => {
        // Ensure destroy is idempotent
        if (!isDestroyed) {
          lock.isTaken = false;
          isDestroyed = true;
        }
      },

      // Supports TypeScript 5.2+ 'using' keyword for automatic cleanup
      [Symbol.dispose]() {
        this.destroy();
      }
    };
  },

  /**
   * Checks the current status of the lock.
   */
  isLocked(lock: ExclusiveLock): boolean {
    return lock.isTaken;
  }
} as const;
