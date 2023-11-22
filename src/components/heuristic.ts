export function heuristic(elapsedTimeSec: number, clicks: number) {
  return clicks;
  // return clicks - Math.min(30, elapsedTimeSec / 2);
}

export function score(time: string, clicks: number, nowSec: number) {
  const now = nowSec;
  const elapsedTimeSec = now - new Date(time).getTime() / 1000;

  return heuristic(elapsedTimeSec, clicks);
}
