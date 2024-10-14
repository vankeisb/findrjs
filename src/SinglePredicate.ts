export type HasDescription = {
  description?: string;
};

export type SinglePredicate = ((e: Element) => boolean) & HasDescription;

export function withDesc(
  p: (e: Element) => boolean,
  description: string,
): SinglePredicate {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  p.description = description;
  return p;
}

export function id(id: string): SinglePredicate {
  return withDesc((e) => e.id === id, 'has id ' + id);
}

export function hasClass(cls: string): SinglePredicate {
  return withDesc((e) => e.classList.contains(cls), 'has class ' + cls);
}

export function textEquals(expected: string): SinglePredicate {
  return withDesc((e) => e.textContent === expected, 'text equals ' + expected);
}
