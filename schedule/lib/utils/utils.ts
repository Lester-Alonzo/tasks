function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Calculates the number of days between a given date and today's date.
 * @param date - The date to compare to today's date in string format (YYYY-MM-DD).
 * @returns The number of days between the given date and today's date.
 */
export function PassDays(date:string) {
  const today = new Date();
  const date2 = new Date(date);  

  const diffTime = Math.abs(date2.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}