export type Member = {
  id: string;
  discord_name: string;
  ingame_name: string;
  weapon: string;
  team: string;
};

export type MemberWithPoints = Member & {
  available_points: number;
  available_archboss_points: number;
  total_points: number;
};

export const memberWeaponList = [
  "Wand / Crossbow",
  "Wand / Dagger",
  "Wand / Longbow",
  "Wand / Greatsword",
  "Wand / Staff",
  "Wand / Sword",
  "Sword / Crossbow",
  "Sword / Dagger",
  "Sword / Longbow",
  "Sword / Greatsword",
  "Sword / Staff",
  "Staff / Crossbow",
  "Staff / Dagger",
  "Staff / Longbow",
  "Staff / Greatsword",
  "Greatsword / Crossbow",
  "Greatsword / Dagger",
  "Greatsword / Longbow",
  "Longbow / Crossbow",
  "Longbow / Dagger",
  "Dagger / Crossbow",
] as const;

export const memberTeamList = ["1", "2", "3", "4"] as const;
