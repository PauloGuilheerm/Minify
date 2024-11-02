export const isValidURL = (url: string) : boolean => {
    try {
      const parsedUrl = new URL(url); 
      const urlRegex = /^(https?:\/\/)/;
      return urlRegex.test(parsedUrl.href);
    } catch (error) {
      return false;
    }
  }