interface Clickable {
  onMouseClick(x: number, y: number): void;
}

function isClickable(obj: any): obj is Clickable {
  return typeof obj.onMouseClick === "function";
}

export default Clickable;
export { isClickable };
