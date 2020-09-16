//form data field for token _csrf
export const getToken = () => {
  if (document.querySelector('meta[name="csrf-token"]')) {
    return (document.querySelector(
      'meta[name="csrf-token"]'
    ) as any).getAttribute("content");
  } else {
    throw new Error("No meta token");
  }
};
