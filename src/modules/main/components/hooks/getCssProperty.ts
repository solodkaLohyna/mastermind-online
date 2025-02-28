export const getCssProperty = (element: HTMLElement | null, property: string): string | null => {
    if (!element) return null;
    return getComputedStyle(element).getPropertyValue(property);
  };
  