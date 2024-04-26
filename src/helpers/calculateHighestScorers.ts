import Data from "../types";

export default function calculateHighestScorers  (data:{name:string, score:number;}[])  {
    const groupedAndSortedScores: Data[] = Object.entries(
        data.reduce((acc, { name, score }) => {
            if (acc[name]) {
                acc[name].push(score);
            } else {
                acc[name] = [score];
            }
            return acc;
        }, {} as { [key: string]: number[] })
    ).map(([name, scores]) => ({
        name,
        score: scores.sort((a:Data, b:Data) => b - a)
    }));
    return groupedAndSortedScores
  }
  