export type HasDescription = {
  description?: string;
};

export type SinglePredicate = ((e: Element) => boolean) & HasDescription;
