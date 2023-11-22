export function heuristic(elapsedTimeSec: number, clicks: number) {
  return (10 + clicks - elapsedTimeSec / 10) ^ 2;
}
