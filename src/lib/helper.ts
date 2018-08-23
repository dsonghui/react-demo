// 生成随机数
export function MakrRan(min: number, max: number) {
    return parseInt(((max - min) * Math.random()) as any, 10) + min;
}