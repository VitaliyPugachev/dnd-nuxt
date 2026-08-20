export interface BackgroundModel {
  id: string;
  name: string;
  description: string;
  skillProficiencies: string[];
  toolProficiencies?: {
    choose?: number;
    items?: string[];
  };
  languages?: {
    choose?: number;
    items?: string[];
  };
  equipment: string[];
  feature: {
    name: string;
    description: string;
  };
  personalityTraits: {
    choose: number;
    items: string[];
  };
  ideals: {
    choose: number;
    items: { text: string; alignment?: string }[];
  };
  bonds: {
    choose: number;
    items: string[];
  };
  flaws: {
    choose: number;
    items: string[];
  };
}
