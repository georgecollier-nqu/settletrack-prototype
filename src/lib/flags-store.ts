export interface Flag {
  id: string;
  caseId: string;
  caseName: string;
  flagType: string;
  description: string;
  fieldContext?: {
    fieldName?: string;
    fieldValue?: string;
  };
  status: "pending" | "reviewing" | "resolved" | "rejected";
  createdAt: string;
  updatedAt: string;
  userId?: string;
  resolvedBy?: string;
  resolutionNotes?: string;
}

const STORAGE_KEY = "settletrack_flags";

export const flagsStore = {
  getAll: (): Flag[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  add: (
    flag: Omit<Flag, "id" | "status" | "createdAt" | "updatedAt">,
  ): Flag => {
    const flags = flagsStore.getAll();
    const newFlag: Flag = {
      ...flag,
      id: `flag_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: "demo-user",
    };
    flags.push(newFlag);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
    return newFlag;
  },

  update: (id: string, updates: Partial<Flag>): Flag | null => {
    const flags = flagsStore.getAll();
    const index = flags.findIndex((f) => f.id === id);
    if (index === -1) return null;

    flags[index] = {
      ...flags[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
    return flags[index];
  },

  getByCaseId: (caseId: string): Flag[] => {
    return flagsStore.getAll().filter((flag) => flag.caseId === caseId);
  },

  getByStatus: (status: Flag["status"]): Flag[] => {
    return flagsStore.getAll().filter((flag) => flag.status === status);
  },
};
