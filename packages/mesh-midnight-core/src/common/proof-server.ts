export const checkProofServerStatus = async (proverServerUri: string): Promise<boolean> => {
  try {
    const response = await fetch(proverServerUri);
    if (!response.ok) {
      return false;
    }
    const text = await response.text();
    console.log({text})
    if (text.includes("We're alive 🎉!")) {
      return true;
    }
    return false;
  } catch (e) {
    console.log(e)
    return false;
  }
};
