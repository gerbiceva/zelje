export function heuristic(elapsedTimeSec: number, clicks: number) {
  return clicks * 4 - ((elapsedTimeSec / 10) * 5) ** 0.8;
}

export function score(time: string, clicks: number, nowSec: number) {
  const now = nowSec;
  const elapsedTimeSec = now - new Date(time).getTime() / 1000;

  return heuristic(elapsedTimeSec, clicks);
}