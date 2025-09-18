export const handleOnlyInputNumber = (e) => {
  if (
    !/[0-9]/.test(e.key) &&
    e.key !== "Backspace" &&
    e.key !== "Delete" &&
    e.key !== "ArrowLeft" &&
    e.key !== "ArrowRight"
  ) {
    e.preventDefault(); // block non-numeric keys
  }
};
