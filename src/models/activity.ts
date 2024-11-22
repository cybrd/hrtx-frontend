export type Activity = {
  id: string;
  name: string;
  type: string;
  activity_date: string;
  points: number;
  created_timestamp: string;
  updated_timestamp: string;
  member_count?: number;
};

export const activityTypeList = [
  "Boonstone",
  "Riftstone",
  "Guild Boss Raid",
  "Archboss",
  "Guild Reputation",
  "Bestowed",
  "Bestowed (Archboss)",
  "Tax Delivery",
  "Castle Siege",
] as const;
